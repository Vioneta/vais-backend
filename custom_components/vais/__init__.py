"""
VAIS gives you a powerful UI to handle downloads of all your custom needs.

For more details about this integration, please refer to the documentation at
https://vais.xyz/
"""
from __future__ import annotations

import os
from typing import Any

from aiogithubapi import AIOGitHubAPIException, GitHub, GitHubAPI
from aiogithubapi.const import ACCEPT_HEADERS
from awesomeversion import AwesomeVersion
from homeassistant.components.lovelace.system_health import system_health_info
from homeassistant.config_entries import SOURCE_IMPORT, ConfigEntry
from homeassistant.const import Platform, __version__ as HAVERSION
from homeassistant.core import HomeAssistant
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.helpers.discovery import async_load_platform
from homeassistant.helpers.event import async_call_later
from homeassistant.helpers.start import async_at_start
from homeassistant.loader import async_get_integration
import voluptuous as vol

from custom_components.vais.frontend import async_register_frontend

from .base import VaisBase
from .const import DOMAIN, MINIMUM_HA_VERSION, STARTUP
from .enums import ConfigurationType, VaisDisabledReason, VaisStage, LovelaceMode
from .utils.configuration_schema import vais_config_combined
from .utils.data import VaisData
from .utils.queue_manager import QueueManager
from .utils.version import version_left_higher_or_equal_then_right
from .websocket import async_register_websocket_commands

CONFIG_SCHEMA = vol.Schema(
    {DOMAIN: vais_config_combined()}, extra=vol.ALLOW_EXTRA)


async def async_initialize_integration(
    hass: HomeAssistant,
    *,
    config_entry: ConfigEntry | None = None,
    config: dict[str, Any] | None = None,
) -> bool:
    """Initialize the integration"""
    hass.data[DOMAIN] = vais = VaisBase()
    vais.enable_vais()

    if config is not None:
        if DOMAIN not in config:
            return True
        if vais.configuration.config_type == ConfigurationType.CONFIG_ENTRY:
            return True
        vais.configuration.update_from_dict(
            {
                "config_type": ConfigurationType.YAML,
                **config[DOMAIN],
                "config": config[DOMAIN],
            }
        )

    if config_entry is not None:
        if config_entry.source == SOURCE_IMPORT:
            hass.async_create_task(
                hass.config_entries.async_remove(config_entry.entry_id))
            return False

        vais.configuration.update_from_dict(
            {
                "config_entry": config_entry,
                "config_type": ConfigurationType.CONFIG_ENTRY,
                **config_entry.data,
                **config_entry.options,
            }
        )

    integration = await async_get_integration(hass, DOMAIN)

    vais.set_stage(None)

    vais.log.info(STARTUP, integration.version)

    clientsession = async_get_clientsession(hass)

    vais.integration = integration
    vais.version = integration.version
    vais.configuration.dev = integration.version == "0.0.0"
    vais.hass = hass
    vais.queue = QueueManager(hass=hass)
    vais.data = VaisData(vais=vais)
    vais.system.running = True
    vais.session = clientsession

    vais.core.lovelace_mode = LovelaceMode.YAML
    try:
        lovelace_info = await system_health_info(vais.hass)
        vais.core.lovelace_mode = LovelaceMode(
            lovelace_info.get("mode", "yaml"))
    # lgtm [py/catch-base-exception] pylint: disable=broad-except
    except BaseException:
        # If this happens, the users YAML is not valid, we assume YAML mode
        pass
    vais.log.debug("Configuration type: %s", vais.configuration.config_type)
    vais.core.config_path = vais.hass.config.path()

    if vais.core.ha_version is None:
        vais.core.ha_version = AwesomeVersion(HAVERSION)

    # Legacy GitHub client
    vais.github = GitHub(
        vais.configuration.token,
        clientsession,
        headers={
            "User-Agent": f"VAIS/{vais.version}",
            "Accept": ACCEPT_HEADERS["preview"],
        },
    )

    # New GitHub client
    vais.githubapi = GitHubAPI(
        token=vais.configuration.token,
        session=clientsession,
        **{"client_name": f"VAIS/{vais.version}"},
    )

    async def async_startup():
        """VAIS startup tasks."""
        vais.enable_vais()

        for location in (
            hass.config.path("custom_components/custom_updater.py"),
            hass.config.path("custom_components/custom_updater/__init__.py"),
        ):
            if os.path.exists(location):
                vais.log.critical(
                    "This cannot be used with custom_updater. "
                    "To use this you need to remove custom_updater form %s",
                    location,
                )

                vais.disable_vais(VaisDisabledReason.CONSTRAINS)
                return False

        if not version_left_higher_or_equal_then_right(
            vais.core.ha_version.string,
            MINIMUM_HA_VERSION,
        ):
            vais.log.critical(
                "You need HA version %s or newer to use this integration.",
                MINIMUM_HA_VERSION,
            )
            vais.disable_vais(VaisDisabledReason.CONSTRAINS)
            return False

        if not await vais.data.restore():
            vais.disable_vais(VaisDisabledReason.RESTORE)
            return False

        can_update = await vais.async_can_update()
        vais.log.debug("Can update %s repositories", can_update)

        vais.set_active_categories()

        async_register_websocket_commands(hass)
        async_register_frontend(hass, vais)

        if vais.configuration.config_type == ConfigurationType.YAML:
            hass.async_create_task(
                async_load_platform(hass, Platform.SENSOR,
                                    DOMAIN, {}, vais.configuration.config)
            )
            vais.log.info(
                "Update entities are only supported when using UI configuration")

        else:
            if vais.configuration.experimental:
                hass.config_entries.async_setup_platforms(
                    vais.configuration.config_entry, [
                        Platform.SENSOR, Platform.UPDATE]
                )
            else:
                hass.config_entries.async_setup_platforms(
                    vais.configuration.config_entry, [Platform.SENSOR]
                )

        vais.set_stage(VaisStage.SETUP)
        if vais.system.disabled:
            return False

        # Schedule startup tasks
        async_at_start(hass=hass, at_start_cb=vais.startup_tasks)

        vais.set_stage(VaisStage.WAITING)
        vais.log.info(
            "Setup complete, waiting for Vioneta Agro before startup tasks starts")

        return not vais.system.disabled

    async def async_try_startup(_=None):
        """Startup wrapper for yaml config."""
        try:
            startup_result = await async_startup()
        except AIOGitHubAPIException:
            startup_result = False
        if not startup_result:
            if (
                vais.configuration.config_type == ConfigurationType.YAML
                or vais.system.disabled_reason != VaisDisabledReason.INVALID_TOKEN
            ):
                vais.log.info("Could not setup VAIS, trying again in 15 min")
                async_call_later(hass, 900, async_try_startup)
            return
        vais.enable_vais()

    await async_try_startup()

    # Mischief managed!
    return True


