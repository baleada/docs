---
title: withoutColorPalettes
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`withoutColorPalettes` is a function that removes color palettes from the `colors` object in a Tailwind config. It returns an object that only includes keys whose values are strings, e.g. `current` and `transparent`. All the object-based color palettes (`blue`, `red`, etc.) are removed.

::: type="info"
[Baleada Theme](/docs/theme) uses the `withoutColorPalettes` function to extract standalone colors from Tailwind's default theme.
:::


:::
## Parameters
:::

`withoutColorPalettes` accepts one parameter: a Tailwind `colors` config object. Here's an example:

:::
```js
// tailwind.config.js
const { withoutColorPalettes } = require('@baleada/tailwind-theme-utils'),
      defaultTheme = require('tailwindcss/defaultTheme'),
      resolveConfig = require('tailwindcss/resolveConfig'),
      resolvedConfig = resolveConfig({ theme: defaultTheme })

module.exports = {
  theme: {
    colors: {
      ...withoutColorPalettes(resolvedConfig.theme.colors),
    }
  },
}
```
:::
