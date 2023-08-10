---
title: Links
tags: UI Logic
publish: true
order: 3
---

In Baleada Logic, every **link** is a [higher order function](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99), i.e. a function that returns a function. Links are designed to be used with the [pipeline operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator).

Unlike Baleada Logic's [classes](/docs/logic/classes-overview), which are tailor-made for pretty specific browser-based UI features, links are more like utility functions, and are more generally useful across many different environments, regardless of build tooling or other dependencies in your project.

Links are very similar to [pipes](/docs/logic/pipes-overview) in Baleada Logic, with one key difference: links perform side effects and/or mutate parameters, and they always return the parameter they receive as input.

Here's an example of how you would use links with the pipeline operator:

:::
```js
import {
  createAssociativeArraySet as createSet,
  createAssociativeArrayDelete as createDelete,
} from '@baleada/logic'

const set = createSet('baz', 'qux')
const _delete = createDelete('foo')

const result = [['foo', 'bar']]
  |> set // [['foo', 'bar'], ['baz', 'qux']]
  |> _delete // [['baz', 'qux']]
```
:::

Every link **creates a function** that accepts a single argument. By passing options to the link, you can customize the behavior of the function it returns.

If you're working in an environment that doesn't support the pipeline operator, I recommend installing `lazy-collections` (a Baleada Logic dependency) and importing the [`pipe`](https://github.com/RobinMalfait/lazy-collections#pipe) function.

To learn more, visit the docs for each link exported by Baleada Logic. For a complete list of available links, see the **Links** section under the **Logic** heading in the left sidebar.
