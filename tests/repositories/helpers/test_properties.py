"""VAIS Repository Helper properties."""
# pylint: disable=missing-docstring
from awesomeversion import AwesomeVersion

from custom_components.vais.repositories.base import VaisRepository


def test_repository_helpers_properties_can_be_installed(vais):
    repository = VaisRepository(vais)
    assert repository.can_download


def test_repository_helpers_properties_pending_update(vais):
    repository = VaisRepository(vais)
    repository.vais.core.ha_version = AwesomeVersion("0.109.0")
    repository.repository_manifest.homeassistant = "0.110.0"
    repository.data.releases = True
    assert not repository.pending_update

    repository = VaisRepository(vais)
    repository.data.installed = True
    repository.data.default_branch = "main"
    repository.data.selected_tag = "main"
    assert not repository.pending_update

    repository.data.installed_commit = "1"
    repository.data.last_commit = "2"
    assert repository.pending_update
