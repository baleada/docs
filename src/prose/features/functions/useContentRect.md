---
title: useContentRect
tags: Composition functions
publish: true
order: 0
---

`useContentRect` is a composition function that allows you to reactively track the dimensions of an element, and whether that element's width is currently wider than certain breakpoints.

::: type="info"
Under the hood, `useContentRect` uses the `ResizeObserver` API for performant dimension tracking.
:::


:::
## Creating a content rect
:::

To start tracking dimensions, call the `useContentRect` function, which accepts one optional `options` object as its only parameter.

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script>
import { useContentRect } from '@baleada/vue-features'

export default {
  setup () {
    const contentRect = useContentRect([options])
  }
}
</script>
```
:::

Here's a breakdown of the `options` object:

::: ariaLabel="useContentRect options" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `breakpoints` | Object | no | See description | <p>An object specifying breakpoints for `useContentRect` to compare against. Each key should be the name of the breakpoint, and the value should be the width (Number) of that breakpoint, measured in pixels.</p><p>The keys of the default `breakpoints` object are `sm`, `md`, `lg`, `xl`, and `2xl`. The values of those keys are [the default TailwindCSS breakpoints](https://tailwindcss.com/docs/responsive-design).</p> |
:::


:::
## Using the content rect
:::

`useContentRect` returns `contentRect`—an object with tools you can use to react to an element's contentRect.

Here's a breakdown of that object:

::: ariaLabel="contentRect breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | Object | <p>A [single target API object](/docs/features/target-api).</p><p>`element.ref` should be called with no arguments, and its returned function ref should be bound to the DOM element whose content rect you want to track.</p> |
| `pixels` | Ref (Object) | A reactive reference to the [`contentRect`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/contentRect) (Object) of the most recent `ResizeObserver` entry. |
| `breaks` | Object | <p>The properties of the `breaks` object are the same properties in the `breakpoints` object from your `options`. Also, if the smallest breakpoint is greater than `0`, the `breaks` object will include a `none` property.</p><p>If you stick with the default `breakpoints`, the properties of `breaks` will be `none`, `sm`, `md`, `lg`, `xl`, and `2xl`.</p><p>The value of each property is a reactive reference to a Boolean indicating whether or not your element's width is currently "breaking" the specified breakpoint.</p><p>See the [How to check breakpoints](#how-to-check-breakpoints) section for more guidance on using `breaks`.</p> |
:::


Here's a more complete example of how to use your `contentRect` and bind the function ref:

:::
```html
<!-- MyComponent.vue -->
<template>
  <!-- Track the content rect of this header element -->
  <header :ref="contentRect.element.ref()">...</header>
</template>

<script>
import { useContentRect } from '@baleada/vue-features'

export default {
  setup () {
    const contentRect = useContentRect()

    return { contentRect }
  }
}
</script>
```
:::

With that done, the `pixels` and `breaks` properties of `contentRect` will update reactively as the size of your element changes:

:::
```html
<!-- MyComponent.vue -->
<template>
  <header :ref="contentRect.element.ref()">...</header>
</template>

<script>
import { watchEffect } from 'vue'
import { useContentRect } from '@baleada/vue-features'

export default {
  setup () {
    const contentRect = useContentRect()

    // Log the width every time it changes
    watchEffect(() => console.log(contentRect.pixels.value.width))

    return { contentRect }
  }
}
</script>
```
:::


:::
### How to check breakpoints
:::

As mentioned, `contentRect.breaks` is an object you can use to check whether certain breakpoints have been "broken", i.e. the width of your element is greater than or equal to the breakpoint.

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
  <header :ref="contentRect.element.ref()">
    <img 
      :src="[
        contentRect.breaks.lg 
          ? '/large-image.jpg' 
          : '/small-image.jpg'
      ]"
    >
  </header>
</template>

<script>
import { useContentRect, readonly } from '@baleada/vue-features'

export default {
  setup () {
    const contentRect = readonly(useContentRect())

    return { contentRect }
  }
}
</script>
```
:::

Note that the values inside the `breaks` object are all reactive references, each of which has a `.value` property pointing to its current value.

These references won't automatically unwrap in your template. It's recommended that you call Vue's `readonly` function on the return value from `useContentRect`, so that in the template, you can cleanly access a breakpoint like `contentRect.breaks.sm`, instead of the more verbose `contentRect.breaks.sm.value`.
