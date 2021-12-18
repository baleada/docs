---
title: What is Baleada Composition?
tags: Composables
publish: true
order: 0
---

Baleada Composition is a collection of low-level Vue 3 composables. Each composables is responsible for creating a reactive instance of a [Baleada Logic](/docs/logic) class, and if applicable, cleaning up any of the instance's side effects before the Vue component unmounts.


:::
## Installation
:::

Baleada Composition might someday have separate packages for multiple different reactivity and component frameworks, but right now, only the [Vue 3](https://v3.vuejs.org) implementation is available:

:::
```bash
npm i @baleada/vue-composition
```
:::


:::
## Available composables
:::

Baleada Composition exports a composable for each individual class in Baleada Logic.

All composables follow a simple naming convention: they start with `use` and end with the name of the class.

::: ariaLabel="Examples of composable names"
| Class | Composition function |
| --- | --- |
| Animateable | `useAnimateable` |
| Fetchable | `useFetchable` |
| Searchable | `useSearchable` |
:::


:::
## Import a composable
:::

All Baleada Composition functions can be imported from `@baleada/vue-composition`:

:::
```js
// Import a class
import { useAnimateable } from '@baleada/vue-composition'
```
:::


:::
## Use a composable
:::

Baleada Composition functions always need to be called from inside your component's `setup` function, or inside another composable that gets called inside your `setup` function:

:::
```js
import { useAnimateable } from '@baleada/vue-composition'

export default {
  setup () {
    const animateable = useAnimateable(myKeyframes, myOptions)
  }
}
```
:::

Each Baleada Composition function returns a reactive reference, i.e. an object with a `value` property where the reactive state is stored:

:::
```js
import { isRef } from 'vue'
import { useSearchable } from '@baleada/vue-composition'

export default {
  setup () {
    const searchable = useSearchable(myCandidates, myOptions)

    console.log(isRef(searchable)) // true

    // Access state and methods inside the value property
    searchable.value.search(mySearchQuery) 
    console.log(searchable.value.results)
  }
}
```
:::

Certain state and methods on Baleada Logic classes can't be used until the DOM is available, and the Baleada Logic docs always let you know when that's the case for a given property or method.

When you're using Baleada Composition with Vue, just know that you need to access those properties and call those methods from within the `onMounted` lifecycle hook:

:::
```html
<template>...</template>

<script>
import { onMounted } from 'vue'
import { useListenable } from '@baleada/vue-composition'

export default {
  setup () {
    const listenable = useListenable('cmd+shift+b')

    onMounted(() => {
      // Listenable's 'listen' method requires DOM access,
      // so you need to call it inside onMounted.
      listenable.value.listen(event => console.log(event))
    })
  }
}
</script>
```
:::

And finally, the last thing to be aware of is that Baleada Composition functions always clean up after themselves.

More specifically: every Baleada Logic class that has side effects (e.g. adding event listeners) _also_ has a `stop` method that cleans up all side effects. For those classes, Baleada Composition calls the `stop` method automatically on Vue's [`onBeforeUnmount` lifecycle hook](https://v3.vuejs.org/api/composition-api.html#lifecycle-hooks), ensuring that all side effects are cleaned up before the component gets torn down.

:::
```html
<template>...</template>

<script>
import { onMounted, onBeforeUnmount } from 'vue'
import { useListenable } from '@baleada/vue-composition'

export default {
  setup () {
    const listenable = useListenable('cmd+shift+b')

    onMounted(() => {
      listenable.value.listen(event => console.log(event))
    })

    // No need to call 'stop' on onBeforeUnmount. useListenable
    // takes care of it for you. Cut out this boilerplate
    // and work on bigger and better things!
    //
    // onBeforeUnmount(() => listenable.value.stop())
  }
}
</script>
```
:::


:::
## Semantic versioning conventions
:::

The following things will trigger a new major release of Baleada Composition:
- Changes to the overall API, import paths, or general workflow

The following things will trigger a new minor release:
- New minor versions of Vue 3
- Additions of new Baleada Logic classes
- Any changes to Baleada Logic classes that result in changes to the internals of Baleada Composition (e.g. if a Baleada Logic class changes and now creates side effects that need to be cleaned up)
