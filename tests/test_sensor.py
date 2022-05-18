"""VAIS Sensor Test Suite."""
# pylint: disable=missing-docstring
from homeassistant.core import HomeAssistant
from homeassistant.helpers.device_registry import DeviceEntryType
import pytest

from custom_components.vais.base import VaisBase
from custom_components.vais.enums import VaisDispatchEvent
from custom_components.vais.repositories import VaisIntegrationRepository
from custom_components.vais.sensor import (
    VAISSensor,
    async_setup_entry,
    async_setup_platform,
)


async def sensor_setup(vais: VaisBase, hass: HomeAssistant) -> VAISSensor:
    """Set up the sensor."""
    sensor = VAISSensor(vais)
    sensor.hass = hass
    sensor.entity_id = "sensor.vais"

    await sensor.async_added_to_hass()
    return sensor


def mock_setup(entities):
    for entity in entities:
        assert entity.name == "vais"


@pytest.mark.asyncio
async def test_sensor_data(vais: VaisBase, hass: HomeAssistant):
    sensor = await sensor_setup(vais, hass)
    assert sensor.name == "vais"
    assert sensor.icon == "vais:vais"
    assert sensor.unique_id.startswith("0717a0cd")
    assert sensor.unit_of_measurement == "pending update(s)"


@pytest.mark.asyncio
async def test_device_info_entry_type(vais: VaisBase, hass: HomeAssistant):
    sensor = await sensor_setup(vais, hass)
    entry_type = sensor.device_info["entry_type"]
    assert entry_type == DeviceEntryType.SERVICE
    assert isinstance(entry_type, DeviceEntryType)


@pytest.mark.asyncio
async def test_sensor_update_event(vais: VaisBase, hass: HomeAssistant):
    sensor = await sensor_setup(vais, hass)

    repository = VaisIntegrationRepository(vais, "test/one")
    repository.data.update_data(
        {
            "id": "123",
            "installed": True,
            "installed_version": "1",
            "last_version": "2",
        }
    )
    vais.repositories.register(repository)

    repository = VaisIntegrationRepository(vais, "test/two")
    repository.data.update_data(
        {
            "id": "321",
            "installed": True,
            "installed_version": "1",
            "last_version": "1",
        }
    )
    vais.repositories.register(repository)

    vais.common.categories = {"integration"}
    assert sensor.state is None

    vais.async_dispatch(VaisDispatchEvent.REPOSITORY, {})

    await hass.async_block_till_done()
    assert sensor.state == 1


@pytest.mark.asyncio
async def test_sensor_update_manual(vais: VaisBase, hass: HomeAssistant):
    sensor = await sensor_setup(vais, hass)

    repository = VaisIntegrationRepository(vais, "test/one")
    repository.data.update_data(
        {
            "id": "123",
            "installed": True,
            "installed_version": "1",
            "last_version": "2",
        }
    )
    vais.repositories.register(repository)

    repository = VaisIntegrationRepository(vais, "test/two")
    repository.data.update_data(
        {
            "id": "321",
            "installed": True,
            "installed_version": "1",
            "last_version": "1",
        }
    )
    vais.repositories.register(repository)

    vais.common.categories = {"integration"}
    assert sensor.state is None

    await sensor.async_update()
    assert sensor.state == 1


@pytest.mark.asyncio
async def test_setup_platform(hass: HomeAssistant, vais: VaisBase):
    await async_setup_platform(hass, {}, mock_setup)


@pytest.mark.asyncio
async def test_setup_entry(hass: HomeAssistant, vais: VaisBase):
    await async_setup_entry(hass, {}, mock_setup)
