---
title: What is Baleada Features?
tags: Composition functions
publish: true
order: 0
---

Baleada Features is a collection of stateless composition functions that implement UI logic for all kinds of useful features.

Some of these functions offer simple features, like the ability to reactively track the width of an element, and whether that element is currently wider than certain breakpoints.

Other functions implement all of the logic for more complex, WAI-ARIA compliant widgets, like tablists, comboboxes, carousels, etc.

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

Baleada Features' Vue implementation also exports "affordances": functions that re-implement certain features that are readily available in Vue templates, but are not so easy to figure out inside composition functions.

:::
```js
import { show } from '@baleada/vue-features'
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
  const el = ref(null),
        isSelected = computed(...)

  bind({
    target: el,
    keys: {
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
  return el
}
```
:::

These functions are primarily used internally by various features' composition functions. However, Baleada Features exports them publicly because they are useful for authors who want to write their own Vue composition functions, following the style and patterns of Baleada Features.

To learn more, visit the docs for each affordance exported by Baleada Features. For a complete list of available affordances, see the **Affordances** section under the **Features** heading in the left sidebar.
