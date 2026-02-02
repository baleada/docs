---
title: Configurability
publish: true
order: 2
---

Baleada Features provides sensible defaults while allowing deep **configurability** for every feature.

The WAI-ARIA spec often allows multiple valid approaches for the same component. A listbox can be vertical or horizontal. Focus can wrap around or stop at the ends. Disabled options can receive focus or be skipped entirely.

Baleada Features lets you configure all of these behaviors and more.


:::
## Options objects with defaults
:::

Every feature accepts an options object. Defaults are chosen to match the most common use cases, so you can often start with zero configuration:

::: canCopy
```ts
import { useListbox } from '@baleada/vue-features'

// Sensible defaults: vertical, single-select, focus wraps, clearable
const listbox = useListbox()
```
:::

When you need different behavior, pass options to override the defaults:

::: canCopy
```ts
const listbox = useListbox({
  orientation: 'horizontal',
  multiselectable: true,
  loops: false,
  clears: false,
})
```
:::


:::
## Configure initial state
:::

Features let you configure initial state. Set which option is focused and selected when a listbox initializes:

::: canCopy
```ts
const listbox = useListbox({
  initialFocused: 2,        // Third option focused
  initialSelected: [0, 1],  // First two options selected
})
```
:::

Or use semantic values:

::: canCopy
```ts
const listbox = useListbox({
  initialFocused: 'selected',  // Focus the selected option
  initialSelected: 'none',     // Nothing selected initially
})
```
:::


:::
## Configure accessibility behavior
:::

The WAI-ARIA spec defines required accessibility behavior, but also leaves many details up to the implementation. Baleada Features exposes these as options.

For example, should disabled options receive keyboard focus? Both approaches are valid:

::: canCopy
```ts
// Skip disabled options during keyboard navigation (default)
const listbox = useListbox({
  disabledOptionsReceiveFocus: false,
})

// Allow focus on disabled options (user can see them, just can't select)
const listbox = useListbox({
  disabledOptionsReceiveFocus: true,
})
```
:::


:::
## Configure nested features
:::

Combos compose multiple features, and you can configure each one:

::: canCopy
```ts
import { useCombobox } from '@baleada/vue-features'

const combobox = useCombobox({
  textbox: {
    // Configure the textbox
  },
  button: {
    // Configure the toggle button
  },
  listbox: {
    // Configure the listbox
    loops: false,
  },
  popup: {
    // Configure popup behavior
    initialStatus: 'opened',
  },
})
```
:::


:::
## Configure interactions
:::

Features that handle user input expose interaction options. Configure press behavior on a button:

::: canCopy
```ts
import { useButton } from '@baleada/vue-features'

const button = useButton({
  press: {
    pointer: {
      minDuration: 0,    // Instant response
    },
    keyboard: {
      preventsDefaultUnlessDenied: true,
    },
  },
})
```
:::

Or configure query matching in a listbox:

::: canCopy
```ts
const listbox = useListbox({
  query: {
    matchThreshold: 0.6,  // Fuzzy matching threshold
  },
})
```
:::


:::
## Configure transitions
:::

Features that show and hide elements support transition configuration via the `show` affordance:

::: canCopy
```ts
import { usePopup } from '@baleada/vue-features'

const popup = usePopup(element, {
  conditional: {
    show: {
      transition: {
        appear: { ... },
        enter: { ... },
        leave: { ... },
      },
    },
  },
})
```
:::

All of this configurability means you can match your exact design requirements and user experience goals, while still benefiting from Baleada Features' accessibility and interaction handling.
