"""Class for netdaemon apps in VAIS."""
from __future__ import annotations

from typing import TYPE_CHECKING

from ..enums import VaisCategory, VaisDispatchEvent
from ..exceptions import VaisException
from ..utils import filters
from ..utils.decorator import concurrent
from .base import VaisRepository

if TYPE_CHECKING:
    from ..base import VaisBase


class VaisNetdaemonRepository(VaisRepository):
    """Netdaemon apps in VAIS."""

    def __init__(self, vais: VaisBase, full_name: str):
        """Initialize."""
        super().__init__(vais=vais)
        self.data.full_name = full_name
        self.data.full_name_lower = full_name.lower()
        self.data.category = VaisCategory.NETDAEMON
        self.content.path.local = self.localpath
        self.content.path.remote = "apps"

    @property
    def localpath(self):
        """Return localpath."""
        return f"{self.vais.core.config_path}/netdaemon/apps/{self.data.name}"

    async def validate_repository(self):
        """Validate."""
        await self.common_validate()

        # Custom step 1: Validate content.
        if self.repository_manifest:
            if self.repository_manifest.content_in_root:
                self.content.path.remote = ""

        if self.content.path.remote == "apps":
            self.data.domain = filters.get_first_directory_in_directory(
                self.tree, self.content.path.remote
            )
            self.content.path.remote = f"apps/{self.data.name}"

        compliant = False
        for treefile in self.treefiles:
            if treefile.startswith(f"{self.content.path.remote}") and treefile.endswith(".cs"):
                compliant = True
                break
        if not compliant:
            raise VaisException(
                f"Repository structure for {self.ref.replace('tags/','')} is not compliant"
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
            self.data.domain = filters.get_first_directory_in_directory(
                self.tree, self.content.path.remote
            )
            self.content.path.remote = f"apps/{self.data.name}"

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

    async def async_post_installation(self):
        """Run post installation steps."""
        try:
            await self.vais.hass.services.async_call(
                "hassio", "addon_restart", {"addon": "c6a2317c_netdaemon"}
            )
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException:
            pass
