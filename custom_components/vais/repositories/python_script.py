"""Class for python_scripts in VAIS."""
from __future__ import annotations

from typing import TYPE_CHECKING

from ..enums import VaisCategory, VaisDispatchEvent
from ..exceptions import VaisException
from ..utils.decorator import concurrent
from .base import VaisRepository

if TYPE_CHECKING:
    from ..base import VaisBase


class VaisPythonScriptRepository(VaisRepository):
    """python_scripts in VAIS."""

    category = "python_script"

    def __init__(self, vais: VaisBase, full_name: str):
        """Initialize."""
        super().__init__(vais=vais)
        self.data.full_name = full_name
        self.data.full_name_lower = full_name.lower()
        self.data.category = VaisCategory.PYTHON_SCRIPT
        self.content.path.remote = "python_scripts"
        self.content.path.local = self.localpath
        self.content.single = True

    @property
    def localpath(self):
        """Return localpath."""
        return f"{self.vais.core.config_path}/python_scripts"

    async def validate_repository(self):
        """Validate."""
        # Run common validation steps.
        await self.common_validate()

        # Custom step 1: Validate content.
        if self.repository_manifest.content_in_root:
            self.content.path.remote = ""

        compliant = False
        for treefile in self.treefiles:
            if treefile.startswith(f"{self.content.path.remote}") and treefile.endswith(".py"):
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

    async def async_post_registration(self):
        """Registration."""
        # Set name
        self.update_filenames()

    @concurrent(concurrenttasks=10, backoff_time=5)
    async def update_repository(self, ignore_issues=False, force=False):
        """Update."""
        if not await self.common_update(ignore_issues, force) and not force:
            return

        # Get python_script objects.
        if self.repository_manifest.content_in_root:
            self.content.path.remote = ""

        compliant = False
        for treefile in self.treefiles:
            if treefile.startswith(f"{self.content.path.remote}") and treefile.endswith(".py"):
                compliant = True
                break
        if not compliant:
            raise VaisException(
                f"Repository structure for {self.ref.replace('tags/','')} is not compliant"
            )

        # Update name
        self.update_filenames()

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

    def update_filenames(self) -> None:
        """Get the filename to target."""
        for treefile in self.tree:
            if treefile.full_path.startswith(
                self.content.path.remote
            ) and treefile.full_path.endswith(".py"):
                self.data.file_name = treefile.filename
