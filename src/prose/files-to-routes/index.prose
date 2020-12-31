---
title: Files to Routes
tags: 
publish: false
order: 0
---

Baleada Files to Routes is a tool for generating single-page app routes based on your directory structure. It's inspired by similar functionality in [Next.js](https://nextjs.org/), [Nuxt.js](https://nuxtjs.org/), and [Sapper](https://sapper.svelte.dev/).


:::
## Workflow
:::

The overall workflow when using Baleada Files to Routes is:
1. Create a new file somewhere in your app to hold the generated routes. This file can be located anywhere you want, and it can have any extension, but a `.js` extension is recommended for clarity, since the build-time version of that file will export an ES module. Any content inside the file will be ignored at build time.
2. In your router config file, import the array of generated routes from the file you created in step 1.
3. Configure your build tool to use [Baleada Source Transform](/docs/source-transform), with Baleada Files to Routes as the transform function, to transform your file from step 1 into a generated list of routes.


:::
## Detailed example
:::

Imagine your single-page app's file structure looks like this:

:::
```
📦src
 ┣ 📜router.config.js
 ┗ 📂blog
 ┃ ┣ 📜introduction.md
 ┃ ┗ 📂category-1
 ┃ ┃ ┣ 📜one-post.md
 ┃ ┃ ┗ 📜another-post.md
```
:::

To get started with Baleada Files to Routes, we'll create a new empty file to hold the generated routes. We'll call this `generated-routes.js` and keep it at the top level:

:::
```
📦src
 ┣ 📜router.config.js
 ┣ 📜generated-routes.js
 ┗ 📂blog
 ┃ ┣ 📜introduction.md
 ┃ ┗ 📂category-1
 ┃ ┃ ┣ 📜one-post.md
 ┃ ┃ ┗ 📜another-post.md
```
:::

In the router config file, we'll imagine the generated routes already exist, and we'll import them from our generated routes file.

This example uses [Vue Router](https://github.com/vuejs/vue-router-next/):

:::
```js
// router.config.js
import { createRouter } from 'vue-router'

// Our generated routes are the default export from our new file:
import generatedRoutes from './generated-routes.js'

export default createRouter({
  // ...other config options
  routes: [
    // ...any routes we need to configure manually
    ...generatedRoutes // spread out the array of generated routes
  ],
})
```
:::

That's it for step one and two! Next step is to configure our build tool to use Baleada Source Transform, which currently supports Webpack and Rollup.

We're going to tell the build tool specifically to process our `generated-routes.js` file differently than other JS files.

This example shows how we would get things started with Rollup:

:::
```js
// rollup.config.js
import sourceTransform from '@baleada/rollup-plugin-source-transform'

export default {
  // ...other build options
  plugins: [
    sourceTransform({
      // Use the include option to specify which files should be processed.
      // In our case, its only our generated routes file.
      include: 'src/generated-routes.js',
    })
  ]
}
```
:::

The last step is to pass a value to Source Transform's most important option: the `transform` function that will transform `generated-routes.js` from an empty file to a generated list of routes at build time.

We can get that function from Baleada Files to Routes, which provides a `getTransform` function as its default export.


:::
### `getTransform` parameters 
:::

The `getTransform` function requires the following parameters:

::: ariaLabel="getTransform parameters" classes="wide-4"
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `router` | String | none | Indicates which single-page app router you're using. Valid values are `vue` and `react`, which correspond to Vue Router and React Router. |
| `pathToFiles` | Object | none | <p>An object with two properties: `absolute` and `relativeFromRoutes`.</p><p>The `absolute` property's value should be the absolute path (String) to the directory that contains your files that will become routes.</p><p>The `relativeFromRoutes` property's value should be the relative path (String) from your generated routes file to the directory that contains your files that will become routes.</p> |

Applying this to our example, we can call `getTransform` in our Rollup config file to get our transform function, then we can pass the function to the Source Transform plugin:

:::
```js
// rollup.config.js
import sourceTransform from '@baleada/rollup-plugin-source-transform'
import getTransform from '@baleada/source-transform-files-to-routes'

const transform = getTransform({
  router: 'vue', // 'react' is also supported
  pathToFiles: {
    // Absolute path from the top level to our blog folder:
    absolute: 'src/blog',

    // Relative path from generated-routes.js to our blog folder
    relativeFromRoutes: './blog',
  }
})

export default {
  // ...other build options
  plugins: [
    sourceTransform({
      include: 'src/generated-routes.js',

      // Pass our transform function to the plugin
      transform,
    })
  ]
}
```
:::

With all those steps complete, we can now build the site, and our build tool will automatically generate routes for each file in our `blog` folder, including any files in nested folders, no matter how deeply they are nested.

::: type="warning"
Under the hood, generated routes import each raw file as if it were an ES module. If you're writing Markdown files, Vue or React components, etc., be sure to configure your build tool to transform those files into ES modules with `default` exports.
:::

