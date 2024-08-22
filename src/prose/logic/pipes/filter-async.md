---
title: filter async
source: array-async.ts
tests: node/array-async.test.ts
publish: true
order: 0
---

`createFilterAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an array to a filtered `toArray`.

::: type="info"
`createFilterAsync` is a light wrapper around [`filter`](https://github.com/RobinMalfait/lazy-collections#filter) and [`toArray`](https://github.com/RobinMalfait/lazy-collections#toarray) from `lazy-collections`.

If you're sending your array through multiple transformations, prefer using `lazy-collections` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::


:::
## Create filter
:::

Call `createFilterAsync` with these parameters to create your `filter` function:

::: ariaLabel="createFilterAsync parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `predicate` | Function | yes | <p>A function that returns a `Promise` that resolves to a boolean indicating whether or not an item meets your filter condition.</p><p>`predicate` receives an item (any data type) and the item's index (number) as parameters.</p> |
:::
