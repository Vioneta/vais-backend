"""Initialize repositories."""
from __future__ import annotations

from ..enums import VaisCategory
from .appdaemon import VaisAppdaemonRepository
from .base import VaisRepository
from .integration import VaisIntegrationRepository
from .netdaemon import VaisNetdaemonRepository
from .plugin import VaisPluginRepository
from .python_script import VaisPythonScriptRepository
from .theme import VaisThemeRepository

RERPOSITORY_CLASSES: dict[VaisCategory, VaisRepository] = {
    VaisCategory.THEME: VaisThemeRepository,
    VaisCategory.INTEGRATION: VaisIntegrationRepository,
    VaisCategory.PYTHON_SCRIPT: VaisPythonScriptRepository,
    VaisCategory.APPDAEMON: VaisAppdaemonRepository,
    VaisCategory.NETDAEMON: VaisNetdaemonRepository,
    VaisCategory.PLUGIN: VaisPluginRepository,
}
