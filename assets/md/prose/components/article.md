---
title: ProseArticle
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseArticle` the direct parent of all the Baleada Prose components that you use inside your Markdown. It performs these important tasks:
- It helps [`ProseHeading`](/docs/prose/components/heading)s add themselves to the table of contents.
- When the URL ends with the slug of a heading, it scrolls to the correct heading.
- During build time, it receives your Markdown article's front matter and its original file path, then makes that data available to its descendants.

[WIP]
