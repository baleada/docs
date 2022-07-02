---
title: on
tags: UI Logic
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

To listen for events, call the `on` function, which requires two parameters: the element or elements you're listening on, and the side effects you want to perform.

:::
```js
import { on } from '@baleada/vue-features'

export function myCompositionFunction (...) {
  on(elementOrElements, effects)
}
```
:::

::: type="info"
Usually, you'll call `on` from inside another composable, but it also works in `script setup`.
:::

Here's a breakdown of the required parameters:

::: ariaLabel="on required object breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `elementOrElements` | Ref (HTMLElement), Array | yes | none | <p>A reactive reference to the DOM element where you want to add event listeners, connect observers, etc.</p><p>`elementOrElements` Can also be a reactive reference to an array of DOM elements. See the [How to format effects](#how-to-format-effects) section for more guidance on using your event listener/observer callback/etc. to access specific elements in a reactive array.</p> |
| `effects` | Object, Function | yes | none | <p>A list of side effects, performed via callback functions, that you want to run when events are fired on your element or elements.</p><p>See the [How to format the effects object](#how-to-format-the-effects-object) section for more guidance on usage.</p><p>Also, see the [Valid event types](/docs/logic/classes/Listenable#Valid-event-types) section of the `Listenable` docs for more guidance on how to listen for specific keyboard shortcuts, resized elements, custom gestures, and much more.</p><p>Finally, note that `effects` can also be defined as a function that returns an array of configured side effects. This API is intended for TypeScript users, and you can learn more about it in the [How to write type-safe effects](#how-to-write-type-safe-effects) section</p> |
:::


:::
### How to format the effects object
:::

The `effects` parameter is an object. The properties of that object must be [valid `Listenable` event types](/docs/logic/classes/Listenable#Valid-event-types):

:::
```js
import { on } from '@baleada/vue-features'

export function myCompositionFunction (...) {
  on(
    myElement,
    {
      click: ...,
      'cmd+b': ...,
      intersect: ...,
    }
  )
}
```
:::


:::
#### How to format effects
:::

There are several different ways to format the effects that `on` will add to your elements, and perform each time their corresponding event occurs.

The simplest type of listener is a plain callback function, exactly like the one you might pass to `addEventListener` or `IntersectionObserver.observe`:

:::
```js
on(
  ...
  {
    click: clickEvent => { ... },
    'cmd+b': keydownEvent => { ... },
    intersect: intersectionObserverEntries => { ... },
  }
)
```
:::

But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we create custom listeners that are aware of each element's position in the array?

In this case, you can pass Object as the key's value. That object can have two properties: `createEffect` and `options`.

The value of `createEffect` should be a callback function that **returns** a function with side effects:

:::
```js
on(
  ...,
  {
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
)
```
:::

The `createEffect` function receives two arguments: the `index` (Number) of a given element in your reactive array of elements, and an object with some useful values.

Here's a breakdown of that object:

::: ariaLabel="targetClosure object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `off` | Function | <p>A function you can call with no arguments to immediately stop listening for the event on the current `element`. The event listener (or observer, etc.) will be cleaned up and will be inactive for the rest of the component's lifecycle OR until Vue detects a change to the DOM target or array of DOM elements you passed as the `elementOrElements` parameter.</p><p>To imitate the `once` feature of Vue, where an event listener only runs once, you can call `off` at the end of your listener.</p> |
| `listenable` | [`Listenable`](/docs/logic/classes/Listenable) | <p>The [`Listenable`](/docs/logic/classes/Listenable) instance used by `on` under the hood to set up listeners, connect observers, parse keycombos, etc.</p><p>`listenable` is primarily useful when you're using `on` with [`Recognizeable`](/docs/logic/classes/recognizeable) to listen for custom gestures—you can access `Recognizeable`'s metadata via `listenable.recognizeable`.</p> |
:::

Again, the `createEffect`, given this object as an argument, should return an event listener. Here's a simplified example of how [`useListbox` ](/docs/features/interfaces/listbox) uses this feature to focus an option on `mouseenter`:

:::
```js
export function useListbox (...) {
  on(
    options.elements,
    {
      mouseenter: {
        createEffect: index => () => {
          options.elements.value[index].focus()
        }
      }
    }
  )
}
```
:::

::: type="info"
When Baleada Features, with Vue's help, detects a meaningful change in your reactive array of DOM elements (for example, when an element is added or removed, or the elements are reordered), the `on` function will do the following: 
1. Remove all listeners
2. Call `createEffect` again for each element to get new listeners
3. Add the new listeners

This not only helps avoid memory leaks, but also ensures that the `index` is never stale when accessed by your listeners.
:::


:::
### How to write type-safe effects
:::
