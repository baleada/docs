---
title: What is Baleada Utilities?
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

Baleada Utilities is a Tailwind plugin designed to add a small library of Tailwind utility classes.


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

By default, this will add all available utilities, which fall into these categories:
- **Center** utilities, which make it super easy to center elements or their contents, without having to think about flex vs. grid, flex direction, etc.
- **Dimension** utilities, which are an excellent shorthand for creating elements with the same height and width.

We'll cover those categories and their classes [below](#classes), but first, let's look at how you can configure Baleada Utilities to disable categories of utilities that you don't want.

To do that, call the plugin function with options. The plugin accepts two options:

::: ariaLabel="Baleada Utilities plugin options"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `only` | Array | `['center', 'dimension']` | A list of the utility categories that should be included. Right now, categories are just `center` and `dimension`, but more may be added in the future. |
| `except` | Array | `[]` | <p>A list of the utility categories that should be excluded. Again, categories are just `center` or `dimension`, but more may be added in the future.</p><p>`except` overrides `only`.</p> |
:::

Here's a code example of how to use these options:

:::
```js
// tailwind.config.js
const { plugin: utilities } = require('@baleada/tailwind-utilities')

module.exports = {
  plugins: [
    utilities({
      // Enable dimension utilities, but not center utilities
      only: ['dimension'],
    })
  ]
}
```
:::


:::
## Classes
:::

Utility classes can be divided into these categories:
- **Center** utilities, which make it super easy to center elements or their contents, without having to think about flex vs. grid, flex direction, etc.
- **Dimension** utilities, which are an excellent shorthand for creating elements with the same height and width.

All classes have a total specificity of 1, making them easy to override if needed.

:::
### Center
:::

Here's a list of center utilities and their features:

::: ariaLabel="Center utilities and their features"
| Utility class | Features |
| --- | --- |
| `.center-all` | Apply to a `.flex` or `.grid` element to vertically and horizontally center all of its direct children. |
| `.center-all-x` | Apply to a `.flex` or `.grid` element to horizontally center all of its direct children. |
| `.center-all-y` | Apply to a `.flex` or `.grid` element to vertically center all of its direct children. |
| `.center` | <p>Apply to an element to vertically center it within its `.flex` or `.grid` parent.</p><p>Or, apply to an `.absolute` element to center it within its closest positioned ancestor.</p> |
| `.center-x` | <p>Apply to an element to horizontally center it within its `.flex` or `.grid` parent.</p><p>Or, apply to an `.absolute` element to center it horizontally within its closest positioned ancestor.</p> |
| `.center-y` | <p>Apply to an element to vertically center it within its `.flex` or `.grid` parent.</p><p>Or, apply to an `.absolute` element to center it vertically within its closest positioned ancestor.</p> |
:::


:::
### Dimension
:::

Dimension utilities are a shorthand for creating elements with the same height and width.

They start with `.d-` and end with any value from your `height` or `width` theme configurations, or any arbitrary value supported by height and width utilities. You can also use `theme.dimension` to configure additional classes and values.

:::
```html
<!-- This div will be exactly 12rem tall and wide. -->
<div class="d-24"></div>
```
:::

Note that `.d-screen` is smart—it will give you a `100vh` height and `100vw` width, instead of a `100vh` width.

Arbitrary values for `.d-` classes support two custom CSS units: `v%` and `cq%`. Under the hood, these units evaluate to `vh`, `vw`, `cqh`, and `cqw` as appropriate:

:::
```html
<!-- This div will be 42vh tall and 42vw wide -->
<div class="d-[42v%]"></div>

<!-- Install @tailwindcss/container-queries for container support -->
<div class="@container">
  <!-- This div will be 42cqh tall and 42cqw wide -->
  <div class="d-[42cq%]"></div>
</div>
```
:::

In arbitrary value classes, you can even use these custom units in `calc()`, like `calc(20cq%-10cq%)`. This would evaluate to a height of `calc(20cqh-10cqh)` and a width of `calc(20cqw-10cqw)`.

However, browsers don't support viewport units and container query units in `calc()` expressions, so this is currently invalid CSS.

To add custom `.d-` classes, you can extend the [`spacing`](https://tailwindcss.com/docs/customizing-spacing#extending-the-default-spacing-scale), [`height`](https://tailwindcss.com/docs/height#customizing-your-theme), or [`width`](https://tailwindcss.com/docs/width#customizing-your-theme) configs.

Or, you can add a `dimension` key to your `theme` configuration. `dimension` is configured exactly like `spacing`, `height`, and `width`:

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
## Using with TypeScript
:::

Baleada Utilities is written in TypeScript and provides full type support for configuration.

When passing options to the plugin function, you'll get type checking automatically.

To type check your dimension theme configuration, import the `defineDimensionConfig` function, which is a no-op that just enforces types:

:::
```ts
// @ts-check
// tailwind.config.js
const { plugin: utilities, defineDimensionConfig } = require('@baleada/tailwind-utilities')

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
    })
  },
  plugins: [utilities]
}
```
:::


:::
## Browser support
:::

For center utilities, you're good to go in [any browser that supports the `:where()` pseudo-selector](https://caniuse.com/css-matches-pseudo).

Dimension utilities are supported everywhere.

