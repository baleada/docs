---
title: map async
tags: UI Logic
source: array async.ts
publish: true
order: 0
---

`createMapAsync` is a pipe that accepts an array as an input, and asynchronously outputs <!--TODO-->.

::: type="info"
`createMapAsync` is a light wrapper around [`map`](https://github.com/RobinMalfait/lazy-collections#map) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `mapAsync`
:::

Call `createMapAsync` with no parameters to create your `mapAsync` function.

Call `createMapAsync` with the parameters listed below to create your `mapAsync` function:

::: ariaLabel="createMapAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createMapAsync` with TypeScript 🚀
