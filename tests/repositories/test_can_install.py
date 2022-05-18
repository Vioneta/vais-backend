"""Configuration Test Suite: can install."""
# pylint: disable=missing-docstring
from awesomeversion import AwesomeVersion

from custom_components.vais.repositories.base import VaisManifest, VaisRepository


def test_vais_can_install(vais):
    repository = VaisRepository(vais)
    repository.repository_manifest = VaisManifest.from_dict({"test": "test"})
    repository.data.releases = True

    vais.core.ha_version = AwesomeVersion("1.0.0")
    repository.repository_manifest.homeassistant = "1.0.0b1"
    assert repository.can_download

    vais.core.ha_version = AwesomeVersion("1.0.0b1")
    repository.repository_manifest.homeassistant = "1.0.0"
    assert not repository.can_download

    vais.core.ha_version = AwesomeVersion("1.0.0b1")
    repository.repository_manifest.homeassistant = "1.0.0b2"
    assert not repository.can_download

    vais.core.ha_version = AwesomeVersion("1.0.0")
    repository.repository_manifest.homeassistant = "1.0.0"
    assert repository.can_download
