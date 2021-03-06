"""Custom template support."""
from __future__ import annotations

from typing import TYPE_CHECKING

from jinja2 import Template

if TYPE_CHECKING:
    from ..repositories.base import VaisRepository


def render_template(content: str, context: VaisRepository) -> str:
    """Render templates in content."""
    # Fix None issues
    if context.releases.last_release_object is not None:
        prerelease = context.releases.last_release_object.prerelease
    else:
        prerelease = False

    # Render the template
    try:
        return Template(content).render(
            installed=context.data.installed,
            pending_update=context.pending_update,
            prerelease=prerelease,
            selected_tag=context.data.selected_tag,
            version_available=context.releases.last_release,
            version_installed=context.display_installed_version,
        )
    # lgtm [py/catch-base-exception] pylint: disable=broad-except
    except BaseException as exception:
        context.logger.debug(exception)
    return content
