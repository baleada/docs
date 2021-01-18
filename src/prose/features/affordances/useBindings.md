---
title: useBindings
tags: Composition functions
publish: true
order: 0
---

`useBindings` is a composition function that can assign values to attributes on DOM elements. It works with static values—assigning to the attribute once—and reactive values—assigning to the attribute each time the value changes.

::: type="info"
`useBindings` reimplements the `v-bind` feature affordance in Vue templates.
:::

:::
## Example
:::

[Source code](https://github.com/baleada/docs/blob/main/src/components/ExampleUseBindings.vue)

<ExampleUseBindings class="with-mt" />

:::
## Using bindings
:::

The `useBindings` function has one required parameter: the `required` Object. Here's a breakdown of that object:

::: ariaLabel="useBindings required object breakdown"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `target` | Ref (HTMLElement), Array | yes | none |  |
:::
