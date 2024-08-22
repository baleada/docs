---
title: insert
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createInsert` is a [pipe](/docs/logic/pipes-overview) that transforms an array to an array with a given item inserted at a given index.


:::
## Create insert
:::

Call `createInsert` with these parameters to create your `insert` function:

::: ariaLabel="createInsert parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | any | yes | The item to insert. |
| `index` | number | yes | The index at which to insert the item. |
:::