async def async_setup(hass: HomeAssistant, config: dict[str, Any]) -> bool:
    """Set up this integration using yaml."""
    return await async_initialize_integration(hass=hass, config=config)


async def async_setup_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Set up this integration using UI."""
    config_entry.async_on_unload(
        config_entry.add_update_listener(async_reload_entry))
    setup_result = await async_initialize_integration(hass=hass, config_entry=config_entry)
    vais: VaisBase = hass.data[DOMAIN]
    return setup_result and not vais.system.disabled


async def async_unload_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> bool:
    """Handle removal of an entry."""
    vais: VaisBase = hass.data[DOMAIN]

    # Clear out pending queue
    vais.queue.clear()

    for task in vais.recuring_tasks:
        # Cancel all pending tasks
        task()

    # Store data
    await vais.data.async_write(force=True)

    try:
        if hass.data.get("frontend_panels", {}).get("vais"):
            vais.log.info("Removing sidepanel")
            hass.components.frontend.async_remove_panel("vais")
    except AttributeError:
        pass

    platforms = ["sensor"]
    if vais.configuration.experimental:
        platforms.append("update")

    unload_ok = await hass.config_entries.async_unload_platforms(config_entry, platforms)

    vais.set_stage(None)
    vais.disable_vais(VaisDisabledReason.REMOVED)

    hass.data.pop(DOMAIN, None)

    return unload_ok


async def async_reload_entry(hass: HomeAssistant, config_entry: ConfigEntry) -> None:
    """Reload the VAIS config entry."""
    await async_unload_entry(hass, config_entry)
    await async_setup_entry(hass, config_entry)
