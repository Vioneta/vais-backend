"""Diagnostics support for VAIS."""
from __future__ import annotations

from typing import Any

from aiogithubapi import GitHubException
from homeassistant.components.diagnostics import async_redact_data
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant

from .base import VaisBase
from .const import DOMAIN
from .utils.configuration_schema import TOKEN


async def async_get_config_entry_diagnostics(
    hass: HomeAssistant,
    entry: ConfigEntry,
) -> dict[str, Any]:
    """Return diagnostics for a config entry."""
    vais: VaisBase = hass.data[DOMAIN]

    data = {
        "entry": entry.as_dict(),
        "vais": {
            "stage": vais.stage,
            "version": vais.version,
            "disabled_reason": vais.system.disabled_reason,
            "new": vais.status.new,
            "startup": vais.status.startup,
            "categories": vais.common.categories,
            "renamed_repositories": vais.common.renamed_repositories,
            "archived_repositories": vais.common.archived_repositories,
            "ignored_repositories": vais.common.ignored_repositories,
            "lovelace_mode": vais.core.lovelace_mode,
            "configuration": {},
        },
        "custom_repositories": [
            repo.data.full_name
            for repo in vais.repositories.list_all
            if not vais.repositories.is_default(str(repo.data.id))
        ],
        "repositories": [],
    }

    for key in (
        "appdaemon",
        "country",
        "debug",
        "dev",
        "experimental",
        "netdaemon",
        "python_script",
        "release_limit",
        "theme",
    ):
        data["vais"]["configuration"][key] = getattr(
            vais.configuration, key, None)

    for repository in vais.repositories.list_downloaded:
        data["repositories"].append(
            {
                "data": repository.data.to_json(),
                "integration_manifest": repository.integration_manifest,
                "repository_manifest": repository.repository_manifest.to_dict(),
                "ref": repository.ref,
                "paths": {
                    "localpath": repository.localpath.replace(vais.core.config_path, "/config"),
                    "local": repository.content.path.local.replace(
                        vais.core.config_path, "/config"
                    ),
                    "remote": repository.content.path.remote,
                },
            }
        )

    try:
        rate_limit_response = await vais.githubapi.rate_limit()
        data["rate_limit"] = rate_limit_response.data.as_dict
    except GitHubException as exception:
        data["rate_limit"] = str(exception)

    return async_redact_data(data, (TOKEN,))
