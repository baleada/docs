---
title: em
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`em` is a function designed to produce classes with `-em-` in the middle, like these: 
- `.h-em-1`
- `.h-em-5/4`
- `.h-em-3/2`

Adding the word `em` to the middle of the class is useful when you want to clarify that a subset of classes for a given property uses `em` units, while Tailwind's standard classes for that property use a different unit of measurement.

::: type="info"
[Baleada Theme](/docs/theme) uses the `em` function to denote `em`-based heights, widths, margins, and more since Tailwind's standard classes for those properties all use `rem` units.
:::


:::
## Parameters
:::

`em` accepts one parameter: a Tailwind config object with class suffixes that you want to add `em` to. Here's an example:

:::
```js
// tailwind.config.js
const { em } = require('@baleada/tailwind-theme-utils')

module.exports = {
  theme: {
    height: {
      ...em({
        '1': '1em',
        '5/4': '1.25em',
        '3/2': '1.5em',
      })
    }
  }
}

// This config would produce:
// .h-em-1
// .h-em-2
// .h-em-3
```
:::