---
title: directed acyclic depth-first steps
tags: UI Logic
source: directed-acyclic.ts
publish: true
order: 0
---

`createDirectedAcyclicDepthFirstSteps` is a [pipe](/docs/logic/pipes-overview) that transforms a [directed acyclic graph](/docs/logic/graph-overview) to depth-first [steps](/docs/logic/graph-overview#step) through the graph.

Your created `directedAcyclicDepthFirstSteps` function is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) that yields each step separately.

:::
## Create depth-first steps
:::

Call `createDirectedAcyclicDepthFirstSteps` with no parameters to create your `directedAcyclicDepthFirstSteps` function.

Call `createDirectedAcyclicDepthFirstSteps` with these parameters to create your `directedAcyclicDepthFirstSteps` function:

::: ariaLabel="createDirectedAcyclicDepthFirstSteps parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `directedAcyclicDepthFirstSteps` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createDirectedAcyclicDepthFirstSteps options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `root` | GraphNode (String) | See description | <p>The root node where `directedAcyclicDepthFirstSteps` should start its traversal.</p><p>If you don't pass a `root` node, `directedAcyclicDepthFirstSteps` will default to searching the array of nodes to find the first root node, as defined by [`createRoot`](/docs/logic/pipes/root).</p> |
| `toSetMetadata` | Function | `(node, totalConnectionsTraversed) => totalConnectionsTraversed` | <p>When stepping through the graph</p> |
