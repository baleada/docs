---
title: try async
tags: UI Logic
source: function.ts
publish: true
order: 0
---

`createTryAsync` is a [pipe](/docs/logic/pipes-overview) that asynchronously transforms a function to the resolved value of its returned `Promise`, or if the function fails, an `Error`.

In other words, `createTryAsync` is an async `try`-`catch` block in the form of a function.


:::
## Create try
:::

Call `createTryAsync` with no parameters to create your `try` function.
