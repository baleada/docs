---
title: What is Baleada Utilities?
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

Baleada Utilities is a Tailwind plugin designed to add a small library of Tailwind utility classes.

[Here's a demo](https://stackblitz.com/edit/baleada-utilities?file=tailwind.config.js) where you can see them all in action 🤓


:::
## Installation
:::

:::
```bash
npm install @baleada/tailwind-utilities
```
:::


:::
## Usage
:::

To use Baleada Utilities, include the plugin in the `plugins` array of your Tailwind config:

:::
```js
// tailwind.config.js
const { plugin: utilities } = require('@baleada/tailwind-utilities')

module.exports = {
  plugins: [
    utilities
  ]
}
```
:::

This will add all available utilities, which are documented [below](#classes).


:::
## Classes
:::

Utility classes can be divided into these categories:
- **Flex and grid overrides**, which add nice functionality to some of the built-in Tailwind flex and grid classes
- **Center** utilities, which make it easy to center elements or their contents, regardless of flex vs. grid, flex direction, etc.
- **Corner** utilities, which make it easy to place elements or their contents in a specific corner, regardless of flex vs. grid, flex direction, etc.
- **Edge** utilities, which make it easy to place elements or their contents in the center of a specific edge, regardless of flex vs. grid, flex direction, etc.
- **Dimension** utilities, which are shorthand for creating elements with the same width and height.
- **Stretch** utilities, which are shorthand for making an element full width or height while setting a max width or height.

All Baleada Utilities classes have a total specificity of 1, making them easy to override with variants and responsive classes.


:::
### Flex and grid overrides
:::

Baleada Utilities overrides the following built-in Tailwind classes:
- `.flex`
- `.flex-row`
- `.flex-col`
- `.flex-row-reverse`
- `.flex-col-reverse`
- `.grid`
- `.grid-cols-<n>`
- `.grid-rows-<n>`

It overrides those classes to add these additional features:
- `.flex-row`, `.flex-col`, `.flex-row-reverse`, and `.flex-col-reverse` all explicitly set `display: flex`, so that you don't have to add the repetitive `.flex` class
- `.flex` explicitly sets `flex-direction: row`, so that you can use e.g. `flex-col md:flex` to responsively switch flex direction from column to row
- `.grid-cols-<n>` and `.grid-rows-<n>` both explicitly set `display: grid`, so that you don't have to add the repetitive `.grid` class
- All classes manage a bunch of [space toggle variables](https://css-tricks.com/the-css-custom-property-toggle-trick/) so that [center](#center), [corner](#corner), and [edge](#edge) utilities can optimize the way they align elements.
- All classes support **gap modifiers**, which are documented in the next section.

Note that these are feature **additions** only. All original functionality of the built-in Tailwind classes is preserved.


:::
#### Gap modifiers
:::

Gap modifiers are shorthand for setting `gap` on flex and grid containers.

Add a `/` to any of the overridden flex and grid classes, then add a value from `spacing` or `gap` in your Tailwind config. You can also use arbitrary values in square brackets.

:::
```html
<!--
display: flex;
gap: 1.5rem
-->
<div class="flex/6"></div>

<!--
display: grid;
gap: 1.5rem;
-->
<div class="grid/6"></div>

<!--
display: flex;
flex-direction: column;
gap: 1.5rem;
-->
<div class="flex-col/6"></div>

<!--
display: flex;
flex-direction: row-reverse;
gap: 42px;
-->
<div class="flex-row-reverse/[42px]"></div>

<!--
display: grid;
grid-template-columns: repeat(3, 1fr);
gap: 1.5rem;
-->
<div class="grid-cols-3/6"></div>
```
:::

Note that gap modifiers are totally optional. You can still freely use flex and grid classes as standalone classes that don't set any `gap` values.

To add custom gap modifier values, you can extend the [`spacing`](https://tailwindcss.com/docs/customizing-spacing#extending-the-default-spacing-scale) or [`gap`](https://tailwindcss.com/docs/gap#customizing-your-theme) configs.


:::
### Center
:::

Here's a list of center utilities and their features:

::: ariaLabel="Center utilities and their features"
| Utility class | Features |
| --- | --- |
| `.center-all` | Apply to an element with a [flex or grid override class](#flex-and-grid-overrides) to vertically and horizontally center all of its direct children. |
| `.center-all-x` | Apply to an element with a [flex or grid override class](#flex-and-grid-overrides) to horizontally center all of its direct children. |
| `.center-all-y` | Apply to an element with a [flex or grid override class](#flex-and-grid-overrides) to vertically center all of its direct children. |
| `.center` | <p>Apply to an element to vertically center it inside a parent with a [flex or grid override class](#flex-and-grid-overrides).</p><p>Or, apply to an `.absolute` element to center it within its closest positioned ancestor.</p> |
| `.center-x` | <p>Apply to an element to horizontally center it inside a parent with a [flex or grid override class](#flex-and-grid-overrides).</p><p>Or, apply to an `.absolute` element to center it horizontally within its closest positioned ancestor.</p> |
| `.center-y` | <p>Apply to an element to vertically center it inside a parent with a [flex or grid override class](#flex-and-grid-overrides).</p><p>Or, apply to an `.absolute` element to center it vertically within its closest positioned ancestor.</p> |
:::

::: type="info"
Centering always works as expected, regardless of flex direction.
:::

::: type="info"
As often as possible, center utilities avoid using the `margin` property, so that you can apply positive or negative margins to fine-tune placement as needed.

`margin` is only used to center items horizontally in `.flex` containers, and vertically in `.flex.flex-col` containers.
:::


:::
### Corner
:::

Here's a list of corner utilities and their features:

::: ariaLabel="Corner utilities and their features"
| Utility class | Features |
| --- | --- |
| `.corner-all-<corner>` | <p>Apply to an element with a [flex or grid override class](#flex-and-grid-overrides) to place all of its elements in a specific corner.</p><p>Replace `<corner>` with `t-l`, `t-r`, `b-r`, or `b-l`.</p>|
| `.corner-<corner>` | <p>Apply to an element to place it in a specific corner of a parent with a [flex or grid override class](#flex-and-grid-overrides).</p><p>Or, apply to an `.absolute` element to place it in a specific corner of its closest positioned ancestor.</p><p>Replace `<corner>` with `t-l`, `t-r`, `b-r`, or `b-l`.</p> |
:::

::: type="info"
Cornering always works as expected, regardless of flex direction.
:::

::: type="info"
As often as possible, corner utilities avoid using the `margin` property, so that you can apply positive or negative margins to fine-tune placement as needed.

`margin` is only used to align items horizontally in `.flex` containers, and vertically in `.flex.flex-col` containers.
:::


:::
### Edge
:::

Here's a list of edge utilities and their features:

::: ariaLabel="Edge utilities and their features"
| Utility class | Features |
| --- | --- |
| `.edge-all-<side>` | <p>Apply to an element with a [flex or grid override class](#flex-and-grid-overrides) to center all of its elements on a specific side.</p><p>Replace `<side>` with `t`, `r`, `b`, or `l`.</p><p>`.edge-all-t` is the equivalent of `.center-all-x`, and `.edge-all-l` is the equivalent of `.center-all-y`.</p> |
| `.edge-<side>` | <p>Apply to an element to center it perfectly on a specific side of a parent with a [flex or grid override class](#flex-and-grid-overrides).</p><p>Or, apply to an `.absolute` element to center it on a specific side of its closest positioned ancestor.</p><p>Replace `<side>` with `t`, `r`, `b`, or `l`.</p><p>`.edge-t` is the equivalent of `.center-x`, and `.edge-l` is the equivalent of `.center-y`.</p> |
:::

::: type="info"
Centering and edge direction always works as expected, regardless of flex direction.
:::

::: type="info"
As often as possible, edge utilities avoid using the `margin` property, so that you can apply positive or negative margins to fine-tune placement as needed.

`margin` is only used to center items horizontally in `.flex` containers, and vertically in `.flex.flex-col` containers.
:::


:::
### Dimension
:::

Dimension utilities are shorthand for creating elements with the same width and height. They also support setting width and height to different values with a single class.

Dimension utilities start with `.d-` and end with any value from your `width` or `height` theme configurations, or any arbitrary value supported by width and height utilities. You can also use `theme.dimension` to configure additional classes and values.

:::
```html
<!-- This div will be exactly 12rem tall and wide. -->
<div class="d-24"></div>
```
:::

Note that `.d-screen` is smart—it will give you a `100vw` width and `100vh` height, using the appropriate unit for each dimension.

Arbitrary values for `.d-` classes support two custom CSS units: `v%` and `cq%`. Under the hood, these units evaluate to `vh`, `vw`, `cqh`, and `cqw` as appropriate:

:::
```html
<!-- This div will be 42vw wide and 42vh tall -->
<div class="d-[42v%]"></div>

<!-- Install @tailwindcss/container-queries for container support -->
<div class="@container">
  <!-- This div will be 42cqw wide and 42cqh tall -->
  <div class="d-[42cq%]"></div>
</div>
```
:::

In arbitrary value classes, you can even use these custom units in `calc()`, like `calc(20cq%-10cq%)`. This would evaluate to a height of `calc(20cqh-10cqh)` and a width of `calc(20cqw-10cqw)`.

However, browsers don't support viewport units and container query units in `calc()` expressions, so this is currently invalid CSS.

One more great feature: you can use dimension utilities as a shorthand to set width and height to different values with a single class. The format is `.d-<width>/<height>`, like this:

:::
```html
<!-- This div will be 6rem wide and 8rem tall. -->
<div class="d-24/32"></div>

<!-- Supports arbitrary values 🎯 -->
<div class="d-[42px]/[84px]"></div>
```
:::

To add custom `.d-` classes, you can extend the [`spacing`](https://tailwindcss.com/docs/customizing-spacing#extending-the-default-spacing-scale), [`height`](https://tailwindcss.com/docs/height#customizing-your-theme), or [`width`](https://tailwindcss.com/docs/width#customizing-your-theme) configs.

Or, you can add a `dimension` key to your `theme` configuration. `dimension` is configured exactly like `spacing`, `width`, and `height`:

:::
```js
// tailwind.config.js
const { plugin: utilities } = require('@baleada/tailwind-utilities')

module.exports = {
  theme: {
    dimension: {
      'custom': '42px', // .d-custom
    }
  },
  plugins: [
    utilities
  ]
}
```
:::


:::
### Stretch
:::

Stretch utilities are shorthand for making an element full width or height while setting a max width or height.

Stretch width utilities start with `.stretch-w-`  and end with any value from your `maxWidth` theme configurations, or any arbitrary value supported by max width. You can also use `theme.stretchWidth` to configure additional classes and values.

Likewise, stretch height utilities start with `.stretch-h-`  and end with any value from your `maxHeight` theme configurations, or any arbitrary value supported by max height. You can also use `theme.stretchHeight` to configure additional classes and values.

:::
```html
<!-- This div will be 100% wide, with a max width of 24rem. -->
<div class="stretch-w-sm"></div>

<!-- This div will be 100% tall, with a max height of 1rem. -->
<div class="stretch-h-4"></div>
```
:::

To add custom `.stretch-w-` classes, you can extend the [`maxWidth`](https://tailwindcss.com/docs/max-width) config. Or, you can add a `stretchWidth` key to your `theme` configuration. `stretchWidth` is configured exactly like `maxWidth`:

:::
```js
// tailwind.config.js
const { plugin: utilities } = require('@baleada/tailwind-utilities')

module.exports = {
  theme: {
    stretchWidth: {
      'custom': '42px', // .stretch-w-custom
    }
  },
  plugins: [
    utilities
  ]
}
```
:::

To add custom `.stretch-h-` classes, you can extend the [`maxHeight`](https://tailwindcss.com/docs/max-height) config. Or, you can add a `stretchHeight` key to your `theme` configuration. `stretchHeight` is configured exactly like `maxHeight`:

:::
```js
// tailwind.config.js
const { plugin: utilities } = require('@baleada/tailwind-utilities')

module.exports = {
  theme: {
    stretchHeight: {
      'custom': '42px', // .stretch-h-custom
    }
  },
  plugins: [
    utilities
  ]
}
```
:::


:::
## Center, corner, and edge limitations
:::

The parent implementations of center, corner, and edge utilities (e.g. `.center-all`, `.corner-all-t-r`, `.edge-all-b`) have **no limitations**. Use them with responsive variants as needed:

:::
```html
<!--
Direct children of this div will be horizontally centered on
all screen sizes.
-->
<div class="center-all-x flex md:flex-col">...</div>
<!--
When the flex direction flips from row to column on medium screens,
`center-all-x` will automatically switch from `justify-content: center`
to `align-items: center` to keep the children horizontally centered.

The space toggle CSS technique makes this possible 🤓
-->
```
:::

For child implementations, e.g. `.center`, `.corner-t-r`, `.edge-b`, etc., things get a little more complex.

First, if the child is `.absolute`, it has no limitations:

:::
```html
<!--
This div will be centered on small screen sizes using inset and
transform: translate, but it will revert to default inset and
transform. as soon as it reaches medium screen sizes and takes on
relative positioning.
-->
<div class="center absolute md:relative">...</div>
<!--
This is the space toggle CSS technique in action again, allowing
the element to read its actual computed styles at runtime and adjust
accordingly, all without any JavaScript 🤯
-->
```
:::

But if you're aligning a child inside its flex or grid parent, the current implementation breaks in a few cases:
- Responsively changing the parent's `display`, e.g. `flex md:grid`
- Responsively changing the parent's flex direction, e.g. `flex md:flex-row`

In those cases, CSS simply can't keep up with which `display` or `position` value is _actually_ active at any given time, so you'll sometimes get unexpected and incorrect results from center, corner, and edge utilities.

As soon as [container style queries](https://css-tricks.com/digging-deeper-into-container-style-queries/) get widespread browser support for checking CSS variable values, a new Baleada Utilities release will fix this problem 🎉

To completely solve this problem right now, you can use JS to swap classes in and out at different screen sizes, instead of relying on CSS media queries to do that work.

An upcoming release of [Baleada Features](/docs/features) will export a `useResponsive` function that can help you do this in Vue projects:

:::
```vue
<template>
  <div :class="[flexDirection]">
    <div class="center-x"></div>
  </div>
</template>

<script setup lang="ts">
import { useResponsive } from '@baleada/vue-features'

// Vue will reactively swap out `flex-row` and insert `flex-col`
// when your screen reaches the `md` breakpoint. The CSS selectors
// that power the `.center-x` class will see this change and adjust
// accordingly.
const flexDirection = useResponsive('flex-row', { md: 'flex-col' })
</script>
```
:::

This is obviously way more code than the standard Tailwind equivalent, which you can absolutely still do, even with Baleada Utilities installed:

:::
```html
<div class="flex md:flex-col">
  <div class="mx-auto md:mx-unset md:self-center"></div>
</div>
```
:::

The Baleada Utilities plugin **never interferes** with default Tailwind functionality, so these escape hatches are **always available**.

But if you want to avoid the mental gymnastics of row vs. column vs. justify vs. items vs. start vs. center vs. end vs. screen size, a little JS is a small price to pay!


:::
## Using with TypeScript
:::

Baleada Utilities is written in TypeScript and provides full type support for configuration.

When passing options to the plugin function, you'll get type checking automatically.

To type check your dimension, stretch width, or stretch height theme configurations, import the no-op helper functions:

:::
```ts
// @ts-check
// tailwind.config.js
const {
  plugin: utilities,
  defineDimensionConfig
  defineStretchWidthConfig,
  defineStretchHeightConfig,
} = require('@baleada/tailwind-utilities')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    dimension: defineDimensionConfig({
      // This type checks successfully
      'custom': '42px',
      42: '42px',

      // These are type errors:
      'false': false,
      42: 42,
    }),
    stretchWidth: defineStretchWidthConfig(...),
    stretchHeight: defineStretchHeightConfig(...),
  },
  plugins: [utilities]
}
```
:::


:::
## Apply helper
:::

:::
> `createApply` keeps your CSS-in-JS less complex, much more readable, and truly powered by Tailwind's full feature set.
>
> Use it!
:::

In Tailwind's plugin system, custom utilities and component classes get defined with a CSS-in-JS syntax.

:::
```js
const plugin = require('tailwindcss/plugin')

const myPlugin = plugin(({ addComponents }) => {
  addComponents({
    '.btn': {
      display: 'flex',
      color: 'white',
      backgroundColor: 'rebeccapurple',
    }
  })
})
```
:::

It's a smart, super flexible solution, and it even exposes a `theme` helper to make it easier to pull in values from the user's theme configuration:

:::
```js
const plugin = require('tailwindcss/plugin')

const myPlugin = plugin(({ addComponents, theme }) => {
  addComponents({
    '.btn': {
      display: 'flex',
      color: theme('colors.white'),
      backgroundColor: theme('colors.purple.500'),
    }
  })
})
```
:::

There's one big problem: there's no easy way handle Tailwind classes that actually apply multiple properties under the hood to support certain features.

Transform is the best example—Tailwind's transform utilities don't just compile to a plain `transform` property and value. They actually set a bunch of different CSS variables and `transform` values, allowing you to easily combine multiple transformations with separate utility classes:

:::
```css
// Compiled CSS for the `.translate-x-full` class
.translate-x-full {
  --tw-translate-x: 100%;
  transform:
    translate(var(--tw-translate-x), var(--tw-translate-y))
    rotate(var(--tw-rotate))
    skewX(var(--tw-skew-x))
    skewY(var(--tw-skew-y))
    scaleX(var(--tw-scale-x))
    scaleY(var(--tw-scale-y));
}
```
:::

If you want to recreate this in your custom classes, you have to do it with CSS-in-JS manually:

:::
```js
const plugin = require('tailwindcss/plugin')

const myPlugin = plugin(({ addUtilities, theme }) => {
  addUtilities({
    '.center': {
      position: 'absolute',
      top: '50%',
      left: '50%',
      '--tw-translate-x': '-50%',
      '--tw-translate-y': '-50%',
      transform: `
        translate(var(--tw-translate-x), var(--tw-translate-y))
        rotate(var(--tw-rotate))
        skewX(var(--tw-skew-x))
        skewY(var(--tw-skew-y))
        scaleX(var(--tw-scale-x))
        scaleY(var(--tw-scale-y));
      `
    }
  })
})
```
:::

That's rough! There's a better way: use `@apply` to handle it all for you:

:::
```js
const plugin = require('tailwindcss/plugin')

const myPlugin = plugin(({ addUtilities, theme }) => {
  addUtilities({
    '.center': {
      // Write the `@apply` statement as a key, with an empty object
      // as the value.
      '@apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2': {}
    }
  })
})
```
:::

This is better, but it still feels a bit clunky, and it would throw errors in any project that configures a [custom class prefix](https://tailwindcss.com/docs/configuration#prefix).

To solve all this, Baleada Utilities exports a `createApply` function, which it also uses under the hood.

:::
```js
const { createApply } = require('@baleada/tailwind-utilities')
const plugin = require('tailwindcss/plugin')

const myPlugin = plugin(({ addUtilities, theme, config }) => {
  // Use the `config` function from the plugin API to get the
  // user's prefix (if unconfigured, it's an empty string).
  const prefix = config('prefix')
  // Pass the prefix to the `createApply` function to create an `apply`
  // function for this specific Tailwind user's config.
  const apply = createApply(prefix)

  addUtilities({
    // Pass any string of Tailwind classes to `apply`
    '.center': apply(`
      absolute
      top-1/2 left-1/2
      -translate-x-1/2 -translate-y-1/2
    `)
  })
})
```
:::

`createApply` keeps your CSS-in-JS less complex, much more readable, and truly powered by Tailwind's full feature set.

Use it!


::: type="warning"
In plugins, `@apply` will still fail if you try to apply a class that doesn't exist, based on your user's configuration.

For example, if the user has fully overridden `theme.colors`, and you try to apply a color that no longer exists, Tailwind will throw compiler errors that won't trace directly back to your plugin.
:::


:::
## Browser support
:::

For center, corner, and edge utilities, you're good to go in [any browser that supports the `:where()` pseudo-selector](https://caniuse.com/css-matches-pseudo).

Dimension and stretch utilities are supported everywhere. Gap modifiers are supported in any browser that supports `gap`.
