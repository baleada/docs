---
title: fractions
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---

`fractions` is a function designed to produce classes with useful fractions of screen width, screen height, and the parent container. 

The `fractions` function returns a config object that includes different fractions depending on which `mode` the function is using. The `tailwind` mode produces the fractions used in certain properties by Tailwind's default config. Here's that list, organized by denonimator:
- `1/2`
- `1/3`, `2/3`
- `1/4`, `2/4`, `3/4`
- `1/5`, `2/5`, `3/5`, `4/5`
- `1/6`, `2/6`, `3/6`, `4/6`, `5/6`
- `1/12`, `2/12`, `3/12`, `4/12`, `5/12`, `6/12`, `7/12`, `8/12`, `9/12`, `10/12`, `11/12`

And here`s the same list, sorted from lowest to highest actual value:
- `1/12`​
- `1/6`​
- `2/12`​
- `1/5`​
- `1/4`​
- `3/12`​
- `1/3`​
- `2/6`​
- `4/12`​
- `2/5`​
- `5/12`​
- `1/2`​
- `2/4`​
- `3/6`​
- `6/12`​
- `7/12`​
- `3/5`​
- `2/3`​
- `4/6`​
- `8/12`​
- `3/4`​
- `9/12`​
- `4/5`​
- `5/6`​
- `10/12`​
- `11/12`

The `baleada` mode produces:
- Reduced versions of all the Tailwind fractions, except the ones with 12 in the denominator
- Improper fractions with actual values of between 1 and 2
- A `2/1` fraction, in case you need to exactly double the size of something else

Here are those fractions, organized by denominator:
- `2/1`
- `1/2`, `3/2`
- `1/3`, `2/3`, `4/3`, `5/3`
- `1/4`, `3/4`, `5/4`, `7/4`
- `1/5`, `2/5`, `3/5`, `4/5`, `6/5`, `7/5`, `8/5`, `9/5`
- `1/6`, `5/6`, `7/6`, `11/6`

And here's the same list, sorted from lowest to highest actual value
- `1/6`​
- `1/5`​
- `1/4`​
- `1/3`​
- `2/5`​
- `1/2`​
- `3/5`​
- `2/3`​
- `3/4`​
- `4/5`​
- `5/6`​
- `7/6`​
- `6/5`​
- `5/4`​
- `4/3`​
- `7/5`​
- `3/2`​
- `8/5`​
- `5/3`​
- `7/4`​
- `9/5`​
- `11/6`​
- `2/1`


::: type="info"
[Baleada Theme](/docs/theme) uses the `fractions` function to customize utility classes for heights, widths, min and max heights, min and max widths, and more.
:::


:::
## Parameters
:::

`fractions` accepts one parameter: an object with options. Here's a breakdown of that object:

::: ariaLabel="fractions options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `unit` | String | `%` | <p>Indicates whether the values of the fraction utility classes will use percentage, viewport width, or viewport height units. Valid `unit` values are `%`, `vw`, and `vh`.</p><p>If you pass `vw` or `vh`, the utilities classes will contain `-screen-` in the middle, e.g. `.h-screen-1/2`. If you pass `%`, utility classes won't have anything in the middle, e.g. `h-1/2`.</p> |
| `mode` | String | `baleada` | Controls which fraction set will be used. Valid `mode` values are `baleada` and `tailwind`. Fraction modes are explained in more detail in the introduction to this article. |
:::


:::
```js
// tailwind.config.js
const { fractions } = require('@baleada/tailwind-theme-utils')

module.exports = {
  theme: {
    height: {
      ...fractions({ unit: 'vh', mode: 'baleada' })
    }
  }
}

// This config would produce classes like:
// .h-1/2
// .h-3/2
// .h-screen-1/2
// .h-screen-3/2
// etc.
```
:::
