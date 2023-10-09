---
title: deep merge
tags: UI Logic
source: object.ts
publish: true
order: 0
---

`createDeepMerge` is a [pipe](/docs/logic/pipes-overview) that transforms an object to an object deeply merged with another object.

::: type="info"
`createDeepMerge` is a thin wrapper around [`dset/merge`](https://github.com/lukeed/dset/tree/master#merging).
:::


:::
## Create deep merge
:::

Call `createDeepMerge` with these parameters to create your `deepMerge` function:

::: ariaLabel="createDeepMerge parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `override` | Object | yes | An object whose properties should merge into your object, overriding its values. |
:::

