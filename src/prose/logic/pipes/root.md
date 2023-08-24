---
title: root
tags: UI Logic
source: graph.ts
publish: true
order: 0
---

`createRoot` is a [pipe](/docs/logic/pipes-overview) that transforms a node in a [graph](/docs/logic/graph-overview) to a boolean indicating whether or not that node is a root node (i.e. has no incoming connections).


:::
## Create root
:::

Call `createRoot` with these parameters to create your `root` function:

::: ariaLabel="createRoot parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `graph` | [graph](/docs/logic/graph-overview) | yes | The graph to analyze. |
:::

