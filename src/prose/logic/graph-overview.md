---
title: Graph
tags: UI Logic
source: extracted/graph.ts
publish: false
order: 6
---

Baleada Logic includes [pipes](/docs/logic/pipes-overview) for working with **graphs**, i.e. collections of interconnected nodes.

Currently, pipes focus on a specific type of graph, the [directed acyclic graph](https://en.wikipedia.org/wiki/Directed_acyclic_graph), because that's the type of graph you'll most commonly found in UIs.

These examples of directed acyclic graphs probably exist right now in your UIs:
- Multi-step forms, especially ones that branch off in multiple directions
- Decision trees
- User onboarding flows
- Grids/tables/spreadsheets
- The DOM
- Rich text editor contents (which are basically the DOM, but text editor libraries often maintain a custom internal data structure that's also a directed acyclic graph)

Baleada Logic's goals in this area are:
- Define flexible data structures that serve all of these use cases, and more
- Make it possible to write more patterned, reusable, type-safe code when interacting with graph data structures
- Make sure it's relatively easy to write code or build UI that can add to graph data structures


:::
## Data structures
:::

:::
### Graph, node, and edge
:::

A **graph** is defined as an object with two properties: `nodes` and `edges`.

`nodes` should be an array of strings, each of which should uniquely identify a single node in the graph.

`edges` should be an array of objects, which have the following properties (all required):

::: ariaLabel="Edge properties" classes="wide-4"
| Property | Type | Description |
| --- | --- | --- |
| `from` | GraphNode | The node where the edge starts. |
| `to` | GraphNode | The node where the edge ends. |
| `predicateShouldTraverse` | Function | <p>A function that accepts the state of the graph as a parameter and returns `true` if the edge should be traversed, and `false` if it should not.</p><p>Keep reading for more info about graph state and how it affects graph traversal.</p> |


:::
### Async graph
:::

In some cases, the `predicateShouldTraverse` function of edges needs to perform asynchronous logic. That's fully supported!

Graphs that support asynchronous traversal are called **async graphs**. They're defined exactly the same as synchronous graphs, except that their edges' `predicateShouldTraverse` functions are allowed to return a `Promise` that resolves to a boolean indicating whether or not the edge should be traversed, based on graph state.


:::
### State
:::

In Baleada Logic, graphs can be in a **state**. The state of a graph is modeled as an object where properties are node IDs and values are objects with two properties: `status` and `metadata`.

`status` is either `set` or `unset`. A node is considered `set` if it has been visited during traversal, and `unset` if it has not.

`metadata` is any data you want to store with the node to describe the state of the graph.

For example, if you're building a multi-step survey that can branch off in many directions:
- Each node in your graph is a survey question
- Each edge in your graph is a link between one survey question and the next
- In `state.someNode.metadata`, you can store the answer to the `someNode` question. Edges can use this metadata to determine if they should be traversed, or if the survey should branch off in a different direction.

Here's an example of a simple graph that implements the following logic:
- The survey starts with the question, "Do you love food?"
- If the user answers "yes", ask, "What's your favorite food?"
- If the user answers "no", ask, "Do you love art?"
- If the user answers "yes", ask, "What's your favorite color?"

:::
```ts
const graph = {
  nodes: [
    "Do you love food?",
    "Do you love art?",
    "What's your favorite food?",
    "What's your favorite color?"
  ],
  edges: [
    {
      from: "Do you love food?",
      to: "What's your favorite food?",
      predicateShouldTraverse: state =>
        state["Do you love food?"].metadata === "yes",
    },
    {
      from: "Do you love food?",
      to: "Do you love art?",
      predicateShouldTraverse: state =>
        state["Do you love food?"].metadata === "no",
    },
    {
      from: "Do you love art?",
      to: "What's your favorite color?",
      predicateShouldTraverse: state =>
        state["Do you love art?"].metadata === "yes",
    },
  ]
}
```
:::

That's a more concrete example, but graph state also supports very abstract operations.

For example, the [directed acyclic depth first steps](/docs/logic/pipes/directed-acyclic-depth-first-steps) function uses graph state to keep track of how many children have been discovered for a given node. It uses this information to determine if it should keep digging down further in the tree, or whether it's time to jump back up a level and explore the next branch.


:::
### Path
:::

A **path** is an array of node IDs, telling you which nodes were followed to get to the current node.

Paths are created by stepping through the graph, traversing edges based on the current state.


:::
### Step
:::

When you traverse a graph in Baleada Logic, you generate a piece of data called a **step** each time you step onto a new node.

A step is an object with two properties: `path` and `state`.

`path` is an array of node IDs, telling you which nodes were followed to get to the current node.

`state` is the current state of the graph, explaining why/how you arrived at the current node.


:::
### Common ancestor
:::

A **common ancestor** is a node that is an ancestor of both of two other nodes you're analyzing.

For example, in the following graph, `A` is a common ancestor of `B` and `C`:

:::
```ts
const graph = {
  nodes: ["A", "B", "C", "D", "E"],
  edges: [
    { from: "A", to: "B", predicateShouldTraverse: () => true },
    { from: "A", to: "C", predicateShouldTraverse: () => true },
    { from: "B", to: "D", predicateShouldTraverse: () => true },
    { from: "C", to: "D", predicateShouldTraverse: () => true },
    { from: "D", to: "E", predicateShouldTraverse: () => true },
  ]
}
```
:::

The [directed acyclic common ancestors](/docs/logic/pipes/directed-acyclic-common-ancestors) pipe is a good example of a function that finds and returns common ancestors for any two given nodes.

A common ancestor is modeled as an object with two properties: `node` and `distances`.

`node` is the unique ID of the common ancestor node.

`distances` is an object where properties are node IDs and values are numbers, telling you how many steps away each node is from the common ancestor.


:::
### Tree node
:::

Baleada Logic's data structure for graphs flexible, organized, and powerful, but you'll find cases where it's better , and moreto organize data in a more traditional tree structure, i.e. an array of objects, where each object that contains a node ID and a nested array of child nodes.

In Baleada Logic, these objects are called **tree nodes**. They each have a `node` property to hold the node ID, and a `children` property to hold the nested array of children, which are also modeled as tree nodes.


:::
### Tree
:::

A **tree** is an array of tree nodes.


:::
## Further reading
:::

More documentation might land here in the future, but if you want to learn more in the meantime, click the link at the top of this article to view the source code and type definitions for graphs in Baleada Logic.

You can also check out any of the Baleada Logic pipes related to graphs:
- [incoming](/docs/logic/pipes/incoming)
- [indegree](/docs/logic/pipes/indegree)
- [outgoing](/docs/logic/pipes/outgoing)
- [outdegree](/docs/logic/pipes/outdegree)
- [root](/docs/logic/pipes/root)
- [directed-acyclic-ancestor](/docs/logic/pipes/directed-acyclic-ancestor)
- [directed-acyclic-common-ancestors](/docs/logic/pipes/directed-acyclic-common-ancestors)
- [directed-acyclic-depth-first-steps](/docs/logic/pipes/directed-acyclic-depth-first-steps)
- [directed-acyclic-layers](/docs/logic/pipes/directed-acyclic-layers)
- [directed-acyclic-node-depth-first-steps](/docs/logic/pipes/directed-acyclic-node-depth-first-steps)
- [directed-acyclic-path](/docs/logic/pipes/directed-acyclic-path)
- [directed-acyclic-roots](/docs/logic/pipes/directed-acyclic-roots)
- [directed-acyclic-tree](/docs/logic/pipes/directed-acyclic-tree)
- [directed-acyclic-async-ancestor](/docs/logic/pipes/directed-acyclic-async-ancestor)
- [directed-acyclic-async-common-ancestors](/docs/logic/pipes/directed-acyclic-async-common-ancestors)
- [directed-acyclic-async-depth-first-steps](/docs/logic/pipes/directed-acyclic-async-depth-first-steps)
- [directed-acyclic-async-layers](/docs/logic/pipes/directed-acyclic-async-layers)
- [directed-acyclic-async-node-depth-first-steps](/docs/logic/pipes/directed-acyclic-async-node-depth-first-steps)
- [directed-acyclic-async-path](/docs/logic/pipes/directed-acyclic-async-path)
- [directed-acyclic-async-tree](/docs/logic/pipes/directed-acyclic-async-tree)
