---
title: tree find
tags: UI Logic
source: graph-tree.ts
publish: true
order: 0
---

`createTreeFind` is a [pipe](/docs/logic/pipes-overview) that performs a depth-first search on a graph tree (e.g. the output of [the directed acyclic tree pipe](/docs/logic/pipes/directed-acyclic-tree)) and returns the first of its nodes that matches a given node, or `undefined` if a matching node can't be found.


:::
## Create tree find
:::

Call `createTreeFind` with these parameters to create your `treeFind` function:

::: ariaLabel="createTreeFind parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `node` | String | yes | The node you're looking for (the node itself is a unique string). |
:::

