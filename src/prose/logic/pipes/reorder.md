---
title: reorder
tags: UI Logic
source: array.ts
tests: node/array.test.ts
publish: true
order: 0
---

`createReorder` is a [pipe](/docs/logic/pipes-overview) that transforms an array to an array with one or more items moved to a new position.


:::
## Create reorder
:::

Call `createReorder` with these parameters to create your `reorder` function:

::: ariaLabel="createReorder parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | number, Object | yes | <p>The index (number) of the item to move.</p><p>Alternatively, you can pass an object with a `start` property and a `itemCount` property. In this case, your `reorder` function would start from the `start` index, collect `itemCount` items, and move them to the new location.</p> |
| `to` | number | yes | The index of the new location. |
:::
