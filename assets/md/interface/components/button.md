---
title: InterfaceButton
tags: Components, Vue, React, Svelte
publish: false
order: 0
---

`InterfaceButton` 

:::
## Example
:::

:::
### Vue
:::

:::
```html
<InterfaceButton :isHaptic="true" />
```
:::


<!-- :::
### React
:::

:::
```jsx
<InterfaceButton isHaptic={true} />
```
:::


:::
### Svelte
:::


:::
```jsx
<InterfaceButton isHaptic={true} />
```
::: -->


:::
### Rendered
:::

<InterfaceButtonExample />


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `isHaptic` | Boolean | no | `false` | <p>Indicates whether or not `InterfaceButton` should render an animated shape to provide haptic feedback when the end user clicks (or taps) the button.</p><p>See the [Haptic feedback](#haptic-feedback) section for more info.</p> |
| `hapticMaxOpacity` | Number | no | `0.25` | Sets the maximum opacity that the haptic shape reaches during the animation. |
| `hapticMaxScale` | Number | no | `2` | Sets the maximum scale that the haptic shape reaches during the animation. |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Haptic feedback
:::

When `isHaptic` is `true`, the `InterfaceButton` will render a shape inside of it.

The shape is a circle, and when the button is clicked/tapped, the circle does the following:
1. It centers itself at the location of the click/tap
2. It fades in from 0% opacity to `hapticMaxOpacity * 100`% opacity while growing from 0% of the button's width to `hapticMaxScale * 100`% of the button's width
3. It fades back to 0% opacity

::: type="warning"
When `isHaptic` is `true`, the `InterfaceButton` will have its `position` set to `relative` via inline styles. This is an implementation detail for the circle animation, but may affect your design in some cases.

The bottom line: as long as the `InterfaceButton`'s position is `relative` or `absolute`, the haptic feedback animation will work as expected.
:::


:::
## Structure
:::

Here's the structure of `InterfaceButton`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
button.baleada-interface-button
  svg // Haptic shape
    circle
  slot // Your content slots in here
```
:::



:::
## API design compliance
:::

[WIP]

<!-- ::: ariaLabel="A table showing ProseAside's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
::: -->