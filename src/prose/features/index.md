---
title: What is Baleada Features?
tags: Composables
publish: true
order: 0
---

Baleada Features is a collection of functions that implement all kinds of useful features in Vue 3.

Some of these functions offer simple features, like the ability to reactively track the width of an element, and whether that element is currently wider than certain breakpoints.

Other functions implement all of the logic for complex, fully accessible interfaces, like tablists, comboboxes, grids, etc.

Baleada Features doesn't include any markup or styles. Instead, it combines composables from [Baleada Composition](/docs/composition) with the Vue Composition API to create JavaScript-only layers of logic, which you can use directly in your app, or to power your own custom component library, with your own custom markup and styles.

::: type="success"
For a ✨111-page✨ deep dive in to the patterns, concepts, and Vue 3 best practices behind Baleada Features, [check out "Rethinking Reusability in Vue"](https://rethinking-reusability-in-vue.alexvipond.dev).

Use code BALEADA for $15 off!
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

The functions exported by Baleada Features fall into five categories:
1. Interfaces
2. Combos
3. Extensions
4. Affordances
5. Utilities

**Interfaces** are composables that add rich interactivity and accessibility to your markup.

Some examples of interfaces are:
- [`useTablist`](/docs/features/interfaces/tablist)
- [`useTextbox`](/docs/features/interfaces/textbox)
- [`useListbox`](/docs/features/interfaces/listbox)

Jump to the [Using interfaces](#using-interfaces) section to learn more about basic interface usage.

**Combos** are composables that combine multiple interfaces under the hood. Some examples of combos are:
- [`useCombobox`](/docs/features/combos/combobox) (Combines [`useTextbox`](/docs/features/interfaces/textbox) with [`useListbox`](/docs/features/interfaces/listbox))
- [`useSelect`](/docs/features/combos/select) (Combines [`useButton`](/docs/features/interfaces/button) with [`useListbox`](/docs/features/interfaces/listbox))

Jump to the [Using combos](#using-combos) section to learn more about basic combo usage.

**Extensions** are composables that add optional layers of functionality and accessibility as needed.

Some examples of extensions are:
- [`useLabel`](/docs/features/extensions/label)
- [`useVisibility`](/docs/features/extensions/visibility)
- [`useMarkdownCompletion`](/docs/features/extensions/markdown-completion)

Jump to the [Using extensions](#using-extensions) section to learn more about basic extension usage.

**Affordances** are functions that implement certain features that are readily available in Vue templates, but are not so easy to figure out inside of composables.

Some examples of affordances are:
- [`bind`](/docs/features/affordances/bind)
- [`on`](/docs/features/affordances/on)
- [`show`](/docs/features/affordances/show)

Affordances are primarily used internally by interfaces and extensions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composables, following the style and patterns of Baleada Features. They're also super useful for authors who want to [organize their code by logical concern](https://www.youtube.com/watch?v=q4a115Kdla8) in Vue setup functions.

Jump to the [Using affordances](#using-affordances) section to learn more about basic affordance usage.

**Utilities** are small utility functions for working with **function refs**, the awesome Vue feature that is the backbone of Baleada Features. For more info on function refs and how they're used in Baleada Features, see the [Element API](/docs/features/shared/element-api) guide.

Some example of utilities are:
- [`toComponentRef`](/docs/features/utilities/toComponentRef)
- [`toMultiRef`](/docs/features/utilities/toMultiRef)

Visit any utility's dedicated guide to learn more about its use cases and usage.


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
### Using combos
:::

Import any combo to start using it in your Vue component. Most often, you'll use combos in the `setup` function of a Vue component:

:::
```html
<script setup>
import { useSelect } from '@baleada/vue-features'

const select = useSelect(...)
</script>
```
:::

Every combo accepts only one parameter: an `options` object that customizes basic functionality. Every combo returns an object with tools you can use to set up and control your UI.

:::
```html
<script setup>
import { useSelect } from '@baleada/vue-features'

// For example, use the `options` object to customize
// the initially selected value of the select's listbox
// ("select" is a combination of a listbox and a button):
const select = useSelect({
  listbox: { multiselectable: true, initialSelected: [3, 6] }
})
</script>
```
:::

To learn more, visit the docs for each combo exported by Baleada Features. For a complete list of available combos, see the **Combos** section under the **Features** heading in the left sidebar.


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

As their first parameter, extensions can accept one of three things:
- The return value of a Baleada Features interface function
- An interface included in the return value of a combo function (for example you can pass `useSelect().listbox` to an extension)
- A reactive reference to an HTML element

Not every extension accepts all of these things, though. `useMarkdownCompletion`, for example, specifically accepts the `textbox` object returned from the `useTextbox` interface, and won't accept any other interface objects, nor a reactive reference to an HTML element.

The docs for each extension, along with TypeScript types, will let you know what the extension accepts as valid first parameters.

`useSize`, for example, can accept any of those three options:

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
// Inside script setup
import { bind } from '@baleada/vue-features'

const element = ref(null), // `element` is a template ref in this case
      isSelected = computed(...)

bind(
  element,
  {
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
)
```
:::

These functions are primarily used internally by various interfaces, combos, and extensions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composables, following the style and patterns of Baleada Features. They're also super useful for authors who want to [organize their code by logical concern](https://www.youtube.com/watch?v=q4a115Kdla8) in Vue setup functions.

To learn more, visit the docs for each affordance exported by Baleada Features. For a complete list of available affordances, see the **Affordances** section under the **Features** heading in the left sidebar.
