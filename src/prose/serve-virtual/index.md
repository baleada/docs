---
title: What is Baleada Serve Virtual?
tags: Configuration utilities, Vite, Vue
publish: true
order: 0
---

Baleada Serve Virtual is a middleware for [Vite](https://github.com/vuejs/vite)'s development server, which runs on [Koa]([Koa](https://koajs.com/)). It wraps up the boilerplate code you need to serve virtual files.

Baleada Serve Virtual lets you specify exactly which non-existent files Vite should treat as virtual files, and it gives you complete control over what content Vite serves from those files.

Example use cases:
- File-based routing. Routes can be generated at build time and "exported" from your virtual file.
- Automatic indexing. All files in a directory can be indexed at build time and "exported" from a virtual `index.js` file in that directory.


:::
## Installation
:::

You can install Baleada Serve Virtual from NPM—be sure to save it as a dev dependency in your Vite app.

:::
```bash
npm i @baleada/vite-serve-virtual --save-dev
```
:::


:::
## Usage
:::

To get started, open up your `vite.config.js` file, and import the `getServeVirtual` function from Baleada Serve Virtual.

:::
```js
// vite.config.js
const getServeVirtual = require('@baleada/vite-serve-virtual')
```
:::

`getServeVirtual` requires one parameter: an object, whose properties and values are outlined below.

::: ariaLabel="Baleada Serve Virtual configuration schema" classes="wide-5"
| Property | Type | Required? | Default | Value description |
| --- | --- | --- | --- | --- |
| `transform` | Function | yes | none | <p>Transforms the empty contents the virtual file into something useful to you.</p><p>See the [Writing a `transform` function](#writing-a-transform-function) section for more guidance.</p> |
| `test` | Function | no | none | <p>Your middleware will call this function on every file, passing useful arguments you can use to determine whether or not the file should be served with virtual content.</p><p>`test` should return `true` if the file should be served with virtual content, and `false` otherwise.</p><p>See the [Specifying which files get served with virtual content](#specifying-which-files-get-served-with-virtual-content) section for more guidance on what arguments the `test` function receives.</p> |
| `include` | String, Array | no | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you want to serve with virtual content.</p><p>See the [Specifying which files get served with virtual content](#specifying-which-files-get-served-with-virtual-content) section for more guidance.</p> |
| `exclude` | String, Array | no | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you do not want to serve with virtual content.</p><p>See the [Specifying which files get served with virtual content](#specifying-which-files-get-served-with-virtual-content) section for more guidance.</p> |
:::

When called, `getServeVirtual` returns your Koa middleware (which is also a function). You should pass this middleware to the `configureServer` array in `vite.config.js`.

:::
```js
// vite.config.js
const getServeVirtual = require('@baleada/vite-serve-virtual'),
      serveVirtual = getServeVirtual({/* middleware options */})

module.exports = {
  // Include your middleware in this array
  configureServer: [
    serveVirtual,
  ]
}
```
:::


:::
### Writing a `transform` function
:::

The only required property of the object you pass to `getServeVirtual` is `transform`, which should contain a function that transforms the contents of a file into a valid Vue single file component.

`transform` receives one argument: an object whose properties and values are outlined below.

::: ariaLabel="toVue object argument schema" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | String | The absolute file path to the virtual file (i.e. starting from the system root, _not_ the root of your Vite project) |
:::

`transform` should return an object with two properties. Those properties are outlined below.

::: ariaLabel="transform return object schema"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `source` | String | The source content of the virtual file |
| `type` | String | Indicates the [MIME type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) or virtual file extension of your `source` content. You can also pass `'vue'` as the type if you want Vue to pass your `source` through its Vue Single File Component compiler pipeline. |
:::

For simpler use cases, you can actually return a plain String from your `transform` function, and Baleada Serve Virtual will use `'js'` as the default `type`.


:::
### Specifying which files get served with virtual content
:::

If you don't pass a `test` function or any Picomatch patterns to `include` or `exclude`, Baleada Serve Virtual will serve every single file as if it were a virtual file.

This is almost definitely not your desired behavior. Instead, you'll likely want to tell Serve Virtual to only serve certain files as virtual files.

In most cases, you can pass a [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns to `include` or `exclude` to specify which files get served with virtual content.

::: type="info"
Picomatch patterns are very similar to the more widely recognized [`minimatch`](https://github.com/isaacs/minimatch#readme) patterns, and in most use cases, they are interchangeable.

If you have more specific pattern matching needs, you can view [this comparison table](https://github.com/micromatch/picomatch#library-comparisons) to learn more about where the libraries differ.
:::

For example, here's how you would configure Vite to serve `src/pages/routes.js` as if `routes.js` exported an array of routes for Vue Router, generated automatically based on the files in the `src/pages` directory.

:::
```js
// vite.config.js
const filesToRoutes = require('path/to/filesToRoutes'),
      getServeVirtual = require('@baleada/vite-serve-virtual'),
      serveVirtual = getServeVirtual({
        transform: filesToRoutes,
        include: '**/pages/routes.js',
      })

module.exports = {
  // Include your middleware in this array
  configureServer: [
    serveVirtual,
  ]
}
```
:::

If you need more flexibility than Picomatch patterns offer, you can pass a `test` function instead of using `include` and `exclude`. 

The `test` function receives one argument: an object whose properties and values are outlined below.

::: ariaLabel="test function's object argument schema" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `id` | String | The absolute file path to the file (i.e. starting from the system root, _not_ the root of your Vite project) |
| `createFilter` | Function | <p>The [`createFilter` function from `@rollup/pluginutils`](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter).</p><p>`createFilter` works even outside of [Rollup](https://rollupjs.org)—it's a great general-purpose tool for matching files with [Picomatch](https://github.com/micromatch/picomatch#globbing-features) patterns, and is what Serve Virtual uses under the hood when you pass the `include` and `exclude` options.</p> |
:::

`test` should return `true` if the file should be served as a virtual file, and `false` if it shouldn't.

::: type="info"
Use the `test` function instead of `include` and `exclude` anytime you need to perform more complex logic on the `id` to decide whether it should be served with virtual content.
:::


:::
## Metadata
:::

Baleada Serve Virtual is written in modern JavaScript, transpiled by [Babel](https://babeljs.io) to work in Node, and bundled by [Rollup](https://rollupjs.org), outputting separate Common JS and ES Module bundles.
