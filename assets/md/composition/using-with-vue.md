---
title: Using Baleada Composition with Vue
tags: Composition functions, Vue
publish: true
---


:::
## Install
:::

:::
```bash
npm i @baleada/composition-vue
```
:::


:::
## Import a composition function
:::

All Baleada Composition functions be imported from `@baleada/composition-vue`:

:::
```js
// Import a class
import { useAnimateable } from '@baleada/icons-vue'

// Import a factory
import { useDeleteable } from '@baleada/icons-vue'
```
:::


:::
## Use a component
:::

::: type="danger"
Baleada Composition functions are designed to be used with the upcoming Vue 3. If you want to start using them now, be sure to install the [`@vue/composition-api`](https://github.com/vuejs/composition-api) plugin and [`Vue.use`](https://github.com/vuejs/composition-api#usage) the plugin in your app.

Note that `@vue/composition-api`, while awesome, is not yet considered production-ready (but it powers this website, so take it or leave it).
:::


Internally, Baleada Composition functions use Vue 3 for reactivity and lifecycle hooks, so they always need to be called from inside your component's `setup` function:

:::
```js
import { useAnimateable } from '@baleada/icons-vue'

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
import { isRef } from '@vue/composition-api'
import { useSearchable } from '@baleada/icons-vue'

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
<template lang="html">
  <section>
    <!-- 
      Vue 3 unwraps refs in the template, so you can omit the 'value' property 
      when accessing state and methods here.
    -->
    <button @click="() => navigateable.next()">Next</button>
    <button @click="() => navigateable.previous()">Previous</button>
    <button @click="() => navigateable.random()">Random</button>
    <pre><code>{{ navigateable.location }}</code></pre>
  </section>
</template>

<script>
import { useNavigateable } from '@baleada/composition-vue'
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

The last thing to be aware of is that Baleada Composition functions clean up after themselves. More specifically: every Baleada Logic class that has side effects (e.g. adding event listeners) _also_ has a `stop` method that cleans up all side effects.

For those classes, Baleada Composition calls the `stop` method automatically on Vue's [`onBeforeUnmount` lifecycle hook](https://vue-composition-api-rfc.netlify.com/api.html#lifecycle-hooks), ensuring that all side effects are cleaned up before the component gets torn down.

:::
```html
<template>...</template>

<script>
import { onMounted, onBeforeUnmount } from '@vue/composition-api'
import { useListenable } from '@baleada/composition-vue'

export default {
  setup () {
    const listenable = useListenable('cmd+shift+b')

    onMounted(() => {
      // Listenable's 'listen' method requires DOM access,
      // so you need to call it inside onMounted.
      listenable.value.listem(event => console.log(event))
    })

    // No need to call 'stop' on onBeforeUnmount—useListenable
    // takes care of it for you. Cut out this boilerplate
    // and work on bigger and better things!
    //
    // onBeforeUnmount(() => listenable.value.stop())
  }
}
</script>
```
:::
