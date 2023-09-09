---
title: Listenable
tags: UI logic
source: true
publish: true
order: 0
---

`Listenable` is a class that enriches an event type (including observation types, media queries, custom gestures, and more), allowing it to:
- Listen for that event type and execute a callback function when it occurs
- Retrieve a list of active listeners that it has added
- Store a status (`ready`, `listening`, or `stopped`)
- Easily clean up all listening activity to avoid memory leaks


:::
## Example
:::

Baleada's docs use `Listenable` to:
- Toggle the dark theme when you press `Shift` + `D`
- Toggle the minimalist theme when you press `Shift` + `M`
- Set your default theme (dark or light) based on your device's [color theme preference](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)
- On mobile, open and close the sidebar nav and table of contents when you swipe right or left


:::
## Construct a `Listenable` instance
:::

The `Listenable` constructor accepts two parameters:

::: ariaLabel="Listenable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | String | yes | The type of event that will be made listenable. See the [Valid event types](#valid-event-types) section for more guidance. |
| `options` | Object | no | Options for the `Listenable` instance. See the [`Listenable` constructor options](#Listenable-constructor-options) section for more guidance. |
:::


:::
### Valid event types
:::

`Listenable` supports a ton of different event types and can deduce which web APIs to use under the hood based on the `type` you pass. 

Most of the time, you don't need to be concerned with exactly which web API is being used, and you can think of it as an implementation detail.

But in certain cases where you want to customize the way a specific web API behaves, you'll need to know which API is being used in order to know what customization options are available.

You'll find more guidance down below, in the [How to customize `listen` behavior](#how-to-customize-listen-behavior) section.

The table below has a breakdown of valid event types, the corresponding web APIs that `Listenable` uses under the hood, and the main purpose of the API.

::: ariaLabel="Listenable event types and web APIs" classes="wide-3"
| Event type | Web APIs | Purpose |
| --- | --- | --- |
| Every event listed in TypeScript's [HTMLElementEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelementeventmap.html) and [DocumentEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.documenteventmap.html#focusout), e.g. `click`, `keydown`, `mousemove`, etc. | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | Listens for basic events. |
| `intersect` | [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/) | Listens for DOM elements intersecting with an ancestor element or with the top-level document's viewport. |
| `resize` | [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) | Listens for DOM elements being resized |
| `mutate` | [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) | Listens for DOM element being mutated (e.g. children added or removed) |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`removeListener`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/removeListener) | Listens for changes to browser metadata (e.g. screen size, or color scheme preference) |
| `idle` | [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) | Listens for the end user going idle |
| `message` and `messageerror` | Listens for messages and/or errors from a [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/BroadcastChannel) | Listens for the end user going idle |
| `recognizeable` | A nested `Listenable` instance 🤯 | <p>Listens for custom gestures, powered by [`Recognizeable`](/docs/logic/classes/recognizeable).</p><p>See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p> |
:::





:::
### `Listenable` constructor options
:::

::: ariaLabel="Listenable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `recognizeable` | Object | none | <p>Passes options for a new instance of the [`Recognizeable`](/docs/logic/classes/recognizeable) class. See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p><p>The `recognizeable` option only has an effect when your `type` is `recognizeable`.</p> |
:::


:::
## State and methods
:::

::: ariaLabel="Listenable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `type` | Getter/Setter | See return value | N/A | <p>The event type you passed to the `Listenable` constructor.</p><p>If you assign a value directly to `type`, a setter will pass the new value to `setType`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Listenable` instance.</p><p>`status` is `ready` after the instance is constructed, and changes to `listening` after the `listen` method is called for the first time, and change to `stopped` after all web API activity has been stopped and cleaned up.</p> |
| `active` | Getter | See return value | N/A | A set ([Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)) of objects that describe all the currently active listeners, observers, etc. |
| `recognizeable` | Getter | See return value | N/A | <p>The `Recognizeable` instance constructed using the object you passed to `options.recognizeable`.</p><p>If you didn't pass that option, the `recognizeable` property will be `undefined`.</p><p>See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p> |
| `setType(type)` | Function | Sets a new `type`, after stopping and cleaning up all existing web API activity. | The new type (String). | The `Listenable` instance |
| `listen(effect, options)` | Function | Listens for the events specified by your `type`, and performs side effects via a callback function when the events happen. Can't be called until the DOM is available. | <p>A side effect (Function, required) that will be performed when the events are detected, and an optional `options` object.</p><p>To learn more about handling events with your side effect function, see the [How to handle events](#how-to-handle-events) and [How to customize `listen` behavior](#how-to-customize-listen-behavior) sections.</p> | The `Listenable` instance |
| `stop(options)` | Function | Stops and cleans up all web API activity. Can't be called until the DOM is available. | <p>An optional object with a `target` property, whose value is a DOM element, `window` or `document`.</p><p>If `options.target` is passed, only activity related to that `target` will be stopped.</p><p>If `options.target` is not passed, all activity is stopped.</p> | The `Listenable` instance |

