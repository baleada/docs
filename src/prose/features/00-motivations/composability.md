---
title: Composability
publish: true
order: 1
---

Baleada Features is designed around **composability**—the ability to build complex features by combining simpler, reusable pieces.

The package organizes features into layers that build on each other:

1. **Affordances** — Low-level tools for binding attributes, handling events, and showing/hiding elements
2. **Extensions** — Reusable behaviors like `usePopup`, `useFocus`, `usePress`, and `useHover`
3. **Interfaces** — Complete accessible UI patterns like `useListbox`, `useButton`, and `useTextbox`
4. **Combos** — Full components that combine interfaces and extensions, like `useCombobox`, `useSelect`, and `useMenu`

Each layer composes features from the layers below it, and you can use any layer directly depending on your needs.


:::
## Extensions compose into interfaces
:::

Extensions add focused, reusable behaviors to elements. For example, `usePress` handles all the complexity of pointer and keyboard press interactions:

::: canCopy
```ts
import { usePress } from '@baleada/vue-features'

const press = usePress(element)

// React to press events
watch(press.firstDescriptor, () => {
  console.log('Pressed!')
})
```
:::

Interfaces like `useButton` compose extensions internally. A button needs press detection, ability state, and proper ARIA bindings—`useButton` composes all of these together:

::: canCopy
```ts
import { useButton } from '@baleada/vue-features'

const button = useButton()
// Internally composes usePress, useAbility, bind(), and more
```
:::


:::
## Interfaces compose into combos
:::

When you need a complete component, like a combobox with a textbox, button, and popup listbox, you can use a combo. Combos compose multiple interfaces and extensions:

::: canCopy
```ts
import { useCombobox } from '@baleada/vue-features'

const combobox = useCombobox()
// Internally composes:
// - useTextbox (for the input)
// - useButton (for the trigger)
// - useListbox (for the options)
// - usePopup (for show/hide behavior)
```
:::


:::
## Mix and match layers
:::

You can combine features from any layer to build exactly what you need.

Need a custom select that uses your own trigger instead of a button? Compose a listbox with a popup yourself:

::: canCopy
```ts
import { useListbox, usePopup } from '@baleada/vue-features'

const listbox = useListbox()
const popup = usePopup(listbox)

// Wire up your custom trigger
watch(customTrigger.activated, popup.toggle)
```
:::

Need press detection with custom behavior that isn't covered by the built-in button? Use the extension directly:

::: canCopy
```ts
import { usePress } from '@baleada/vue-features'

const press = usePress(element, {
  pointer: {
    minDuration: 500, // Long press
  },
})
```
:::


:::
## Compose extensions onto interfaces
:::

Extensions can enhance interfaces after the fact. For example, add focus tracking to a button:

::: canCopy
```ts
import { useButton, useFocus } from '@baleada/vue-features'

const button = useButton()
const focus = useFocus(button.root)

// Now you have both button behavior and focus state
watch(focus.status, status => {
  console.log(`Button focus: ${status}`)
})
```
:::

Or add hover detection to a listbox option:

::: canCopy
```ts
import { useListbox, useHover } from '@baleada/vue-features'

const listbox = useListbox()

// Track hover on a specific option
const optionHover = useHover(listbox.options.list.value[0])
```
:::

Composability means you're never locked into a single approach. Start with a high-level combo, drop down to interfaces when you need more control, and use extensions and affordances when you need to build something truly custom.
