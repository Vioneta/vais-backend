"""Class for appdaemon apps in VAIS."""
from __future__ import annotations

from typing import TYPE_CHECKING

from aiogithubapi import AIOGitHubAPIException

from ..enums import VaisCategory, VaisDispatchEvent
from ..exceptions import VaisException
from ..utils.decorator import concurrent
from .base import VaisRepository

if TYPE_CHECKING:
    from ..base import VaisBase


class VaisAppdaemonRepository(VaisRepository):
    """Appdaemon apps in VAIS."""

    def __init__(self, vais: VaisBase, full_name: str):
        """Initialize."""
        super().__init__(vais=vais)
        self.data.full_name = full_name
        self.data.full_name_lower = full_name.lower()
        self.data.category = VaisCategory.APPDAEMON
        self.content.path.local = self.localpath
        self.content.path.remote = "apps"

    @property
    def localpath(self):
        """Return localpath."""
        return f"{self.vais.core.config_path}/appdaemon/apps/{self.data.name}"

    async def validate_repository(self):
        """Validate."""
        await self.common_validate()

        # Custom step 1: Validate content.
        try:
            addir = await self.repository_object.get_contents("apps", self.ref)
        except AIOGitHubAPIException:
            raise VaisException(
                f"Repository structure for {self.ref.replace('tags/','')} is not compliant"
            ) from None

        if not isinstance(addir, list):
            self.validate.errors.append("Repository structure not compliant")

        self.content.path.remote = addir[0].path
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )

        # Handle potential errors
        if self.validate.errors:
            for error in self.validate.errors:
                if not self.vais.status.startup:
                    self.logger.error("%s %s", self.string, error)
        return self.validate.success

    @concurrent(concurrenttasks=10, backoff_time=5)
    async def update_repository(self, ignore_issues=False, force=False):
        """Update."""
        if not await self.common_update(ignore_issues, force) and not force:
            return

        # Get appdaemon objects.
        if self.repository_manifest:
            if self.repository_manifest.content_in_root:
                self.content.path.remote = ""

        if self.content.path.remote == "apps":
            addir = await self.repository_object.get_contents(self.content.path.remote, self.ref)
            self.content.path.remote = addir[0].path
        self.content.objects = await self.repository_object.get_contents(
            self.content.path.remote, self.ref
        )

        # Set local path
        self.content.path.local = self.localpath

        # Signal entities to refresh
        if self.data.installed:
            self.vais.async_dispatch(
                VaisDispatchEvent.REPOSITORY,
                {
                    "id": 1337,
                    "action": "update",
                    "repository": self.data.full_name,
                    "repository_id": self.data.id,
                },
            )
