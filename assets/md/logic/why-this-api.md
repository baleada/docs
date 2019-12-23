---
title: Why this API?
framework: agnostic
publish: false
order: 4
---

When you're building a web app or web site, you can get extremely far with just HTML and CSS, adding structure and style, and making pages feel complete and information feel approachable.

But in order to craft a really polished user experience with rich interactivity, you need to add **UI logic**—JavaScript that powers special behaviors in your user interface. For example:
:::
- Allowing the user to enter a search term and see a list of search results, filtered based on fuzzy matches
- Autocompleting text, replacing all or part of the original text with a completed value
- Detecting and reacting to common gestures (pan, swipe, double-tap, drag, drag-and-drop, etc.)
:::

To complicate matters, those special behaviors will definitely need to be repeated and reused across projects, and even within the same project. To avoid spending all your time copy/pasting from project to project, fixing the same bug in 10 different places, and constantly reinventing the wheel, you'll need to find a way to **reuse your UI logic**.

There are several common solutions for making UI logic reusable, each with their pros and cons:

:::

| Solution | Pros | Cons |
| --- | --- | --- |
| Big, custom components that handle everything—HTML structure, CSS styles, and UI logic | <ul><li>Great for quick-fix, plug-and-play use cases.</li><li>Great if you can build a limited selection of components that get shared and used frequently.</li><li>Doesn't require that you (the developer consuming this solution) understand how `this` works.</li></ul> | <ul><li>Usually accept massive amounts of props that you need to learn in order to customize any given detail.</li><li>Usually the wrong abstraction—it makes a specific application of UI logic reusable, but fails at making the underlying logic reusable.</li><li>Not really possible unless you're using a component framework like React, Vue, Svelte, etc.</li></ul> |
| [Mixins](https://javascript.info/mixins) | <ul><li>Pretty intuitive approach: at the end of the day, it's just merging new properties into an object.</li><li>It's a general JavaScript technique that can be used outside of component frameworks</li></ul> | <ul><li>Leads to naming collisions between injected state and methods</li><li>Leads to broken components after the name of a mixed in property or method changes</li><li>Requires that you (the developer consuming this solution) have some understanding of how `this` works.</li></ul> |
| [Renderless](https://adamwathan.me/renderless-components-in-vuejs/)/[Higher order components](https://reactjs.org/docs/higher-order-components.html) | <ul><li>Effectively reuses logic without risk of naming collisions</li><li>Can be made highly customizable with only a few props</li></ul>  | <ul><li>Creates deeply nested component trees that are confusing to write and even harder to read.</li><li>Pretty difficult to pass state and methods down through nested renderless components to where it actually needs to be.</li><li>Not really possible unless you're using a component framework like React, Vue, Svelte, etc.</li><li>Usually requires that you (the developer consuming this solution) have some understanding of how `this` works.</li></ul> |

:::

All of those solutions work to an extent, but their downsides are uncomfortable, and things only get worse as projects grow bigger. Also, real-world examples of these solutions are almost always implemented for just one reactivity & component framework, with no chance of working inside another framework without rewriting and maintaining a fully separate version.

With the introduction of [React hooks](https://reactjs.org/docs/hooks-intro.html) and the [Vue composition API](https://vue-composition-api-rfc.netlify.com), however, it has become possible to
