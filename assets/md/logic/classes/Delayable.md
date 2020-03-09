---
title: Delayable
framework: agnostic
publish: true
order: 0
---

`Delayable` is a class that enriches a function, allowing it to:
- Be called after a certain number of milliseconds, on an infinite loop OR until a user-specified number of executions has been reached
- Store the number of times the function has been executed
- Store time data:
  - Timestamps for each execution
  - Total time elapsed since starting the delay
  - Time elapsed since the last execution
  - Total time remaining until all executions are complete
  - Time remaining until the next execution
- Store a status (`ready`, `delaying`, or `delayed`)

In other words, `Delayable` implements all the main features of [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/window/setTimeout) and [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/setInterval), then exposes data that describes the active timeout or interval.


## Caveat when using `Delayable` in inactive tabs

Notably, `Delayable` doesn't actually use `setTimeout` or `setInterval` under the hood. Instead, it depends on [`Animateable`](/docs/logic/classes/Animateable), which uses [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (among other dependencies) internally.

Because of this, your `Delayable` delays will pause when the tab is inactive (i.e. when users switch to a different tab), and will resume when the tab is active again (i.e. when users return to your tab).

This is different than the behavior you would get from `setTimeout` and `setInterval`—browsers typically (and inconsistently) throttle those timers when the tab is inactive, rather than pausing and resuming them via `requestAnimationFrame`.

So, just be aware: even though `Delayable`'s API is designed to replace the `setTimeout` and `setInterval` APIs, it does work differently under the hood.


::: type="danger"
Documentation for `Delayable` is still in progress.
:::
