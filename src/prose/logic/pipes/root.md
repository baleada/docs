---
title: root
tags: UI Logic
source: graph-node.ts
tests: node/graph-node.test.ts
publish: false
order: 0
---

`createRoot` is a [pipe](/docs/logic/pipes-overview) that transforms a [node](/docs/logic/graph-overview#graph-node-and-edge) to a boolean indicating whether or not that node is a root node (i.e. has no incoming edges).


:::
## Create root
:::

Call `createRoot` with these parameters to create your `root` function:

::: ariaLabel="createRoot parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `graph` | [graph](/docs/logic/graph-overview) | yes | The graph to analyze. |
:::

