"""Register WS API endpoints for VAIS."""
from __future__ import annotations

import sys

from aiogithubapi import AIOGitHubAPIException
from homeassistant.components import websocket_api
from homeassistant.components.websocket_api import async_register_command
from homeassistant.core import HomeAssistant, callback
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.dispatcher import async_dispatcher_connect
import voluptuous as vol

from custom_components.vais.const import DOMAIN

from .base import VaisBase
from .enums import VaisDispatchEvent
from .exceptions import VaisException
from .utils import regex
from .utils.store import async_load_from_store, async_save_to_store


@callback
def async_register_websocket_commands(hass: HomeAssistant) -> None:
    """Register_commands."""
    async_register_command(hass, vais_settings)
    async_register_command(hass, vais_config)
    async_register_command(hass, vais_repositories)
    async_register_command(hass, vais_repository)
    async_register_command(hass, vais_repository_data)
    async_register_command(hass, vais_status)
    async_register_command(hass, vais_removed)
    async_register_command(hass, acknowledge_critical_repository)
    async_register_command(hass, get_critical_repositories)
    async_register_command(hass, vais_repository_ignore)
    async_register_command(hass, vais_subscribe)


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/critical",
        vol.Optional("repository"): cv.string,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def acknowledge_critical_repository(hass, connection, msg):
    """Handle get media player cover command."""
    repository = msg["repository"]

    critical = await async_load_from_store(hass, "critical")
    for repo in critical:
        if repository == repo["repository"]:
            repo["acknowledged"] = True
    await async_save_to_store(hass, "critical", critical)
    connection.send_message(websocket_api.result_message(msg["id"], critical))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/get_critical",
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def get_critical_repositories(hass, connection, msg):
    """Handle get media player cover command."""
    critical = await async_load_from_store(hass, "critical")
    if not critical:
        critical = []
    connection.send_message(websocket_api.result_message(msg["id"], critical))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/config",
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_config(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)
    connection.send_message(
        websocket_api.result_message(
            msg["id"],
            {
                "version": vais.version,
                "frontend_expected": vais.frontend_version,
                "frontend_running": vais.frontend_version,
                "dev": vais.configuration.dev,
                "debug": vais.configuration.debug,
                "country": vais.configuration.country,
                "experimental": vais.configuration.experimental,
                "categories": vais.common.categories,
            },
        )
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/removed",
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_removed(hass, connection, msg):
    """Get information about removed repositories."""
    vais: VaisBase = hass.data.get(DOMAIN)
    content = []
    for repo in vais.repositories.list_removed:
        if repo.repository not in vais.common.ignored_repositories:
            content.append(repo.to_json())
    connection.send_message(websocket_api.result_message(msg["id"], content))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/repositories",
        vol.Optional("categories"): [str],
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_repositories(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)
    connection.send_message(
        websocket_api.result_message(
            msg["id"],
            [
                {
                    "additional_info": repo.additional_info,
                    "authors": repo.data.authors,
                    "available_version": repo.display_available_version,
                    "beta": repo.data.show_beta,
                    "can_install": repo.can_download,
                    "category": repo.data.category,
                    "config_flow": repo.data.config_flow,
                    "country": repo.repository_manifest.country,
                    "custom": not vais.repositories.is_default(str(repo.data.id)),
                    "default_branch": repo.data.default_branch,
                    "description": repo.data.description,
                    "domain": repo.data.domain,
                    "downloads": repo.data.downloads,
                    "file_name": repo.data.file_name,
                    "first_install": repo.data.first_install,
                    "full_name": repo.data.full_name,
                    "hide_default_branch": repo.repository_manifest.hide_default_branch,
                    "hide": repo.data.hide,
                    "homeassistant": repo.repository_manifest.homeassistant,
                    "id": repo.data.id,
                    "info": None,
                    "installed_version": repo.display_installed_version,
                    "installed": repo.data.installed,
                    "issues": repo.data.open_issues,
                    "javascript_type": None,
                    "last_updated": repo.data.last_updated,
                    "local_path": repo.content.path.local,
                    "main_action": repo.main_action,
                    "name": repo.display_name,
                    "new": repo.data.new,
                    "pending_upgrade": repo.pending_update,
                    "releases": repo.data.published_tags,
                    "selected_tag": repo.data.selected_tag,
                    "stars": repo.data.stargazers_count,
                    "state": repo.state,
                    "status_description": repo.display_status_description,
                    "status": repo.display_status,
                    "topics": repo.data.topics,
                    "updated_info": repo.updated_info,
                    "version_or_commit": repo.display_version_or_commit,
                }
                for repo in vais.repositories.list_all
                if repo.data.category in (msg.get("categories") or vais.common.categories)
                and not repo.ignored_by_country_configuration
            ],
        )
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/repository/data",
        vol.Optional("action"): cv.string,
        vol.Optional("repository"): cv.string,
        vol.Optional("data"): cv.string,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_repository_data(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)
    repo_id = msg.get("repository")
    action = msg.get("action")
    data = msg.get("data")

    if repo_id is None:
        return

    if action == "add":
        repo_id = regex.extract_repository_from_url(repo_id)
        if repo_id is None:
            return

        if repo_id in vais.common.skip:
            vais.common.skip.remove(repo_id)

        if vais.common.renamed_repositories.get(repo_id):
            repo_id = vais.common.renamed_repositories[repo_id]

        if not vais.repositories.get_by_full_name(repo_id):
            try:
                registration = await vais.async_register_repository(
                    repository_full_name=repo_id, category=data.lower()
                )
                if registration is not None:
                    raise VaisException(registration)
            # lgtm [py/catch-base-exception] pylint: disable=broad-except
            except BaseException as exception:
                vais.async_dispatch(
                    VaisDispatchEvent.ERROR,
                    {
                        "action": "add_repository",
                        "exception": str(sys.exc_info()[0].__name__),
                        "message": str(exception),
                    },
                )

        else:

            vais.async_dispatch(
                VaisDispatchEvent.ERROR,
                {
                    "action": "add_repository",
                    "message": f"Repository '{repo_id}' exists in the store.",
                },
            )

        repository = vais.repositories.get_by_full_name(repo_id)
    else:
        repository = vais.repositories.get_by_id(repo_id)

    if repository is None:
        vais.async_dispatch(VaisDispatchEvent.REPOSITORY, {})
        return

    vais.log.debug("Running %s for %s", action, repository.data.full_name)
    try:
        if action == "set_state":
            repository.state = data

        elif action == "set_version":
            repository.data.selected_tag = data
            await repository.update_repository(force=True)

            repository.state = None

        elif action == "install":
            was_installed = repository.data.installed
            repository.data.selected_tag = data
            await repository.update_repository(force=True)
            await repository.async_install()
            repository.state = None
            if not was_installed:
                vais.async_dispatch(VaisDispatchEvent.RELOAD, {"force": True})
                await vais.async_recreate_entities()

        elif action == "add":
            repository.state = None

        else:
            repository.state = None
            vais.log.error("WS action '%s' is not valid", action)

        message = None
    except AIOGitHubAPIException as exception:
        message = exception
    except AttributeError as exception:
        message = f"Could not use repository with ID {repo_id} ({exception})"
    # lgtm [py/catch-base-exception] pylint: disable=broad-except
    except BaseException as exception:
        message = exception

    if message is not None:
        vais.log.error(message)
        vais.async_dispatch(VaisDispatchEvent.ERROR, {"message": str(message)})

    await vais.data.async_write()
    connection.send_message(websocket_api.result_message(msg["id"], {}))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/repository",
        vol.Optional("action"): cv.string,
        vol.Optional("repository"): cv.string,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_repository(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)
    data = {}
    repository = None

    repo_id = msg.get("repository")
    action = msg.get("action")
    if repo_id is None or action is None:
        return

    try:
        repository = vais.repositories.get_by_id(repo_id)
        vais.log.debug(f"Running {action} for {repository.data.full_name}")

        if action == "update":
            await repository.update_repository(ignore_issues=True, force=True)
            repository.updated_info = True

        elif action == "install":
            repository.data.new = False
            was_installed = repository.data.installed
            await repository.async_install()
            if not was_installed:
                vais.async_dispatch(VaisDispatchEvent.RELOAD, {"force": True})
                await vais.async_recreate_entities()

        elif action == "not_new":
            repository.data.new = False

        elif action == "uninstall":
            repository.data.new = False
            await repository.update_repository(ignore_issues=True, force=True)
            await repository.uninstall()

        elif action == "hide":
            repository.data.hide = True

        elif action == "unhide":
            repository.data.hide = False

        elif action == "show_beta":
            repository.data.show_beta = True
            await repository.update_repository(force=True)

        elif action == "hide_beta":
            repository.data.show_beta = False
            await repository.update_repository(force=True)

        elif action == "toggle_beta":
            repository.data.show_beta = not repository.data.show_beta
            await repository.update_repository(force=True)

        elif action == "delete":
            repository.data.show_beta = False
            repository.remove()

        elif action == "release_notes":
            data = [
                {
                    "name": x.name,
                    "body": x.body,
                    "tag": x.tag_name,
                }
                for x in repository.releases.objects
            ]

        elif action == "set_version":
            if msg["version"] == repository.data.default_branch:
                repository.data.selected_tag = None
            else:
                repository.data.selected_tag = msg["version"]
            await repository.update_repository(force=True)

            vais.async_dispatch(VaisDispatchEvent.RELOAD, {"force": True})

        else:
            vais.log.error(f"WS action '{action}' is not valid")

        await vais.data.async_write()
        message = None
    except AIOGitHubAPIException as exception:
        message = exception
    except AttributeError as exception:
        message = f"Could not use repository with ID {repo_id} ({exception})"
    # lgtm [py/catch-base-exception] pylint: disable=broad-except
    except BaseException as exception:
        message = exception

    if message is not None:
        vais.log.error(message)
        vais.async_dispatch(VaisDispatchEvent.ERROR, {"message": str(message)})

    if repository:
        repository.state = None
        connection.send_message(websocket_api.result_message(msg["id"], data))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/settings",
        vol.Optional("action"): cv.string,
        vol.Optional("categories"): cv.ensure_list,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_settings(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)

    action = msg["action"]
    vais.log.debug("WS action '%s'", action)

    if action == "clear_new":
        for repo in vais.repositories.list_all:
            if repo.data.new and repo.data.category in msg.get("categories", []):
                vais.log.debug(
                    "Clearing new flag from '%s'",
                    repo.data.full_name,
                )
                repo.data.new = False
    else:
        vais.log.error("WS action '%s' is not valid", action)
    vais.async_dispatch(VaisDispatchEvent.CONFIG, {})
    await vais.data.async_write()
    connection.send_message(websocket_api.result_message(msg["id"], {}))


@websocket_api.websocket_command({vol.Required("type"): "vais/status"})
@websocket_api.require_admin
@websocket_api.async_response
async def vais_status(hass, connection, msg):
    """Handle get media player cover command."""
    vais: VaisBase = hass.data.get(DOMAIN)
    connection.send_message(
        websocket_api.result_message(
            msg["id"],
            {
                "startup": vais.status.startup,
                "background_task": False,
                "lovelace_mode": vais.core.lovelace_mode,
                "reloading_data": vais.status.reloading_data,
                "upgrading_all": vais.status.upgrading_all,
                "disabled": vais.system.disabled,
                "disabled_reason": vais.system.disabled_reason,
                "has_pending_tasks": vais.queue.has_pending_tasks,
                "stage": vais.stage,
            },
        )
    )


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/repository/ignore",
        vol.Required("repository"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_repository_ignore(hass, connection, msg):
    """Ignore a repository."""
    vais: VaisBase = hass.data.get(DOMAIN)
    vais.common.ignored_repositories.append(msg["repository"])
    connection.send_message(websocket_api.result_message(msg["id"]))


@websocket_api.websocket_command(
    {
        vol.Required("type"): "vais/subscribe",
        vol.Required("signal"): str,
    }
)
@websocket_api.require_admin
@websocket_api.async_response
async def vais_subscribe(
    hass: HomeAssistant,
    connection: websocket_api.ActiveConnection,
    msg: dict,
) -> None:
    """Handle websocket subscriptions."""

    @callback
    def forward_messages(data: dict | None = None):
        """Forward events to websocket."""
        connection.send_message(websocket_api.event_message(msg["id"], data))

    connection.subscriptions[msg["id"]] = async_dispatcher_connect(
        hass,
        msg["signal"],
        forward_messages,
    )
    connection.send_message(websocket_api.result_message(msg["id"]))
