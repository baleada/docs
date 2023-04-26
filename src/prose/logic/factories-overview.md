---
title: Factories
tags: UI Logic
publish: true
order: 3
---

In Baleada Logic, every **factory** is a [factory function](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1), i.e. a function that returns an object.

Baleada Logic's factories have one additional characteristic: all of the object's properties are functions. If/when these functions share state, the state is kept private inside the factory, and it's not intended for public consumption or observation.

In terms of utility, factories fall in between [classes](/docs/logic/classes-overview) and [pipes](/docs/logic/pipes-overview). They're less reusable than pipes, .

Unlike Baleada Logic's [classes](/docs/logic/classes-overview), which are tailor-made for pretty specific browser-based UI features, pipes are more like utility functions, and are more generally useful across many different environments, regardless of build tooling or other dependencies in your project.

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

If you're working in an environment that doesn't support the pipeline operator, you can shim support with Baleada Logic's `Pipeable` class.

The `Pipeable` constructor accepts one parameter: the piece of state that should be pipeable:

:::
```js
import { Pipeable } from '@baleada/logic'\

const pipeable = new Pipeable('Baleada: a toolkit for building web apps')
```
:::

Once your instance is constructed, you can call its `pipe` method, passing each function in your pipeline as an additional argument:

:::
```js
import { Pipeable, createClip, createSlug } from '@baleada/logic'

const clip = createClip(' for building web apps')
const slug = createSlug()

const result = new Pipeable('Baleada: a toolkit for building web apps')
  .pipe(
    clip,// 'Baleada: a toolkit'
    slug // 'baleada-a-toolkit'
  )
```
:::

If any of your functions are asynchronous, use your `Pipeable` instance's `pipeAsync` method instead:

:::
```js
import { Pipeable, createMapAsync, createFilterAsync } from '@baleada/logic'

const mapAsync = createMapAsync(async (item, index) => await doSomething(item, index))
const filterAsync = createFilterAsync(async (item, index) => await checkSomething(item, index))

async function doTheThing (array) {
  return await new Pipeable(myArray).pipeAsync(mapAsync, filterAsync)
}
```
:::

To learn more, visit the docs for each pipe exported by Baleada Logic. For a complete list of available pipes, see the **Pipes** section under the **Logic** heading in the left sidebar.
