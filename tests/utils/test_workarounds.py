from custom_components.vais.utils.workarounds import DOMAIN_OVERRIDES


def test_domain_ovverides() -> None:
    assert DOMAIN_OVERRIDES.get(
        "custom-components/sensor.custom_aftership") == "custom_aftership"
    assert DOMAIN_OVERRIDES.get("awesome/repo") is None
