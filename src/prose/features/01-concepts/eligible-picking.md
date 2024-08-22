---
title: Eligible picking
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

In Baleada Features, any interface that allows you to select or activate one or more elements relies on **eligible picking**: a group of functions that only pick elements that are considered "eligible".

To be considered "eligible", an element's [ability](/docs/features/ability) must be `enabled`.

Every interface that relies on eligible picking also includes all of the eligible picking functions in its return value. This guide serves as **shared documentation** for the eligible picking functions returned by interfaces.


:::
## Use eligible picking
:::

Eligible picking is always included in interfaces' return values as an object containing methods. Here are the properties on that object:

::: ariaLabel="Eligible picking methods" classes="wide-1 wide-3 wide-4"
| Property | Type | Description | Parameters |
| --- | --- | --- | --- |
| `exact(indexOrIndices[, options])` | Function | Picks a specific element, or more than one element, identified by the elements' index-based positions in your list. | <p>The index-based position of the element, or an array of index based positions for more than one element.</p><p>The optional `options` argument accepts options for the `pick` method of the [`Pickable`](/docs/logic/classes/Pickable) class.</p><p>It also accepts a `toEligibility` option. For more guidance on `toEligibility`, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
| `next(index[, options])` | Function | Picks the next eligible element after a specific index | <p>The index to start searching from.</p><p>Interfaces that use eligible picking never allow `next` to loop around to the beginning of the list of elements to continue its search for an eligible picking target.</p><p>The optional `options` argument accepts options for the `pick` method of the [`Pickable`](/docs/logic/classes/Pickable) class.</p><p>It also accepts a `toEligibility` option. For more guidance on `toEligibility`, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
| `previous(index[, options])` | Function | Picks the previous eligible element before a specific index | <p>The index to start searching from.</p><p>Interfaces that use eligible picking never allow `previous` to loop around to the beginning of the list of elements to continue its search for an eligible picking target.</p><p>The optional `options` argument accepts options for the `pick` method of the [`Pickable`](/docs/logic/classes/Pickable) class.</p><p>It also accepts a `toEligibility` option. For more guidance on `toEligibility`, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
:::

All eligible picking methods return a string that describes the element that was picked to:
- Methods return `enabled` if the destination element is enabled
- Methods return `none` if picking was unsuccessful (e.g. if you use `exact` to try and pick a disabled element)
- Unlike the [eligible focus](/docs/features/shared/eligible-focus) methods, eligible picking methods never return `disabled`, because picking disabled elements is never allowed.


:::
### Narrowing the definition of "eligible" 
:::

In some situations, you might want to narrow the definition of "eligible". In other words, you might want to consider other information, beyond just the enabled/disabled state, before confirming that an element is actually an eligible picking target.

For example, if you're building a spreadsheet interface, you might want an easy way to highlight the next cell that contains a formula. These app-specific conditions for picking get first-class support from Baleada Features' eligible picking functions.

More specifically, you can use the optional `options` argument of the eligible picking functions to set up your additional conditions to determine what is considered "eligible".

The `options` argument for each of those functions is an object. Here's a breakdown of that object:

::: ariaLabel="Eligible picking methods" classes="wide-1 wide-4 wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `toEligibility({ index, element })` | Function | no | `() => 'eligible'` | <p>When eligible picking functions find an element that they consider to be an eligible picking target (based on the conditions listed at the beginning of this guide), they call the `toEligibility` function as an additional check.</p><p>`toEligibility` receives one argument: an object with two properties. The `index` property holds the index-based position of the element in its list, and the `element` property is a reference to the actual DOM element.</p><p>Given that argument, `toEligibility` should return the string `eligible` if the element is an eligible picking target, and the string `ineligible` if it is not an eligible picking target.</p> |
| Any property that can be passed to the optional `options` argument of the `pick` method of the [`Pickable`](/docs/logic/classes/Pickable) class. | See `Pickable` docs | ... | ... | ... |
:::

Here's a code example of how to use the eligible picking functions return by [`useListbox`](/docs/features/interfaces/listbox) to select the next eligible element, where the definition of "eligible" has been narrowed:

:::
```ts
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox()

// Imagine a listbox whose list options are split into several groups.
//
// We can pass an index of `-1` and a custom `toEligibility` option
// to the `listbox.select.next` function to select the first
// enabled element in a specific group.
listbox.select.next(-1, {
  toEligibility: ({ index }) => {
    return myOptions[index].group === 'Group 3'
      ? 'eligible'
      : 'ineligible'
  }
})
```
:::
