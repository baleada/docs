---
title: indegree
tags: UI Logic
source: graph-node.ts
tests: node/graph-node.test.ts
publish: false
order: 0
---

`createIndegree` is a [pipe](/docs/logic/pipes-overview) that transforms a [node](/docs/logic/graph-overview#graph-node-and-edge) to the total number of its incoming edges.


:::
## Create indegree
:::

Call `createIndegree` with these parameters to create your `indegree` function:

::: ariaLabel="createIndegree parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `graph` | [graph](/docs/logic/graph-overview) | yes | The graph to analyze. |
:::

