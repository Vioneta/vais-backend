"""Vais validation manager."""
from __future__ import annotations

import asyncio
from importlib import import_module
from pathlib import Path
from typing import TYPE_CHECKING

from homeassistant.core import HomeAssistant

from custom_components.vais.repositories.base import VaisRepository

from .base import ActionValidationBase

if TYPE_CHECKING:
    from ..base import VaisBase


class ValidationManager:
    """Vais validation manager."""

    def __init__(self, vais: VaisBase, hass: HomeAssistant) -> None:
        """Initialize the setup manager class."""
        self.vais = vais
        self.hass = hass
        self._validatiors: dict[str, ActionValidationBase] = {}

    @property
    def validatiors(self) -> dict[str, ActionValidationBase]:
        """Return all list of all tasks."""
        return list(self._validatiors.values())

    async def async_load(self, repository: VaisRepository) -> None:
        """Load all tasks."""
        self._validatiors = {}
        validator_files = Path(__file__).parent
        validator_modules = (
            module.stem
            for module in validator_files.glob("*.py")
            if module.name not in ("base.py", "__init__.py", "manager.py")
        )

        async def _load_module(module: str):
            task_module = import_module(f"{__package__}.{module}")
            if task := await task_module.async_setup_validator(repository=repository):
                self._validatiors[task.slug] = task

        await asyncio.gather(*[_load_module(task) for task in validator_modules])
        self.vais.log.debug("Loaded %s validators for %s",
                            len(self.validatiors), repository)

    async def async_run_repository_checks(self, repository: VaisRepository) -> None:
        """Run all validators for a repository."""
        if not self.vais.system.action:
            return

        await self.async_load(repository)

        await asyncio.gather(
            *[
                validator.execute_validation()
                for validator in self.validatiors or []
                if (
                    validator.category == "common" or validator.category == repository.data.category
                )
            ]
        )

        total = len(self.validatiors)
        failed = len([x for x in self.validatiors if x.failed])

        if failed != 0:
            repository.logger.error(
                "%s %s/%s checks failed", repository.string, failed, total)
            exit(1)
        else:
            repository.logger.debug(
                "%s All (%s) checks passed", repository.string, total)
