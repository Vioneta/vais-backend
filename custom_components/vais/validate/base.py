"""Base class for validation."""
from __future__ import annotations

from time import monotonic
from typing import TYPE_CHECKING

from ..exceptions import VaisException

if TYPE_CHECKING:
    from ..repositories.base import VaisRepository


class ValidationException(VaisException):
    """Raise when there is a validation issue."""


class ActionValidationBase:
    """Base class for action validation."""

    category: str = "common"

    def __init__(self, repository: VaisRepository) -> None:
        self.vais = repository.vais
        self.repository = repository
        self.failed = False

    @property
    def slug(self) -> str:
        """Return the check slug."""
        return self.__class__.__module__.rsplit(".", maxsplit=1)[-1]

    async def async_validate(self) -> None:
        """Validate the repository."""

    async def execute_validation(self, *_, **__) -> None:
        """Execute the task defined in subclass."""
        self.vais.log.info("<Validation %s> Starting validation", self.slug)

        start_time = monotonic()
        self.failed = False

        try:
            await self.async_validate()
        except ValidationException as exception:
            self.failed = True
            self.vais.log.error(
                "<Validation %s> failed:  %s", self.slug, exception)

        else:
            self.vais.log.debug(
                "<Validation %s> took %.3f seconds to complete", self.slug, monotonic() -
                start_time
            )
