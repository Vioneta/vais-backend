"""VaisConfiguration Test Suite."""
# pylint: disable=missing-docstring
import pytest

from custom_components.vais.base import VaisConfiguration
from custom_components.vais.exceptions import VaisException


def test_configuration_and_option():
    config = VaisConfiguration()
    config.update_from_dict({"token": "xxxxxxxxxx"})

    assert isinstance(config.to_json(), dict)

    assert isinstance(config.token, str)
    assert config.token == "xxxxxxxxxx"

    assert isinstance(config.sidepanel_title, str)
    assert config.sidepanel_title == "VAIS"

    assert isinstance(config.sidepanel_icon, str)
    assert config.sidepanel_icon == "vais:vais"

    assert isinstance(config.appdaemon, bool)
    assert not config.appdaemon

    assert isinstance(config.netdaemon, bool)
    assert not config.netdaemon

    assert isinstance(config.python_script, bool)
    assert not config.python_script

    assert isinstance(config.theme, bool)
    assert not config.theme

    assert isinstance(config.country, str)
    assert config.country == "ALL"

    assert isinstance(config.release_limit, int)
    assert config.release_limit == 5

    assert isinstance(config.experimental, bool)
    assert not config.experimental


def test_edge_update_with_none():
    config = VaisConfiguration()
    with pytest.raises(VaisException):
        assert config.update_from_dict(None)
