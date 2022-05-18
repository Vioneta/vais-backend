"""Backup."""
from __future__ import annotations

import os
import shutil
import tempfile
from time import sleep
from typing import TYPE_CHECKING

from .path import is_safe

if TYPE_CHECKING:
    from ..base import VaisBase
    from ..repositories.base import VaisRepository


DEFAULT_BACKUP_PATH = f"{tempfile.gettempdir()}/vais_backup/"


class Backup:
    """Backup."""

    def __init__(
        self,
        vais: VaisBase,
        local_path: str | None = None,
        backup_path: str = DEFAULT_BACKUP_PATH,
        repository: VaisRepository | None = None,
    ) -> None:
        """initialize."""
        self.vais = vais
        self.repository = repository
        self.local_path = local_path or repository.content.path.local
        self.backup_path = backup_path
        if repository:
            self.backup_path = (
                tempfile.gettempdir()
                + f"/vais_persistent_{repository.data.category}/"
                + repository.data.name
            )
        self.backup_path_full = f"{self.backup_path}{self.local_path.split('/')[-1]}"

    def _init_backup_dir(self) -> bool:
        """Init backup dir."""
        if not os.path.exists(self.local_path):
            return False
        if not is_safe(self.vais, self.local_path):
            return False
        if os.path.exists(self.backup_path):
            shutil.rmtree(self.backup_path)

            # Wait for the folder to be removed
            while os.path.exists(self.backup_path):
                sleep(0.1)
        os.makedirs(self.backup_path, exist_ok=True)
        return True

    def create(self) -> None:
        """Create a backup in /tmp"""
        if not self._init_backup_dir():
            return

        try:
            if os.path.isfile(self.local_path):
                shutil.copyfile(self.local_path, self.backup_path_full)
                os.remove(self.local_path)
            else:
                shutil.copytree(self.local_path, self.backup_path_full)
                shutil.rmtree(self.local_path)
                while os.path.exists(self.local_path):
                    sleep(0.1)
            self.vais.log.debug(
                "Backup for %s, created in %s",
                self.local_path,
                self.backup_path_full,
            )
        # lgtm [py/catch-base-exception] pylint: disable=broad-except
        except BaseException as exception:
            self.vais.log.warning("Could not create backup: %s", exception)

    def restore(self) -> None:
        """Restore from backup."""
        if not os.path.exists(self.backup_path_full):
            return

        if os.path.isfile(self.backup_path_full):
            if os.path.exists(self.local_path):
                os.remove(self.local_path)
            shutil.copyfile(self.backup_path_full, self.local_path)
        else:
            if os.path.exists(self.local_path):
                shutil.rmtree(self.local_path)
                while os.path.exists(self.local_path):
                    sleep(0.1)
            shutil.copytree(self.backup_path_full, self.local_path)
        self.vais.log.debug("Restored %s, from backup %s",
                            self.local_path, self.backup_path_full)

    def cleanup(self) -> None:
        """Cleanup backup files."""
        if not os.path.exists(self.backup_path):
            return

        shutil.rmtree(self.backup_path)

        # Wait for the folder to be removed
        while os.path.exists(self.backup_path):
            sleep(0.1)
        self.vais.log.debug("Backup dir %s cleared", self.backup_path)


class BackupNetDaemon(Backup):
    """BackupNetDaemon."""

    def create(self) -> None:
        """Create a backup in /tmp"""
        if not self._init_backup_dir():
            return

        for filename in os.listdir(self.repository.content.path.local):
            if not filename.endswith(".yaml"):
                continue

            source_file_name = f"{self.repository.content.path.local}/{filename}"
            target_file_name = f"{self.backup_path}/{filename}"
            shutil.copyfile(source_file_name, target_file_name)

    def restore(self) -> None:
        """Create a backup in /tmp"""
        if not os.path.exists(self.backup_path):
            return

        for filename in os.listdir(self.backup_path):
            if not filename.endswith(".yaml"):
                continue

            source_file_name = f"{self.backup_path}/{filename}"
            target_file_name = f"{self.repository.content.path.local}/{filename}"
            shutil.copyfile(source_file_name, target_file_name)
