---
title: Loader
framework: agnostic
publish: false
order: 0
---

Baleada Loader is an absurdly flexible tool for loading files during your site or app's build step. It was originally designed to load Markdown files using [Webpack](https://webpack.js.org/), but evolved into a package that just handles the most basic implementation details of Webpack loaders and [Rollup](https://rollupjs.org/) plugins, then lets you transform the content (String) of any source file in any way you see fit.

::: type="info"
Didn't see your favorite build tool in the list? Feel free to [raise an issue](https://gitlab.com/baleada/loader/issues) and ask for support.
:::

<!-- To see a practical application of Baleada Loader, [check out how Baleada Prose uses it to load Markdown files](/docs/prose/using-with-markdown), replacing standard HTML elements with feature-rich components. -->

:::
## Installation
:::

Install from npm:

```bash
npm i @baleada/loader
```

:::
## Using with Webpack
:::

Baleada Loader's Webpack loader can be imported from `@baleada/loader/webpack`, but you won't often need to import it yourself. Usually you'll just specify it as the `loader` property of a Webpack rule, like so:

:::
```js
//webpack.config.js
const myTransformFunction = require('path/to/myTransformFunction')

module.exports = {
  //...
  module: {
    rules: [
      //...
      {
        test: /\.js$/, // Replace `js` with any file extension, depending on what files you're trying to load
        loader: '@baleada/loader/webpack',
        options: { transform: myTransformFunction }
      }
    ]
  }
}
```
:::

As shown above, the loader takes one option: a `transform` function. The function must return a String, and it accepts two parameters:

:::
| Parameter | Type | Description |
| --- | --- | --- |
| `source` | String | The source of the file you are loading, or the output of any Webpack loaders that have already transformed your file. |
| `context` | Object | The loader context. [See the Webpack docs](https://webpack.js.org/api/loaders/#the-loader-context) for more info. |
:::

:::
## Using with Rollup
:::

WIP
