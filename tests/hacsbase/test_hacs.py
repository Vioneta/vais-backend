# pylint: disable=missing-module-docstring, missing-function-docstring
import pytest

from custom_components.vais.base import VaisRepositories
from custom_components.vais.enums import VaisStage


@pytest.mark.asyncio
async def test_vais(vais, repository, tmpdir):
    vais.hass.config.config_dir = tmpdir

    vais.repositories = VaisRepositories()
    assert vais.repositories.get_by_id(None) is None

    repository.data.id = "1337"

    vais.repositories.register(repository)
    assert vais.repositories.get_by_id("1337").data.full_name == "test/test"
    assert vais.repositories.get_by_id(
        "1337").data.full_name_lower == "test/test"

    vais.repositories = VaisRepositories()
    assert vais.repositories.get_by_full_name(None) is None

    vais.repositories.register(repository)
    assert vais.repositories.get_by_full_name("test/test").data.id == "1337"
    assert vais.repositories.is_registered(repository_id="1337")

    await vais.async_prosess_queue()


@pytest.mark.asyncio
async def test_add_remove_repository(vais, repository, tmpdir):
    vais.hass.config.config_dir = tmpdir

    repository.data.id = "0"
    vais.repositories.register(repository)

    vais.repositories.set_repository_id(repository, "42")

    # Once its set, it should never change
    with pytest.raises(ValueError):
        vais.repositories.set_repository_id(repository, "30")

    # Safe to set it again
    vais.repositories.set_repository_id(repository, "42")

    assert vais.repositories.get_by_full_name("test/test") is repository
    assert vais.repositories.get_by_id("42") is repository

    vais.repositories.unregister(repository)
    assert vais.repositories.get_by_full_name("test/test") is None
    assert vais.repositories.get_by_id("42") is None

    # Verify second removal does not raise
    vais.repositories.unregister(repository)


@pytest.mark.asyncio
async def test_set_stage(vais):
    assert vais.stage == None
    vais.set_stage(VaisStage.RUNNING)
    assert vais.stage == VaisStage.RUNNING
