"""VAIS Manifest Test Suite."""
# pylint: disable=missing-docstring
import pytest

from custom_components.vais.exceptions import VaisException
from custom_components.vais.repositories.base import VaisManifest


def test_manifest_structure():
    manifest = VaisManifest.from_dict({"name": "TEST"})

    assert isinstance(manifest.manifest, dict)

    assert isinstance(manifest.name, str)
    assert manifest.name == "TEST"

    assert isinstance(manifest.content_in_root, bool)
    assert not manifest.content_in_root

    assert isinstance(manifest.zip_release, bool)
    assert not manifest.zip_release

    assert isinstance(manifest.filename, (str, type(None)))
    assert manifest.filename is None

    assert isinstance(manifest.country, list)
    assert not manifest.country

    assert isinstance(manifest.homeassistant, (str, type(None)))
    assert manifest.homeassistant is None

    assert isinstance(manifest.persistent_directory, (str, type(None)))
    assert manifest.persistent_directory is None

    assert isinstance(manifest.vais, (str, type(None)))
    assert not manifest.vais

    assert isinstance(manifest.hide_default_branch, bool)
    assert not manifest.hide_default_branch


def test_edge_pass_none():
    with pytest.raises(VaisException):
        assert VaisManifest.from_dict(None)
