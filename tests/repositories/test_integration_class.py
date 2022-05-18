import pytest

from custom_components.vais.exceptions import VaisException


@pytest.mark.asyncio
async def test_async_post_installation(repository_integration, vais):
    await repository_integration.async_post_installation()

    repository_integration.data.config_flow = True
    repository_integration.data.first_install = True
    vais.hass.data["custom_components"] = {}
    await repository_integration.async_post_installation()


@pytest.mark.asyncio
async def test_async_post_registration(repository_integration):
    await repository_integration.async_post_registration()


@pytest.mark.asyncio
async def test_reload_custom_components(repository_integration, vais):
    vais.hass.data["custom_components"] = {}
    await repository_integration.reload_custom_components()


@pytest.mark.asyncio
async def test_validate_repository(repository_integration):
    with pytest.raises(VaisException):
        await repository_integration.validate_repository()


@pytest.mark.asyncio
async def test_update_repository(repository_integration):
    await repository_integration.update_repository()
