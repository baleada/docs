---
title: focusable
tags: UI Logic
source: element.ts
tests: browser/element.test.ts
publish: true
order: 0
---

`createFocusable` is a [pipe](/docs/logic/pipes-overview) that transforms an element to its first or last focusable descendant, via a depth-first search. It optionally can return the element itself, if it is focusable.


:::
## Create focusable
:::

Call `createFocusable` with no parameters to create your `focusable` function.

Call `createFocusable` with these parameters to create your `focusable` function:

::: ariaLabel="createFocusable parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `order` | `'first'` or `'last'` | yes | <p>The order of the focusable element to return.</p><p>In other words, call `createFocusable('first')` to create a `focusable` function that will identify the first focusable descendant of an element.</p> |
| `options` | Object | no | Options to customize the behavior of the `focusable` function. See the [Options](#options) section for more guidance. |
:::


:::
### Options
:::

::: ariaLabel="createAssociativeArrayHas options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `predicatesElement` | Boolean | `false` | <p>Indicates whether or not your `focusable` function should check if the element you pass to the function is focusable.</p><p>For example, if `predicatesElement` is `true`, and you call `focusable(someFocusableButton)`, the function would return `someFocusableButton`.</p> |
| `tabbableSelector` | String | See source code | Customizes the CSS selector that `focusable` uses to find focusable elements. |
:::
