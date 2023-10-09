---
title: directed acyclic path
tags: UI Logic
source: directed-acyclic-state.ts
publish: false
order: 0
---

`createDirectedAcyclicPath` is a [pipe](/docs/logic/pipes-overview) that transforms a [directed acyclic graph](/docs/logic/graph-overview) state to a [path](/docs/logic/graph-overview#path) that traverses through the graph.


:::
## Create path
:::

Call `createDirectedAcyclicPath` with these parameters to create your `directedAcyclicPath` function:

::: ariaLabel="createDirectedAcyclicPath parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclic` | Graph | yes | The directed acyclic graph you're traversing. |
:::
