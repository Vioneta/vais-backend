import pytest

from custom_components.vais.exceptions import VaisException


@pytest.mark.asyncio
async def test_installation_method(repository):
    with pytest.raises(VaisException):
        await repository.async_install()
    repository.content.path.local = ""

    with pytest.raises(VaisException):
        await repository.async_install()

    # repository.can_download = True

    await repository._async_post_install()
