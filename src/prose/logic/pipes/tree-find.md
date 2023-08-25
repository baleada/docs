---
title: tree find
tags: UI Logic
source: graph-tree.ts
publish: true
order: 0
---

`createTreeFind` is a [pipe](/docs/logic/pipes-overview) that performs a depth-first search on a [tree](/docs/logic/graph-overview#tree) and returns the first of its tree nodes that matches a given node, or `undefined` if a matching tree node can't be found.


:::
## Create tree find
:::

Call `createTreeFind` with these parameters to create your `treeFind` function:

::: ariaLabel="createTreeFind parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `node` | GraphNode | yes | The node you're looking for. |
:::

