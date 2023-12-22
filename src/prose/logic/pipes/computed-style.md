---
title: computed style
tags: UI Logic
source: element.ts
tests: browser/element.test.ts
publish: true
order: 0
---

`createComputedStyle` is a [pipe](/docs/logic/pipes-overview) that transforms an element to a [`CSSStyleDeclaration](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration) for that element, or optionally one of its pseudo-elements.


:::
## Create computed style
:::

Call `createComputedStyle` with these parameters to create your `computedStyle` function:

::: ariaLabel="createComputedStyle parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `options` | Object | no | Options to customize the behavior of the `computedStyle` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createComputedStyle options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `pseudoElement` | string | `undefined` | The pseudo-element to get the computed style for. |
:::
