---
title: Pipes
tags: UI Logic
publish: true
order: 3
---

In Baleada Logic, every **pipe** is a [higher order function](https://medium.com/javascript-scene/higher-order-functions-composing-software-5365cf2cbe99), i.e. a function that returns a function. Pipes are designed to be used with the [pipeline operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator).

Unlike Baleada Logic's [classes](/docs/logic/classes-overview), which are tailor-made for pretty specific browser-based UI features, pipes are more like utility functions, and are more generally useful across many different environments, regardless of build tooling or other dependencies in your project.

Pipes are very similar to [links](/docs/logic/links-overview) in Baleada Logic, with one key difference: pipes are **pure functions** that transform an input to an output, without performing any side effects or mutating any parameters.

Some pipes are extremely thin wrappers around third party code, like [`clsx`](https://github.com/lukeed/clsx), [`@sindresorhus/slugify`](https://github.com/sindresorhus/slugify), anything from [`lazy-collections`](https://github.com/RobinMalfait/lazy-collections), etc. These pipes aren't supposed to add functionality—they're just supposed to sprinkle a functional programming aesthetic onto a curated collection of some of the best utility functions on the web, handpicked based on tradeoffs of speed, bundle size, reliability, and feature-completeness.

Here's an example of how you would use pipes with the pipeline operator:

:::
```js
import { createClip, createSlug } from '@baleada/logic'

const clip = createClip(' for building web apps')
const slug = createSlug()

const result = 'Baleada: a toolkit for building web apps'
  |> clip // 'Baleada: a toolkit'
  |> slug // 'baleada-a-toolkit'
```
:::

Every pipe **creates a function** that accepts a single argument. By passing options to the pipe, you can customize the behavior of the function it returns.

If you're working in an environment that doesn't support the pipeline operator, I recommend installing `lazy-collections` (a Baleada Logic dependency) and importing the [`pipe`](https://github.com/RobinMalfait/lazy-collections#pipe) function.

To learn more, visit the docs for each pipe exported by Baleada Logic. For a complete list of available pipes, see the **Pipes** section under the **Logic** heading in the left sidebar.
