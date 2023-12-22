---
title: some
tags: UI Logic
source: object.ts
tests: node/object.test.ts
publish: true
order: 0
---

`createSome` is a [pipe](/docs/logic/pipes-overview) that transforms an object to a boolean indicating whether or not some of its key/value pairs meet a given condition.


:::
## Create some
:::

Call `createSome` with these parameters to create your `some` function:

::: ariaLabel="createSome parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `predicate` | Function | yes | A function that receives two parameters—`key` and `value`—and should return a boolean indicating whether or not the key/value pair meets some condition. |
:::
