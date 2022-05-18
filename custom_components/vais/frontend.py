""""Starting setup task: Frontend"."""
from __future__ import annotations

from typing import TYPE_CHECKING

from aiohttp import web
from homeassistant.components.http import HomeAssistantView
from homeassistant.core import HomeAssistant, callback

from .const import DOMAIN
from .vais_frontend import locate_dir
from .vais_frontend.version import VERSION as FE_VERSION

URL_BASE = "/vaisfiles"

if TYPE_CHECKING:
    from .base import VaisBase


@callback
def async_register_frontend(hass: HomeAssistant, vais: VaisBase) -> None:
    """Register the frontend."""

    # Register themes
    hass.http.register_static_path(
        f"{URL_BASE}/themes", hass.config.path("themes"))

    # Register frontend
    if vais.configuration.frontend_repo_url:
        vais.log.warning(
            "<VaisFrontend> Frontend development mode enabled. Do not run in production!"
        )
        hass.http.register_view(VaisFrontendDev())
    else:
        #
        hass.http.register_static_path(
            f"{URL_BASE}/frontend", locate_dir(), cache_headers=False)

    # Custom iconset
    hass.http.register_static_path(
        f"{URL_BASE}/iconset.js", str(vais.integration_dir / "iconset.js")
    )
    if "frontend_extra_module_url" not in hass.data:
        hass.data["frontend_extra_module_url"] = set()
    hass.data["frontend_extra_module_url"].add(f"{URL_BASE}/iconset.js")

    # Register www/community for all other files
    use_cache = vais.core.lovelace_mode == "storage"
    vais.log.info(
        "<VaisFrontend> %s mode, cache for /vaisfiles/: %s",
        vais.core.lovelace_mode,
        use_cache,
    )

    hass.http.register_static_path(
        URL_BASE,
        hass.config.path("www/community"),
        cache_headers=use_cache,
    )

    vais.frontend_version = FE_VERSION

    # Add to sidepanel if needed
    if DOMAIN not in hass.data.get("frontend_panels", {}):
        hass.components.frontend.async_register_built_in_panel(
            component_name="custom",
            sidebar_title=vais.configuration.sidepanel_title,
            sidebar_icon=vais.configuration.sidepanel_icon,
            frontend_url_path=DOMAIN,
            config={
                "_panel_custom": {
                    "name": "vais-frontend",
                    "embed_iframe": True,
                    "trust_external": False,
                    "js_url": f"/vaisfiles/frontend/entrypoint.js?vaistag={FE_VERSION}",
                }
            },
            require_admin=True,
        )


class VaisFrontendDev(HomeAssistantView):
    """Dev View Class for VAIS."""

    requires_auth = False
    name = "vais_files:frontend"
    url = r"/vaisfiles/frontend/{requested_file:.+}"

    async def get(self, request, requested_file):  # pylint: disable=unused-argument
        """Handle VAIS Web requests."""
        vais: VaisBase = request.app["hass"].data.get(DOMAIN)
        requested = requested_file.split("/")[-1]
        request = await vais.session.get(f"{vais.configuration.frontend_repo_url}/{requested}")
        if request.status == 200:
            result = await request.read()
            response = web.Response(body=result)
            response.headers["Content-Type"] = "application/javascript"

            return response
