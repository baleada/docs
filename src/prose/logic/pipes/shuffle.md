---
title: shuffle
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createShuffle` is a pipe that accepts an array as an input, and outputs <!--TODO-->.

::: type="info"
`createShuffle` is a light wrapper around [`shuffle`](https://github.com/RobinMalfait/lazy-collections#shuffle) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `shuffle`
:::

Call `createShuffle` with no parameters to create your `shuffle` function.

Call `createShuffle` with the parameters listed below to create your `shuffle` function:

::: ariaLabel="createShuffle parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createShuffle` with TypeScript 🚀
