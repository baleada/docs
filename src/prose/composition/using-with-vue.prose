---
title: Using with Vue
tags: Composition functions, Vue
publish: true
---

Baleada Vue Composition is the Vue-compatible version of Baleada Composition.

:::
## Install
:::

:::
```bash
npm i @baleada/vue-composition
```
:::

Baleada Vue Composition lists [Baleada Logic](/docs/logic) as a peer dependency. Here's a snippet to install both:

:::
```bash
npm i @baleada/vue-composition @baleada/logic
```
:::


:::
## Import a composition function
:::

All Baleada Composition functions can be imported from `@baleada/vue-composition`:

:::
```js
// Import a class
import { useAnimateable } from '@baleada/vue-composition'

// Import a factory
import { useDeleteable } from '@baleada/vue-composition'
```
:::


:::
## Use a component
:::


Internally, Baleada Composition functions use Vue 3 for reactivity and lifecycle hooks, so they always need to be called from inside your component's `setup` function:

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

Each Baleada Composition function returns a reactive ref, i.e. an object with a `value` property where the reactive state is stored:

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

The major benefit of this is that you can render state from Baleada Logic classes in the DOM, and as those classes update their state, the DOM will update automatically. This example would render the `location` property of a [`Navigateable`](/docs/logic/classes/navigateable) instance in the DOM, keeping it up to date as various `Navigateable` methods are called.

:::
```html
<template>
  <!-- 
    Vue unwraps refs in the template, so you can omit the 'value' property 
    when accessing state and methods here.
  -->
  <button @click="() => navigateable.next()">Next</button>
  <button @click="() => navigateable.previous()">Previous</button>
  <button @click="() => navigateable.random()">Random</button>
  
</template>

<script>
import { useNavigateable } from '@baleada/vue-composition'
import myArray from 'path/to/some/data'

export default {
  setup () {
    const navigateable = useNavigateable(myArray)
    return { navigateable }
  }
}
</script>
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
