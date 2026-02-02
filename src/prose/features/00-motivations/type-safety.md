---
title: Type safety
publish: true
order: 3
---

Baleada Features is built with TypeScript from the ground up, providing **type safety** that catches errors at compile time and enables excellent IDE support.


:::
## Inferred return types
:::

Feature return types are inferred from their options. A multiselectable listbox has different types than a single-select listbox:

::: canCopy
```ts
import { useListbox } from '@baleada/vue-features'

// Single-select: selectedOptions.picks is number | undefined
const single = useListbox({ multiselectable: false })

// Multi-select: selectedOptions.picks is number[]
const multi = useListbox({ multiselectable: true })
```
:::

TypeScript knows the difference, so you get accurate autocomplete and type checking based on your configuration.


:::
## Generic type parameters
:::

Features use generics to flow type information through composed layers. The `useListbox` function signature captures whether it's multiselectable and its orientation:

::: canCopy
```ts
function useListbox<
  Multiselectable extends boolean = false,
  Clears extends boolean = true,
  O extends Orientation = 'vertical',
>(options?: UseListboxOptions<Multiselectable, Clears, O>): Listbox<Multiselectable, O>
```
:::

This means the returned `Listbox` type adapts to your configuration, providing the right properties and methods.


:::
## Element API types
:::

Element APIs track their metadata types. When you configure metadata on elements, TypeScript enforces that you provide the right shape:

::: canCopy
```ts
// Define custom metadata type
type OptionMeta = {
  label: string
  ability: 'enabled' | 'disabled'
}

// TypeScript ensures meta matches OptionMeta
listbox.options.ref(index, {
  label: 'Option 1',
  ability: 'enabled',
})
```
:::


:::
## Status and state types
:::

All status values use union types, making invalid states impossible:

::: canCopy
```ts
type PopupStatus = 'opened' | 'closed'
type FocusStatus = 'focused' | 'blurred'
type PressStatus = 'pressed' | 'released'
type ConditionalStatus = 'rendering' | 'rendered' | 'removing' | 'removed'
```
:::

When you check status, TypeScript narrows the type:

::: canCopy
```ts
const popup = usePopup(element)

if (popup.is.opened()) {
  // TypeScript knows popup is open here
}
```
:::


:::
## Options type checking
:::

Invalid option combinations are caught at compile time. Combos restrict which nested options are exposed:

::: canCopy
```ts
import { useCombobox } from '@baleada/vue-features'

useCombobox({
  listbox: {
    orientation: 'vertical',  // Allowed
    multiselectable: true,    // Error: not configurable on combobox
  },
})
```
:::


:::
## Ref types
:::

Features return Vue refs with proper types. Reactive values use `Ref` or `ComputedRef`, and you always know what type is inside:

::: canCopy
```ts
const listbox = useListbox()

// listbox.focused is Ref<number>
// listbox.selected is Ref<number[]>
// listbox.is.focused(index) returns boolean
```
:::

Type safety means you spend less time debugging runtime errors and more time building features. Your IDE knows exactly what's available, what types are expected, and warns you when something doesn't match.
