"""VAIS Decorators."""
from __future__ import annotations

import asyncio
from functools import wraps
from typing import TYPE_CHECKING, Any, Coroutine

from ..const import DEFAULT_CONCURRENT_BACKOFF_TIME, DEFAULT_CONCURRENT_TASKS

if TYPE_CHECKING:
    from ..base import VaisBase


def concurrent(
    concurrenttasks: int = DEFAULT_CONCURRENT_TASKS,
    backoff_time: int = DEFAULT_CONCURRENT_BACKOFF_TIME,
) -> Coroutine[Any, Any, None]:
    """Return a modified function."""

    max_concurrent = asyncio.Semaphore(concurrenttasks)

    def inner_function(function) -> Coroutine[Any, Any, None]:
        @wraps(function)
        async def wrapper(*args, **kwargs) -> None:
            vais: VaisBase = getattr(args[0], "vais", None)

            async with max_concurrent:
                result = await function(*args, **kwargs)
                if (
                    vais is None
                    or vais.queue is None
                    or vais.queue.has_pending_tasks
                    or "update" not in function.__name__
                ):
                    await asyncio.sleep(backoff_time)

                return result

        return wrapper

    return inner_function
