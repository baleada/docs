---
title: Possible focus
tags: Composition functions
publish: true
order: 0
---

In Baleada Features, any interface that transfers focus with keyboard navigation relies on **possible focus**: a group of functions that only focus elements that are considered "possible" focus targets.

To be considered a "possible" focus target, an element has to meet **one** of two conditions:
1. The element is **enabled**, OR
2. The element is **disabled** AND the interface was configured to allow focus to transfer to disabled elements

Every interface that relies on possible focus also includes all of the possible focus functions in its return value. This guide serves as **shared documentation** for the possible focus functions returned by interfaces.


:::
## Use possible focus
:::

Possible focus is always included in interfaces' return values as an object containing methods. Here are the properties on that object:

::: ariaLabel="Possible focus methods" classes="wide-3 wide-4"
| Property | Type | Description | Parameters |
| --- | --- | --- | --- |
| `exact(index)` | Function | Transfers focus to a specific element | The index-based position of the element |
| `next(index[, options])` | Function | Transfers focus to the next possible element after a specific index | <p>The index to start searching from.</p><p>Each interface that uses possible focus accepts an option to configure whether or not `next` will loop around to the beginning of the list of elements to continue its search for a possible focus target.</p><p>For more guidance on the optional `options` parameter, see the [Narrowing the definition of "possible"](#narrowing-the-definition-of-possible) section.</p> |
| `previous(index[, options])` | Function | Transfers focus to the previous possible element before a specific index | <p>The index to start searching from.</p><p>Each interface that uses possible focus accepts an option to configure whether or not `previous` will loop around to the end of the list of elements to continue its search for a possible focus target.</p><p>For more guidance on the optional `options` parameter, see the [Narrowing the definition of "possible"](#narrowing-the-definition-of-possible) section.</p> |
| `first([options])` | Function | Transfers focus to the first possible element | For more guidance on the optional `options` parameter, see the [Narrowing the definition of "possible"](#narrowing-the-definition-of-possible) section. |
| `last([options])` | Function | Transfers focus to the last possible element | For more guidance on the optional `options` parameter, see the [Narrowing the definition of "possible"](#narrowing-the-definition-of-possible) section. |
:::

All possible navigation methods return a string that describes the element that was navigated to:
- Methods return `enabled` if the destination element is enabled
- Methods return `disabled` if the destination element is disabled
- Methods return `none` if navigation was unsuccessful (e.g. if you use `exact` to navigate to a disabled elements when disabled elements are not configured to receive focus)


:::
### Narrowing the definition of "possible" 
:::

In some situations, you might want to narrow the definition of "possible". In other words, you might want to consider other information, beyond just the enabled/disabled state, before confirming that an element is actually a possible focus target.

For example, if you're building a spreadsheet interface, you might want an easy way to focus the next cell that contains a formula. These app-specific conditions for focus transfer get first-class support from Baleada Features' possible focus functions.

More specifically, you can use the optional `options` argument of the `next`, `previous`, `first`, and `last` functions to set up your additional conditions for determining what is considered a "possible" focus target.

The `options` argument for each of those functions is an object. Here's a breakdown of that object:

::: ariaLabel="Possible focus methods" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `toPossibility` | Function | no | `() => 'possible'` | <p>When `next`, `previous`, `first`, or `last` find an element that they consider to be a possible focus target (based on the conditions listed at the beginning of this guide), they call the `toPossibility` function as an additional check.</p><p>`toPossibility` receives one argument: an object with two properties. The `index` property holds the index-based position of the element in its list, and the `element` property is a reference to the actual DOM element.</p><p>Given that argument, `toPossibility` should return the string `possible` if the element is a possible focus target, and the string `impossible` if it is not a possible focus target.</p> |
:::

what about exact?
