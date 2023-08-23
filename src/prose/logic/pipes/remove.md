---
title: remove
tags: UI Logic
source: array.ts
publish: true
order: 0
---

`createRemove` is a pipe that accepts an array as an input, and outputs <!--TODO-->.

::: type="info"
`createRemove` is a light wrapper around [`remove`](https://github.com/RobinMalfait/lazy-collections#remove) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `remove`
:::

Call `createRemove` with no parameters to create your `remove` function.

Call `createRemove` with the parameters listed below to create your `remove` function:

::: ariaLabel="createRemove parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createRemove` with TypeScript 🚀
