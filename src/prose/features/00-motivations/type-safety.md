---
title: Type safety
publish: true
order: 3
---

Baleada Features provides **type safety** obsessively. It has excellent IDE autocomplete, and it catches errors at compile time.


:::
## Exported types
:::

When building a design system, you'll typically build a component on top of a Baleada Features composable. Your component will usually accept a lot of props that it passes straight through to the composable:

:::
```html
<Select
  orientation="horizontal"
  :multiselectable="true"
  :initialSelected="[6, 9]"
>
  My select
</Select>
```
:::

To make this use case as easy as possible, Baleada Features exports dedicated types like `UseListboxOptions`, which exhaustively document all available options. Use these with TypeScript type unions and utility types to compose the perfect props for your wrapper component or custom composable.

Baleada Features also exports types that document return values, like `Listbox`. Use these types when you need to type-safely pass return values into your components and composables.


:::
## Option-based type inference
:::

Baleada Features composables can read your configured options, and adjust return types to match:

:::
```ts
import { useListbox } from '@baleada/vue-features'

// Baleada Features sees that `multiselectable` is `false`
const single = useListbox({ multiselectable: false })
// This is safe; single-select listboxes can select one index.
single.select.exact(0)
// This throws a type error; single-select listboxes are not
// allowed to select an array of indices.
single.select.exact([0, 1])

// Baleada Features sees that `multiselectable` is `true`
const multi = useListbox({ multiselectable: true })
// These are both safe; multi-select listboxes are allowed
// to select one index, or an array of multiple indices.
multi.select.exact(0)
multi.select.exact([0, 1])
```
:::

Option-based type inference keeps your IDE and your compiler informed on which options are compatible together, which state and functions will be present on the return value, what shape the state is, what parameters are accepted by functions, etc.

There are tons of examples of option-based type inference, spread all across Baleada Features. It's library-grade TypeScript, designed to let you write plain JavaScript syntax without sacrificing advanced type safety.
