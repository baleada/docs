---
title: Using with Rollup
publish: true
order: 0
---

Baleada Source Transform's Rollup plugin can be imported from `@baleada/rollup-plugin-source-transform`.

:::
```js
// rollup.config.js
const sourceTransform = require('@baleada/rollup-plugin-source-transform'),
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
| `transform` | Function | `({ source }) => source` | The transform function, as explained in the [Baleada Source Transform overview](/docs/source-transform#workflow). Your `transform` function can be asynchronous—the plugin will `await` its results. Read the rest of this article for additional Rollup-specific guidance. |
| `test` | Function | no | none | <p>Your plugin will call this function on every file, passing useful arguments you can use to determine whether or not the file should be served as a Vue component.</p><p>`test` should return `true` if the file should be transformed, and `false` otherwise.</p><p>See the [Specifying which files get transformed](#specifying-which-files-get-transformed) section for more guidance on what arguments the `test` function receives.</p> |
| `include` | String, Array | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you want to transform.</p><p>If `include` is omitted or of zero length, files will be included by default; otherwise, they will only be included if the ID matches one of the patterns.</p> |
| `exclude` | String, Array | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you do not want to transform.</p> |
:::


:::
## `context` and `utils` in the `transform` function's first argument
:::

As mentioned in the [Baleada Source Transform overview](/docs/source-transform), your `transform` function's only parameter is an object that includes various properties. Two of these properties—`context` and `utils`—have specific values when used with Rollup.

When using Baleada Source Transform with Rollup, `context` is the [plugin context](https://rollupjs.org/guide/en/#plugin-context). `utils` contains all of the functions from the [`@rollup/pluginutils`](https://github.com/rollup/plugins/tree/master/packages/pluginutils) package.


:::
## `transform` function return value
:::

In most cases, you'll probably return a String from your `transform` function, but to learn more about what else you can return (including custom ASTs and sourcemaps), [visit the Rollup docs](https://rollupjs.org/guide/en/#transform).


:::
## Specifying which files get transformed
:::

If you don't pass a `test` function or any Picomatch patterns to `include` or `exclude`, Baleada Source Transform will apply your `transform` to every file.

This is almost definitely not your desired behavior. Instead, you'll likely want to tell Source Transform to only transform certain files.

In most cases, you can pass a [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns to `include` or `exclude` to specify which files get transformed.

::: type="info"
Picomatch patterns are very similar to the more widely recognized [`minimatch`](https://github.com/isaacs/minimatch#readme) patterns, and in most use cases, they are interchangeable.

If you have more specific pattern matching needs, you can view [this comparison table](https://github.com/micromatch/picomatch#library-comparisons) to learn more about where the libraries differ.
:::

If you need more flexibility than Picomatch patterns offer, you can pass a `test` function instead of using `include` and `exclude`. 

The `test` function receives one argument: an object whose properties and values are outlined below.

::: ariaLabel="test function's object argument schema" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `source` | String | The contents of the file being processed |
| `id` | String | The absolute file path to the file (i.e. starting from the system root, _not_ the root of your project) |
:::

`test` should return `true` if the file should be transformed, and `false` if it shouldn't.

::: type="info"
Use the `test` function instead of `include` and `exclude` anytime you need to perform more complex logic on the `id`, or you need to analyze a file's source contents to decide whether it should be transformed.
:::
