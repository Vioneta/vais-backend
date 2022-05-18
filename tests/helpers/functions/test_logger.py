# pylint: disable=missing-module-docstring, missing-function-docstring
from logging import Logger

from custom_components.vais.utils.logger import get_vais_logger


def test_logger():
    vais_logger = get_vais_logger()
    assert isinstance(vais_logger, Logger)
