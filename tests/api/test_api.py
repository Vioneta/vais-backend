import os

from homeassistant.core import HomeAssistant
import pytest

from custom_components.vais.websocket import (
    acknowledge_critical_repository,
    get_critical_repositories,
    vais_config,
    vais_removed,
    vais_repositories,
    vais_repository,
    vais_repository_data,
    vais_settings,
    vais_status,
)


@pytest.mark.asyncio
async def test_check_local_path(vais, connection, tmpdir):
    vais.hass = HomeAssistant()
    os.makedirs(tmpdir, exist_ok=True)
    get_critical_repositories(vais.hass, connection, {"id": 1})
    vais_config(vais.hass, connection, {"id": 1})
    vais_removed(vais.hass, connection, {"id": 1})
    vais_repositories(vais.hass, connection, {"id": 1})
    vais_repository(vais.hass, connection, {"id": 1})
    vais_repository_data(vais.hass, connection, {"id": 1})
    vais_settings(vais.hass, connection, {"id": 1})
    vais_status(vais.hass, connection, {"id": 1})

    acknowledge_critical_repository(
        vais.hass, connection, {"repository": "test/test", "id": 1})
