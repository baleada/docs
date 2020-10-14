---
title: screen
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`screen` is a function designed to produce classes with `-screen-` in the middle, like these: 
- `.max-h-screen-1/4`
- `.max-h-screen-1/3`
- `.max-h-screen-1/2`

Adding the word `screen` to the middle of the class is useful when you want to clarify that a subset of classes for a given property uses `vh` or `vw` units, while Tailwind's standard classes for that property use a different unit of measurement.

::: type="info"
[Baleada Theme](/docs/theme) uses the `screen` function to denote `vh`-based min and max heights, and `vw`-based min and max widths, since Tailwind's standard classes for those properties all use `rem` units.
:::


:::
## Parameters
:::

`screen` accepts one parameter: a Tailwind config object with class suffixes that you want to add `screen` to. Here's an example:

:::
```js
// tailwind.config.js
const { screen } = require('@baleada/tailwind-theme-utils')

module.exports = {
  theme: {
    maxHeight: {
      ...screen({
        '1/4': 'calc(1/4 * 100vh)',
        '1/3': 'calc(1/3 * 100vh)',
        '1/2': 'calc(1/2 * 100vh)',
      })
    }
  }
}

// This config would produce:
// .max-h-screen-1/4
// .max-h-screen-1/3
// .max-h-screen-1/2
```
:::