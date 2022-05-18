"""Path utils"""
from __future__ import annotations

from pathlib import Path
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from ..base import VaisBase


def is_safe(vais: VaisBase, path: str | Path) -> bool:
    """Helper to check if path is safe to remove."""
    return Path(path).as_posix() not in (
        Path(f"{vais.core.config_path}/{vais.configuration.appdaemon_path}").as_posix(),
        Path(f"{vais.core.config_path}/{vais.configuration.netdaemon_path}").as_posix(),
        Path(f"{vais.core.config_path}/{vais.configuration.plugin_path}").as_posix(),
        Path(
            f"{vais.core.config_path}/{vais.configuration.python_script_path}").as_posix(),
        Path(f"{vais.core.config_path}/{vais.configuration.theme_path}").as_posix(),
        Path(f"{vais.core.config_path}/custom_components/").as_posix(),
    )
