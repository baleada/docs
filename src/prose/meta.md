---
title: Meta
tags: 
publish: true
order: 3
---

:::
## Language
:::

All UI logic, composition functions, and configuration utilities in the Baleada toolkit are written in modern JavaScript. Typescript types are steadily being added via [JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#typedef-callback-and-param).

All components are written as Vue 3 Single File Components, with modern JavaScript in the components' [`setup` functions](https://v3.vuejs.org/guide/composition-api-setup.html#setup).


:::
## Dependencies
:::

Dependencies for UI logic, composition functions, and components, when they exist, are chosen with the following characteristics in mind (in no particular order):
- Framework agnostic
- Few or no dependencies of their own
- Tree-shakeable
- Small impact on apps' bundle size
- Industry standard
- Recommended/used by proficient independent developers

Not all dependencies share every single one of those characteristics. However, lots of care was taken to ensure that, if a dependency can be replaced by something better in the future, doing so will be quick and easy, and with any luck, won't result in breaking changes.

Configuration utilities' dependencies are chosen similarly, but with much less emphasis placed on bundle size.

All Baleada tools ship with [`@babel/runtime`](https://www.npmjs.com/package/@babel/runtime) listed as a dependency, though not every tool actually imports anything from that package.

If a tool has dependencies other than `@babel/runtime`, those dependencies are noted in the tool's documentation.


:::
## Code transformation
:::

All JavaScript is transformed by [Babel](https://babeljs.io) to work in [browsers that support ES6 modules](https://caniuse.com/es6-module).

Vue components are compiled down from Single File Components into plain JavaScript with render functions, then sent through the same Babel transformation.


:::
## Bundle formats
:::

All Baleada packages are bundled by Rollup.

UI logic, composition functions, and components are bundled as ES modules. Configuration utilities are bundled as ES modules and Common JS modules.

The one exception is [Baleada Logic](/docs/logic). It's the biggest UI logic tool Baleada offers, and it's primarily designed to run in the browser, but certain exports from that package are useful in a non-browser environment, so Baleada Logic includes a Common JS bundle as well.


:::
## Package names
:::

If a package is written to be used with a specific framework, build tool, etc., the name of that tool is added to the package name.

For example, [Baleada Features](/docs/features) has a Vue-specific implementation. That implementation is published under `@baleada/vue-features`. If a React version is created in the future, it will be published under `@baleada/react-features`.

[Baleada Logic](/docs/logic), on the other hand, is designed to be completely framework agnostic. The only published package is `@baleada/logic`, because there are no framework-specific implementations, and there will never be any.

In the docs, though, all packages are _always_ referred to by their actual name, e.g. "Baleada Features", rather than framework-specific implementations, e.g. "Baleada Vue Features".


:::
## Package exports
:::

Baleada packages use [conditional exports](https://nodejs.org/api/packages.html#packages_conditional_exports) to determine which code to expose.


:::
## Side effects
:::

Baleada tools never have side effects, making them all eligible for treeshaking.


:::
## Testing
:::

Baleada packages use [uvu](https://github.com/lukeed/uvu) to run tests and make assertions.

Any code that uses web APIs is tested in a real browser. Baleada uses [Vite](https://vitejs.dev/) to bundle and serve that code on a local development server, then uses [puppeteer](https://pptr.dev) to control an instance of headless Chrome, requesting pages from the local server and running test code once the page loads.


:::
## Repositories
:::

Each Baleada package has its own repo, owned by the [Baleada organization on GitHub](https://github.com/baleada)

Repositories' source code is located in the `src` folder, bundled code outputs to the `lib` folder, and tests are in the `tests` folder.

If a package tests its code in the browser, you can find the Vite app's code in the `tests/stubs/app` folder.

::: type="info"
Tests for Baleada packages are almost always written before documentation. If a Baleada package is missing docs, check the `tests` folder in the package's repo to see usage examples and intended behavior. 
:::


:::
## Copyright and Licensing
:::

All of Baleada's tools are copyrighted from 2019-present and licensed under the MIT license.


:::
## Contributing
:::

Pull requests and issues are welcome on all Baleada repositories!
