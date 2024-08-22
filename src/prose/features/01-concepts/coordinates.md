---
title: Coordinates
source: extracted/coordinates.ts
publish: true
order: 0
---

Baleada Features uses the concept of **coordinates** to identify the position of an element in a [plane](/docs/features/concepts/plane).

A set of coordinates is an object with two properties:

::: ariaLabel="Coordinates properties"
| Property | Type | Description |
| --- | --- | --- |
| `row` | `number` | In the plane, which is an array of arrays, the row is the index of the nested array that contains the element. |
| `column` | `number` | In the plane, which is an array of arrays, the column is the index of the element within the nested array. |
:::
