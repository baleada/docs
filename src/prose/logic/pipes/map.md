---
title: map
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createMap` is a [pipe](/docs/logic/pipes-overview) that transforms an array to a mapped array.

::: type="info"
`createMap` is a light wrapper around [`map`](https://github.com/RobinMalfait/lazy-collections#map) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create map
:::

Call `createMap` with these parameters to create your `map` function:

::: ariaLabel="createMap parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `transform` | Function | yes | <p>A function that returns the transformed item.</p><p>`transform` receives an item (any data type) and the item's index (number) as parameters.</p> |
:::