:::


:::
### How to handle events
:::

Depending on your `type`, your `effect`—passed as the required first argument of the `listen` method—will receive different parameters.

The table below has a full breakdown of what the `listen` method passes to your `effect` for each specific event type:

::: ariaLabel="List of event types and the arguments your effect will receive" class="wide-2"
| `type` | What your `effect` receives |
| --- | --- |
| Every event listed in TypeScript's [HTMLElementEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelementeventmap.html) and [DocumentEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.documenteventmap.html#focusout), e.g. `click`, `keydown`, `mousemove`, etc. | The corresponding DOM event |
| `intersect` | An array of [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) objects |
| `resize` | An array of [`ResizeObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects |
| `mutate` | An array of [`MutationRecord`](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | A [`MediaQueryListEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListEvent) object |
| `idle` | An [`IdleDeadline`](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline) object |
| Combos | A [`KeyboardEvent`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent), [`MouseEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent), or [`PointerEvent`](https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent), depending on the combo type |
| `recognizeable` | <p>The latest `sequenceItem` added to your `Recognizeable` instance's `sequence`.</p><p>Often, your `effect` won't actually do anything with this argument. Instead, it will reach into `listenableInstance.recognizeable.metadata` for additional information about the captured sequence of events.</p> |
:::


:::
### How to customize `listen` behavior
:::

The `listen` method accepts an optional second parameter, which is an Object whose properties customize the behavior of the web APIs `Listenable` uses under the hood.

Depending on your `type` only certain properties will have an effect.

First, here's a breakdown of what each `options` property does, and below that, in the [Available options for each `type`](#available-options-for-each-type) section, you'll find a table of which properties can be used for each `type`:

::: ariaLabel="listen method options" class="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | HTMLElement, Document | See [Default values for `target` based on `type`](#default-values-for-target-based-on-type) | The target that will listen for events |
| `addEventListener` | Object | none | The `options` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `useCapture` | Boolean | none | A value for the standalone `useCapture` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Ignored if an `addEventListener` object was passed. |
| `wantsUntrusted` | Boolean | none | A value for the standalone `wantsUntrusted` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `except` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, should *not* cause your `effect` to be executed.</p><p>When the `only` option is a non-empty array, `except` is ignored.</p> |
| `only` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, *should* cause your `effect` to be executed.</p><p>When `only` is a non-empty array, `except` is ignored.</p><p>An empty `only` array is ignored (otherwise, the `effect` would never execute).</p> |
| `observer` | Object | none | The `options` parameter of the [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) |
| `observe` | Object | none | The `options` parameter of the [`MutationObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe) and [`ResizeObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe) methods |
| `requestIdleCallback` | Object | none | The `options` parameter of [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) |
| `keyDirection` | String | `down` | <p>Indicates which keyboard event should be listened to when detecting keycombos. Valid options are `down` and `up` .</p><p>The `keyDirection` option only has an effect when your `type` is a keycombo, as described the [How to format combos](#how-to-format-combos).</p> |

:::


:::
#### Default values for `target` based on `type`
:::

The default value for the `listen` method's `target` option depends on your `type`. The table below has a full breakdown.

::: ariaLabel="Default values for target based on type"
| `type` | Default `target` |
| --- | --- |
| Every event listed in TypeScript's [HTMLElementEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelementeventmap.html), e.g. `click`, `keydown`, `mousemove`, etc. | `document` |
| Every event listed in TypeScript's [DocumentEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.documenteventmap.html#focusout) and _not_ listed in the `HTMLElementEventMap`, e.g. `visibilitychange`, `fullscreenchange`, etc. | `document` (can't be overridden) |
| `intersect` | `document.querySelector('html')` |
| `resize` | `document.querySelector('html')` |
| `mutate` | `document.querySelector('html')` |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | N/A |
| `idle` | N/A |
| Combos | `document` |
| `recognizeable` | The corresponding default for each `type` handled by your `Recognizeable` instance's `effects` |
:::


:::
#### Available options for each `type`
:::

::: ariaLabel="Available options for each type"
| `type` | Available options |
| --- | --- |
| Every event listed in TypeScript's [HTMLElementEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.htmlelementeventmap.html), e.g. `click`, `keydown`, `mousemove`, etc. | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
| Every event listed in TypeScript's [DocumentEventMap](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_dom_d_.documenteventmap.html#focusout) and _not_ listed in the `HTMLElementEventMap`, e.g. `visibilitychange`, `fullscreenchange`, etc. | <ul><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li></ul> |
| `intersect` | `observer` |
| `resize` | `observe` |
| `mutate` | `observe` |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | none |
| `idle` | `requestIdleCallback` |
| Combos | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li><li>`keyDirection` (key combos only)</li></ul> |
| `recognizeable` | None |
:::



:::
### How to listen for custom gestures
:::

`Listenable` allows you to listen for custom gestures defined by Baleada Logic's `Recognizeable` class. For full information on how to use the `Recognizeable` class, [visit the `Recognizeable` docs](/docs/logic/classes/Recognizeable) (especially the [section on constructor options](/docs/logic/classes/Recognizeable#recognizeable-constructor-options) and the [section on accessing state and methods](/docs/logic/classes/Recognizeable#access-state-and-methods)), but keep reading here to learn the overall workflow.

To get started, construct a new instance of `Listenable`, using `recognizeable` as the `type`, and passing the [`Recognizeable` options object](/docs/logic/classes/Recognizeable#Recognizeable-constructor-options) to the `recognizeable` option:

:::
```js
const instance = new Listenable('recognizeable', {
  recognizeable: {...} // See the Recognizeable docs for all available options
})
```
:::

Using that, `Listenable` will construct a new instance of `Recognizeable`, passing an empty array as the first argument (where `Recognizeable` stores the event sequence) and your `recognizeable` object as the second argument (the `options` argument).

`Listenable` will store your constructed `Recognizeable` instance in its `recognizeable` property:

:::
```js
const instance = new Listenable('recognizeable', { recognizeable: {...} })

instance.recognizeable instanceof Recognizeable // -> true
```
:::

::: type="info"
Not sure what to pass to `options.recognizeable.effects`?

Don't sweat it—check out the [Baleada Recognizeable Effects](/docs/recognizeable-effects) package, which gives you access to pre-built `effects` objects for commonly needed gestures:
- `clicks` (i.e. double-clicks, triple-clicks, etc.)
- `touches` (touch equivalent of `clicks`)
- `mousedrag`
- `mousedragdrop`
- `touchdrag`
- `touchdragdrop`
- `pinch`
- `press`
- `rotate`
:::

When you call the `listen` method, passing your `effect` function, `Listenable` will add an event listener for each of the event types specified by `options.recognizeable.effects`.

As events occur, `Listenable` will pass them through to your `Recognizeable` instance's `recognize` method, which in turn will pass the events to the `Recognizeable` instance's side effect functions.

When your `Recognizeable` instance recognizes a gesture, Listenable will execute your `effect`. Your `effect` will receive the latest item in the sequence tracked by `Recognizeable`. More commonly, though, you'll be reaching into the `Recognizeable` instance to access its `metadata`—i.e., you'll be accessing `instance.recognizeable.metadata`.


:::
#### Complete custom gesture example
:::

The following real-world code shows how this Baleada documentation site combines `Listenable` and `Recognizeable` with custom effects from [Baleada Recognizeable Effects](/docs/recognizeable-effects) to open and close the sidebar navigation and table of contents when a mobile device user swipes left or right.

The original code is written specifically to work with [Vue](https://v3.vuejs.org), but this example has been simplified to plain JavaScript, and heavily commented.

[Here's an editable demo](https://stackblitz.com/edit/baleada-logic-listenable-gesture-workflow?file=entry.ts) where you can tinker with similar code.

:::
```js
import { Listenable } from '@baleada/logic'
// The touchdragdrop effects are a great stand-in for swipe
// gesture recognition.
import { touchdragdrop as swipe } from '@baleada/recognizeable-effects'

// Construct the Listenable instance, passing custom effects
// to options.recognizeable.effects
const articleSwipe = new Listenable(
  'recognizeable',
  { recognizeable: { effects: swipe() } }
)

articleSwipe.listen(
  // In the listen effect, access the Recognizeable instance's
  // metadata to make a change in the UI.
  () => {
    const direction = articleSwipe.recognizeable.metadata.direction.fromStart

    switch (direction) {
      case 'right':
        openNav()
        break
      case 'left':
        openTableOfContents()
        break
    }
  },
  // Add a few options to customize listen behavior
  {
    // Only the article element, not the entire document,
    // should listen for a swipe gesture
    target: document.querySelector('article'),
    // Elements with a .swiper-no-swiping class are not
    // valid swipe targets, even if they are inside the
    // article. This is useful for ignoring horizontal
    // scrolling on tables and codeblocks in the docs,
    // since the scrolling gesture is physically the same
    // movement as a swipe, and would normally get recognized.
    except: ['.swiper-no-swiping'],
    // For performance reasons, set `passive` to `true`
    // to prevent the effect from running on the main
    // thread when the user is scrolling on a touch-enabled
    // device.
    addEventListener: { passive: true }
  }
)
```
:::


:::
## Using with TypeScript
:::

`Listenable` will type check your `listen` method `effect` functions and options based on the `type` (String) you pass to the constructor:

:::
```ts
const instance = new Listenable('intersect')

instance.listen(
  // Listenable knows that `entries` is an array of
  // IntersectionObserverEntry objects.
  //
  // entries[0].boundingClientRect.width can be accessed via
  // IDE autocomplete!
  entries => console.log(entries[0].boundingClientRect.width),
  // Listenable also knows that the `listen` method for an
  // 'intersect' type can accept an `observer` option,
  // passing an IntersectionObserverInit object.
  { observer: { threshold: 0.5 } }
) 
```
:::

Even complex types like combos and media queries will be detected:

:::
```ts
const screenSize = new Listenable('(min-width: 420px)')
screenSize.listen(
  // TypeScript knows that this is a MediaQueryListEvent
  event => doSomething(event)
)

const cmdRightclick = new Listenable('cmd+rightclick')
cmdRightclick.listen(
  // TypeScript knows that this is a MouseEvent
  event => doSomething(event),
  // TypeScript also knows what options are available
  { target: document.querySelector('canvas') }
)

const shiftB = new Listenable('shift+b')
shiftB.listen(
  // TypeScript knows that this is a KeyboardEvent
  event => doSomething(event)
)
```
:::

There are two situations where you'll need to adopt a little bit of type unsafety:
1. When listening for combos that have no modifiers
2. When using `Listenable` to configure a `Recognizeable` instance for recognizing a custom gesture

Let's talk through these two cases individually, and how to minimize type unsafety.

Here's an annotated code example for the first case:

:::
```ts
// In this example, we want to listen for the 'b' key.
//
// Listenable can do this as a keycombo with no modifiers,
// i.e. just the letter 'b'.
// 
// When you're using TypeScript, though, you'll need to
// assert that your 'b' has a type of '+b':
const b = new Listenable('b' as '+b')

// This instance will now type check correctly, and the `listen`
// method will know that it's passing a KeyboardEvent to your
// effect function.
b.listen(event => console.log(event))

// The other case to be aware of is when you're listening
// for an unmodified 'rightclick', which Listenable handles
// as if it were a click combo.
//
// Again, just assert that 'rightclick' has a type of '+rightclick',
// and type checking will work properly.
const rightclick = new Listenable('rightclick' as '+rightclick')

// Listenable knows that this event is a MouseEvent.
rightclick.listen(event => console.log(event))
```
:::

The key thing to remember: if you're listening to `rightclick`, or any unmodified keycombo, like `b`, `enter`, `.`, etc., use TypeScript's `as` keyword to make a type assertion, adding a `+` in front of your unmodified character.

This might seem a little strange, and at one point, `Listenable` was actually able to seamlessly detect and type check these unmodified combos with no additional help or assertions from you. However, the strange type assertion workaround _drastically_ increased the performance of `Listenable`'s type checking system, leading to a much better DX during IDE type checking and build time type checking.

At least for now, the slight type unsafety appears to be a worthwhile tradeoff.

Now, moving onto the second case: when you're using `Listenable` to configure a `Recognizeable` instance for recognizing a custom gesture.

Recall that to use `Listenable` with `Recognizeable`, you should pass `recognizeable` as the `Listenable` constructor's `type` argument, and pass your `Recognizeable` instance's options to `listenableOptions.recognizeable`

:::
```js
const instance = new Listenable(
  'recognizeable',
  { recognizeable: { ... } }
)
```
:::

There's a way to write your code so that your `options.recognizeable` object is fully type checked based on all the possible events that you want your `Recognizeable` instance to be able to handle.

We won't cover all that information here, though. Instead, you should visit the [Using with TypeScript section of the `Recognizeable` docs](/docs/logic/classes/Recognizeable#using-with-typescript). Those docs give full information on not only how to set up a standalone `Recognizeable` instance, but more importantly, how to set up a fully type-safe `Listenable` instance that uses `Recognizeable` under the hood to recognize custom gestures.


:::
## API design compliance
:::

::: ariaLabel="Listenable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `type`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setType` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `active`, `recognizeable` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `listen`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> | `stop` |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A type of event can be listened for." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
