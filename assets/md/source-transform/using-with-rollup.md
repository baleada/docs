---
title: Using with Rollup
framework: agnostic
publish: true
order: 0
---

Baleada Source Transform's Rollup plugin can be imported from `@baleada/source-transform/rollup`.

:::
```js
//rollup.config.js
const sourceTransform = require('@baleada/source-transform/rollup'),
      myTransformFunction = require('path/to/myTransformFunction')

export default {
  // ...other options, like input and output
  plugins: [
    sourceTransform({
      transform: myTransformFunction
    })
  ]
}
```
:::

The `sourceTransform` plugin's only parameter is an `options` object. Here's a full breakdown of that object:

::: ariaLabel="Options for the Rollup Source Transform plugin" classes="wide-3 wide-4"
| Property | Type | Default | Description |
| --- | --- | --- | --- |
| `transform` | Function | `({ source }) => source` | A function that transforms the source file contents (String) and must return its transformed contents (String). See the [`transform` function parameters](#How-to-use-the-transform-function) section for more guidance. |
| `include` | String, Array | none | <p>A minimatch pattern (String) or an array of minimatch patterns (Array) describing files to be included.</p><p>If `include` is omitted or of zero length, files will be included by default; otherwise they will only be included if the ID matches one of the patterns.</p> |
| `exclude` | String, Array | none | <p>A minimatch pattern (String) or an array of minimatch patterns (Array) describing files to be excluded.</p> |
:::


:::
## `context` and `utils` in the `transform` function's first argument
:::

As mentioned in the [Baleada Source Transform overview](/docs/source-transform), your `transform` function's only parameter is an object that includes various properties. Two of these properties—`context` and `utils`—have specific values when used with Rollup.

When using Baleada Source Transform with Rollup, `context` is the [plugin context](https://rollupjs.org/guide/en/#plugin-context). `utils` contains all of the functions from the [`@rollup/pluginutils`](https://github.com/rollup/plugins/tree/master/packages/pluginutils) package.

:::
## `transform` function return value
:::

In most cases, you'll probably return a String from your `transform` function, but to learn more about what else you can return, [visit the Rollup docs](https://rollupjs.org/guide/en/#transform).