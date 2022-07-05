---
title: on
tags: UI Logic
publish: true
order: 0
---

`on` is a function that manages all kinds of event listeners, adding them when a Vue component is mounted, and automatically removing them up when the component is destroyed.

::: type="info"
`on` reimplements the `v-on` affordance from Vue templates, and adds support for even more web APIs, like [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver) and [media queries](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia).

To do this, `on` uses [`Listenable`](/docs/logic/classes/Listenable) under the hood. Check out the `Listenable` docs for a full list of supported event types.
:::


:::
## Usage
:::

To listen for events, call the `on` function, which requires two parameters: the element, list of elements, or `Plane` of elements you're listening on, and the side effects you want to perform.

:::
```js
import { on } from '@baleada/vue-features'

export function myCompositionFunction (...) {
  on(elementOrListOrPlane, effects)
}
```
:::

::: type="info"
Usually, you'll call `on` from inside another composable, but it also works in `script setup`.
:::

Here's a breakdown of the required parameters:

::: ariaLabel="on parameters breakdown" classes="wide-5"
| Parameter | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `elementOrListOrPlane` | See description | yes | none | <p>A reactive reference to the DOM element or elements you're listening on.</p><p>`elementOrListOrPlane` can be one of the following types: </p><ul><li>HTMLElement</li><li>Array of HTMLElements</li><li>`Plane` of HTMLElements</li><li>Reactive reference to any of the above types</li></ul><p>See the [How to format effects](#how-to-format-effects) section for more guidance on using your event listener/observer callback/etc. to access specific elements in a reactive array or reactive `Plane`.</p> |
| `effects` | Object | yes | none | <p>An object describing side effects, performed via callback functions, that you want to run when events are fired on your element, list of elements, or `Plane` of elements.</p><p>See the [How to format the effects object](#how-to-format-the-effects-object) section for more guidance on usage.</p><p>Also, see the [Valid event types](/docs/logic/classes/Listenable#Valid-event-types) section of the `Listenable` docs for more guidance on how to listen for specific keyboard shortcuts, resized elements, custom gestures, and much more.</p><p>Finally, note that `effects` has some awesome TypeScript features to support type safety and autocomplete in your callbacks. You can learn more about that in the [How to write type-safe effects](#how-to-write-type-safe-effects) section</p> |
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
      keydown: ...,
      intersect: ...,
      recognizeable: ..., // For custom gestures
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
import { on } from '@baleada/vue-features'

on(
  ...
  {
    click: mouseEvent => { ... },
    keydown: keyboardEvent => { ... },
    intersect: intersectionObserverEntries => { ... },
  }
)
```
:::

But in some situations, you'll need to configure the listener more precisely. For example, you'll need to pass options to `addEventListener` or the `IntersectionObserver` constructor (both used under the hood by `Listenable`), or you might want to configure the underlying `Listenable` instance to listen for custom gestures.

In these cases, you can pass an **effect config** as the key's value. The effect config is an object with two properties: `createEffect` and `options`.

The value of `createEffect` should be a callback function that **returns** a function with side effects:

:::
```js
import { on } from '@baleada/vue-features'

on(
  ...,
  {
    // Each `createEffect` returns the function that should
    // be called each time an event happens, or an Observer
    // adds an entry, etc.
    click: {
      createEffect: (...) => mouseEvent => { ... },
    },
    keydown: {
      createEffect: (...) => keyboardEvent => { ... },
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

::: ariaLabel="createEffect object breakdown" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `off` | Function | <p>A function you can call with no arguments to immediately stop listening for the event on the current `element`. The event listener (or observer, etc.) will be cleaned up and will be inactive for the rest of the component's lifecycle OR until Vue detects a change to the DOM target or array of DOM elements you passed as the `elementOrListOrPlane` parameter.</p><p>To implement the `once` feature of Vue, where an event listener only runs once, you can call `off` at the end of your listener.</p> |
| `listenable` | [`Listenable`](/docs/logic/classes/Listenable) | <p>The [`Listenable`](/docs/logic/classes/Listenable) instance used by `on` under the hood to set up listeners, connect observers, parse keycombos, etc.</p><p>`listenable` is primarily useful when you're using `on` with [`Recognizeable`](/docs/logic/classes/recognizeable) to listen for custom gestures—you can access `Recognizeable`'s metadata via `listenable.recognizeable`.</p> |
:::

Again, the `createEffect`, given this object as an argument, should return an event listener.

The other key of the effect config is `options`, which is an object. Here's a breakdown of the `options` object:

::: ariaLabel="effect config options breakdown" classes="wide-5"
| Property | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `listenable` | Object | no | `{}` | <p>The optional second parameter of the `Listenable` constructor.</p><p>You can use `effectConfig.options.listenable` to configure custom gesture recognition powered by [`Recognizeable`](/docs/logic/classes/Recognizeable).</p> |
| `listen` | Object | no | `{}` | <p>The optional second parameter of `Listenable.listen` method.</p><p>You can use `effectConfig.options.listenable` to pass things like `addEventListener` options or `IntersectionObserver` constructor options.</p> |

Here's a simplified example of how `useGrid` uses an effect config with `options` to react to the [`mousedrag`](/docs/recognizeable-effects/mousedrag) gesture:

:::
```js
import { mousedrag } from '@baleada/recognizeable-effects'

export function useGrid (...) {
  ...

  on(
    root.element,
    {
      // To listen to a custom gesture powered by `Recognizeable`,
      // use `recognizeable` as the effect key name.
      recognizeable: {
        // `createEffect` returns the event handler, which will get
        // called as soon as the `mousedrag` gesture is recognized.
        createEffect: () => (event, { is }) => {
          // Do some magic to figure out which grid cells get added
          // to the current selection when the user clicks and drags
          // across the grid.
        },
        // `options.listenable` passes the optional second parameter
        // of the underlying `Listenable` instance. In this case,
        // that feature is used to configure the `mousedrag` gesture
        // with `Listenable`.
        options: {
          listenable: {
            recognizeable: {
              effects: mousedrag(...)
            },
          },
        },
      }),
    }
  )

  ...
}
```
:::

And here's an example of use `useVisibility` uses an effect config to configure the underlying `IntersectionObserver` instance that tracks element visibility.

:::
```js
export function useVisibility (element, options) {
  ...

  on(
    element,
    {
      // When `on` and its underlying `Listenable` instance see
      // the `intersect` effect name, they know to use an 
      // `IntersectionObserver` instance under the hood.
      intersect: {
        // `createEffect` returns the callback that should run
        // when the `IntersectionObserver` adds a new entry.
        createEffect: () => entries => {
          // Store relevant entry data as reactive state
        },
        // `options.listen` is used to pass `IntersectionObserver`
        // constructor options through to the underlying instance.
        options: {
          listen: {
            observer: options.observer || {},
          }
        }
      }
    }
  )

  ...
}
```
:::

<!-- But what about when the `element` is a reactive array of elements, rather than a single reactive element reference? How do we create custom listeners that are aware of each element's position in the array?

First, make sure this is actually the right solution to your problem. Adding one or more event listeners to every item in a list of arbitrary length can quickly have a negative impact on performance. If there's a way to add fewer listeners, or to add them to a single parent element, take that option.

In `useListbox` for example, individual listbox options can receive keyboard focus, but there are no `keydown` listeners on the options themselves. Instead, a single `keydown` listener is added to the listbox's root element, handling `keydown` events that bubble up from the options.

If you do want to add listeners to a list of elements though, it's possible!

Adding event listeners to every element in a `Plane` (array of arrays of elements) works the same way. The only difference is that `createEffect` will receive three parameters: the `row` index (Number)  of a given element in your `Plane`, the `column` index (Number) of that element, and the same object detailed above.

::: type="info"
When Baleada Features, with Vue's help, detects a meaningful change in your reactive array or `Plane` of DOM elements (for example, when an element is added or removed, or the elements are reordered), the `on` function will do the following: 
1. Remove all listeners
2. Call `createEffect` again for each element to get new listeners
3. Add the new listeners

This not only helps avoid memory leaks, but also ensures that element position arguments (i.e. `index` for lists, and `row` & `column` for `Plane`s) is never stale when accessed by your listeners.

But be aware, this process has a noticeable negative performance impact when working with larger lists, and that negative impact is multiplied for `Plane`s.
::: -->


:::
### How to write type-safe effects
:::

Thanks to some truly joy-sparking TypeScript tactics, type safety works out of the box for almost every use case.

:::
```js
import { on } from '@baleada/vue-features'

on(
  ...
  {
    click: event => {
      // `event` is type-checked and autocompleted as a `MouseEvent`
    },
    keydown: event => {
      // `event` is type-checked and autocompleted as a `KeyboardEvent`
    },
    intersect: entries => {
      // `event` is type-checked and autocompleted as an array
      // of `IntersectionObserverEntry` objects.
    },
  }
)
```
:::

The one exception to this rule is custom gestures powered by `Recognizeable`. To set those up, you use `recognizeable` as the effect key:

:::
```js
import { on } from '@baleada/vue-features'

on(
  ...
  {
    recognizeable: event => { ... },
  }
)
```
:::

But since `Recognizeable` instances are designed to collect and analyze pretty much any kind of event, including `MouseEvent`, `KeyboardEvent`, `IntersectionObserverEntry`, `MutationRecord`, etc., it's impossible to infer types automatically.

The solution is the `defineRecognizeableEffect` type helper from Baleada Features.

There are three basic steps to using `defineRecognizeableEffect`:
1. Pass in generic types to support type safety in your event callback (which runs when the gesture is recognized).
2. Pass an effect config object as the first and only parameter of `defineRecognizeableEffect`. The `createEffect` callback will type-check and autocomplete its arguments based on the generic types you passed to `defineRecognizeableEffect`.
3. Spread the return value of `defineRecognizeableEffect` into your `effects` parameter.

Let's take a look at the basic pattern, and then we'll see a real world example.

:::
```js
import { on, defineRecognizeableEffect } from '@baleada/vue-features'

on(
  element,
  {
    // We spread the return value of `defineRecognizeableEffect`
    // into our `effects` parameter. We'll also use the function's
    // generic types to support type safety for our callback function.
    //
    // `defineRecognizeableEffect`'s  first and only parameter is an
    // effect config object.
    ...defineRecognizeableEffect<...>({
      // Enjoy type safety in `createEffect`
      createEffect: () => event => { ... },
      // For `options`, we'll use `options.listenable` to configure
      // `Recognizeable` to recognize a custom gesture.
      options: {
        listenable: {
          recognizeable: {
            effects: { ... }
          }
        },
      }
    }),
  }
)
```
:::

Earlier in this guide, we looked at a simplified example of how [`useGrid`](/docs/features/interfaces/grid) uses an effect config object to set up a `Recognizeable`-powered listener for the `mousedrag` gesture. In the source code, that listener is actually implemented with `defineRecognizeableEffect` for type safety. Here's roughly how it works:

:::
```js
import {
  mousedrag,
  MousedragTypes,
  MousedragMetadata
} from '@baleada/recognizeable-effects'
import { on, defineRecognizeableEffect } from '@baleada/vue-features'



export function useGrid (...) {
  ...
  on(
    element,
    {
      // Generic types for the target element, `mousedrag` event
      // types (mousedown, mouseleave, and mouseup) and `mousedrag`
      // metadata are passed in.
      ...defineRecognizeableEffect<
        typeof element,
        MousedragTypes,
        MousedragMetadata
      >({
        createEffect: () => event => {
          // `event` is type-checked and autocompleted as a 
          // `MouseEvent`, inferred from the `MousedragTypes`
          // type.
          // 
          // MousedragTypes -> 'mousedown' | 'mouseleave' | 'mouseup'
        },
        options: {
          listenable: {
            recognizeable: {
              // `useGrid` calls the `mousedrag` function to create
              // a suite of event listeners that will captured
              // various mouse events and store their metadata
              // for later analysis.
              effects: mousedrag(...)
            },
          },
        },
      }),
    }
  )

  ...
}
```
:::
