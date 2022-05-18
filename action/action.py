"""Validate a GitHub repository to be used with VAIS."""
import asyncio
import json
import logging
import os

from aiogithubapi import GitHub, GitHubAPI
import aiohttp
from homeassistant.core import HomeAssistant

from custom_components.vais.base import VaisBase
from custom_components.vais.const import VAIS_ACTION_GITHUB_API_HEADERS
from custom_components.vais.exceptions import VaisException
from custom_components.vais.utils.logger import get_vais_logger
from custom_components.vais.validate.manager import ValidationManager

TOKEN = os.getenv("INPUT_GITHUB_TOKEN")
GITHUB_WORKSPACE = os.getenv("GITHUB_WORKSPACE")
GITHUB_ACTOR = os.getenv("GITHUB_ACTOR")
GITHUB_EVENT_PATH = os.getenv("GITHUB_EVENT_PATH")
GITHUB_REPOSITORY = os.getenv("GITHUB_REPOSITORY")
CHANGED_FILES = os.getenv("CHANGED_FILES", "")


REPOSITORY = os.getenv("REPOSITORY", os.getenv("INPUT_REPOSITORY"))
CATEGORY = os.getenv("CATEGORY", os.getenv("INPUT_CATEGORY", ""))


CATEGORIES = [
    "appdaemon",
    "integration",
    "netdaemon",
    "plugin",
    "python_script",
    "theme",
]


logging.basicConfig(
    format="::%(levelname)s:: %(message)s",
    level=logging.DEBUG,
)
logger = get_vais_logger()


def error(error: str):
    logger.error(error)
    exit(1)


def get_event_data():
    if GITHUB_EVENT_PATH is None or not os.path.exists(GITHUB_EVENT_PATH):
        return {}
    with open(GITHUB_EVENT_PATH) as ev:
        return json.loads(ev.read())


def chose_repository(category):
    if category is None:
        return
    with open(f"/default/{category}") as cat_file:
        current = json.loads(cat_file.read())
    with open(f"{GITHUB_WORKSPACE}/{category}") as cat_file:
        new = json.loads(cat_file.read())

    for repo in current:
        if repo in new:
            new.remove(repo)

    if len(new) != 1:
        error(f"{new} is not a single repository")

    return new[0]


def chose_category():
    for name in CHANGED_FILES.split(" "):
        if name in CATEGORIES:
            return name


async def preflight():
    """Preflight checks."""
    event_data = get_event_data()
    ref = None
    if REPOSITORY and CATEGORY:
        repository = REPOSITORY
        category = CATEGORY
    elif GITHUB_REPOSITORY == "Vioneta/default":
        category = chose_category()
        repository = chose_repository(category)
        logger.info(f"Actor: {GITHUB_ACTOR}")
    else:
        category = CATEGORY.lower()
        if event_data.get("pull_request") is not None:
            head = event_data["pull_request"]["head"]
            ref = head["ref"]
            repository = head["repo"]["full_name"]
        else:
            repository = GITHUB_REPOSITORY

    logger.info(f"Category: {category}")
    logger.info(f"Repository: {repository}")

    if TOKEN is None:
        error("No GitHub token found, use env GITHUB_TOKEN to set this.")

    if repository is None:
        error("No repository found, use env REPOSITORY to set this.")

    if category is None:
        error("No category found, use env CATEGORY to set this.")

    async with aiohttp.ClientSession() as session:
        github = GitHub(TOKEN, session, headers=VAIS_ACTION_GITHUB_API_HEADERS)
        repo = await github.get_repo(repository)
        if ref is None and GITHUB_REPOSITORY != "Vioneta/default":
            ref = repo.default_branch

    await validate_repository(repository, category, ref)


async def validate_repository(repository, category, ref=None):
    """Validate."""
    async with aiohttp.ClientSession() as session:
        vais = VaisBase()
        vais.hass = HomeAssistant()
        vais.session = session
        vais.configuration.token = TOKEN
        vais.core.config_path = None
        vais.validation = ValidationManager(vais=vais, hass=vais.hass)
        # Legacy GitHub client
        vais.github = GitHub(
            vais.configuration.token,
            session,
            headers=VAIS_ACTION_GITHUB_API_HEADERS,
        )

        # New GitHub client
        vais.githubapi = GitHubAPI(
            token=vais.configuration.token,
            session=session,
            **{"client_name": "VAIS/Action"},
        )
        try:
            await vais.async_register_repository(
                repository_full_name=repository, category=category, ref=ref
            )
        except VaisException as exception:
            error(exception)


LOOP = asyncio.get_event_loop()
LOOP.run_until_complete(preflight())
