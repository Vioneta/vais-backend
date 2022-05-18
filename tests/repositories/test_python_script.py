import pytest

from custom_components.vais.exceptions import VaisException


@pytest.mark.asyncio
async def test_async_post_registration(repository_python_script):
    await repository_python_script.async_post_registration()


@pytest.mark.asyncio
async def test_validate_repository(repository_python_script):
    with pytest.raises(VaisException):
        await repository_python_script.validate_repository()


@pytest.mark.asyncio
async def test_update_repository(repository_python_script):
    await repository_python_script.update_repository()
