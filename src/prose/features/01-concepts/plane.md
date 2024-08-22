---
title: Plane
source: extracted/plane.ts
publish: true
order: 0
---

Baleada Features uses the concept of a **plane** to represent a two-dimensional space of elements.

Abstractly, a plane is an array of arrays. Each of those nested arrays contains items, which are the "points" in the plane.

:::
```js
[
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]
```
:::

To make this data structure a little easier to work with, Baleada Features implements and exports a `Plane` class, which is a simple extension of `Array`, with a few nice methods:

::: ariaLabel="Plane methods" classes="wide-2 wide-3"
| Method | Description | Parameters | Return value |
| --- | --- | --- | --- |
| `get` | Retrieves the value at a specific set of [coordinates](/docs/features/coordinates) | `{ row: number, column: number }` | The value at the specified coordinates |
| `set` | Sets the value at a specific set of [coordinates](/docs/features/coordinates) | `{ row: number, column: number }`, `value: any` | `undefined` |
| `points` | Iterates over every point in the plane, yielding the [coordinates](/docs/features/coordinates) and value of each point | - | An iterator |
:::

In day-to-day userland code, you'll virtually never interact with any `Plane`s directly. It's mainly useful for Baleada Features' internals, and it's useful to anyone authoring their own composables with Baleada Features' patterns.

But just in case, here are a few examples of how you might use a `Plane`:

:::
```ts
const plane = new Plane([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
])

plane.get({ row: 1, column: 1 }) // 5

plane.set({ row: 1, column: 1 }, 10)

for (const { row, column, point } of plane.points()) {
  console.log(`Row ${row}, column ${column}: ${point}`)
}

function isPlane (arrayOrPlane) {
  return arrayOrPlane instanceof Plane
}
```
:::

::: type="warning"
Currently the underlying assumption is that each item in a plane only fills the space of one point, and that all rows have the same number of points (i.e. the same number of columns).

In the real world, planes don't always behave this way. For example, in tables and spreadsheet interfaces, cells can span multiple columns or rows.

Supporting these use cases is definitely on the roadmap for Baleada Features, but right now, only simpler planes are supported.
:::
