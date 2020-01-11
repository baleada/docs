---
title: What is Baleada Tailwind Linear?
framework: agnostic
publish: true
order: 0
---

Baleada Tailwind Linear is a function that returns theme configurations from [Tailwind](https://tailwindcss.com)'s [default config file](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js), aliasing all class names so that they use a linear numeric naming convention.

By default, it produces class names like the following:
- `.text-400` instead of `.text-base`
- `.font-100` instead of `.font-hairline`
- `.mt-800`, `.mt-900`, and `.mt-1000`, instead of `.mt-10`, `.mt-12`, and `.mt-16`

It can be customized to produce classes like `.text-4` instead of `.text-400`.

If you're familiar with the concept of a linear numeric naming convention in Tailwind, you can [jump to the Installation section](#installation). Otherwise, the next section has some helpful background info

:::
## WTF is a "linear numeric naming convention"?
:::

Tailwind uses several different naming conventions for its utility classes.

Some classes, like [transition duration](https://tailwindcss.com/docs/transition-duration), use literal values from the underlying design system:
- `duration-75` for `75ms`
- `duration-100` for `100ms`
- `duration-150` for `150ms`


Other classes use "T-shirt sizes" in their class names. For example, here are the default [font size](https://tailwindcss.com/docs/font-size) classes:
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

Spacing utilities ([margin](https://tailwindcss.com/docs/margin), [padding](https://tailwindcss.com/docs/padding), [width](https://tailwindcss.com/docs/width), [height](https://tailwindcss.com/docs/height), and [gap](https://tailwindcss.com/docs/gap)), use proportional numeric names. This means that the classes are suffixed with numbers that are proportional to the underlying values.

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

**Literal**, **T-shirt**, **semantic**, **proportional numeric**, and **linear numeric**—all of these naming conventions have their pros and cons. Baleada Tailwind Linear will help you explore the pros and cons of linear numeric class names in your own projects.


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
- `strokeWidth`
- `transition`

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
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear({ only: ['spacing'] }) // Overrides the default theme's spacing values, but you'll still get default classes (e.g. .shadow-md) for other properties
  }
}
```
:::

::: type="info"
The default configurations for margin, padding, height, width, and gap all reference your `spacing` object. Including `spacing` in your `tailwindLinear` output will adjust all of those utility classes.
:::

To customize the increment that gets used in your class names, use the `increment` option.

:::
```js
// tailwind.config.js
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
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    ...tailwindLinear({ only: ['fontSize'], increment: 1 }), // .text-4, .text-5, etc.
    ...tailwindLinear({ only: ['fontWeight'] }) // .font-400, .font-500, etc.
  }
}
```
:::

Almost all configurations returned by `tailwindLinear` are plain JavaScript objects, so you can typically spread them out alongside any additional custom values you want to add.

Just remember that you'll have to tack on the property name after your function call to make sure you're spreading your desired configuration object, instead of the parent object `tailwindLinear` returns.

:::
```js
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    borderWidth: {
      '550': '3px',
      ...tailwindLinear({ only: ['borderWidth'] }).borderWidth, // Spreads in all the default borderWidth values
    }
  }
}
```
:::

To expand on that concept: `tailwindLinear` returns a full colors object for the `colors` property. If you want to access a single color, you can tack on `.colors` and the color name right after your function call:

:::
```js
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    colors: {
      blue: tailwindLinear({ only: ['colors'], increment: 1 }).colors.blue, // .bg-blue-1, .bg-blue-2, etc.
      gray: {
        ...tailwindLinear({ only: ['colors'] }).colors.gray, // .bg-gray-100, .bg-gray-200, etc.
        '1000': 'hsla(217, 30%, 8%, 1.0)',
      }
    }
  }
}
```
:::


The only property for which `tailwindLinear` *doesn't* return a plain Javascript object is `maxWidth`.

For `maxWidth`, `tailwindLinear` returns a function, just like the one found in [Tailwind's default config](https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js). To add additional values to your `maxWidth` config, you'll need to pass Tailwind's `theme` function and `configUtils` object to that function, using [Tailwind's closure syntax](https://tailwindcss.com/docs/theme#referencing-other-values) like so:


:::
```js
// tailwind.config.js
const tailwindLinear = require('@baleada/tailwind-linear')

module.exports = {
  theme: {
    maxWidth: (theme, configUtils) => ({
      ...tailwindLinear({ only: ['maxWidth'] }).maxWidth(theme, configUtils), // Generates and spreads in the maxWidth config object
      '420': '420px',
    }),
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
1. Proportions (e.g. `full: 100%`), key words (e.g. `auto` and `outline`), and screen breakpoints (applicable for `max-width` utilities) are left unchanged.
2. If the unit (e.g. `px`) is specified in the class, it's left unchanged.

Once you get used to the naming convention, you'll find that classes become very easy to guess without visiting your config file or these docs.

But, if you have any doubts, check out the [class references](/docs/tailwind-linear/class-references) to see classes are being generated for each property, and how they match up with the original Tailwind classes.

Also, feel free to peruse the [full default config](/docs/tailwind-linear/default-config) that `tailwindLinear` returns.


:::
## Language, compilation, browser support, and dependencies
:::

Baleada Tailwind Linear is written in modern JavaScript, exported using CommonJS modules, and is not compiled. It's not designed to be used in the browser, but instead will most often be used in the Node environment where you are configuring Tailwind.

Baleada Tailwind Linear has no dependencies, although it does require Tailwind as a peer dependency.



:::
## Semantic versioning conventions
:::

In Baleada Tailwind Linear, the only thing that will ever trigger a new major version is a change to the underlying naming convention outlined above.

From time to time, Tailwind's default config file changes, usually to support new properties, and sometimes to expand the design system and add values for existing properties. When this happens, any necessary updates to Baleada Tailwind Linear will be released as a new minor version, even if the linear numeric naming convention gets applied in a different way.

For example, Tailwind 1.2 introduced a new value for the `borderRadius` property, between two existing values, and it also added the `transitionDuration` and `strokeWidth` properties (among others). In response, Baleada Tailwind Linear was updated in the following ways:
- Baleada Tailwind Linear's `borderRadius.500` was changed to `borderRadius.600`, and the new value was inserted as `borderRadius.500`.
- The `transitionDuration` and `strokeWidth` properties were added to the config object returned by Baleada Tailwind Linear
- Baleada Tailwind Linear released a new minor version

After Tailwind 1.2 was released, anyone using the `.rounded-500` class generated by Baleada Tailwind Linear would have had to change all occurrences of that class to `.rounded-600` in their code. 

This kind of impact is characteristic of a breaking change and a new major version. However, since it was a Tailwind design system change and not a change to the rules of the linear numeric naming convention, only a new minor version was released.
