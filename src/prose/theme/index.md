---
title: What is Baleada Theme?
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

Baleada Theme is an exquisitely generous theme configuration for Tailwind. It uses [Baleada Linear Numeric](/docs/linear-numeric) and [Baleada Theme Utils](/docs/theme-utils) to rename certain classes, add some useful values, and remove a handful of less-useful default Tailwind values.

Keep reading here for more info on how to install and use Baleada Theme, and check out the class reference tables in the left sidebar menu to see exactly which classes Baleada Theme adds, and what the classes' underlying values are.

::: type="warning"
Baleada Theme's default stylesheet is significantly larger than Tailwind's default. [Controlling file size](https://tailwindcss.com/docs/controlling-file-size) is highly recommended.
:::


:::
## Installation
:::

:::
```bash
npm i @baleada/tailwind-theme --save-dev
```
:::

Baleada Theme lists [Baleada Linear Numeric](/docs/linear-numeric) and [Baleada Theme Utils](/docs/theme-utils) as peer dependencies. Here's a snippet to install all three:

:::
```bash
npm i @baleada/tailwind-theme @baleada/tailwind-linear-numeric @baleada/tailwind-theme-utils --save-dev
```
:::



:::
## Usage
:::

Baleada Theme's default export is a Tailwind theme config object. The simplest use of Baleada Theme is to pass that object to the `theme` key in your config file:

:::
```js
// tailwind.config.js
const baleada = require('@baleada/tailwind-theme')

module.exports = {
  theme: baleada
}
```
:::

If you want to customize other things in the theme, like colors or font families, the easiest solution is to spread the Baleada Theme into the `theme` object before adding your customizations:

:::
```js
// tailwind.config.js
const baleada = require('@baleada/tailwind-theme')

module.exports = {
  theme: {
    ...baleada,
    colors: {
      extend: {
        primary: { // Easter egg! Baleada's primary color palette
          '100': 'hsla(242, 100%, 97%, 1.0)',
          '200': 'hsla(243, 94%, 90%, 1.0)',
          '300': 'hsla(243, 88%, 84%, 1.0)',
          '400': 'hsla(244, 84%, 75%, 1.0)',
          '500': 'hsla(245, 75%, 68%, 1.0)',
          '600': 'hsla(247, 61%, 60%, 1.0)',
          '700': 'hsla(248, 49%, 52%, 1.0)',
          '800': 'hsla(249, 41%, 42%, 1.0)',
          '900': 'hsla(251, 37%, 33%, 1.0)',
          '1000': 'hsla(251, 33%, 20%, 1.0)',
        },
      },
    },
  },
}
```
:::