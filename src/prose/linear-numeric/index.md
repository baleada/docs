---
title: What is Baleada Linear Numeric?
source: tailwind-linear-numeric
publish: true
order: 0
summary: A Tailwind plugin that configures Tailwind's default plugins with a linear numeric naming convention
---

Baleada Linear Numeric is a function that returns configurations for [Tailwind](https://tailwindcss.com) default plugins, aliasing all class names to use a linear numeric naming convention.

By default, it produces class names like the following:
- `.text-4` instead of `.text-base`
- `.font-1` instead of `.font-hairline`
- `.mt-8`, `.mt-9`, and `.mt-10`, instead of `.mt-10`, `.mt-12`, and `.mt-16`

It can be customized to produce classes like `.text-40` or `.text-400` instead of `.text-4`.

If you're familiar with the concept of a linear numeric naming convention in Tailwind, you can [jump to the Installation section](#installation). Otherwise, the next section has some helpful background info!

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
- etc.

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

**Literal**, **T-shirt**, **semantic**, **proportional numeric**, and **linear numeric**—all of these naming conventions have their pros and cons. Baleada Linear Numeric will help you explore the pros and cons of linear numeric class names in your own projects.


:::
## Installation
:::

Baleada Linear Numeric can be installed from NPM:

:::
```bash
npm i @baleada/tailwind-linear-numeric --save-dev
```
:::


:::
## Usage
:::

To get started, require `@baleada/tailwind-linear-numeric` in your [Tailwind config file](https://tailwindcss.com/docs/configuration). The default export is a function, which we'll call `getLinearNumeric` in this example.

:::
```js
// tailwind.config.js
const getLinearNumeric = require('@baleada/tailwind-linear-numeric')
```
:::

The `getLinearNumeric` function returns configurations for the following properties of the `theme` object in your config file:
- `colors`
- `spacing`
- `blur`
- `borderRadius`
- `borderWidth`
- `boxShadow`
- `dropShadow`
- `flexGrow`
- `flexShrink`
- `fontSize`
- `fontWeight`
- `letterSpacing`
- `lineHeight`
- `maxWidth`
- `outlineOffset`
- `outlineWidth`
- `ringOffsetWidth`
- `ringWidth`
- `textDecorationThickness`
- `textUnderlineOffset`
- `transitionDuration`
- `transitionDelay`

The `linearNumeric` function does not configure the following properties, because their default configurations coincidentally follow all the rules in Baleada Linear Numeric's naming convention:

- `maxHeight`
- `minHeight`
- `minWidth`

The function accepts one parameter: an object with options (none of which are required). Here's a full breakdown of that object:

::: ariaLabel="linearNumeric options schema" classes="wide-4"
| Property | Type | Default | Value description |
| --- | --- | --- | --- |
| `only` | String, Array of Strings | An array of all the properties listed above | <p>Indicates which properties' configurations should be returned by `linearNumeric`.</p><p>When `only` is an Array, `linearNumeric` will return a config object with a key for each item in the array.</p><p>When `only` is a String, `linearNumeric` will directly return the config object for that property.</p> |
| `increment` | Number | `100` | <p>Determines how much the class name is incremented for each step up in size.</p><p>For example, if you pass `1` as the `increment`, you'll get class names like `.text-4` and `.text-5` instead of the default `.text-400` and `.text-500`.</p> |
:::

If you want to use linear numeric naming for all of these properties, simply spread the output of `linearNumeric` into your config file.

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    ...linearNumeric() // Overrides the default theme (only the properties listed above)
  }
}
```
:::

If you only want to use linear numeric naming for some properties, use the `only` option to restrict your list.

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    ...linearNumeric({ only: ['spacing', 'minHeight'] }) // Overrides the default theme's spacing and minHeight values, but you'll still get default classes (e.g. .shadow-md) for other properties
  }
}
```
:::

::: type="info"
The default configurations for `height`, `inset`, `width`, `margin`, `padding`, `translate`, `gap`, `space`, and `divide` all reference your `spacing` object. `linearNumeric`'s `spacing` configuration will adjust all of those utility classes.
:::

To customize the increment that gets used in your class names, use the `increment` option.

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    ...linearNumeric({ increment: 10 }) // Produces classes like .text-40 and .text-50 instead of the default .text-4 and .text-5
  }
}
```
:::

You can call `linearNumeric` as many times as you want, so feel free to use the `only` and `increment` options to fine tune class names for individual properties.

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    ...linearNumeric({ only: ['fontSize'] }), // .text-4, .text-5, etc.
    ...linearNumeric({ only: ['fontWeight'], increment: 100 }) // .font-400, .font-500, etc.
  }
}
```
:::

Almost all configurations returned by `linearNumeric` are plain JavaScript objects, so you can typically spread them out alongside any additional custom values you want to add.

If you're using `linearNumeric` to add new values inside of one existing property, you can pass a String to the `only` property to make sure that it directly returns the config object for that property:

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    borderWidth: {
      '55': '3px',
      ...linearNumeric({ only: 'borderWidth', increment: '10' }), // Spreads in all the default borderWidth values
    }
  }
}
```
:::

To expand on that concept: `linearNumeric` returns a full colors object for the `colors` property. If you want to access a single color, you can pass `colors` to the `only` option, and tack on the color name right after your function call:

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    colors: {
      blue: linearNumeric({ only: 'colors', increment: 100 }).blue, // .bg-blue-100, .bg-blue-200, etc.
      gray: {
        ...linearNumeric({ only: 'colors' }).gray, // .bg-gray-1, .bg-gray-2, etc.
        '10': 'hsla(217, 30%, 8%, 1.0)',
      },
      // Also, don't forget to add black, white, and transparent, if you need them!
    }
  }
}
```
:::

