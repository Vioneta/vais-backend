"""Set up some common test helper things."""
# pytest: disable=protected-access
import asyncio
import logging
import os
from pathlib import Path
from unittest.mock import AsyncMock

from aiogithubapi import GitHub, GitHubAPI
from aiogithubapi.const import ACCEPT_HEADERS
from awesomeversion import AwesomeVersion
from homeassistant.config_entries import ConfigEntry
from homeassistant.const import __version__ as HAVERSION
from homeassistant.core import HomeAssistant
from homeassistant.exceptions import ServiceNotFound
from homeassistant.helpers.aiohttp_client import async_get_clientsession
from homeassistant.loader import Integration
from homeassistant.runner import HassEventLoopPolicy
import pytest

from custom_components.vais.base import (
    VaisBase,
    VaisCommon,
    VaisCore,
    VaisRepositories,
    VaisSystem,
)
from custom_components.vais.const import DOMAIN
from custom_components.vais.repositories import (
    VaisAppdaemonRepository,
    VaisIntegrationRepository,
    VaisNetdaemonRepository,
    VaisPluginRepository,
    VaisPythonScriptRepository,
    VaisThemeRepository,
)
from custom_components.vais.utils.configuration_schema import TOKEN as CONF_TOKEN
from custom_components.vais.utils.queue_manager import QueueManager
from custom_components.vais.validate.manager import ValidationManager

from tests.async_mock import MagicMock
from tests.common import (
    TOKEN,
    async_test_home_assistant,
    dummy_repository_base,
    mock_storage as mock_storage,
)

# Set default logger
logging.basicConfig(level=logging.DEBUG)
if "GITHUB_ACTION" in os.environ:
    logging.basicConfig(
        format="::%(levelname)s:: %(message)s",
        level=logging.DEBUG,
    )

# All test coroutines will be treated as marked.
pytestmark = pytest.mark.asyncio

asyncio.set_event_loop_policy(HassEventLoopPolicy(False))
# Disable fixtures overriding our beautiful policy
asyncio.set_event_loop_policy = lambda policy: None

# Disable sleep in tests
_sleep = asyncio.sleep
asyncio.sleep = lambda _: _sleep(0)


@pytest.fixture()
def connection():
    """Mock fixture for connection."""
    yield MagicMock()


@pytest.fixture
def hass_storage():
    """Fixture to mock storage."""
    with mock_storage() as stored_data:
        yield stored_data


@pytest.fixture
def hass(event_loop, tmpdir):
    """Fixture to provide a test instance of Home Assistant."""

    def exc_handle(loop, context):
        """Handle exceptions by rethrowing them, which will fail the test."""
        if exception := context.get("exception"):
            exceptions.append(exception)
        orig_exception_handler(loop, context)

    exceptions = []
    hass_obj = event_loop.run_until_complete(
        async_test_home_assistant(event_loop, tmpdir))
    orig_exception_handler = event_loop.get_exception_handler()
    event_loop.set_exception_handler(exc_handle)

    yield hass_obj

    event_loop.run_until_complete(hass_obj.async_stop(force=True))
    for ex in exceptions:
        if isinstance(ex, (ServiceNotFound, FileExistsError)):
            continue
        raise ex


@pytest.fixture
async def vais(hass: HomeAssistant):
    """Fixture to provide a VAIS object."""
    vais_obj = VaisBase()
    vais_obj.hass = hass
    vais_obj.validation = ValidationManager(vais=vais_obj, hass=hass)
    vais_obj.session = async_get_clientsession(hass)
    vais_obj.repositories = VaisRepositories()

    vais_obj.integration = Integration(
        hass=hass,
        pkg_path="custom_components.vais",
        file_path=Path(hass.config.path("custom_components/vais")),
        manifest={"domain": DOMAIN, "version": "0.0.0",
                  "requirements": ["vais_frontend==1"]},
    )
    vais_obj.common = VaisCommon()
    vais_obj.data = AsyncMock()
    vais_obj.queue = QueueManager(hass=hass)
    vais_obj.core = VaisCore()
    vais_obj.system = VaisSystem()

    vais_obj.core.config_path = hass.config.path()
    vais_obj.core.ha_version = AwesomeVersion(HAVERSION)
    vais_obj.version = vais_obj.integration.version
    vais_obj.configuration.token = TOKEN

    # Old GitHub client
    vais_obj.github = GitHub(
        token=vais_obj.configuration.token,
        session=vais_obj.session,
        headers={
            "User-Agent": "VAIS/pytest",
            "Accept": ACCEPT_HEADERS["preview"],
        },
    )

    # New GitHub client
    vais_obj.githubapi = GitHubAPI(
        token=vais_obj.configuration.token,
        session=vais_obj.session,
        **{"client_name": "VAIS/pytest"},
    )

    vais_obj.queue.clear()

    hass.data[DOMAIN] = vais_obj

    yield vais_obj


@pytest.fixture
def repository(vais):
    """Fixtrue for VAIS repository object"""
    yield dummy_repository_base(vais)


@pytest.fixture
def repository_integration(vais):
    """Fixtrue for VAIS integration repository object"""
    repository_obj = VaisIntegrationRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def repository_theme(vais):
    """Fixtrue for VAIS theme repository object"""
    repository_obj = VaisThemeRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def repository_plugin(vais):
    """Fixtrue for VAIS plugin repository object"""
    repository_obj = VaisPluginRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def repository_python_script(vais):
    """Fixtrue for VAIS python_script repository object"""
    repository_obj = VaisPythonScriptRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def repository_appdaemon(vais):
    """Fixtrue for VAIS appdaemon repository object"""
    repository_obj = VaisAppdaemonRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def repository_netdaemon(vais):
    """Fixtrue for VAIS netdaemon repository object"""
    repository_obj = VaisNetdaemonRepository(vais, "test/test")
    yield dummy_repository_base(vais, repository_obj)


@pytest.fixture
def config_entry() -> ConfigEntry:
    """Fixture for a config entry."""
    yield ConfigEntry(
        version=1,
        domain=DOMAIN,
        title="",
        data={CONF_TOKEN: TOKEN},
        source="user",
        options={},
        unique_id="12345",
    )
