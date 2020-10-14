---
title: rem
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`rem` is a function designed to produce classes with `-rem-` in the middle, like these: 
- `.leading-rem-3`
- `.leading-rem-4`
- `.leading-rem-5`

Adding the word `rem` to the middle of the class is useful when you want to clarify that a subset of classes for a given property uses `rem` units, while Tailwind's standard classes for that property use a different unit of measurement.

::: type="info"
[Baleada Theme](/docs/theme) uses the `rem` function to denote `rem`-based line height utilities, since Tailwind's standard line-height classes are unitless.
:::


:::
## Parameters
:::

`rem` accepts one parameter: a Tailwind config object with class suffixes that you want to add `rem` to. Here's an example:

:::
```js
// tailwind.config.js
const { rem } = require('@baleada/tailwind-theme-utils')

module.exports = {
  theme: {
    lineHeight: {
      ...rem({
        '3': '.75rem',
        '4': '1rem',
        '5': '1.25rem',
      })
    }
  }
}

// This config would produce:
// .leading-rem-3
// .leading-rem-4
// .leading-rem-5
```
:::