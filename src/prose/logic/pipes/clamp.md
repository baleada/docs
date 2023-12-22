---
title: clamp
tags: UI Logic
source: number.ts
tests: node/number.test.ts
publish: true
order: 0
---

`createClamp` is a [pipe](/docs/logic/pipes-overview) that transforms a number to a number clamped between a min and max value.


:::
## Create clamp
:::

Call `createClamp` with these parameters to create your `clamp` function:

::: ariaLabel="createClamp parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `min` | `number` | Yes | The lower bound to clamp between. |
| `max` | `number` | Yes | The upper bound to clamp between. |
:::

