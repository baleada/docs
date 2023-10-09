---
title: Factories
tags: UI Logic
source: true
publish: true
order: 5
---

In Baleada Logic, every **factory** is a [factory function](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1), i.e. a function that returns an object.

Baleada Logic's factories have one additional characteristic: all of the object's properties are functions. If/when these functions share state, the state is kept private inside the factory, and it's not intended for public consumption or observation.

In terms of utility, factories fall in between [classes](/docs/logic/classes-overview) and [pipes](/docs/logic/pipes-overview) & [links](/docs/logic/links-overview). They follow functional programming principles like pipes and links, but similar to classes, they're less reusable and composable, and their functionality isn't tree-shakeable.

For a complete list of available factories, see the **Factories** section under the **Logic** heading in the left sidebar.
