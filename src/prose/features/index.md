---
title: What is Baleada Features?
tags: Composables
publish: true
order: 0
---

Baleada Features is a collection of functions that implement all kinds of useful features in Vue 3.

Some of these functions offer simple features, like the ability to reactively track the width of an element, and whether that element is currently wider than certain breakpoints.

Other functions implement all of the logic for complex, fully accessible interfaces, like tablists, comboboxes, carousels, etc.

Baleada Features doesn't include any markup or styles. Instead, it combines composables from [Baleada Composition](/docs/composition) with the Vue Composition API to create JavaScript-only layers of logic, which you can use directly in your app, or to power your own custom component library, with your own custom markup and styles.

::: type="success"
For a ✨111-page✨ deep dive in to the patterns, concepts, and Vue 3 best practices behind Baleada Features, [check out "Rethinking Reusability in Vue"](https://rethinking-reusability-in-vue.alexvipond.dev).
:::


:::
## Installation
:::

Baleada Features might someday have separate packages for multiple different reactivity and component frameworks, but right now, only the [Vue 3](https://v3.vuejs.org) implementation is available:

:::
```bash
npm i @baleada/vue-features
```
:::


:::
## Using functions
:::

The functions exported by Baleada Features fall into three categories:
1. Interfaces
2. Extensions
3. Affordances

**Interfaces** are composables that add rich interactivity and accessibility to your markup.

Some examples of interfaces are:
- [`useTablist`](/docs/features/interfaces/tablist)
- [`useTextbox`](/docs/features/interfaces/textbox)
- [`useListbox`](/docs/features/interfaces/listbox)

Jump to the [Using interfaces](#using-interfaces) section to learn more about basic interface usage.

**Extensions** are composables that add optional layers of functionality and accessibility as needed.

Some examples of extensions are:
- [`useLabel`](/docs/features/extensions/label)
- [`useVisibility`](/docs/features/extensions/visibility)
- [`useMarkdownCompletion`](/docs/features/extensions/markdown-completion)

Jump to the [Using extensions](#using-extensions) section to learn more about basic extension usage.

**Affordances** are functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside of composables.

Some examples of affordances are:
- [`bind`](/docs/features/affordances/bind)
- [`on`](/docs/features/affordances/on)
- [`show`](/docs/features/affordances/show)

Affordances are primarily used internally by interfaces and extensions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composables, following the style and patterns of Baleada Features.

Jump to the [Using affordances](#using-affordances) section to learn more about basic affordance usage.


:::
### Using interfaces
:::

Import any interface to start using it in your Vue component. Most often, you'll use interfaces in the `setup` function of a Vue component:

:::
```html
<script setup>
import { useTablist } from '@baleada/vue-features'

const tablist = useTablist(...)
</script>
```
:::

Every interface accepts only one parameter: an `options` object that customizes basic functionality. Every interface returns an object with tools you can use to set up and control your UI.

:::
```html
<script setup>
import { useTextbox } from '@baleada/vue-features'

// For example, use the `options` object to customize
// the initial value of a textbox:
const textbox = useTextbox({ initialValue: 'Hello world' })

function handleUndoButtonClick () {
  // Use the `undo` method of the returned `textbox`
  // object to programmatically undo changes:
  textbox.undo()
}
</script>
```
:::

To learn more, visit the docs for each interface exported by Baleada Features. For a complete list of available interfaces, see the **Interfaces** section under the **Features** heading in the left sidebar.


:::
### Using extensions
:::

Import any extension to start using it in your Vue component. Most often, you'll use extensions in the `setup` function of a Vue component:

:::
```html
<script setup>
import { useTextbox, useTextboxStorage } from '@baleada/vue-features'

// Set up a textbox interface
const textbox = useTextbox()

// To extend your `textbox`'s functionality, pass it into the
// `useTextboxStorage` extension.
//
// Now, the textbox's value will automatically get stored in 
// `localStorage`, and when the component is mounted, your 
// `textbox` will update its value if `localStorage` has 
// any contents.
const storage = useTextboxStorage(textbox, { key: 'my textbox' })
</script>
```
:::

As their first parameter, extensions can accept one of two things:
- The object returned from a Baleada Features interface function
- A reactive reference to an HTML element

Not every extension accepts all of these things, though. `useMarkdownCompletion`, for example, specifically accepts the `textbox` object returned from the `useTextbox` interface, and won't accept any other interface objects, nor a reactive reference to an HTML element.

The docs for each extension, along with TypeScript types, will let you know what the extension accepts as valid first parameters.

`useSize`, for example, can accept either of those two options:

:::
```html
<script setup>
import { ref, onMounted } from 'vue'
import { useSize } from '@baleada/vue-features'

const body = ref()
onMounted(() = body.value = document.body)

// We could pass an interface object as the first argument,
// but in this example, we'll pass a reactive reference to
// the document body:
const size = useSize(body)
</script>
```
:::

As the second parameter, many extensions also accept an `options` object that customizes functionality.

Every extension returns an object with tools you can use to set up and control your extended functionality.

:::
```html
<script setup>
import { ref, readonly, watchEffect } from 'vue'
import { useSize } from '@baleada/vue-features'

const body = ref()
onMounted(() = body.value = document.body)

// Optionally use `readonly` to unwrap all refs, so
// everything can be accessed reactively without using
// `.value`:
const size = readonly(useSize(body))

const addOrientationClass = () => {
  document.body.classList.add(`orientation-${size.orientation}`)
}

const cleanupOrientationClasses = () => {
  document.body.classList.remove(
    'orientation-landscape',
    'orientation-portrait',
    'orientation-none'
  )
}

watchEffect(() => {
  // Clean up any previous effects
  cleanupOrientationClasses()
  
  // Reactively add a class to the body based on its orientation:
  addOrientationClass()
})
</script>
```
:::

To learn more, visit the docs for each extension exported by Baleada Features. For a complete list of available extensions, see the **Extensions** section under the **Features** heading in the left sidebar.


:::
### Using affordances
:::

Baleada Features' Vue implementation also exports "affordances": functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composables.

:::
```js
import { bind, on, show, model } from '@baleada/vue-features'
```
:::

Vue templates, for example, allow you to easily bind static reactive data to the attributes of any element:

:::
```html
<!-- MyComponent.vue -->
<template>
  <div
    role="tab"
    :aria-selected="isSelected"
    :class="isSelected ? 'border-blue-600' : 'border-gray-200'"
  >
    ...
  </div>
</template>
```
:::

Inside a composable, it's not obvious how to properly recreate this behavior, but Baleada Features' `bind` affordance makes it a cinch:

:::
```js
import { bind } from '@baleada/vue-features'

// useMyFeature.js
export default function useMyFeature () {
  const element = ref(null),
        isSelected = computed(...)

  bind({
    element,
    values: {
      // bind can assign static values
      role: 'tab',
      // But it really shines with reactive values
      ariaSelected: isSelected,
      class: computed(() => 
        isSelected.value 
          ? 'border-blue-600' 
          : 'border-gray-200'
      ),
    }
  })

  // This returned ref would be attached to an element
  // in the Vue template
  return element
}
```
:::

These functions are primarily used internally by various interfaces and extensions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composables, following the style and patterns of Baleada Features.

To learn more, visit the docs for each affordance exported by Baleada Features. For a complete list of available affordances, see the **Affordances** section under the **Features** heading in the left sidebar.
