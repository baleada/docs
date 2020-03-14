---
title: Using with Rollup
framework: agnostic
publish: true
order: 0
---

Baleada Source Transform's Webpack loader can be imported from `@baleada/source-transform/rollup`.

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
| `transform` | Function | `({ source }) => source` | <p>A function that transforms the source file contents (String).</p><p>The function must return a String, and it accepts one parameter: an object containing all the properties of the [Rollup plugin context](https://rollupjs.org/guide/en/#plugin-context), plus a `source` property where you can find the contents (String) of the file being loaded and an `id` property where you can find the file path of the file being loaded.</p>  |
| `include` | String, Array | none | <p>A minimatch pattern (String) or an array of minimatch patterns (Array) describing files to be included.</p><p>If `include` is omitted or of zero length, files will be included by default; otherwise they will only be included if the ID matches one of the patterns.</p> |
| `exclude` | String, Array | none | <p>A minimatch pattern (String) or an array of minimatch patterns (Array) describing files to be excluded.</p> |
:::
