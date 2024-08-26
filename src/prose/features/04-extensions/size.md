---
title: Size
source: useSize.ts
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::


`useSize` is an [extension](/docs/features/extensions-overview) that allows you to reactively track the dimensions of an element, and whether that element's width is currently wider than certain breakpoints.

::: type="info"
Under the hood, `useSize` uses the `ResizeObserver` API for performant dimension tracking.
:::


:::
## Create size
:::

To start tracking dimensions, call the `useSize` function, which accepts two parameters:

::: ariaLabel="useSize parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `extendable` | Interface, Ref (HTMLElement) | yes | <p>The return object from a Baleada Features [interface](/docs/features#using-functions), or a reactive reference to an HTML element.</p><p>If you pass an interface object, `useSize` will track the size of the `root` element.</p> |
| `options` | Object | no | Passes customization options. See the next table for more guidance. |
:::

Here's a breakdown of the `useSize` options:

::: ariaLabel="useSize options" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `breakpoints` | Object | no | See description | <p>An object specifying breakpoints for `useSize` to compare against. Each key should be the name of the breakpoint, and the value should be the width (Number) of that breakpoint, measured in pixels.</p><p>The keys of the default `breakpoints` object are `sm`, `md`, `lg`, `xl`, and `2xl`. The values of those keys are [the default TailwindCSS breakpoints](https://tailwindcss.com/docs/responsive-design).</p> |
| `observe` | Object | no | none | The `options` parameter of the [Resize Observer's `observe` method](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe). |
:::

:::
```html
<!-- MyComponent.vue -->
<template>...</template>

<script setup>
import { computed } from 'vue'
import { useSize } from '@baleada/vue-features'

const size = useSize(
  computed(() => document.body)
  [, options]
)
</script>
```
:::


:::
## Use your size
:::

`useSize` returns `size`—an object with tools you can use to react to an element's size.

Here's a breakdown of that object:

::: ariaLabel="size breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `rect` | Ref (Object) | A reactive reference to the [`contentRect`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry/size) (Object) of the most recent `ResizeObserver` entry. |
| `breaks` | Ref (Object) | <p>A reactive reference to an object describing whether or not your element's width is currently "breaking" your `breakpoints`.</p><p>See the [How to check breakpoints](#how-to-check-breakpoints) section for more guidance on using `breaks`.</p> |
| `orientation` | Ref (String) | A reactive reference to the orientation (String) of the element: `portrait` (height greater than width), `landscape` (width greater than height), or `none` (equal height and width). |
:::


:::
### How to check breakpoints
:::

As mentioned, `size.breaks` is a reactive reference to an object you can use to check whether certain breakpoints have been "broken", i.e. the width of your element is greater than or equal to the breakpoint.

The properties of `breaks.value` are the same properties in the `breakpoints` object from your `options`. The value of each property is a Boolean indicating whether or not your element is wider than that breakpoint.

If the smallest breakpoint is greater than `0`, the `breaks` object will also include a `zero` property, whose value is `true` when your element is wider than `0` pixels.

If you stick with the default `breakpoints`, the properties of `breaks` will be `zero`, `sm`, `md`, `lg`, `xl`, and `2xl`.

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
  <header ref="header">
    <img 
      :src="[
        size.breaks.lg 
          ? '/large-image.jpg' 
          : '/small-image.jpg'
      ]"
    >
  </header>
</template>

<script setup>
import { ref, readonly } from 'vue'
import { useSize } from '@baleada/vue-features'

const header = ref(null)
const size = readonly(useSize(header))
</script>
```
:::
