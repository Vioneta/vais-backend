from custom_components.vais.base import VaisBase
from custom_components.vais.utils import path


def test_is_safe(vais: VaisBase) -> None:
    assert path.is_safe(vais, "/test")
    assert not path.is_safe(
        vais, f"{vais.core.config_path}/{vais.configuration.theme_path}/")
    assert not path.is_safe(
        vais, f"{vais.core.config_path}/custom_components/")
    assert not path.is_safe(vais, f"{vais.core.config_path}/custom_components")
