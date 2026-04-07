---
title: Composability
publish: true
order: 1
---

Baleada Features is designed for **composability**—the ability to build complex UIs by combining smaller reusable pieces.

You can use an [interface](/docs/features/interfaces-overview) or a [combo](/docs/features/combo-overview) to wire up essential UI logic and [accessibility](/docs/features/motivations/accessibility) features, then add [extensions](/docs/features/extensions-overview) to bring additional functionality. You can even drop down to [affordances](/docs/features/affordances-overview) for lower level tasks like binding props or adding custom event listeners to an existing element.

:::
```ts
import { useListbox, useFocus, bind, on } from '@baleada/vue-features'

const listbox = useListbox()

// Extend with focus tracking
const focus = useFocus(listbox)

// Bind a custom class to the root element
bind(
  listbox.root.element,
  { class: 'my-listbox' }
)

// Add a custom event listener to the root element
on(
  listbox.root.element,
  { keydown: event => console.log('keydown', event.key) }
)
```
:::

Baleada Features is a love letter to the Vue 3 Composition API, showcasing the composability it unlocks.
