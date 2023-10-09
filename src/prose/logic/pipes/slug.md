---
title: slug
tags: UI Logic
source: string.ts
publish: true
order: 0
---

`createSlug` is a [pipe](/docs/logic/pipes-overview) that transforms a string to a slug.

::: type="info"
`createSlug` is a thin wrapper around [`@sindresorhus/slugify`](https://github.com/sindresorhus/slugify).
:::

:::
## Create slug
:::

Call `createSlug` with these parameters to create your `slug` function:

::: ariaLabel="createSlug parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | [`slugify` options](https://github.com/sindresorhus/slugify#api) |
:::

