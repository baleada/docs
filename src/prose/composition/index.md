---
title: What is Baleada Composition?
source: vue-composition
publish: true
order: 0
summary: A collection of low-level Vue 3 composables that integrate Baleada Logic classes with Vue's reactivity system
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
| Pickable | `usePickable` |
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
```html
<script setup>
import { useAnimateable } from '@baleada/vue-composition'
const animateable = useAnimateable(myKeyframes, myOptions)
</script>
```
:::

Each Baleada Composition function returns a [shallow reactive](https://vuejs.org/api/reactivity-advanced.html#shallowreactive):

:::
```html
<script setup>
import { watch } from 'vue'
import { usePickable } from '@baleada/vue-composition'
const pickable = usePickable(myArray, myOptions)

// You can watch first-level properties of the shallow reactive
watch(
  () => pickable.picks,
  () => {...}
)

// This won't work—you can't watch sub-properties of the
// shallow reactive.
watch(
  () => pickable.picks[0],
  () => {...}
)
</script>
```
:::

Certain state and methods on Baleada Logic classes can't be used until the DOM is available, and the Baleada Logic docs always let you know when that's the case for a given property or method.

When you're using Baleada Composition with Vue, just know that you need to access those properties and call those methods from within the `onMounted` lifecycle hook:

:::
```html
<template>...</template>

<script setup>
import { onMounted } from 'vue'
import { useListenable } from '@baleada/vue-composition'

const listenable = useListenable('keydown')

onMounted(() => {
  // Listenable's 'listen' method requires DOM access,
  // so you need to call it inside onMounted.
  listenable.listen(event => console.log(event))
})
</script>
```
:::

And finally, the last thing to be aware of is that Baleada Composition functions always clean up after themselves.

More specifically: every Baleada Logic class that has side effects (e.g. adding event listeners) _also_ has a `stop` method that cleans up all side effects. For those classes, Baleada Composition calls the `stop` method automatically with Vue's [`onScopeDispose` lifecycle hook](https://vuejs.org/api/reactivity-advanced.html#onscopedispose), ensuring that all side effects are cleaned up when the component gets torn down (or the effect scope gets cleaned up).

:::
```html
<template>...</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useListenable } from '@baleada/vue-composition'

const listenable = useListenable('keydown')

onMounted(() => {
  listenable.listen(event => console.log(event))
})

// No need to call 'stop' on onBeforeUnmount. useListenable
// takes care of it for you. Cut out this boilerplate
// and work on bigger and better things!
//
// onBeforeUnmount(() => listenable.stop())
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
