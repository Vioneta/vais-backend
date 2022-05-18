from unittest.mock import patch

import pytest

from custom_components.vais.base import VaisBase


@pytest.mark.asyncio
async def test_async_run_repository_checks(vais: VaisBase, repository_integration):
    vais.system.action = False

    await vais.validation.async_run_repository_checks(repository_integration)

    vais.system.action = True
    repository_integration.tree = []
    with pytest.raises(SystemExit):
        await vais.validation.async_run_repository_checks(repository_integration)

    with patch(
        "custom_components.vais.validate.manager.ValidationManager.validatiors", return_value=[]
    ):
        await vais.validation.async_run_repository_checks(repository_integration)
