---
title: results
tags: UI Logic
source: string.ts
publish: true
order: 0
---

`createResults` is a [pipe](/docs/logic/pipes-overview) that transforms a string to an array of search results, optionally with fuzzy matching.

::: type="info"
`createResults` is a light wrapper around [`fast-fuzzy`](https://github.com/EthanRutherford/fast-fuzzy).
:::


:::
## Create results
:::

Call `createResults` with these parameters to create your `results` function:

::: ariaLabel="createResults parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `candidates` | Array | yes | The search candidates that will be made searchable. All items in `candidates` should be strings or objects. |
| `options` | Function, Object | no | See the [options](#options) section for more guidance. |
:::

:::
### Options
:::

The `options` parameter of `createResults` can be one of two things:
1. [fast-fuzzy options](https://github.com/EthanRutherford/fast-fuzzy#options)
2. OR, a function that returns fast-fuzzy options.

If you pass a function, it will receive an `api` object as its first and only parameter. Here are the details on that object:

::: ariaLabel="api object" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `sortKind` | String | fast fuzzy's `sortKind` enumerable. This is provided so you can easily and type-safely customize sort order via fast fuzzy options. |
:::


:::
## Using with TypeScript
:::

TypeScript will infer two things from your `candidates` and `options` parameters:
1. The type of items in the `candidates` array
2. Whether or not your search results will include match data

The search results you get back from your `results` function will be type-checked accordingly 🤓

