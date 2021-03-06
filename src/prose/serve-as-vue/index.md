---
title: What is Baleada Serve as Vue?
tags: Configuration utilities, Vite, Vue
publish: true
order: 0
---

Baleada Serve as Vue is a middleware for [Vite](https://github.com/vuejs/vite)'s development server, which runs on [Koa]([Koa](https://koajs.com/)). It wraps up the boilerplate code you need to serve any file as a Vue component, watch that file for changes, and hot reload the corresponding Vue component when a change is detected.

Baleada Serve as Vue lets you specify exactly which non-`.vue` files Vite should treat as Vue components, and it gives you complete control over how the contents of those files gets transformed into valid Vue components.

Common use cases:
- Serve Markdown files as if they were Vue components. Includes full support for Vue components in your Markdown!
- Serve SVG files as if they were Vue components. With this in your toolkit, every single open source SVG-based icon library doubles as a Vue component library for you, with no extra effort on the icon designers' part 🤯


:::
## Installation
:::

You can install Balead Serve as Vue from NPM—be sure to save it as a dev dependency in your Vite app.

:::
```bash
npm i @baleada/vite-serve-as-vue --save-dev
```
:::


:::
## Usage
:::

To get started, open up your `vite.config.js` file, and import the `getServeAsVue` function from Baleada Serve as Vue.

:::
```js
// vite.config.js
const getServeAsVue = require('@baleada/vite-serve-as-vue')
```
:::

`getServeAsVue` requires one parameter: an object, whose properties and values are outlined below.

::: ariaLabel="Baleada Serve as Vue configuration schema" classes="wide-5"
| Property | Type | Required? | Default | Value description |
| --- | --- | --- | --- | --- |
| `toVue` | Function | yes | none | <p>Transforms the contents of a file into a valid Vue single file component.</p><p>See the [Writing a `toVue` function](#writing-a-tovue-function) section for more guidance.</p> |
| `test` | Function | no | none | <p>Your middleware will call this function on every file, passing useful arguments you can use to determine whether or not the file should be served as a Vue component.</p><p>`test` should return `true` if the file should be served as Vue, and `false` otherwise.</p><p>See the [Specifying which files get served as Vue components](#specifying-which-files-get-served-as-vue-components) section for more guidance on what arguments the `test` function receives.</p> |
| `include` | String, Array | no | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you want to serve as Vue components.</p><p>See the [Specifying which files get served as Vue components](#specifying-which-files-get-served-as-vue-components) section for more guidance.</p> |
| `exclude` | String, Array | no | none | <p>A [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns that match the files you do not want to serve as Vue components.</p><p>See the [Specifying which files get served as Vue components](#specifying-which-files-get-served-as-vue-components) section for more guidance.</p> |
:::

When called, `getServeAsVue` returns your Koa middleware (which is also a function). You should pass this middleware to the `configureServer` array in `vite.config.js`.

:::
```js
// vite.config.js
const getServeAsVue = require('@baleada/vite-serve-as-vue'),
      serveAsVue = getServeAsVue({/* middleware options */})

module.exports = {
  // Include your middleware in this array
  configureServer: [
    serveAsVue,
  ]
}
```
:::


:::
### Writing a `toVue` function
:::

The only required property of the object you pass to `getServeAsVue` is `toVue`, which should contain a function that transforms the contents of a file into a valid Vue single file component.

`toVue` receives one argument: an object, whose properties and values are outlined below.

::: ariaLabel="toVue object argument schema" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `source` | String | The contents of the file being processed |
| `id` | String | The absolute file path to the file (i.e. starting from the system root, _not_ the root of your Vite project) |
:::

`toVue` should return a String that is a valid Vue single file component. In other words, the string should contain at least one of the following:
- A `template` tag that contains your Vue template
- A `script` tag that contains your component logic
- A `style` tag that contains your component styles


:::
### Specifying which files get served as Vue components
:::

If you don't pass a `test` function or any Picomatch patterns to `include` or `exclude`, Baleada Serve as Vue will serve every single file as if it were a Vue component.

This is almost definitely not your desired behavior. Instead, you'll likely want to tell Serve as Vue to only serve certain files as Vue components (e.g. `.md` files).

In most cases, you can pass a [Picomatch](https://github.com/micromatch/picomatch#globbing-features) pattern (String) or array of Picomatch patterns to `include` or `exclude` to specify which files get served as Vue components.

::: type="info"
Picomatch patterns are very similar to the more widely recognized [`minimatch`](https://github.com/isaacs/minimatch#readme) patterns, and in most use cases, they are interchangeable.

If you have more specific pattern matching needs, you can view [this comparison table](https://github.com/micromatch/picomatch#library-comparisons) to learn more about where the libraries differ.
:::

For example, here's how you would configure Vite to serve all `.md` files as if they were Vue components, unless those files are located in a folder called `blog-drafts`.

:::
```js
// vite.config.js
const markdownToVue = require('path/to/markdownToVue'),
      getServeAsVue = require('@baleada/vite-serve-as-vue'),
      serveAsVue = getServeAsVue({
        toVue: markdownToVue,
        include: '**/*.md',
        exclude: '**/blog-drafts/*.md',
      })

module.exports = {
  // Include your middleware in this array
  configureServer: [
    serveAsVue,
  ]
}
```
:::

If you need more flexibility than Picomatch patterns offer, you can pass a `test` function instead of using `include` and `exclude`. 

The `test` function receives one argument: an object whose properties and values are outlined below.

::: ariaLabel="test function's object argument schema" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- | --- | --- |
| `source` | String | The contents of the file being processed |
| `id` | String | The absolute file path to the file (i.e. starting from the system root, _not_ the root of your Vite project) |
| `createFilter` | Function | <p>The [`createFilter` function from `@rollup/pluginutils`](https://github.com/rollup/plugins/tree/master/packages/pluginutils#createfilter).</p><p>`createFilter` works even outside of [Rollup](https://rollupjs.org)—it's a great general-purpose tool for matching files with [Picomatch](https://github.com/micromatch/picomatch#globbing-features) patterns, and is what Vite Serve As Vue uses under the hood when you pass the `include` and `exclude` options.</p> |
:::

`test` should return `true` if the file should be served as a Vue component, and `false` if it shouldn't.

::: type="info"
Use the `test` function instead of `include` and `exclude` anytime you need to perform more complex logic on the `id`, or you need to analyze a file's source contents to decide whether it should be served as Vue.
:::


:::
## Metadata
:::

Baleada Serve as Vue is written in modern JavaScript, transpiled by [Babel](https://babeljs.io) to work in Node, and bundled by [Rollup](https://rollupjs.org), outputting separate Common JS and ES Module bundles.
