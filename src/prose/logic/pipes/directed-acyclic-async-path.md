---
title: directed acyclic async path
source: directed-acyclic-async-state.ts
tests: node/directed-acyclic-async-state.test.ts
publish: false
order: 0
---

`createDirectedAcyclicAsyncPath` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms an [async directed acyclic graph](/docs/logic/graph-overview#async-graph) state to a [path](/docs/logic/graph-overview#path) that traverses through the graph.


:::
## Create path
:::

Call `createDirectedAcyclicAsyncPath` with these parameters to create your `directedAcyclicAsyncPath` function:

::: ariaLabel="createDirectedAcyclicAsyncPath parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclicAsync` | GraphAsync | yes | The async directed acyclic graph you're traversing. |
:::

