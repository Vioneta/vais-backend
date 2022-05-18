"""Base VAIS class."""
from __future__ import annotations

import asyncio
from dataclasses import asdict, dataclass, field
from datetime import timedelta
import gzip
import json
import logging
import math
import os
import pathlib
import shutil
from typing import TYPE_CHECKING, Any, Awaitable, Callable

from aiogithubapi import (
    AIOGitHubAPIException,
    GitHub,
    GitHubAPI,
    GitHubAuthenticationException,
    GitHubException,
    GitHubNotModifiedException,
    GitHubRatelimitException,
)
from aiogithubapi.objects.repository import AIOGitHubAPIRepository
from aiohttp.client import ClientSession, ClientTimeout
from awesomeversion import AwesomeVersion
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import EVENT_HOMEASSISTANT_FINAL_WRITE, Platform
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers.dispatcher import async_dispatcher_send
from homeassistant.loader import Integration
from homeassistant.util import dt

from .const import TV
from .enums import (
    ConfigurationType,
    VaisCategory,
    VaisDisabledReason,
    VaisDispatchEvent,
    VaisGitHubRepo,
    VaisStage,
    LovelaceMode,
)
from .exceptions import (
    AddonRepositoryException,
    VaisException,
    VaisExecutionStillInProgress,
    VaisExpectedException,
    VaisRepositoryArchivedException,
    VaisRepositoryExistException,
    HomeAssistantCoreRepositoryException,
)
from .repositories import RERPOSITORY_CLASSES
from .utils.decode import decode_content
from .utils.logger import get_vais_logger
from .utils.queue_manager import QueueManager
from .utils.store import async_load_from_store, async_save_to_store

if TYPE_CHECKING:
    from .repositories.base import VaisRepository
    from .utils.data import VaisData
    from .validate.manager import ValidationManager


@dataclass
class RemovedRepository:
    """Removed repository."""

    repository: str | None = None
    reason: str | None = None
    link: str | None = None
    removal_type: str = None  # archived, not_compliant, critical, dev, broken
    acknowledged: bool = False

    def update_data(self, data: dict):
        """Update data of the repository."""
        for key in data:
            if data[key] is None:
                continue
            if key in (
                "reason",
                "link",
                "removal_type",
                "acknowledged",
            ):
                self.__setattr__(key, data[key])

    def to_json(self):
        """Return a JSON representation of the data."""
        return {
            "repository": self.repository,
            "reason": self.reason,
            "link": self.link,
            "removal_type": self.removal_type,
            "acknowledged": self.acknowledged,
        }


@dataclass
class VaisConfiguration:
    """VaisConfiguration class."""

    appdaemon_path: str = "appdaemon/apps/"
    appdaemon: bool = False
    config: dict[str, Any] = field(default_factory=dict)
    config_entry: ConfigEntry | None = None
    config_type: ConfigurationType | None = None
    country: str = "ALL"
    debug: bool = False
    dev: bool = False
    experimental: bool = False
    frontend_repo_url: str = ""
    frontend_repo: str = ""
    netdaemon_path: str = "netdaemon/apps/"
    netdaemon: bool = False
    plugin_path: str = "www/community/"
    python_script_path: str = "python_scripts/"
    python_script: bool = False
    release_limit: int = 5
    sidepanel_icon: str = "vais:vais"
    sidepanel_title: str = "VAIS"
    theme_path: str = "themes/"
    theme: bool = False
    token: str = None

    def to_json(self) -> str:
        """Return a json string."""
        return asdict(self)

    def update_from_dict(self, data: dict) -> None:
        """Set attributes from dicts."""
        if not isinstance(data, dict):
            raise VaisException("Configuration is not valid.")

        for key in data:
            self.__setattr__(key, data[key])


@dataclass
class VaisCore:
    """VAIS Core info."""

    config_path: pathlib.Path | None = None
    ha_version: AwesomeVersion | None = None
    lovelace_mode = LovelaceMode("yaml")


