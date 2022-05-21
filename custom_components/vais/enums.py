"""Helper constants."""
# pylint: disable=missing-class-docstring
from enum import Enum


class VaisGitHubRepo(str, Enum):
    """VaisGitHubRepo."""

    DEFAULT = "Vioneta/default"
    INTEGRATION = "Vioneta/vais-backend"


class VaisCategory(str, Enum):
    APPDAEMON = "appdaemon"
    INTEGRATION = "integration"
    LOVELACE = "lovelace"
    PLUGIN = "plugin"  # Kept for legacy purposes
    NETDAEMON = "netdaemon"
    PYTHON_SCRIPT = "python_script"
    THEME = "theme"
    REMOVED = "removed"

    def __str__(self):
        return str(self.value)


class VaisDispatchEvent(str, Enum):
    """VaisDispatchEvent."""

    CONFIG = "vais_dispatch_config"
    ERROR = "vais_dispatch_error"
    RELOAD = "vais_dispatch_reload"
    REPOSITORY = "vais_dispatch_repository"
    REPOSITORY_DOWNLOAD_PROGRESS = "vais_dispatch_repository_download_progress"
    STAGE = "vais_dispatch_stage"
    STARTUP = "vais_dispatch_startup"
    STATUS = "vais_dispatch_status"


class RepositoryFile(str, Enum):
    """Repository file names."""

    VAIS_JSON = "vais.json"
    MAINIFEST_JSON = "manifest.json"


class ConfigurationType(str, Enum):
    YAML = "yaml"
    CONFIG_ENTRY = "config_entry"


class LovelaceMode(str, Enum):
    """Lovelace Modes."""

    STORAGE = "storage"
    AUTO = "auto"
    AUTO_GEN = "auto-gen"
    YAML = "yaml"


class VaisStage(str, Enum):
    SETUP = "setup"
    STARTUP = "startup"
    WAITING = "waiting"
    RUNNING = "running"
    BACKGROUND = "background"


class VaisDisabledReason(str, Enum):
    RATE_LIMIT = "rate_limit"
    REMOVED = "removed"
    INVALID_TOKEN = "invalid_token"
    CONSTRAINS = "constrains"
    LOAD_VAIS = "load_vais"
    RESTORE = "restore"
