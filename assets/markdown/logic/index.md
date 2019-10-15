---
title: What is Baleada Logic?
framework: agnostic
publish: true
order: 0
---

Baleada Logic is a collection of JavaScript [classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) and [subclasses](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Sub_classing_with_extends) that implement **UI logic**.


<ProseHeading level="2">
A note, before you dive in
</ProseHeading>

Although all of Baleada Logic's classes and subclasses are framework-agnostic, their main purpose is to add useful state and methods to websites and apps that are built on reactive frameworks like Vue, React, and Svelte. In almost all cases, it's recommended that you use <NuxtLink to="/docs/composition">Baleada Composition</NuxtLink> instead of importing classes and subclasses directly from Baleada Logic.

Baleada Composition has a dedicated composition function for each individual Baleada Logic class, plus composition functions that combine Baleada Logic classes to implement common UI patterns (think autocompletes, toasts, forms that auto-save, etc.).

If you're planning to use Baleada Composition, you won't need to know how to install and import classes and subclasses from Baleada Logic, but you'll still need to know how to use individual classes and subclasses. A great place to start is the <NuxtLink to="/docs/logic/api-design">API design</NuxtLink> guide, which will teach you core concepts and patterns that will help you use any and all of Baleada Logic's classes and subclasses.

If instead you think you fall outside the normal use cases, feel free to keep reading!

<ProseHeading level="2">
Language, compilation, browser support, and dependencies
</ProseHeading>

Classes and subclasses are written in modern JavaScript, with few or no dependencies of their own. They are compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Logic's compiled code uses [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) and [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) instead of [`require()`](https://nodejs.org/api/modules.html#modules_require_id) and [`module.exports`](https://nodejs.org/api/modules.html#modules_module_exports).

All dependencies were chosen with the following desirable characteristics in mind (in no particular order):
- Framework agnostic
- Few or no dependencies of their own
- Small file size
- Tree-shakeable
- Small impact on apps' bundle size
- Industry standard
- Recommended/used by proficient, well-known, independent developers

Not all dependencies meet each one of those requirements. However, lots of care was taken to ensure that, if a dependency needs to be replaced, doing so would be quick and easy, and with any luck, wouldn't result in breaking changes.



<ProseHeading level="2">
Install
</ProseHeading>

<ProseCodeblock>

```bash
npm i @baleada/logic
```

</ProseCodeblock>


<ProseHeading level="2">
Import a class or subclass (allows for tree-shaking)
</ProseHeading>

All classes are named exports in Baleada Logic's entry file, so you can import one like so:


<ProseCodeblock>

```js
import { Delayable } from '@baleada/logic'
```

</ProseCodeblock>

Subclasses are named exports in a `subclasses.js` file at the root of Baleada Logic, so you can import one like so:

<ProseCodeblock>

```js
import { Markupable } from '@baleada/logic/subclasses'
```

</ProseCodeblock>


<ProseHeading level="2">
Available classes and subclasses
</ProseHeading>

All available classes and subclasses are listed in this site's navigation under **LOGIC** and linked to their specific documentation.
