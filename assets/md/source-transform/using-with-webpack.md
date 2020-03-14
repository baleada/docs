---
title: Using with Webpack
framework: agnostic
publish: true
order: 0
---

Baleada Source Transform's Webpack loader can be imported from `@baleada/source-transform/webpack`, but you won't often need to import it yourself. Usually you'll just specify it as the `loader` property of a Webpack rule, like so:

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
        test: /\.js$/, // Replace `js` with any file extension
        loader: '@baleada/source-transform/webpack',
        options: { transform: myTransformFunction }
      }
    ]
  }
}
```
:::


:::
## `context` and `utils` in the `transform` function's first argument
:::

As mentioned in the [Baleada Source Transform overview](/docs/source-transform), your `transform` function's only parameter is an object that includes various properties. Two of these properties—`context` and `utils`—have specific values when used with Webpack.

When using Baleada Source Transform with Webpack:
- `context` is the [loader context](https://webpack.js.org/api/loaders/#the-loader-context).
- `utils` contains all of the functions from the [`loader-utils`](https://github.com/webpack/loader-utils) package, plus the `validate` function from the [`schema-utils`](https://github.com/webpack/schema-utils) package.

::: type="info"
When using a loader util that accepts `this` as an argument, pass the `context` object instead.
:::


:::
## `transform` function return value
:::

In most cases, you'll probably return a String from your `transform` function, but to learn more about what else you can return, [visit the Webpack docs](https://webpack.js.org/contribute/writing-a-loader/#simple-usage).