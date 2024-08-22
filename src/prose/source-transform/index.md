---
title: What is Baleada Source Transform?
publish: true
order: 0
summary: An absurdly flexible tool that can transform the contents of any file during your site or app's build step
---

Baleada Source Transform is an absurdly flexible tool that can transform the contents of any file during your site or app's build step.

It handles the most basic implementation details of [Webpack](https://webpack.js.org/) loaders and [Rollup](https://rollupjs.org/) plugins, then lets you transform the contents of any source file in any way you see fit, using a [consistent, build tool agnostic, simple workflow](#workflow).

In other words, Baleada Source Transform abstracts build tool boilerplate so you can write more reusable build code.

:::
> Baleada Source Transform abstracts build tool boilerplate so you can write more reusable build code.
:::

::: type="info"
Didn't see your favorite build tool in the list? Feel free to [raise an issue](https://github.com/baleada/source-transform/issues) and ask for support.
:::

<!-- To see a practical application of Baleada Source Transform, [check out how Baleada Prose uses it to load Markdown files](/docs/prose/using-with-markdown), replacing standard HTML elements with feature-rich components. -->


:::
## Workflow
:::

Abstractly, Baleada Source Transform's workflow is:
1. Configure your build tool to use Baleada Source Transform
2. Write a `transform` function that will transform the source
3. Pass your `transform` function into Baleada Source Transform

For more guidance on how to configure your build tool to use Baleada Source Transform and how to pass your `transform` function into Baleada Source Transform, see the dedicated guides for each build tool:
- [Rollup](/docs/source-transform/using-with-Rollup)
- [Webpack](/docs/source-transform/using-with-Webpack)

However, the way you write your `transform` function is always the same. Regardless of the build tool, your `transform` function will receive one argument—an object with the following properties:

::: ariaLabel="Properties of the object passed to the transform function" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `source` | String | The contents of the file being transformed. |
| `id` | String | The file path of the file being trasnformed. |
| `context` | Object | <p>The context object provided by the build tool.</p><p>This is different for each build tool—see the dedicated guide for each build tool for more info.</p> |
| `utils` | Object | <p>An object whose properties contain utility functions.</p><p>This is different for each build tool—see the dedicated guide for each build tool for more info.</p> |
:::

Most of the time, your `transform` function will return the transformed source as a String. However, depending on the build tool you use, you can return other things. The dedicated guides for each build tool have more information:
- [Rollup](/docs/source-transform/using-with-Rollup)
- [Webpack](/docs/source-transform/using-with-Webpack)


:::
## Language, compilation, browser support, and dependencies
:::

Baleada Source Transform is written in modern JavaScript and compiled using [Babel](https://babeljs.io) to support Node. It's not designed to be used in the browser, but instead will most often be used in the Node environment along with your build tools.

Baleada Source Transform dependends on:
- [`loader-utils`](https://github.com/webpack/loader-utils)
- [`schema-utils`](https://github.com/webpack/schema-utils)
- [`@rollup/pluginutils`](https://github.com/rollup/plugins/tree/master/packages/pluginutils)


:::
## Semantic versioning conventions
:::

Any changes to the Baleada Source Transform workflow, including changes to the top-level keys of the object passed to your `transform` function, will trigger a new major release.

If the `loader-utils`, `schema-utils`, or `@rollup/pluginutils` packages change the functions they provide, or change the way those functions work, that would only trigger a new minor release.