@dataclass
class VaisCommon:
    """Common for VAIS."""

    categories: set[str] = field(default_factory=set)
    renamed_repositories: dict[str, str] = field(default_factory=dict)
    archived_repositories: list[str] = field(default_factory=list)
    ignored_repositories: list[str] = field(default_factory=list)
    skip: list[str] = field(default_factory=list)


@dataclass
class VaisStatus:
    """VaisStatus."""

    startup: bool = True
    new: bool = False
    reloading_data: bool = False
    upgrading_all: bool = False


@dataclass
class VaisSystem:
    """VAIS System info."""

    disabled_reason: VaisDisabledReason | None = None
    running: bool = False
    stage = VaisStage.SETUP
    action: bool = False

    @property
    def disabled(self) -> bool:
        """Return if VAIS is disabled."""
        return self.disabled_reason is not None


@dataclass
class VaisRepositories:
    """VAIS Repositories."""

    _default_repositories: set[str] = field(default_factory=set)
    _repositories: list[VaisRepository] = field(default_factory=list)
    _repositories_by_full_name: dict[str, str] = field(default_factory=dict)
    _repositories_by_id: dict[str, str] = field(default_factory=dict)
    _removed_repositories: list[RemovedRepository] = field(
        default_factory=list)

    @property
    def list_all(self) -> list[VaisRepository]:
        """Return a list of repositories."""
        return self._repositories

    @property
    def list_removed(self) -> list[RemovedRepository]:
        """Return a list of removed repositories."""
        return self._removed_repositories

    @property
    def list_downloaded(self) -> list[VaisRepository]:
        """Return a list of downloaded repositories."""
        return [repo for repo in self._repositories if repo.data.installed]

    def register(self, repository: VaisRepository, default: bool = False) -> None:
        """Register a repository."""
        repo_id = str(repository.data.id)

        if repo_id == "0":
            return

        if self.is_registered(repository_id=repo_id):
            return

        if repository not in self._repositories:
            self._repositories.append(repository)

        self._repositories_by_id[repo_id] = repository
        self._repositories_by_full_name[repository.data.full_name_lower] = repository

        if default:
            self.mark_default(repository)

    def unregister(self, repository: VaisRepository) -> None:
        """Unregister a repository."""
        repo_id = str(repository.data.id)

        if repo_id == "0":
            return

        if not self.is_registered(repository_id=repo_id):
            return

        if self.is_default(repo_id):
            self._default_repositories.remove(repo_id)

        if repository in self._repositories:
            self._repositories.remove(repository)

        self._repositories_by_id.pop(repo_id, None)
        self._repositories_by_full_name.pop(
            repository.data.full_name_lower, None)

    def mark_default(self, repository: VaisRepository) -> None:
        """Mark a repository as default."""
        repo_id = str(repository.data.id)

        if repo_id == "0":
            return

        if not self.is_registered(repository_id=repo_id):
            return

        self._default_repositories.add(repo_id)

    def set_repository_id(self, repository, repo_id):
        """Update a repository id."""
        existing_repo_id = str(repository.data.id)
        if existing_repo_id == repo_id:
            return
        if existing_repo_id != "0":
            raise ValueError(
                f"The repo id for {repository.data.full_name_lower} "
                f"is already set to {existing_repo_id}"
            )
        repository.data.id = repo_id
        self.register(repository)

    def is_default(self, repository_id: str | None = None) -> bool:
        """Check if a repository is default."""
        if not repository_id:
            return False
        return repository_id in self._default_repositories

    def is_registered(
        self,
        repository_id: str | None = None,
        repository_full_name: str | None = None,
    ) -> bool:
        """Check if a repository is registered."""
        if repository_id is not None:
            return repository_id in self._repositories_by_id
        if repository_full_name is not None:
            return repository_full_name in self._repositories_by_full_name
        return False

    def is_downloaded(
        self,
        repository_id: str | None = None,
        repository_full_name: str | None = None,
    ) -> bool:
        """Check if a repository is registered."""
        if repository_id is not None:
            repo = self.get_by_id(repository_id)
        if repository_full_name is not None:
            repo = self.get_by_full_name(repository_full_name)
        if repo is None:
            return False
        return repo.data.installed

    def get_by_id(self, repository_id: str | None) -> VaisRepository | None:
        """Get repository by id."""
        if not repository_id:
            return None
        return self._repositories_by_id.get(str(repository_id))

    def get_by_full_name(self, repository_full_name: str | None) -> VaisRepository | None:
        """Get repository by full name."""
        if not repository_full_name:
            return None
        return self._repositories_by_full_name.get(repository_full_name.lower())

    def is_removed(self, repository_full_name: str) -> bool:
        """Check if a repository is removed."""
        return repository_full_name in (
            repository.repository for repository in self._removed_repositories
        )

    def removed_repository(self, repository_full_name: str) -> RemovedRepository:
        """Get repository by full name."""
        if self.is_removed(repository_full_name):
            if removed := [
                repository
                for repository in self._removed_repositories
                if repository.repository == repository_full_name
            ]:
                return removed[0]

        removed = RemovedRepository(repository=repository_full_name)
        self._removed_repositories.append(removed)
        return removed


