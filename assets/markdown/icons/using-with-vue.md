---
title: Using with Vue
framework: Vue
publish: true
---

<NiftyHeading level="2">
Import a component (allows for tree-shaking)
</NiftyHeading>

All `@baleada/icons` Vue components are [functional components](https://vuejs.org/v2/guide/render-function.html#Functional-Components). They can be imported from `@baleada/icons/vue` for local or global registration.

```js
import { EvaGlobe2 } from '@baleada/icons/vue'

export default {
  components: {
    EvaGlobe2,
  },
  ...
}
```


<NiftyHeading level="2">
Use a component
</NiftyHeading>

All components will render an SVG of their icon. The SVG has 4 default attributes:

```html
<svg
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  preserveAspectRatio="xMinYMin meet"
>
  ...
</svg>
```

These 4 attributes are easy to override or expand—all of the component's attributes, event listeners, and class & style bindings are passed directly to the SVG.

```html
<template lang="html">
  <SimpleGeocaching
    preserveAspectRatio="none"
    :class="'h-4 w-4 fill-current inline-block text-blue-600'"
  />
  <EvaGlobe2
    aria-label="A nifty globe icon"
    @click.native="() => console.log('Eva icon was clicked')"
  />
</template>

<script>...</script>
```
