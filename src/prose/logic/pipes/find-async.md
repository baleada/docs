---
title: find async
source: array-async.ts
tests: node/array-async.test.ts
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

Call `createFindAsync` with these parameters to create your `find` function:

::: ariaLabel="createFindAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `predicate` | Function | yes | <p>A function that returns a `Promise` that resolves to a boolean indicating whether or not an item is the item you're trying to find.</p><p>`predicate` receives an item (any data type) and the item's index (number) as parameters.</p> |
:::

::: type="info"
Baleada Logic doesn't export `createFind`, i.e. the synchronous version of `createFindAsync`. Instead, just import [`find` from `lazy-collections`](https://github.com/RobinMalfait/lazy-collections#find).
:::
