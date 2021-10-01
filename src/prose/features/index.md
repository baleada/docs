---
title: What is Baleada Features?
tags: Composition functions
publish: true
order: 0
---

Baleada Features is a collection of composition functions that implement UI logic for all kinds of useful features.

Some of these functions offer simple features, like the ability to reactively track the width of an element, and whether that element is currently wider than certain breakpoints.

Other functions implement all of the logic for complex, fully accessible interfaces, like tablists, comboboxes, carousels, etc.

Baleada Features doesn't include any markup or styles. Instead, it combines composition functions from [Baleada Composition](/docs/composition) with reactivity frameworks to create JavaScript-only layers of logic, which you can use directly in your app, or to power your own custom component library, with your own custom markup and styles.


:::
## Installation
:::

Right now, only the [Vue](https://v3.vuejs.org) implementation of Baleada Features is available:

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

**Interfaces** are functions that add rich interactivity and accessibility to your markup.

Some examples of interfaces are:
- [`useTablist`](/docs/features/interfaces/useTablist)
- [`useTextbox`](/docs/features/interfaces/useTextbox)
- [`useMenu`](/docs/features/interfaces/useMenu)

Jump to the [Using interfaces](#using-interfaces) section to learn more about basic interface usage.

**Extensions** are functions that add optional layers of functionality and accessibility as needed.

Some examples of extensions are:
- [`useLabel`](/docs/features/extensions/useLabel)
- [`useIntersection`](/docs/features/extensions/useIntersection)
- [`useMarkdownCompletion`](/docs/features/extensions/useMarkdownCompletion)

Jump to the [Using extensions](#using-extensions) section to learn more about basic extension usage.

**Affordances** are functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composition functions.

Some examples of affordances are:
- [`bind`](/docs/features/affordances/bind)
- [`on`](/docs/features/affordances/on)
- [`show`](/docs/features/affordances/show)

Affordances are primarily used internally by various features' composition functions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composition functions, following the style and patterns of Baleada Features.

Jump to the [Using affordances](#using-affordances) section to learn more about basic affordance usage.


:::
### Using interfaces
:::

Import any interface to start using it in your Vue component. Most often, you'll use interfaces in the `setup` function of a Vue component:

:::
```js
import { useTablist } from '@baleada/vue-features'

export default {
  setup () {
    const tablist = useTablist(...)
    
    ...
  }
}
```
:::

Every interface accepts only one argument: an `options` object that customizes basic functionality. Every interface returns an object with tools you can use to set up and control your UI.

:::
```js
import { useTextbox } from '@baleada/vue-features'

export default {
  setup () {
    // For example, use the `options` object to customize
    // the initial value of a textbox:
    const textbox = useTextbox({ initialValue: 'Hello world' })

    function handleUndoButtonClick () {
      // Use the `history` property of the returned `textbox`
      // object to programmatically undo or redo changes:
      textbox.history.undo()
    }

    ...
  }
}
```
:::

To learn more, visit the docs for each interface exported by Baleada Features. For a complete list of available interfaces, see the **Interfaces** section under the **Features** heading in the left sidebar.


:::
### Using extensions
:::

Import any extension to start using it in your Vue component. Most often, you'll use extensions in the `setup` function of a Vue component:

:::
```js
import { useTextbox, useTextboxStorage } from '@baleada/vue-features'

export default {
  setup () {
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

    ...
  }
}
```
:::

As their first argument, extensions can accept one of three things:
- The object returned from a Baleada Features interface function
- A function that returns an HTML element
- A reactive reference to an HTML element

Not every extension accepts all three of these things, though. `useMarkdownCompletion`, for example, specifically accepts the `textbox` object returned from the `useTextbox` interface.

The docs for each extension, along with TypeScript types, will let you know what the extension accepts as valid first arguments.

`useSize`, for example, can accept any of those three options:

:::
```js
import { useSize } from '@baleada/vue-features'

export default {
  setup () {
    // Track page size, using a `ResizeObserver` under the hood:
    const size = useSize(
      // We could pass an interface object as the first argument, or
      // a reactive reference to an HTML element, but in this
      // example, we'll pass a function that returns the `body`:
      () => document.body
    )

    ...
  }
}
```
:::

As the second argument, many extensions also accept an `options` object that customizes functionality.

Every extension returns an object with tools you can use to set up and control your extended functionality.

:::
```js
import { readonly, watchEffect } from 'vue'
import { useSize } from '@baleada/vue-features'

export default {
  setup () {
    // Use `readonly` to unwrap all refs, so everything
    // can be accessed reactively without using `.value`:
    const size = readonly(useSize(() => document.body))

    watchEffect(() => {
      // Clean up any previous effects
      document.body.classList.remove(
        'orientation-landscape',
        'orientation-portrait',
        'orientation-none'
      )

      // Reactively add a class to the body based on its orientation:
      document.body.classList.add(`orientation-${size.orientation}`)
    })

    ...
  }
}
```
:::

To learn more, visit the docs for each extension exported by Baleada Features. For a complete list of available extensions, see the **Extensions** section under the **Features** heading in the left sidebar.


:::
### Using affordances
:::

Baleada Features' Vue implementation also exports "affordances": functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composition functions.

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

Inside a composition function, it's not obvious how to properly recreate this behavior, but Baleada Features' `bind` affordance makes it a cinch:

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

These functions are primarily used internally by various features' composition functions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composition functions, following the style and patterns of Baleada Features.

To learn more, visit the docs for each affordance exported by Baleada Features. For a complete list of available affordances, see the **Affordances** section under the **Features** heading in the left sidebar.
