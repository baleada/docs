---
title: Eligible focus
publish: true
order: 0
---

::: type="warning"
Under construction 🚧
:::

In Baleada Features, any interface that allows arrow keys to transfer focus relies on **eligible focus**: a group of functions that only focus elements that are considered "eligible" focus targets.

To be considered a "eligible" focus target, an element has to meet **one** of two conditions:
1. The element's [ability](/docs/features/ability) is `enabled`, OR
2. The element's [ability](/docs/features/ability) is `disabled` AND the interface was configured to allow focus to transfer to disabled elements

Every interface that relies on eligible focus also includes all of the eligible focus functions in its return value. This guide serves as **shared documentation** for the eligible focus functions returned by interfaces.


:::
## Use eligible focus
:::

Eligible focus is always included in interfaces' return values as an object containing methods. Here are the properties on that object:

::: ariaLabel="Eligible focus methods" classes="wide-1 wide-3 wide-4"
| Property | Type | Description | Parameters |
| --- | --- | --- | --- |
| `exact(index[, options])` | Function | Transfers focus to a specific element, identified by its index-based position in your list. | <p>The index-based position of the element.</p><p>For more guidance on the optional `options` parameter, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
| `next(index[, options])` | Function | Transfers focus to the next eligible element after a specific index | <p>The index to start searching from.</p><p>Each interface that uses eligible focus accepts an option to configure whether or not `next` will loop around to the beginning of the list of elements to continue its search for an eligible focus target.</p><p>For more guidance on the optional `options` parameter, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
| `previous(index[, options])` | Function | Transfers focus to the previous eligible element before a specific index | <p>The index to start searching from.</p><p>Each interface that uses eligible focus accepts an option to configure whether or not `previous` will loop around to the end of the list of elements to continue its search for an eligible focus target.</p><p>For more guidance on the optional `options` parameter, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section.</p> |
| `first([options])` | Function | Transfers focus to the first eligible element | For more guidance on the optional `options` parameter, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section. |
| `last([options])` | Function | Transfers focus to the last eligible element | For more guidance on the optional `options` parameter, see the [Narrowing the definition of "eligible"](#narrowing-the-definition-of-eligible) section. |
:::

All eligible focus methods return a string that describes the element that was focused:
- Methods return `enabled` if the destination element is enabled
- Methods return `disabled` if the destination element is disabled
- Methods return `none` if focus was unsuccessful (e.g. if you use `exact` to focus a disabled elements when disabled elements are not configured to receive focus)


:::
### Narrowing the definition of "eligible" 
:::

In some situations, you might want to narrow the definition of "eligible". In other words, you might want to consider other information, beyond just the enabled/disabled state, before confirming that an element is actually an eligible focus target.

For example, if you're building a spreadsheet interface, you might want an easy way to focus the next cell that contains a formula. These app-specific conditions for focus transfer get first-class support from Baleada Features' eligible focus functions.

More specifically, you can use the optional `options` argument of the eligible focus functions to set up your additional conditions to determine what is considered a "eligible" focus target.

The `options` argument for each of those functions is an object. Here's a breakdown of that object:

::: ariaLabel="Eligible focus methods" classes="wide-1 wide-4 wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `toEligibility({ index, element })` | Function | no | `() => 'eligible'` | <p>When eligible focus functions find an element that they consider to be an eligible focus target (based on the conditions listed at the beginning of this guide), they call the `toEligibility` function as an additional check.</p><p>`toEligibility` receives one argument: an object with two properties. The `index` property holds the index-based position of the element in its list, and the `element` property is a reference to the actual DOM element.</p><p>Given that argument, `toEligibility` should return the string `eligible` if the element is an eligible focus target, and the string `ineligible` if it is not an eligible focus target.</p> |
:::

Here's a code example of how to use the eligible focus functions return by [`useListbox`](/docs/features/interfaces/listbox) to transfer focus to the next eligible element, where the definition of "eligible" has been narrowed:

:::
```ts
import { useListbox } from '@baleada/vue-features'

const listbox = useListbox()

// Imagine a listbox whose list options are split into several groups.
//
// We can pass a custom `toEligibility` option to the 
// `listbox.focus.first` function to transfer focus the first
// enabled element in a specific group.
listbox.focus.first({
  toEligibility: ({ index }) => {
    return myOptions[index].group === 'Group 3'
      ? 'eligible'
      : 'ineligible'
  }
})
```
:::
