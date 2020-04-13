---
title: Using with Vue
tags: Components, Vue
publish: true
---


:::
## Install
:::

:::
```bash
npm i @baleada/vue-icons
```
:::


:::
## Import a component
:::

All Baleada Icons Vue components are [functional components](https://vuejs.org/v2/guide/render-function.html#Functional-Components). They can be imported from `@baleada/vue-icons` for local or global registration.

:::
```js
import { HeroiconsEmojiHappy } from '@baleada/vue-icons'

export default {
  components: {
    HeroiconsEmojiHappy,
  },
  ...
}
```
:::

If you prefer, you can also import icons from their specific icon set:

:::
```js
import { EvaGlobe2 } from '@baleada/vue-icons/eva-icons'
import { SimpleGeocaching } from '@baleada/vue-icons/simple-icons'
import { HeroiconsEmojiHappy } from '@baleada/vue-icons/heroicons'
```
:::


:::
## Use a component
:::

All components will render an SVG of their icon. The SVG has 4 default attributes:

:::
```html
<svg
  role="img"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 24 24"
  preserveAspectRatio="xMidYMid meet"
>
  ...
</svg>
```
:::

These 4 attributes are easy to override or expand—all of the component's attributes, event listeners, and class & style bindings are passed directly to the SVG.

:::
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
:::
