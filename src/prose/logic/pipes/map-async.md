---
title: map async
tags: UI Logic
source: array-async.ts
publish: true
order: 0
---

`createMapAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to a mapped array.

::: type="info"
`createMapAsync` is a light wrapper around [`map`](https://github.com/RobinMalfait/lazy-collections#map) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create map
:::

Call `createMapAsync` with these parameters to create your `map` function:

::: ariaLabel="createMapAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `transform` | Function | yes | <p>A function that returns a `Promise` that resolves to the transformed item.</p><p>`transform` receives an item (any data type) and the item's index (number) as parameters.</p> |
:::