class VaisBase:
    """Base VAIS class."""

    common = VaisCommon()
    configuration = VaisConfiguration()
    core = VaisCore()
    data: VaisData | None = None
    frontend_version: str | None = None
    github: GitHub | None = None
    githubapi: GitHubAPI | None = None
    hass: HomeAssistant | None = None
    integration: Integration | None = None
    log: logging.Logger = get_vais_logger()
    queue: QueueManager | None = None
    recuring_tasks = []
    repositories: VaisRepositories = VaisRepositories()
    repository: AIOGitHubAPIRepository | None = None
    session: ClientSession | None = None
    stage: VaisStage | None = None
    status = VaisStatus()
    system = VaisSystem()
    validation: ValidationManager | None = None
    version: str | None = None

    @property
    def integration_dir(self) -> pathlib.Path:
        """Return the VAIS integration dir."""
        return self.integration.file_path

    def set_stage(self, stage: VaisStage | None) -> None:
        """Set VAIS stage."""
        if stage and self.stage == stage:
            return

        self.stage = stage
        if stage is not None:
            self.log.info("Stage changed: %s", self.stage)
            self.async_dispatch(VaisDispatchEvent.STAGE, {"stage": self.stage})

    def disable_vais(self, reason: VaisDisabledReason) -> None:
        """Disable VAIS."""
        if self.system.disabled_reason == reason:
            return

        self.system.disabled_reason = reason
        if reason != VaisDisabledReason.REMOVED:
            self.log.error("VAIS is disabled - %s", reason)

        if (
            reason == VaisDisabledReason.INVALID_TOKEN
            and self.configuration.config_type == ConfigurationType.CONFIG_ENTRY
        ):
            self.configuration.config_entry.state = ConfigEntryState.SETUP_ERROR
            self.configuration.config_entry.reason = "Authentication failed"
            self.hass.add_job(
                self.configuration.config_entry.async_start_reauth, self.hass)

    def enable_vais(self) -> None:
        """Enable VAIS."""
        if self.system.disabled_reason is not None:
            self.system.disabled_reason = None
            self.log.info("VAIS is enabled")

    def enable_vais_category(self, category: VaisCategory) -> None:
        """Enable VAIS category."""
        if category not in self.common.categories:
            self.log.info("Enable category: %s", category)
            self.common.categories.add(category)

    def disable_vais_category(self, category: VaisCategory) -> None:
        """Disable VAIS category."""
        if category in self.common.categories:
            self.log.info("Disabling category: %s", category)
            self.common.categories.pop(category)

    async def async_save_file(self, file_path: str, content: Any) -> bool:
        """Save a file."""

        def _write_file():
            with open(
                file_path,
                mode="w" if isinstance(content, str) else "wb",
                encoding="utf-8" if isinstance(content, str) else None,
                errors="ignore" if isinstance(content, str) else None,
            ) as file_handler:
                file_handler.write(content)

            # Create gz for .js files
            if os.path.isfile(file_path):
                if file_path.endswith(".js"):
                    with open(file_path, "rb") as f_in:
                        with gzip.open(file_path + ".gz", "wb") as f_out:
                            shutil.copyfileobj(f_in, f_out)

            # LEGACY! Remove with 2.0
            if "themes" in file_path and file_path.endswith(".yaml"):
                filename = file_path.split("/")[-1]
                base = file_path.split("/themes/")[0]
                combined = f"{base}/themes/{filename}"
                if os.path.exists(combined):
                    self.log.info("Removing old theme file %s", combined)
                    os.remove(combined)

        try:
            await self.hass.async_add_executor_job(_write_file)
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException as error:
            self.log.error("Could not write data to %s - %s", file_path, error)
            return False

        return os.path.exists(file_path)

    async def async_can_update(self) -> int:
        """Helper to calculate the number of repositories we can fetch data for."""
        try:
            response = await self.async_github_api_method(self.githubapi.rate_limit)
            if ((limit := response.data.resources.core.remaining or 0) - 1000) >= 10:
                return math.floor((limit - 1000) / 10)
            reset = dt.as_local(dt.utc_from_timestamp(
                response.data.resources.core.reset))
            self.log.info(
                "GitHub API ratelimited - %s remaining (%s)",
                response.data.resources.core.remaining,
                f"{reset.hour}:{reset.minute}:{reset.second}",
            )
            self.disable_vais(VaisDisabledReason.RATE_LIMIT)
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException as exception:
            self.log.exception(exception)

        return 0

    async def async_github_get_vais_default_file(self, filename: str) -> list:
        """Get the content of a default file."""
        response = await self.async_github_api_method(
            method=self.githubapi.repos.contents.get,
            repository=VaisGitHubRepo.DEFAULT,
            path=filename,
        )
        if response is None:
            return []

        return json.loads(decode_content(response.data.content))

    async def async_github_api_method(
        self,
        method: Callable[[], Awaitable[TV]],
        *args,
        raise_exception: bool = True,
        **kwargs,
    ) -> TV | None:
        """Call a GitHub API method"""
        _exception = None

        try:
            return await method(*args, **kwargs)
        except GitHubAuthenticationException as exception:
            self.disable_vais(VaisDisabledReason.INVALID_TOKEN)
            _exception = exception
        except GitHubRatelimitException as exception:
            self.disable_vais(VaisDisabledReason.RATE_LIMIT)
            _exception = exception
        except GitHubNotModifiedException as exception:
            raise exception
        except GitHubException as exception:
            _exception = exception
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException as exception:
            self.log.exception(exception)
            _exception = exception

        if raise_exception and _exception is not None:
            raise VaisException(_exception)
        return None

    async def async_register_repository(
        self,
        repository_full_name: str,
        category: VaisCategory,
        *,
        check: bool = True,
        ref: str | None = None,
        repository_id: str | None = None,
        default: bool = False,
    ) -> None:
        """Register a repository."""
        if repository_full_name in self.common.skip:
            if repository_full_name != VaisGitHubRepo.INTEGRATION:
                raise VaisExpectedException(f"Skipping {repository_full_name}")

        if repository_full_name == "home-assistant/core":
            raise HomeAssistantCoreRepositoryException()

        if repository_full_name == "home-assistant/addons" or repository_full_name.startswith(
            "hassio-addons/"
        ):
            raise AddonRepositoryException()

        if category not in RERPOSITORY_CLASSES:
            raise VaisException(
                f"{category} is not a valid repository category.")

        if (renamed := self.common.renamed_repositories.get(repository_full_name)) is not None:
            repository_full_name = renamed

        repository: VaisRepository = RERPOSITORY_CLASSES[category](
            self, repository_full_name)
        if check:
            try:
                await repository.async_registration(ref)
                if self.status.new:
                    repository.data.new = False
                if repository.validate.errors:
                    self.common.skip.append(repository.data.full_name)
                    if not self.status.startup:
                        self.log.error(
                            "Validation for %s failed.", repository_full_name)
                    if self.system.action:
                        raise VaisException(
                            f"::error:: Validation for {repository_full_name} failed."
                        )
                    return repository.validate.errors
                if self.system.action:
                    repository.logger.info(
                        "%s Validation completed", repository.string)
                else:
                    repository.logger.info(
                        "%s Registration completed", repository.string)
            except (VaisRepositoryExistException, VaisRepositoryArchivedException):
                return
            except AIOGitHubAPIException as exception:
                self.common.skip.append(repository.data.full_name)
                raise VaisException(
                    f"Validation for {repository_full_name} failed with {exception}."
                ) from exception

        if repository_id is not None:
            repository.data.id = repository_id

        if str(repository.data.id) != "0" and (
            exists := self.repositories.get_by_id(repository.data.id)
        ):
            self.repositories.unregister(exists)

        else:
            if self.hass is not None and ((check and repository.data.new) or self.status.new):
                self.async_dispatch(
                    VaisDispatchEvent.REPOSITORY,
                    {
                        "action": "registration",
                        "repository": repository.data.full_name,
                        "repository_id": repository.data.id,
                    },
                )

        self.repositories.register(repository, default)

    async def startup_tasks(self, _=None) -> None:
        """Tasks that are started after setup."""
        self.set_stage(VaisStage.STARTUP)

        try:
            repository = self.repositories.get_by_full_name(
                VaisGitHubRepo.INTEGRATION)
            if repository is None:
                await self.async_register_repository(
                    repository_full_name=VaisGitHubRepo.INTEGRATION,
                    category=VaisCategory.INTEGRATION,
                    default=True,
                )
                repository = self.repositories.get_by_full_name(
                    VaisGitHubRepo.INTEGRATION)
            if repository is None:
                raise VaisException("Unknown error")

            repository.data.installed = True
            repository.data.installed_version = self.integration.version.string
            repository.data.new = False
            repository.data.releases = True

            self.repository = repository.repository_object
            self.repositories.mark_default(repository)
        except VaisException as exception:
            if "403" in str(exception):
                self.log.critical(
                    "GitHub API is ratelimited, or the token is wrong.",
                )
            else:
                self.log.critical("Could not load VAIS! - %s", exception)
            self.disable_vais(VaisDisabledReason.LOAD_VAIS)

        if critical := await async_load_from_store(self.hass, "critical"):
            for repo in critical:
                if not repo["acknowledged"]:
                    self.log.critical("URGENT!: Check the VAIS panel!")
                    self.hass.components.persistent_notification.create(
                        title="URGENT!", message="**Check the VAIS panel!**"
                    )
                    break

        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_get_all_category_repositories, timedelta(hours=3)
            )
        )
        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_update_all_repositories, timedelta(hours=25)
            )
        )
        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_check_rate_limit, timedelta(minutes=5)
            )
        )
        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_prosess_queue, timedelta(minutes=10)
            )
        )
        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_update_downloaded_repositories, timedelta(hours=2)
            )
        )
        self.recuring_tasks.append(
            self.hass.helpers.event.async_track_time_interval(
                self.async_handle_critical_repositories, timedelta(hours=2)
            )
        )

        self.hass.bus.async_listen_once(
            EVENT_HOMEASSISTANT_FINAL_WRITE, self.data.async_force_write
        )

        self.status.startup = False
        self.async_dispatch(VaisDispatchEvent.STATUS, {})

        await self.async_handle_removed_repositories()
        await self.async_get_all_category_repositories()
        await self.async_update_downloaded_repositories()

        self.set_stage(VaisStage.RUNNING)

        self.async_dispatch(VaisDispatchEvent.RELOAD, {"force": True})

        await self.async_handle_critical_repositories()
        await self.async_prosess_queue()

        self.async_dispatch(VaisDispatchEvent.STATUS, {})

    async def async_download_file(self, url: str, *, headers: dict | None = None) -> bytes | None:
        """Download files, and return the content."""
        if url is None:
            return None

        if "tags/" in url:
            url = url.replace("tags/", "")

        self.log.debug("Downloading %s", url)
        timeouts = 0

        while timeouts < 5:
            try:
                request = await self.session.get(
                    url=url,
                    timeout=ClientTimeout(total=60),
                    headers=headers,
                )

                # Make sure that we got a valid result
                if request.status == 200:
                    return await request.read()

                raise VaisException(
                    f"Got status code {request.status} when trying to download {url}"
                )
            except asyncio.TimeoutError:
                self.log.warning(
                    "A timeout of 60! seconds was encountered while downloading %s, "
                    "using over 60 seconds to download a single file is not normal. "
                    "This is not a problem with VAIS but how your host communicates with GitHub. "
                    "Retrying up to 5 times to mask/hide your host/network problems to "
                    "stop the flow of issues opened about it. "
                    "Tries left %s",
                    url,
                    (4 - timeouts),
                )
                timeouts += 1
                await asyncio.sleep(1)
                continue

            # lgtm [py/catch-base-exception] pylint: disable=broad-except
            except BaseException as exception:
                self.log.exception("Download failed - %s", exception)

            return None

    async def async_recreate_entities(self) -> None:
        """Recreate entities."""
        if self.configuration == ConfigurationType.YAML or not self.configuration.experimental:
            return

        platforms = [Platform.SENSOR, Platform.UPDATE]

        await self.hass.config_entries.async_unload_platforms(
            entry=self.configuration.config_entry,
            platforms=platforms,
        )

        self.hass.config_entries.async_setup_platforms(
            self.configuration.config_entry, platforms)

    @callback
    def async_dispatch(self, signal: VaisDispatchEvent, data: dict | None = None) -> None:
        """Dispatch a signal with data."""
        async_dispatcher_send(self.hass, signal, data)

    def set_active_categories(self) -> None:
        """Set the active categories."""
        self.common.categories = set()
        for category in (VaisCategory.INTEGRATION, VaisCategory.PLUGIN):
            self.enable_vais_category(VaisCategory(category))

        if VaisCategory.PYTHON_SCRIPT in self.hass.config.components:
            self.enable_vais_category(VaisCategory.PYTHON_SCRIPT)

        if self.hass.services.has_service("frontend", "reload_themes"):
            self.enable_vais_category(VaisCategory.THEME)

        if self.configuration.appdaemon:
            self.enable_vais_category(VaisCategory.APPDAEMON)
        if self.configuration.netdaemon:
            self.enable_vais_category(VaisCategory.NETDAEMON)

    async def async_get_all_category_repositories(self, _=None) -> None:
        """Get all category repositories."""
        if self.system.disabled:
            return
        self.log.info("Loading known repositories")
        await asyncio.gather(
            *[
                self.async_get_category_repositories(VaisCategory(category))
                for category in self.common.categories or []
            ]
        )

    async def async_get_category_repositories(self, category: VaisCategory) -> None:
        """Get repositories from category."""
        if self.system.disabled:
            return
        try:
            repositories = await self.async_github_get_vais_default_file(category)
        except VaisException:
            return

        for repo in repositories:
            if self.common.renamed_repositories.get(repo):
                repo = self.common.renamed_repositories[repo]
            if self.repositories.is_removed(repo):
                continue
            if repo in self.common.archived_repositories:
                continue
            repository = self.repositories.get_by_full_name(repo)
            if repository is not None:
                self.repositories.mark_default(repository)
                if self.status.new and self.configuration.dev:
                    # Force update for new installations
                    self.queue.add(repository.common_update())
                continue

            self.queue.add(
                self.async_register_repository(
                    repository_full_name=repo,
                    category=category,
                    default=True,
                )
            )

    async def async_update_all_repositories(self, _=None) -> None:
        """Update all repositories."""
        if self.system.disabled:
            return
        self.log.debug(
            "Starting recurring background task for all repositories")

        for repository in self.repositories.list_all:
            if repository.data.category in self.common.categories:
                self.queue.add(repository.common_update())

        self.async_dispatch(VaisDispatchEvent.REPOSITORY, {"action": "reload"})
        self.log.debug("Recurring background task for all repositories done")

    async def async_check_rate_limit(self, _=None) -> None:
        """Check rate limit."""
        if not self.system.disabled or self.system.disabled_reason != VaisDisabledReason.RATE_LIMIT:
            return

        self.log.debug("Checking if ratelimit has lifted")
        can_update = await self.async_can_update()
        self.log.debug("Ratelimit indicate we can update %s", can_update)
        if can_update > 0:
            self.enable_vais()
            await self.async_prosess_queue()

    async def async_prosess_queue(self, _=None) -> None:
        """Process the queue."""
        if self.system.disabled:
            self.log.debug("VAIS is disabled")
            return
        if not self.queue.has_pending_tasks:
            self.log.debug("Nothing in the queue")
            return
        if self.queue.running:
            self.log.debug("Queue is already running")
            return

        async def _handle_queue():
            if not self.queue.has_pending_tasks:
                await self.data.async_write()
                return
            can_update = await self.async_can_update()
            self.log.debug(
                "Can update %s repositories, " "items in queue %s",
                can_update,
                self.queue.pending_tasks,
            )
            if can_update != 0:
                try:
                    await self.queue.execute(can_update)
                except VaisExecutionStillInProgress:
                    return

                await _handle_queue()

        await _handle_queue()

    async def async_handle_removed_repositories(self, _=None) -> None:
        """Handle removed repositories."""
        if self.system.disabled:
            return
        need_to_save = False
        self.log.info("Loading removed repositories")

        try:
            removed_repositories = await self.async_github_get_vais_default_file(
                VaisCategory.REMOVED
            )
        except VaisException:
            return

        for item in removed_repositories:
            removed = self.repositories.removed_repository(item["repository"])
            removed.update_data(item)

        for removed in self.repositories.list_removed:
            if (repository := self.repositories.get_by_full_name(removed.repository)) is None:
                continue
            if repository.data.full_name in self.common.ignored_repositories:
                continue
            if repository.data.installed and removed.removal_type != "critical":
                self.log.warning(
                    "You have '%s' installed with VAIS "
                    "this repository has been removed from VAIS, please consider removing it. "
                    "Removal reason (%s)",
                    repository.data.full_name,
                    removed.reason,
                )
            else:
                need_to_save = True
                repository.remove()

        if need_to_save:
            await self.data.async_write()

    async def async_update_downloaded_repositories(self, _=None) -> None:
        """Execute the task."""
        if self.system.disabled:
            return
        self.log.info(
            "Starting recurring background task for downloaded repositories")

        for repository in self.repositories.list_downloaded:
            if repository.data.category in self.common.categories:
                self.queue.add(repository.update_repository())

        self.log.debug(
            "Recurring background task for downloaded repositories done")

    async def async_handle_critical_repositories(self, _=None) -> None:
        """Handle critical repositories."""
        critical_queue = QueueManager(hass=self.hass)
        instored = []
        critical = []
        was_installed = False

        try:
            critical = await self.async_github_get_vais_default_file("critical")
        except GitHubNotModifiedException:
            return
        except VaisException:
            pass

        if not critical:
            self.log.debug("No critical repositories")
            return

        stored_critical = await async_load_from_store(self.hass, "critical")

        for stored in stored_critical or []:
            instored.append(stored["repository"])

        stored_critical = []

        for repository in critical:
            removed_repo = self.repositories.removed_repository(
                repository["repository"])
            removed_repo.removal_type = "critical"
            repo = self.repositories.get_by_full_name(repository["repository"])

            stored = {
                "repository": repository["repository"],
                "reason": repository["reason"],
                "link": repository["link"],
                "acknowledged": True,
            }
            if repository["repository"] not in instored:
                if repo is not None and repo.data.installed:
                    self.log.critical(
                        "Removing repository %s, it is marked as critical",
                        repository["repository"],
                    )
                    was_installed = True
                    stored["acknowledged"] = False
                    # Remove from VAIS
                    critical_queue.add(repo.uninstall())
                    repo.remove()

            stored_critical.append(stored)
            removed_repo.update_data(stored)

        # Uninstall
        await critical_queue.execute()

        # Save to FS
        await async_save_to_store(self.hass, "critical", stored_critical)

        # Restart HASS
        if was_installed:
            self.log.critical("Restarting Home Assistant")
            self.hass.async_create_task(self.hass.async_stop(100))