Also, be aware that Baleada Linear Numeric _does_ include Tailwind's default standalone colors, `black`, `white`, and `transparent`:

:::
```js
// tailwind.config.js
const linearNumeric = require('@baleada/tailwind-linear-numeric')

module.exports = {
  theme: {
    colors: {
      // These colors don't increment, so they are unaffected by the increment option
      black: linearNumeric({ only: 'colors' }).black,
      white: linearNumeric({ only: 'colors' }).white,
      transparent: linearNumeric({ only: 'colors' }).transparent,
    }
  }
}
```
:::


:::
## Naming convention rules
:::

Ok, so Baleada Linear Numeric uses linear numeric names—but where does the numbering start? How are "default" classes handled?

Baleada Linear Numeric follows the rules below, in their exact order, to answer those questions individually for each property:
1. Properties that already have linear numeric names (just color, at the moment) are not changed from their original naming scheme, except to support different increments using `linearNumeric`'s `increment` option. Colors, for example, are only changed to support different increments.
1. Anything with an underlying value of `0` or `none` (e.g. `.tracking-normal` and `shadow-none`) is named with the number `0`.
2. If a the property has a `0` class, Baleada Linear Numeric aliases other class names so that they increment linearly from the `0` class (or decrement, if the property can have negative values).

    If the Tailwind team clearly and explicitly intends certain values to be "in-between" the core set of values, Baleada Linear Numeric respects that categorization, and increments (or decrements) the class names by half.
    
    For example, Tailwind 2.0 introduced `0.5`, `1.5`, `2.5`, and `3.5` classes to the spacing scale, intending for those values to be used only when `1`, `2`, `3`, and `4` aren't quite precise enough. Rather than starting from `0` and assigning `1` to Tailwind's `0.5`, `2` to Tailwind's `1`, `3` to Tailwind's `1.5`, and so on, Baleada Linear Numeric stays true to Tailwind's intention of those being in-between values, and [matches those names exactly](/docs/linear-numeric/class-references#spacing).
3. If there is no `0` value for the property, but there is a value assigned to a `DEFAULT`, `normal`, or `base` key, Baleada Linear Numeric renames DEFAULT/normal/base with `4`. This follows the CSS convention of using `400` for normal font weight.

    Then, Baleada Linear Numeric increments in both directions from the `4` class. Note that this sometimes results in certain properties (e.g. `borderWidth`) having `4` classes, but not having classes for `1`, `2`, or `3`.

    Tailwind's `.shadow-inner` is treated as a default negative shadow, and is assigned a key of `-4` (which produces the class `.-shadow-4`).
4. Proportions (e.g. `full: 100%`, `screen: 100vh`), key words (e.g. `auto` and `outline`), and screen breakpoints (applicable for `max-width` utilities) are left unchanged.
5. If a default Tailwind property includes a secondary set of values with different units, the Baleada Linear Numeric follows all the above rules to name those secondary values' classes, and finally includes the unit (and an extra hyphen) in the middle of the class name.

    For example, default `lineHeight` values include both relative values (e.g. `1`, `1.25`, etc.) and fixed values using `rem` units (e.g. `1rem`, `1.25rem`, etc.). Baleada Linear Numeric follows all the above naming rules to name the relative and fixed values, then, to avoid naming collisions, adds `-rem-` to the middle of the class name for all `rem` values.

    This produces classes like `.leading-3` (relative line height of `1.375`) and `.leading-rem-3` (fixed line height of `0.75rem`).

    Note that this also happens with `spacing` which produces classes like `w-px` using Tailwind's default config. In Baleada Linear Numeric, that class becomes `w-px-1`.

Once you get used to the naming convention, you'll find that classes become very easy to guess without visiting your config file or these docs.

But, if you have any doubts, check out the [class references](/docs/tailwind-linear/class-references) to see classes are being generated for each property, how they match up with the original Tailwind classes, and what the underlying values are.


:::
## Language, compilation, browser support, and dependencies
:::

Baleada Linear Numeric is written in modern JavaScript, exported using CommonJS modules, and is not compiled. It's not designed to be used in the browser, but instead will most often be used in the Node environment where you are configuring Tailwind.

Baleada Linear Numeric has no dependencies, although it does require Tailwind as a peer dependency.

:::
## Semantic versioning conventions
:::

In Baleada Linear Numeric, the only thing that will ever trigger a new major version is a change to the underlying naming convention outlined above.

From time to time, Tailwind's default config file changes, usually to support new properties, and sometimes to expand the design system and add values for existing properties. When this happens, any necessary updates to Baleada Linear Numeric will be released as a new minor version, even if the linear numeric naming convention gets applied in a different way.

For example, Tailwind 1.2 introduced a new value for the `borderRadius` property, between two existing values, and it also added the `transitionDuration` and `strokeWidth` properties (among others). In response, Baleada Linear Numeric was updated in the following ways:
- Baleada Linear Numeric's `borderRadius.5` was changed to `borderRadius.6`, and the new value was inserted as `borderRadius.5`.
- The `transitionDuration` and `strokeWidth` properties were added to the config object returned by Baleada Linear Numeric
- Baleada Linear Numeric released a new minor version

After Tailwind 1.2 was released, anyone using the `.rounded-5` class generated by Baleada Linear Numeric would have had to change all occurrences of that class to `.rounded-6` in their code. 

This kind of impact is characteristic of a breaking change and a new major version. However, since it was a Tailwind design system change and not a change to the rules of the linear numeric naming convention, only a new minor version was released.
