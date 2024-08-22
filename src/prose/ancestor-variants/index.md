---
title: What is Baleada Ancestor Variants?
source: ancestor-variants
publish: tailwind-ancestor-variants
order: 0
summary: A Tailwind plugin for adding ancestor variants, i.e. variants that will only apply styles when an ancestor element matches a specific selector
---

Baleada Ancestor Variants is a Tailwind plugin for adding ancestor variants, i.e. variants that will only apply styles when an ancestor element matches a specific selector.

:::
```html
<div class="ancestor theme-1">
  <!--
  This element will have blue text, because it has an ancestor
  with the `.ancestor` and `.theme-1` classes.
  -->
  <div class="text-red-500 theme-1:text-blue-500">...</div>
  
  <!--
  This element will have red text, because it does not have an ancestor
  with the `.ancestor` and `.theme-2` classes.
  -->
  <div class="text-red-500 theme-2:text-blue-500">...</div>
</div>
```
:::

Variants can be stacked in any order:

:::
```html
<div class="ancestor user theme-1">
  <!--
  This element will have blue text, because it has an ancestor
  with the `.ancestor.user.theme-1`  classes.
  -->
  <div class="theme-1:user:text-blue-500">...</div>
  
  <!--
  This element will also have blue text. It's the same stack of
  variants, in a different order.
  -->
  <div class="user:theme-1:text-blue-500">...</div>
</div>
```
:::

Variants can also be "negated" by adding `not-`:

:::
```html
<div class="ancestor theme-1">
  <!--
  This element _will_ have blue text, because it does _not_ have an
  ancestor with the `.ancestor` and `.theme-2` classes.
  -->
  <div class="not-theme-2:text-blue-500">...</div>
</div>
```
:::

And negated variants can also be stacked in any order:

:::
```html
<div class="ancestor user theme-1">
  <!--
  This element _will_ have blue text, because it does _not_ have an
  ancestor with the `.ancestor.admin.theme-2` classes.
  -->
  <div class="not-admin:not-theme-2:text-blue-500">...</div>
</div>
```
:::

Each variant or negated variant adds **exactly 1 specificity point** to the CSS class, so they work the same as Tailwind's built-in variants, like `hover` or `focus`.

Ancestor variants are incredibly useful for supporting multiple themes on a page, or for applying different styles based on user type, device type, or anything else you'd like to track.

[Here's a demo](https://stackblitz.com/edit/baleada-ancestor-variants?file=index.html,tailwind.config.js) where you can see all the different features in action.

<!-- Note that the demo shows some "uncontrolled markup features". Those are documented [below](#uncontrolled-markup-features), after the sections on configuration. -->


:::
## Installation
:::

:::
```bash
npm install @baleada/tailwind-ancestor-variants
```
:::


:::
## Usage
:::

To use Baleada Ancestor Variants, import the plugin into your Tailwind config file, and use the `ancestorVariants` key of your `theme` to add variants:

:::
```js
// tailwind.config.js
const { plugin: ancestorVariants } = require('@baleada/tailwind-ancestor-variants')

module.exports = {
  theme: {
    ...,
    ancestorVariants: [
      'theme-1',
      'theme-2',
      'user',
      'admin',
    ]
  },
  plugins: [
    ancestorVariants,
  ]
}
```
:::

Then, make sure that your project does two things:
1. Your project should add the `.ancestor` class to the ancestor element you want to track, and you should make sure that no other element in the project has this class. (If this isn't possible in your project, see the [Fine-tuning configuration](#fine-tuning-configuration) section for more guidance.)
2. Your project should add classes to the ancestor element to indicate which variants should apply. For example, if `theme-1` should apply, add `.theme-1` to your ancestor element. If classes aren't the right solution for your project, you can [fine-tune your configuration](#fine-tuning-configuration).

After that, you'll be able to use classes like `theme-1:text-blue-500` as needed. You'll also be able to use classes like `not-theme-1:text-blue-500` to apply styles only when `.theme-1` is _not_ present on the `.ancestor` element.


:::
## Fine-tuning configuration
:::

There are a few use cases that need more fine-tuned configuration. Let's walk through them:


:::
### Customizing the ancestor identifier
:::

In some projects, you might have naming collisions with the `.ancestor` class, so you won't be able to add it to the ancestor element.

To solve this, you can call the `ancestorVariants` plugin function with options, instead of passing it directly to your `plugins` array.

Use the `ancestorIdentifier` option to override the default `.ancestor` selector with a different selector that is guaranteed to always select your ancestor element.

:::
```js
// tailwind.config.js
const { plugin: ancestorVariants } = require('@baleada/tailwind-ancestor-variants')

module.exports = {
  theme: {
    ...,
    ancestorVariants: ...,
  },
  plugins: [
    ancestorVariants({
      ancestorIdentifier: '#app',
    }),
  ]
}
```
:::


:::
### Mapping variants to different class names
:::

Sometimes, you might want the variant name to be different from its corresponding class name. Or, you might want to add more than one variant for a single ancestor class (e.g. longhand and shorthand versions).

To solve both of these problems, you can change the way you define `ancestorVariants` in your theme.

The simplest configuration is an array of strings, where each string is the variant name _and_ the class name. For more control, use an array of tuples, where each tuple has two items:
1. The variant name (String)
2. The corresponding CSS selector (String)

:::
```js
// tailwind.config.js
const { plugin: ancestorVariants } = require('@baleada/tailwind-ancestor-variants')

module.exports = {
  theme: {
    ...,
    ancestorVariants: [
      // Use custom selectors, e.g. data attribute selectors,
      // to fine-tune when the variants will apply:
      ['theme-1', '[data-theme=1]'],
      
      // Configure multiple variants for the same selector:
      ['theme-2', '[data-theme=2]'],
      ['2',       '[data-theme=2]'],
      
      // No need to lock into one format. You can include plain strings
      // alongside tuples in your configuration if there are certain variants
      // you don't need to fine-tune.
      'user',
      'admin',
    ]
  },
  plugins: [
    ancestorVariants,
  ]
}
```
:::

<!-- There's one more valid format for variants, but that's related to [uncontrolled markup features](#uncontrolled-markup-features), so let's cover it in that section of the docs.


:::
## Uncontrolled markup features
:::
 -->




:::
## Using with TypeScript
:::

`ancestorVariants` is written in TypeScript and provides full type support for configuration.

When passing options to the plugin function, you'll get type checking automatically.

To type check your theme configuration, import the `defineConfig` function, which is a no-op that just enforces types:

:::
```ts
// @ts-check
// tailwind.config.js
const {
  plugin: ancestorVariants
  defineConfig: defineAncestorVariants
} = require('@baleada/tailwind-ancestor-variants')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    ...,
    ancestorVariants: defineAncestorVariants([
      // These types are all supported
      ['theme-1', '[data-theme=1]'],
      ['theme-2', '[data-theme=2]'],
      ['2',       '[data-theme=2]'],
      'user',
      'admin',
      {
        variant: '1',
        selector: '.theme-1',
        specificity: 0,
        disableSelector: '.not-theme-1'
      },
    ])
  },
  plugins: [
    ancestorVariants({
      // This is a type error
      ancestorIdentifier: false,
    }),
  ]
}
```
:::


:::
## Browser support
:::

You're good to go in [any browser that supports the `:is()` and `where()` pseudo-selectors](https://caniuse.com/css-matches-pseudo).
