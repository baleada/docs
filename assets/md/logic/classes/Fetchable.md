---
title: Fetchable
framework: agnostic
publish: true
order: 0
---

`Fetchable` is a class that enriches a resource (i.e. a URL) by allowing it to:
- Asynchronously fetch itself
- Store the response and the response JSON
- Store its status ("ready", "fetching", or "fetched")

`Fetchable` is written in vanilla JS with no dependencies, except for the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) web API.

::: type="danger"
Documentation for `Fetchable` is still in progress.
:::
