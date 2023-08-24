---
title: find async
tags: UI Logic
source: array-async.ts
publish: true
order: 0
---

`createFindAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to the first one of its items to match a condition or `undefined` if a matching item can't be found.

::: type="info"
`createFindAsync` is a light wrapper around [`find`](https://github.com/RobinMalfait/lazy-collections#find) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create find
:::

Call `createFindAsync` with no parameters to create your `find` function.

Call `createFindAsync` with these parameters to create your `find` function:

::: ariaLabel="createFindAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

