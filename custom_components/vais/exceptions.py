"""Custom Exceptions for VAIS."""


class VaisException(Exception):
    """Super basic."""


class VaisRepositoryArchivedException(VaisException):
    """For repositories that are archived."""


class VaisNotModifiedException(VaisException):
    """For responses that are not modified."""


class VaisExpectedException(VaisException):
    """For stuff that are expected."""


class VaisRepositoryExistException(VaisException):
    """For repositories that are already exist."""


class VaisExecutionStillInProgress(VaisException):
    """Exception to raise if execution is still in progress."""


class AddonRepositoryException(VaisException):
    """Exception to raise when user tries to add add-on repository."""

    exception_message = (
        "The repository does not seem to be a integration, "
        "but an add-on repository. VAIS does not manage add-ons."
    )

    def __init__(self) -> None:
        super().__init__(self.exception_message)


class HomeAssistantCoreRepositoryException(VaisException):
    """Exception to raise when user tries to add the home-assistant/core repository."""

    exception_message = (
        "You can not add homeassistant/core, to use core integrations "
        "check the Home Assistant documentation for how to add them."
    )

    def __init__(self) -> None:
        super().__init__(self.exception_message)
