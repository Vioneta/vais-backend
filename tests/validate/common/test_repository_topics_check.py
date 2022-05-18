import pytest

from custom_components.vais.validate.repository_topics import Validator


@pytest.mark.asyncio
async def test_repository_no_topics(repository):
    repository.data.topics = []
    check = Validator(repository)
    await check.execute_validation()
    assert check.failed


@pytest.mark.asyncio
async def test_repository_vais_topics(repository):
    repository.data.topics = ["test"]
    check = Validator(repository)
    await check.execute_validation()
    assert not check.failed
