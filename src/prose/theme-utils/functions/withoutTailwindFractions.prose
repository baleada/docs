---
title: withoutTailwindFractions
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`withoutTailwindFractions` is a function that removes Tailwind's standard set of fractions from a property's config object. `withoutTailwindFractions` is mainly useful when you want to remove those fractions and replace them with Baleada's set of fractions.

You can see a list of Tailwind's standard fractions and Baleada's fractions in the docs for the [`fractions`](/docs/theme-utils/functions/fractions) function.

::: type="info"
[Baleada Theme](/docs/theme) uses the `withoutTailwindFractions` function to remove Tailwind's standard fractions from the `width` and `inset` configurations.
:::


:::
## Parameters
:::

`withoutTailwindFractions` accepts one parameter: a Tailwind config object with Tailwind fractions suffixes that you want to remove to. Here's an example:

:::
```js
// tailwind.config.js
const { withoutTailwindFractions, fractions } = require('@baleada/tailwind-theme-utils'),
      defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    width: theme => ({
      ...withoutTailwindFractions(defaultTheme.width(theme)),
      ...fractions({ unit: '%', mode: 'baleada' }), // See the fractions docs for an explanation of this
    }),
  },
}
```
:::