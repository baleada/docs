---
title: Meta
tags: 
publish: true
order: 3
---

:::
## Developer experience
:::

The basic priorities for Baleada's developer experience are:
1. **Ship excellent types**. Baleada package's TypeScript types should always be considered the source of truth for how a particular tool is supposed to work.
2. **Thoroughly test**. In most cases, Baleada packages don't get published without a suite of passing tests. Test code is sometimes very simplified and contrived, but it should still give a decent overview of intended functionality.
3. **Write world-class docs**. Baleada docs are usually written during development, and they even inform development in a lot of cases. Docs pretty much always up to date with the latest release of any package, but they can occasionally lag behind bigger updates. Always trust types and tests if an API appears to be incorrectly documented.


:::
## Language
:::

All UI logic, composables, and configuration utilities in the Baleada toolkit are written in TypeScript.

All components are written in Vue 3, with TypeScript in the components' [`setup` functions](https://v3.vuejs.org/guide/composition-api-setup.html#setup).


:::
## Dependencies
:::

Dependencies for UI logic, composables, and components, when they exist, are chosen with the following characteristics in mind (in no particular order):
- Framework agnostic
- Few or no dependencies of their own
- Tree-shakeable
- TypeScript support
- Small impact on apps' bundle size
- Industry standard
- Recommended/used by proficient independent developers

Not all dependencies share every single one of those characteristics. However, lots of care was taken to ensure that, if a dependency can be replaced by something better in the future, doing so will be quick and easy, and with any luck, won't result in breaking changes.

Configuration utilities' dependencies are chosen similarly, but with much less emphasis placed on bundle size.


:::
## Code transformation
:::

All TypeScript is compiled to work in [browsers that support ES6 modules](https://caniuse.com/es6-module).

Vue components are either written as pure TypeScript render functions, or compiled down from Single File Components into render functions, then sent through the same TypeScript transformation.


:::
## Bundle formats
:::

All Baleada packages are bundled by Rollup.

UI logic, composables, and components are bundled as ES modules. Configuration utilities are bundled as ES modules and Common JS modules.

All bundles include a `.d.ts` file with all exported types.

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
