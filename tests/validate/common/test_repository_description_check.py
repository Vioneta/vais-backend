import pytest

from custom_components.vais.validate.repository_description import Validator


@pytest.mark.asyncio
async def test_repository_no_description(repository):
    repository.data.description = ""
    check = Validator(repository)
    await check.execute_validation()
    assert check.failed


@pytest.mark.asyncio
async def test_repository_vais_description(repository):
    check = Validator(repository)
    await check.execute_validation()
    assert not check.failed
