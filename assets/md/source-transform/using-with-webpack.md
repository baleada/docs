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

As shown above, the loader takes one option: a `transform` function. The function must return a String, and it accepts one parameter: an object containing all the properties of the [Webpack loader context](https://webpack.js.org/api/loaders/#the-loader-context), plus a `source` property where you can find the contents (String) of the file being loaded.
