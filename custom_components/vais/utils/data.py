"""Data handler for VAIS."""
import asyncio
from datetime import datetime

from homeassistant.core import callback
from homeassistant.util import json as json_util

from ..base import VaisBase
from ..enums import VaisDispatchEvent, VaisGitHubRepo
from ..repositories.base import TOPIC_FILTER, VaisManifest, VaisRepository
from .logger import get_vais_logger
from .path import is_safe
from .store import async_load_from_store, async_save_to_store

DEFAULT_BASE_REPOSITORY_DATA = (
    ("authors", []),
    ("category", ""),
    ("description", ""),
    ("domain", None),
    ("downloads", 0),
    ("etag_repository", None),
    ("full_name", ""),
    ("last_updated", 0),
    ("hide", False),
    ("new", False),
    ("stargazers_count", 0),
    ("topics", []),
)

DEFAULT_EXTENDED_REPOSITORY_DATA = (
    ("archived", False),
    ("config_flow", False),
    ("default_branch", None),
    ("description", ""),
    ("first_install", False),
    ("installed_commit", None),
    ("installed", False),
    ("last_commit", None),
    ("last_version", None),
    ("manifest_name", None),
    ("open_issues", 0),
    ("published_tags", []),
    ("pushed_at", ""),
    ("releases", False),
    ("selected_tag", None),
    ("show_beta", False),
    ("stargazers_count", 0),
    ("topics", []),
)


