"""Provide info to system health."""
from aiogithubapi.common.const import BASE_API_URL
from homeassistant.components import system_health
from homeassistant.core import HomeAssistant, callback

from .base import VaisBase
from .const import DOMAIN

GITHUB_STATUS = "https://www.githubstatus.com/"


@callback
def async_register(hass: HomeAssistant, register: system_health.SystemHealthRegistration) -> None:
    """Register system health callbacks."""
    register.domain = "Home Assistant Community Store"
    register.async_register_info(system_health_info, "/vais")


async def system_health_info(hass):
    """Get info for the info page."""
    vais: VaisBase = hass.data[DOMAIN]
    response = await vais.githubapi.rate_limit()

    data = {
        "GitHub API": system_health.async_check_can_reach_url(hass, BASE_API_URL, GITHUB_STATUS),
        "GitHub Content": system_health.async_check_can_reach_url(
            hass, "https://raw.githubusercontent.com/vais/integration/main/vais.json"
        ),
        "GitHub Web": system_health.async_check_can_reach_url(
            hass, "https://github.com/", GITHUB_STATUS
        ),
        "GitHub API Calls Remaining": response.data.resources.core.remaining,
        "Installed Version": vais.version,
        "Stage": vais.stage,
        "Available Repositories": len(vais.repositories.list_all),
        "Downloaded Repositories": len(vais.repositories.list_downloaded),
    }

    if vais.system.disabled:
        data["Disabled"] = vais.system.disabled_reason

    return data
