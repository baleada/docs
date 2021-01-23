---
title: What is Baleada Features?
tags: Composition functions
publish: true
order: 0
---

Baleada Features is a collection of stateless composition functions that implement the UI logic for features and widgets like tablists, comboboxes, carousels, etc.

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
## Using features
:::

Import any feature to start using it in your Vue component. Most often, you'll use features in the `setup` function:

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

To learn more, visit the docs for each function exported by Baleada Features. For a complete list of available features, see the **Functions** section under the **Features** heading in the left sidebar.


:::
## Using affordances
:::

Baleada Features' Vue implementation also exposes an `affordances` export:

:::
```js
import { useConditionalDisplay } from '@baleada/vue-features/affordances'
```
:::

The `affordances` export offers functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composition functions.

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

Inside a composition function, it's not obvious how to properly recreate this behavior, but Baleada Features' `useBindings` affordance makes it a cinch:

:::
```js
// useMyFeature.js
export default function useMyFeature () {
  const el = ref(null),
        isSelected = computed(...)

  useBindings({
    target: el,
    bindings: {
      // useBindings can assign static values
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
  return el
}
```
:::

These functions are primarily used internally by various features' composition functions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composition functions, following the style and patterns of Baleada Features.

To learn more, visit the docs for each affordance exported by Baleada Features. For a complete list of available affordances, see the **Affordances** section under the **Features** heading in the left sidebar.
