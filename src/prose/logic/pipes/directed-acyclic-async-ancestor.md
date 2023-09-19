---
title: directed acyclic async ancestor
tags: UI Logic
source: directed-acyclic-async-node.ts
publish: false
order: 0
---

`createDirectedAcyclicAsyncAncestor` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms two [nodes](/docs/logic/graph-overview#graph-node-and-edge) in a directed acyclic graph to a boolean indicating whether or not the second node is an ancestor of the first.


:::
## Create ancestor
:::

Call `createDirectedAcyclicAsyncAncestor` with no parameters to create your `directedAcyclicAsyncAncestor` function.

Call `createDirectedAcyclicAsyncAncestor` with these parameters to create your `directedAcyclicAsyncAncestor` function:

::: ariaLabel="createDirectedAcyclicAsyncAncestor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `directedAcyclicAsync` | GraphAsync | yes | The async directed acyclic graph to analyze. |
:::

