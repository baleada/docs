---
title: px
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`px` is a function designed to produce classes with `-px-` in the middle, like these: 
- `.h-px-1`
- `.h-[2px]`
- `.h-px-3`

Adding the word `px` to the middle of the class is useful when you want to clarify that a subset of classes for a given property uses `px` units, while Tailwind's standard classes for that property use a different unit of measurement.

::: type="info"
[Baleada Theme](/docs/theme) uses the `px` function to denote `px`-based heights, widths, margins, and more since Tailwind's standard classes for those properties all use `rem` units.
:::


:::
## Parameters
:::

`px` accepts one parameter: a Tailwind config object with class suffixes that you want to add `px` to. Here's an example:

:::
```js
// tailwind.config.js
const { px } = require('@baleada/tailwind-theme-utils')

module.exports = {
  theme: {
    height: {
      ...px({
        '1': '1px',
        '2': '2px',
        '3': '4px',
        '4': '6px',
      })
    }
  }
}

// This config would produce:
// .h-px-1
// .h-[2px]
// .h-px-3
// .h-px-4
```
:::
