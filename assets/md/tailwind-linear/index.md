---
title: What is Baleada Tailwind Linear?
framework: agnostic
publish: true
order: 0
---

Baleada Tailwind Linear is a function that returns configurations from [Tailwind](https://tailwindcss.com)'s [default config file](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js), aliasing all class names so that they use a linear numeric naming convention.

By default, it produces class names like the following:
- `.text-400` instead of `.text-base`
- `.font-100` instead of `.font-hairline`
- `.mt-800`, `.mt-900`, and `.mt-1000`, instead of `.mt-10`, `.mt-12`, and `.mt-16`

It can be customized to produce classes like `.text-4` instead of `.text-400`.

If you're familiar with the concept of a linear numeric naming convention in Tailwind, you can [jump to the Installation section](#installation). Otherwise, the next section has some helpful background info

:::
## WTF is a "linear numeric naming convention"?
:::

Tailwind uses a few different naming conventions for its utility classes. Some properties use "T-shirt sizes" in their class names. For example, here are the default [font size](https://tailwindcss.com/docs/font-size) classes:
- `.text-xs`
- `.text-sm`
- `.text-base`
- `.text-lg`
- `.text-xl`
- `.text-2xl`
- `.text-3xl`
- `.text-4xl`
- `.text-5xl`
- `.text-6xl`

Other classes, like the ones for font weight, use more semantic words:
- `.font-hairline`
- `.font-thin`
- `.font-light`
- `.font-normal`
- `.font-medium`
- `.font-semibold`
- `.font-bold`
- `.font-extrabold`
- `.font-black`

Spacing utilities ([margin](https://tailwindcss.com/docs/margin), [padding](https://tailwindcss.com/docs/padding), [width](https://tailwindcss.com/docs/width), and [height](https://tailwindcss.com/docs/height)), use proportional numeric names. This means that the classes are suffixed with numbers that are proportional to the underlying values.

Spacing utilities multiply the underlying `rem` value by 4 to derive the class name. Here are a few examples from the padding utilities:
- `.p-1` for `0.25rem`
- `.p-5` for `1.25rem`
- `.p-24` for `6rem`
- `.p-64` for `16rem`

And finally, Tailwind's [color](https://tailwindcss.com/docs/color) utilities use a **linear numeric naming convention**. This means that all class suffixes are numbers that increment linearly from one value to the next:
- `.bg-blue-100`
- `.bg-blue-200`
- `.bg-blue-300`
- `.bg-blue-400`
- `.bg-blue-500`
- `.bg-blue-600`
- `.bg-blue-700`
- `.bg-blue-800`
- `.bg-blue-900`

**T-shirt**, **semantic**, **proportional numeric**, and **linear numeric**—all four naming conventions have their pros and cons. Baleada Tailwind Linear will help you explore the pros and cons of linear numeric class names in your own projects.

:::
## Installation
:::

Baleada Tailwind Linear can be installed from NPM:

:::
```bash
npm i @baleada/tailwind-linear --save-dev
```
:::


:::
## Usage
:::

To get started, require `@baleada/tailwind-linear` in your [Tailwind config file](https://tailwindcss.com/docs/configuration). The default export is a function, which we'll call `tailwindLinear` in this example.

:::
```js
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')
```
:::

The `tailwindLinear` returns configurations for the following properties of the `theme` object in your config file:
- `spacing`
- `borderRadius`
- `borderWidth`
- `boxShadow`
- `fontSize`
- `fontWeight`
- `letterSpacing`
- `lineHeight`
- `maxWidth`
- `colors`

The function accepts one parameter: an object with options (none of which are required). Here's a full breakdown of that object:

::: ariaLabel="tailwindLinear options schema"
| Property | Value's type | Default | Value description |
| --- | --- | --- | --- |
| `only` | Array of Strings | An array of all the properties listed above | Indicates which properties' configurations should be returned by `tailwindLinear`. |
| `increment` | Number | `100` | <p>Determines how much the class name is incremented for each step up in size.</p><p>For example, if you pass `1` as the `increment`, you'll get class names like `.text-4` and `.text-5` instead of the default `.text-400` and `.text-500`.</p> |
:::

If you want to use linear numeric naming for all of these properties, simply spread the output of `tailwindLinear` into your config file.

:::
```js
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear() // Overrides the default theme (only the properties listed above)
  }
}
```
:::

If you only want to use linear numeric naming for some properties, use the `only` option to restrict your list.

:::
```js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear({ only: ['spacing'] }) // Overrides the default theme's spacing values, but you'll still get default classes (e.g. .shadow-md) for other properties
  }
}
```
:::

::: type="info"
The default configurations for margin, padding, height, and width all reference your `spacing` object. Including `spacing` in your `tailwindLinear` output will adjust all of those utility classes.
:::

To customize the increment that gets used in your class names, use the `increment` option.

:::
```js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear({ increment: 1 }) // Produces classes like .text-4 and .text-5 instead of the default .text-400 and .text-500
  }
}
```
:::

You can call `tailwindLinear` as many times as you want, so feel free to use the `only` and `increment` options to fine tune class names for individual properties.

:::
```js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear({ only: ['fontSize'], increment: 1 }), // .text-4, .text-5, etc.
    ...tailwindLinear({ only: ['fontWeight'] }) // .font-400, .font-500, etc.
  }
}
```
:::

All configurations returned by `tailwindLinear` are plain JavaScript objects, so you can also spread them out alongside any additional custom values you want to add.

Just remember that you'll have to tack on the property name after your function call to make sure you're spreading your desired configuration object, instead of the parent object `tailwindLinear` returns.

:::
```js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    borderWidth: {
      '550': '3px',
      ...tailwindLinear({ only: ['borderWidth'] }).borderWidth,
    }
  }
}
```
:::

To expand on that concept: `tailwindLinear` returns a full colors object for the `colors` property. If you want to access a single color, you can tack on `.colors` and the color name right after your function call:

:::
```js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    colors: {
      blue: tailwindLinear({ only: ['colors'], increment: 1 }).colors.blue,
      gray: {
        ...tailwindLinear({ only: ['colors'] }).colors.gray,
        '1000': 'hsla(217, 30%, 8%, 1.0)',
      }
    }
  }
}
```
:::


:::
## Naming convention rules
:::

Ok, so Baleada Tailwind Linear uses linear numeric names—but where does the numbering start? How are "default" classes handled?

Baleada Tailwind Linear follows the rules below, in their exact order, to answer those questions individually for each property:
1. Properties that already have linear numeric names (just color, at the moment) are not changed from their original naming scheme, except to support different increments using `tailwindLinear`'s `increment` option.
1. Anything with an underlying value of `0` or `none` (e.g. `.tracking-normal` and `shadow-none`) is named with the number `0`.

    Then, starting at the `0` class, Baleada Tailwind Linear increments in both directions, both negative and positive. Note that keys like `-100` in the config file will create classes like `.-tracking-100`.
1. If there is no `0` value for the property, but there is a value assigned to a `default`, `normal`, or `base` key, Baleada Tailwind Linear renames default/normal/base with `400`. This follows the CSS convention of using `400` for normal font weight.

    Then, Baleada Tailwind Linear increments in both directions from the `400` class. Note that this sometimes results in certain properties (e.g. `borderWidth`) having `400` classes, but not having classes for `100`, `200`, or `300`.

    Tailwind's `.shadow-inner` is treated as a default negative shadow, and is assigned a key of `-400` (which produces the class `.-shadow-400`).
1. Proportions (e.g. `full: 100%`) and key words (e.g. `auto`) are left unchanged.
2. If the unit (e.g. `px`) is specified in the class, it's left unchanged.

Once you get used to the naming convention, you'll find that classes become very easy to guess without visiting your config file or these docs.

But, if you have any doubts, check out the [class references](/docs/tailwind-linear/class-references) to see classes are being generated for each property, and how they match up with the original Tailwind classes.

Also, feel free to peruse the [full default config](/docs/tailwind-linear/default-config) that `tailwindLinear` returns.
