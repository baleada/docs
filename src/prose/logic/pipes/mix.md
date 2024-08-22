---
title: mix
source: color.ts
tests: browser/color.test.ts
publish: true
order: 0
---

`createMix` is a [pipe](/docs/logic/pipes-overview) that transforms a color (which can be any [CSS color](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value), or any CSS color plus a [mix percentage value](https://developer.mozilla.org/en-US/docs/Web/CSS/percentage)) to a mix of that color and another given color, in a given color space.


:::
## Create mix
:::

Call `createMix` with these parameters to create your `mix` function:

::: ariaLabel="createMix parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `color2` | string | yes | The color to mix with your given color. |
| `options` | Object | no | Options to customize the behavior of the `mix` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

`mix` works by
1. Creating an element and setting its color to a CSS `color-mix` value
2. Inserting the element into the DOM as the child of a given parent
3. Reading the computed color value of the element
4. Removing the element from the DOM

These options allow you to customize that behavior.

::: ariaLabel="createMix options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `method` | ColorInterpolationMethod | `oklch` | A [color interpolation method](https://developer.mozilla.org/en-US/docs/Web/CSS/color-interpolation-method), omitting the `in` keyword |
| `tag` | HTML tag | `div` | Tag name for the element that will be inserted into the DOM. |
| `getParent` | Function | `() => document.body` | A function that should return the parent element into which the element will be inserted. |
:::


:::
## Example
:::

:::
```ts
import { createMix } from '@baleada/logic'

const mixWithBlue = createMix('blue')

const purple = mixWithBlue('red')
const fuchsia = mixWithBlue('red 70%')
```
:::
