"""VAIS configuration schema Test Suite."""
# pylint: disable=missing-docstring
from custom_components.vais.utils.configuration_schema import vais_config_combined


def test_combined():
    assert isinstance(vais_config_combined(), dict)
