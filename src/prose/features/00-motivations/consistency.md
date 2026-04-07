---
title: Consistency
publish: true
order: 4
---

Baleada Features values **consistency**. Code is painstakingly organized into [different categories](/docs/features/#using-functions), each of which follow their own set of explicit, unbreakable rules.

These rules govern everything from return types to optional parameters to source code organization, and they reduce mental overhead for users and contributors, both human and LLM 🤖

Feast your eyes on some visual symmetry:

:::
```ts
// Interfaces
const button = useButton({
  toggles: true,
  initialStatus: 'off',
})
const listbox = useListbox({
  loops: true,
  initialFocused: 0,
  initialSelected: 0,
})
const grid = useGrid({
  loops: true,
  initialFocused: { row: 0, column: 0 },
  initialSelected: { row: 0, column: 0 },
})


// Combos
const modal = useModal({
  button: { press: { keyboard: false } },
  dialog: {},
  popup: { trapsFocus: true },
})
const menu = useMenu({
  button: { press: { keyboard: false } },
  bar: { loops: true, orientation: 'horizontal' },
  popup: { trapsFocus: true },
})


// Extensions
const element = ref()

const size = useSize(element)
const focus = useFocus(element)
const animation = useCssAnimation(element)


// Affordances
const element = ref(),
      condition = ref(true),
      modelValue = ref('')

bind(element, { id: 'my-element', ariaLabel: 'My element' })
on(element, { click: event => handle(event) })
show(element, condition)
model(element, modelValue)


// Transforms
const componentRef = createComponentRef(
  element => (store.element = element)
)
const multiRef = createMultiRef(
  element => (store1.element = element),
  element => (store2.element = element)
)
```
:::
