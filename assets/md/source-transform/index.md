---
title: What is Baleada Source Transform?
framework: agnostic
publish: true
order: 0
---

Baleada Source Transform is an absurdly flexible tool that allows you to transform files' content during your site or app's build step.

It was originally designed to load Markdown files using [Webpack](https://webpack.js.org/), but evolved into a package that just handles the most basic implementation details and boilerplate of Webpack loaders and [Rollup](https://rollupjs.org/) plugins, then lets you transform the contents (String) of any source file in any way you see fit.

::: type="info"
Didn't see your favorite build tool in the list? Feel free to [raise an issue](https://gitlab.com/baleada/source-transform/issues) and ask for support.
:::

<!-- To see a practical application of Baleada Source Transform, [check out how Baleada Prose uses it to load Markdown files](/docs/prose/using-with-markdown), replacing standard HTML elements with feature-rich components. -->

:::
## Installation
:::

Install from npm:

```bash
npm i @baleada/source-transform
```

:::
## Usage
:::

See the dedicated guides on [using with Webpack](/docs/source-transform/using-with-webpack) and [using with Rollup](/docs/source-transform/using-with-rollup).