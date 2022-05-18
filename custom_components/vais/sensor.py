"""Sensor platform for VAIS."""
from __future__ import annotations

from homeassistant.components.sensor import SensorEntity
from homeassistant.core import callback

from .const import DOMAIN
from .entity import VaisSystemEntity
from .enums import ConfigurationType


async def async_setup_platform(hass, _config, async_add_entities, _discovery_info=None):
    """Setup sensor platform."""
    async_add_entities([VAISSensor(vais=hass.data.get(DOMAIN))])


async def async_setup_entry(hass, _config_entry, async_add_devices):
    """Setup sensor platform."""
    async_add_devices([VAISSensor(vais=hass.data.get(DOMAIN))])


class VAISSensor(VaisSystemEntity, SensorEntity):
    """VAIS Sensor class."""

    _attr_name = "vais"
    _attr_native_unit_of_measurement = "pending update(s)"
    _attr_native_value = None

    @callback
    def _update(self) -> None:
        """Update the sensor."""

        repositories = [
            repository
            for repository in self.vais.repositories.list_all
            if repository.pending_update
        ]
        self._attr_native_value = len(repositories)
        if (
            self.vais.configuration.config_type == ConfigurationType.YAML
            and not self.vais.configuration.experimental
        ):
            self._attr_extra_state_attributes = {
                "repositories": [
                    {
                        "name": repository.data.full_name,
                        "display_name": repository.display_name,
                        "installed_version": repository.display_installed_version,
                        "available_version": repository.display_available_version,
                    }
                    for repository in repositories
                ]
            }