class VaisData:
    """VaisData class."""

    def __init__(self, vais: VaisBase):
        """Initialize."""
        self.logger = get_vais_logger()
        self.vais = vais
        self.content = {}

    async def async_force_write(self, _=None):
        """Force write."""
        await self.async_write(force=True)

    async def async_write(self, force: bool = False) -> None:
        """Write content to the store files."""
        if not force and self.vais.system.disabled:
            return

        self.logger.debug("<VaisData async_write> Saving data")

        # Vais
        await async_save_to_store(
            self.vais.hass,
            "vais",
            {
                "archived_repositories": self.vais.common.archived_repositories,
                "renamed_repositories": self.vais.common.renamed_repositories,
                "ignored_repositories": self.vais.common.ignored_repositories,
            },
        )
        await self._async_store_content_and_repos()

    async def _async_store_content_and_repos(self, _=None):  # bb: ignore
        """Store the main repos file and each repo that is out of date."""
        # Repositories
        self.content = {}
        for repository in self.vais.repositories.list_all:
            if repository.data.category in self.vais.common.categories:
                self.async_store_repository_data(repository)

        await async_save_to_store(self.vais.hass, "repositories", self.content)
        for event in (VaisDispatchEvent.REPOSITORY, VaisDispatchEvent.CONFIG):
            self.vais.async_dispatch(event, {})

    @callback
    def async_store_repository_data(self, repository: VaisRepository) -> dict:
        """Store the repository data."""
        data = {"repository_manifest": repository.repository_manifest.manifest}

        for key, default_value in DEFAULT_BASE_REPOSITORY_DATA:
            if (value := repository.data.__getattribute__(key)) != default_value:
                data[key] = value

        if repository.data.installed:
            for key, default_value in DEFAULT_EXTENDED_REPOSITORY_DATA:
                if (value := repository.data.__getattribute__(key)) != default_value:
                    data[key] = value
            data["version_installed"] = repository.data.installed_version

        if repository.data.last_fetched:
            data["last_fetched"] = repository.data.last_fetched.timestamp()

        self.content[str(repository.data.id)] = data

    async def restore(self):
        """Restore saved data."""
        self.vais.status.new = False
        vais = await async_load_from_store(self.vais.hass, "vais") or {}
        repositories = await async_load_from_store(self.vais.hass, "repositories") or {}

        if not vais and not repositories:
            # Assume new install
            self.vais.status.new = True
            self.logger.info(
                "<VaisData restore> Loading base repository information")
            repositories = await self.vais.hass.async_add_executor_job(
                json_util.load_json,
                f"{self.vais.core.config_path}/custom_components/vais/utils/default.repositories",
            )

        self.logger.info("<VaisData restore> Restore started")

        # Vais
        self.vais.common.archived_repositories = []
        self.vais.common.ignored_repositories = []
        self.vais.common.renamed_repositories = {}

        # Clear out doubble renamed values
        renamed = vais.get("renamed_repositories", {})
        for entry in renamed:
            value = renamed.get(entry)
            if value not in renamed:
                self.vais.common.renamed_repositories[entry] = value

        # Clear out doubble archived values
        for entry in vais.get("archived_repositories", []):
            if entry not in self.vais.common.archived_repositories:
                self.vais.common.archived_repositories.append(entry)

        # Clear out doubble ignored values
        for entry in vais.get("ignored_repositories", []):
            if entry not in self.vais.common.ignored_repositories:
                self.vais.common.ignored_repositories.append(entry)

        try:
            await self.register_unknown_repositories(repositories)

            for entry, repo_data in repositories.items():
                if entry == "0":
                    # Ignore repositories with ID 0
                    self.logger.debug(
                        "<VaisData restore> Found repository with ID %s - %s", entry, repo_data
                    )
                    continue
                self.async_restore_repository(entry, repo_data)

            self.logger.info("<VaisData restore> Restore done")
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException as exception:
            self.logger.critical(
                "<VaisData restore> [%s] Restore Failed!", exception, exc_info=exception
            )
            return False
        return True

    async def register_unknown_repositories(self, repositories):
        """Registry any unknown repositories."""
        register_tasks = [
            self.vais.async_register_repository(
                repository_full_name=repo_data["full_name"],
                category=repo_data["category"],
                check=False,
                repository_id=entry,
            )
            for entry, repo_data in repositories.items()
            if entry != "0" and not self.vais.repositories.is_registered(repository_id=entry)
        ]
        if register_tasks:
            await asyncio.gather(*register_tasks)

    @callback
    def async_restore_repository(self, entry, repository_data):
        """Restore repository."""
        full_name = repository_data["full_name"]
        if not (repository := self.vais.repositories.get_by_full_name(full_name)):
            self.logger.error(
                "<VaisData restore> Did not find %s (%s)", full_name, entry)
            return
        # Restore repository attributes
        self.vais.repositories.set_repository_id(repository, entry)
        repository.data.authors = repository_data.get("authors", [])
        repository.data.description = repository_data.get("description", "")
        repository.data.downloads = repository_data.get("downloads", 0)
        repository.data.last_updated = repository_data.get("last_updated", 0)
        repository.data.etag_repository = repository_data.get(
            "etag_repository")
        repository.data.topics = [
            topic for topic in repository_data.get("topics", []) if topic not in TOPIC_FILTER
        ]
        repository.data.domain = repository_data.get("domain")
        repository.data.stargazers_count = repository_data.get(
            "stargazers_count"
        ) or repository_data.get("stars", 0)
        repository.releases.last_release = repository_data.get(
            "last_release_tag")
        repository.data.releases = repository_data.get("releases", False)
        repository.data.hide = repository_data.get("hide", False)
        repository.data.installed = repository_data.get("installed", False)
        repository.data.new = repository_data.get("new", False)
        repository.data.selected_tag = repository_data.get("selected_tag")
        repository.data.show_beta = repository_data.get("show_beta", False)
        repository.data.last_version = repository_data.get("last_release_tag")
        repository.data.last_commit = repository_data.get("last_commit")
        repository.data.installed_version = repository_data.get(
            "version_installed")
        repository.data.installed_commit = repository_data.get(
            "installed_commit")
        repository.data.manifest_name = repository_data.get("manifest_name")

        if last_fetched := repository_data.get("last_fetched"):
            repository.data.last_fetched = datetime.fromtimestamp(last_fetched)

        repository.repository_manifest = VaisManifest.from_dict(
            repository_data.get("repository_manifest", {})
        )

        if repository.localpath is not None and is_safe(self.vais, repository.localpath):
            # Set local path
            repository.content.path.local = repository.localpath

        if repository.data.installed:
            repository.data.first_install = False

        if full_name == VaisGitHubRepo.INTEGRATION:
            repository.data.installed_version = self.vais.version
            repository.data.installed = True
