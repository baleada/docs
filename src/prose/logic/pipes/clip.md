---
title: clip
tags: UI Logic
source: string.ts
tests: node/string.test.ts
publish: true
order: 0
---

`createClip` is a [pipe](/docs/logic/pipes-overview) that transforms a string to a string with some content clipped out of it.


:::
## Create clip
:::

Call `createClip` with these parameters to create your `clip` function:

::: ariaLabel="createClip parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `content` | String, RegExp | Yes | A string to clip out of the string, or a RegExp that matches content to clip out of the string. |
:::

