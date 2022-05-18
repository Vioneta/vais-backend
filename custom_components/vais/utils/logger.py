"""Custom logger for VAIS."""
import logging

from ..const import PACKAGE_NAME

_VAISLogger: logging.Logger = logging.getLogger(PACKAGE_NAME)


def get_vais_logger() -> logging.Logger:
    """Return a Logger instance."""
    return _VAISLogger
