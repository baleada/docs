---
title: useWidth
tags: Composition functions
publish: true
order: 0
---

`useWidth` is a composition function that allows you to reactively track the width of an element, and whether that element is currently wider than certain breakpoints.

::: type="info"
Under the hood, `useWidth` uses the `ResizeObserver` API for performant width tracking.
:::


:::
## Setting up
:::

To start tracking width, call the `useWidth` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { useWidth } from '@baleada/vue-features'

export default {
  setup () {
    const width = useWidth([options])
  }
}
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useWidth options" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `breakpoints` | Object | no | See description | <p>An object specifying breakpoints for `useWidth` to compare against. Each key should be the name of the breakpoint, and the value should be the width (Number) of that breakpoint, measured in pixels.</p><p>The keys of the default `breakpoints` object are `sm`, `md`, `lg`, `xl`, and `2xl`. The values of those keys are [the default TailwindCSS breakpoints](https://tailwindcss.com/docs/responsive-design).</p> |
:::


:::
## Using width
:::

`useWidth` returns `width`—an object with tools you can use to react to an element's width.

Here's a breakdown of that object:

::: ariaLabel="width breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `ref` | Function | <p>A function that returns a [function ref](https://v3.vuejs.org/guide/composition-api-template-refs.html#usage-inside-v-for). Accepts no parameters.</p><p>Bind the returned function to the `ref` attribute of the DOM element whose width you want to track.</p><p>See the [How to use the function ref](#how-to-use-the-function-ref) section for more guidance.</p> |
| `pixels` | Ref (Number) | A reactive reference to the width of your element, measured in pixels. |
| `breaks` | Object | <p>The properties of the `breaks` object are the same properties in the `breakpoints` object from your `options`. Also, if the smallest breakpoint is greater than `0`, the `breaks` object will include a `none` property.</p><p>If you stick with the default `breakpoints`, the properties of `breaks` will be `none`, `sm`, `md`, `lg`, `xl`, and `2xl`.</p><p>The value of each property is a reactive reference to a Boolean indicating whether or not your element's width is currently "breaking" the specified breakpoint.</p><p>See the [How to check breakpoints](#how-to-check-breakpoints) section for more guidance on using `breaks`.</p> |
:::


:::
### How to use the function ref
:::

As mentioned above, `width.ref` is a function that takes no parameters and returns a function ref:

:::
```js
import { useWidth } from '@baleada/vue-features'

const width = useWidth()

width.ref() // -> A function ref
```
:::

Bind this function ref to the element in your Vue template whose width you want to track:

:::
```html
<!-- MyComponent.vue -->
<template>
  <!-- Track the width of this header element -->
  <header :ref="width.ref()">...</header>
</template>

<script>
import { useWidth } from '@baleada/vue-features'

export default {
  setup () {
    const width = useWidth()

    return { width }
  }
}
</script>
```
:::

With that done, the `pixels` and `breaks` properties of `width` will update reactively as the width of your element changes:

:::
```html
<!-- MyComponent.vue -->
<template>
  <header :ref="width.ref()">...</header>
</template>

<script>
import { watchEffect } from 'vue'
import { useWidth } from '@baleada/vue-features'

export default {
  setup () {
    const width = useWidth()

    // Log the width every time it changes
    watchEffect(() => console.log(width.pixels.value))

    return { width }
  }
}
</script>
```
:::


:::
### How to check breakpoints
:::

As mentioned, `width.breaks` is an object you can use to check whether certain breakpoints have been "broken", i.e. the width of your element is greater than or equal to the breakpoint.

Each value in the `breaks` object is a reactive reference to a Boolean indicating whether or not the breakpoint has been broken.

You can use these values to, for example, swap out the `src` of an `img` element based on screen size, so that only the correct image for that screen size is loaded:

:::
```html
<!-- MyComponent.vue -->
<style>
header {
  height: 100vw;
  width: 100vw;
  position: relative;
}

img {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<template>
  <header :ref="width.ref()">
    <img 
      :src="[
        width.breaks.lg 
          ? '/large-image.jpg' 
          : '/small-image.jpg'
      ]"
    >
  </header>
</template>

<script>
import { useWidth, readonly } from '@baleada/vue-features'

export default {
  setup () {
    const width = readonly(useWidth())

    return { width }
  }
}
</script>
```
:::

Note that the values inside the `breaks` object are all reactive references, each of which has a `.value` property pointing to its current value.

These references won't automatically unwrap in your template. It's recommended that you call Vue's `readonly` function on the return value from `useWidth`, so that in the template, you can cleanly access a breakpoint like `width.breaks.sm`, instead of the more verbose `width.breaks.sm.value`.
