from aiogithubapi.objects.repository.content import AIOGitHubAPIRepositoryTreeContent
import pytest

from custom_components.vais.validate.vais_manifest import Validator


@pytest.mark.asyncio
async def test_vais_manifest_no_manifest(repository):
    check = Validator(repository)
    await check.execute_validation()
    assert check.failed


@pytest.mark.asyncio
async def test_vais_manifest_with_manifest(repository):
    repository.tree = [
        AIOGitHubAPIRepositoryTreeContent(
            {"path": "vais.json", "type": "file"}, "test/test", "main"
        )
    ]
    check = Validator(repository)
    await check.execute_validation()
    assert not check.failed
