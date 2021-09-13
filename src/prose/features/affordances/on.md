---
title: on
tags: Composition functions
publish: true
order: 0
---

`on` is a function that manages all kinds of event listeners, adding them when a Vue component is mounted, and automatically removing them up when the component is destroyed.

::: type="info"
`on` reimplements the `v-on` affordance from Vue templates, and adds support for even more web APIs, like [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver) and [media queries](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

Check out the [`Listenable`](/docs/logic/classes/Listenable) docs for a full list of supported event types.
:::


:::
## Usage
:::

To listen for events, call the `on` function, which requires one parameter: the `required` Object.

:::
```js
import { on } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  on(required)
}
```
:::

::: type="info"
Usually, you'll call `on` from inside another composition function, but it also works in the `setup` function of any Vue component.
:::

Here's a breakdown of the `required` object:

::: ariaLabel="on required object breakdown" classes="wide-5"
| Property | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `element` | Ref (HTMLElement), Array | yes | none | <p>A reactive reference to the DOM element where you want to add event listeners, connect observers, etc.</p><p>`element` Can also be a reactive reference to an array of DOM elements. See the [How to format effects](#how-to-format-effects) section for more guidance on using your event listener/observer callback/etc. to access specific elements in a reactive array.</p> |
| `effects` | Object | yes | none | <p>A list of side effects, performed via callback functions, that you want to run when events are fired on your element or elements.</p><p>See the [How to format the effects object](#how-to-format-the-effects-object) section for more guidance on usage.</p><p>Also, see the [Valid event types](/docs/logic/classes/Listenable#Valid-event-types) section of the `Listenable` docs for more guidance on how to listen for specific keyboard shortcuts, resized elements, custom gestures, and much more.</p> |
:::


:::
### How to format the effects object
:::

The value of the `effects` property of the `required` parameter is an object. The properties of that object must be [valid `Listenable` event types](/docs/logic/classes/Listenable#Valid-event-types):

:::
```js
import { on } from '@baleada/vue-features'

export default function myCompositionFunction (...) {
  on({
    element: myElement,
    effects: {
      click: ...,
      'cmd+b': ...,
      intersect: ...,
    }
  })
}
```
:::


:::
#### How to format effects
:::

There are several different ways to format the effects that `on` will add to your elements, and call each time the event occurs.

The simplest type of listener is a plain callback function, exactly like the one you might pass to `addEventListener` or `IntersectionObserver.observe`:

:::
```js
on({
  ...
  effects: {
    click: clickEvent => { ... },
    'cmd+b': keydownEvent => { ... },
    intersect: intersectionObserverEntries => { ... },
  }
})
```
:::

But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we create custom listeners that are aware of each element's position in the array?

In this case, you can pass Object as the key's value. That object can have two properties: `createEffect` and `options`.

The value of `createEffect` should be a callback function that **returns** a function with side effects:

:::
```js
on({
  ...,
  effects: {
    // Each targetClosure *returns* the function that should
    // be called each time an event happens, or an Observer
    // adds an entry, etc.
    click: {
      createEffect: (...) => clickEvent => { ... },
    },
    'cmd+b': {
      createEffect: (...) => keydownEvent => { ... },
    },
    intersect: {
      createEffect: (...) => intersectionObserverEntries => { ... },
    },
  }
})
```
:::

The `createEffect` function receives an object as its only argument. Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `element` | HTMLElement | The actual DOM element that `on` is currently adding an event listener to (or observing, etc.). |
| `index` | Number | The index (Number) of `element` in your reactive array of elements. |
| `off` | Function | <p>A function you can call with no arguments to immediately stop listening for the event on the current `element`. The event listener (or observer, etc.) will be cleaned up and will be inactive for the rest of the component's lifecycle OR until Vue detects a change to the DOM target or array of DOM targets you passed in the `required` parameter.</p><p>To imitate the `once` feature of Vue, where an event listener only runs once, you can call `off` at the end of your listener.</p> |
:::

Again, the `createEffect`, given this object as an argument, should return an event listener. Here's an example of how [`useTablist` ](/docs/features/functions/useTablist) uses this feature to navigate to a tab when that specific tab is clicked:

:::
```js
export default function useTablist (...) {
  on({
    element: tabs.targets,
    effects: {
      pointerup: {
        createEffect: ({ index }) => () => {
          // Inside useTablist, this Navigateable instance
          // is used to control which tab is selected.
          navigateable.value.navigate(index)
        }
      },
    },
  })
}
```
:::

::: type="info"
When Vue detects an update in your reactive array of DOM elements (for example, when an element is added or removed, or the elements are reordered), the `on` function will do the following: 
1. Remove all listeners
2. Call the `createEffect` again for each target to get a new set of listeners
3. Add the new listeners

This not only helps avoid memory leaks, but also ensures that the values of `element`, `index`, and `off` are never stale when accessed by your listeners.
:::

<!-- TODO: Explain options for target closure object -->
