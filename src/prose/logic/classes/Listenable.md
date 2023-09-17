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
| `active` | Getter | See return value | N/A | A [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) of objects that describe all the currently active listeners, observers, etc. |
| `recognizeable` | Getter | See return value | N/A | <p>The `Recognizeable` instance constructed using the options you passed to `options.recognizeable`.</p><p>If you didn't pass that option, the `recognizeable` property will be `undefined`.</p><p>See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p> |
| `setType(type)` | Function | Sets a new `type`, after stopping and cleaning up all existing web API activity. | The new type (String). | The `Listenable` instance |
| `listen(effect, options)` | Function | Listens for the events specified by your `type`, and performs side effects via a callback function when the events happen. Can't be called until the DOM is available. | <p>A side effect (Function, required) that will be performed when the events are detected, and an optional `options` object.</p><p>To learn more about handling events with your side effect function, see the [How to handle events](#how-to-handle-events) and [How to customize `listen` behavior](#how-to-customize-listen-behavior) sections.</p> | The `Listenable` instance |
| `stop(options)` | Function | Stops and cleans up web API activity. Can't be called until the DOM is available. | <p>An optional object with a `target` property, whose value is a DOM element, `window`, `document`, or a `BroadcastChannel` instance, depending on what type of event you're listening for.</p><p>If `options.target` is passed, only activity related to that `target` will be stopped.</p><p>If `options.target` is not passed, all activity is stopped.</p><p>See the [Default values for](#default-values-for-target-based-on-type)</p> | The `Listenable` instance |

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
| `message` and `messageerror` | [`MessageEvent`](https://developer.mozilla.org/en-US/docs/Web/API/MessageEvent) |
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
| `target` | HTMLElement, Document | See description | <p>The target that will listen for events.</p><p>See the [Default values for `target` based on `type`](#default-values-for-target-based-on-type) section for more guidance on default `target` values.</p> |
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

<p>An object with a `target` property, which should be the `BroadcastChannel` instance that is receiving messages.</p>

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
| `message` and `messageerror` | <p>A new `BroadcastChannel`.</p><p>You'll technically be able to retrieve this `BroadcastChannel` from `listenableInstance.active` and send messages from it, but the DX of creating and passing in your own `BroadcastChannel` is much better.</p><p>Be sure to check out Baleada's [`Broadcastable`](/docs/logic/classes/Broadcastable) class, and especially the [Using `Broadcastable` with `Listenable`](/docs/logic/classes/Broadcastable#using-with-listenable) docs, if you're interested in handling `BroadcastChannel` messages with Baleada and `Listenable`.</p> |
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
| `message` and `messageerror` | `target` |
| `recognizeable` | None |
:::



:::
### How to listen for custom gestures
:::

`Listenable` allows you to listen for custom gestures defined by Baleada Logic's `Recognizeable` class.

Before you read any further, it's worth checking out the usage docs for these gestures that Baleada supports out of the box:
- [`keychord`](/docs/logic/factories/keychord)
- [`keypress`](/docs/logic/factories/keypress)
- [`keyrelease`](/docs/logic/factories/keyrelease)
- [`mousepress`](/docs/logic/factories/mousepress)
- [`mouserelease`](/docs/logic/factories/mouserelease)
- [`touchpress`](/docs/logic/factories/touchpress)
- [`touchrelease`](/docs/logic/factories/touchrelease)
- [`touchrotate`](/docs/logic/factories/touchrotate)

Those docs will show you the overall workflow for using `Listenable`, with `Recognizeable` under the hood, to recognize complex gestures.

If you get a better understanding of that system and want to define a gesture of your own, definitely visit [the `Recognizeable` docs](/docs/logic/classes/recognizeable) for more guidance.


:::
## Using with TypeScript
:::

`Listenable` will type check your `listen` method `effect` functions and options based on the `type` (String) you pass to the constructor:

:::
```ts
const instance = new Listenable('intersect')

instance.listen(
  // Listenable infers from the `intersect` event type that
  // `entries` is an array of IntersectionObserverEntry objects.
  //
  // entries[0].boundingClientRect.width is correctly typed
  // as a number, automatically!
  entries => console.log(entries[0].boundingClientRect.width),
  // Listenable also knows that the `listen` method for an
  // 'intersect' type can accept an `observer` option,
  // passing an IntersectionObserverInit object.
  { observer: { threshold: 0.5 } }
) 
```
:::

Even complex types like media queries will be detected:

:::
```ts
const screenSize = new Listenable('(min-width: 420px)')
screenSize.listen(
  // TypeScript knows that this is a MediaQueryListEvent
  event => doSomething(event)
)
```
:::

There's one situation where you'll need to adopt a _little_ bit of type unsafety: when using `Listenable` to configure a `Recognizeable` instance for recognizing a custom gesture.

Recall that to use `Listenable` with `Recognizeable`, you should pass `recognizeable` as the `Listenable` constructor's `type` argument, and pass your `Recognizeable` instance's options to `listenableOptions.recognizeable`

:::
```js
const instance = new Listenable(
  'recognizeable',
  { recognizeable: { ... } }
)
```
:::

There's a way to type-annotate your code so that your `options.recognizeable` object is fully type checked based on all the possible events that you want your `Recognizeable` instance to be able to handle, and type unsafety is minimized.

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

