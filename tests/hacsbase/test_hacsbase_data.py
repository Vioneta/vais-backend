"""Data Test Suite."""
import pytest

from custom_components.vais.base import VaisRepositories
from custom_components.vais.enums import VaisGitHubRepo
from custom_components.vais.utils.data import VaisData

from tests.async_mock import patch


@pytest.mark.asyncio
async def test_vais_data_async_write1(vais, repository):
    data = VaisData(vais)
    repository.data.installed = True
    repository.data.installed_version = "1"
    vais.repositories.register(repository)
    await data.async_write()


@pytest.mark.asyncio
async def test_vais_data_async_write2(vais):
    data = VaisData(vais)
    vais.system.disabled_reason = None
    vais.repositories = VaisRepositories()
    await data.async_write()


@pytest.mark.asyncio
async def test_vais_data_restore_write_new(vais, caplog):
    data = VaisData(vais)
    await data.restore()
    with patch("custom_components.vais.utils.data.async_save_to_store") as mock_async_save_to_store:
        await data.async_write()
    assert mock_async_save_to_store.called
    assert "Loading base repository information" in caplog.text


@pytest.mark.asyncio
async def test_vais_data_restore_write_not_new(vais, caplog):
    data = VaisData(vais)

    async def _mocked_loads(hass, key):
        if key == "repositories":
            return {
                "172733314": {
                    "category": "integration",
                    "full_name": "vais/integration",
                    "installed": True,
                    "show_beta": True,
                },
                "202226247": {
                    "category": "integration",
                    "full_name": "shbatm/vais-isy994",
                    "installed": False,
                },
            }
        elif key == "vais":
            return {}
        elif key == "renamed_repositories":
            return {}
        else:
            raise ValueError(f"No mock for {key}")

    with patch("os.path.exists", return_value=True), patch(
        "custom_components.vais.utils.data.async_load_from_store",
        side_effect=_mocked_loads,
    ):
        await data.restore()

    assert vais.repositories.get_by_id("202226247")
    assert vais.repositories.get_by_full_name("shbatm/vais-isy994")

    assert vais.repositories.get_by_id("172733314")
    assert vais.repositories.get_by_full_name(VaisGitHubRepo.INTEGRATION)

    assert vais.repositories.get_by_id("172733314").data.show_beta is True
    assert vais.repositories.get_by_id("172733314").data.installed is True

    with patch("custom_components.vais.utils.data.async_save_to_store") as mock_async_save_to_store:
        await data.async_write()
    assert mock_async_save_to_store.called
    assert "Loading base repository information" not in caplog.text
