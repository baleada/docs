---
title: every
source: object.ts
tests: node/object.test.ts
publish: true
order: 0
---

`createEvery` is a [pipe](/docs/logic/pipes-overview) that transforms an object to a boolean indicating whether or not every key/value pair meets some condition.


:::
## Create every
:::

Call `createEvery` with these parameters to create your `every` function:

::: ariaLabel="createEvery parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `predicate` | Function | yes | A function that receives two parameters—`key` and `value`—and should return a boolean indicating whether or not the key/value pair meets some condition. |
:::

