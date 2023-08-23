---
title: find async
tags: UI Logic
source: array async.ts
publish: true
order: 0
---

`createFindAsync` is a pipe that accepts an array as an input, and asynchronously outputs <!--TODO-->.

::: type="info"
`createFindAsync` is a light wrapper around [`find`](https://github.com/RobinMalfait/lazy-collections#find) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create `findAsync`
:::

Call `createFindAsync` with no parameters to create your `findAsync` function.

Call `createFindAsync` with the parameters listed below to create your `findAsync` function:

::: ariaLabel="createFindAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using `createFindAsync` with TypeScript 🚀
