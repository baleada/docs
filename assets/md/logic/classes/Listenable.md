---
title: Listenable
framework: agnostic
publish: true
order: 0
---

`Listenable` is a class that enriches an event type (including observation types, media queries, and custom gestures), allowing it to:
- Listen for that event type and execute a callback function when it occurs
- Retrieve a list of active listeners that it has added
- Store a status (`ready`, `listening`, or `stopped`)
- Easily clean up all listening activity to avoid memory leaks

`Listenable` is depends on [`Recognizeable`](/docs/logic/classes/Recognizeable), and uses the following web APIs under the hood:
- [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver), [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), and [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback)
- [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`removeListener`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/removeListener)
- [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API?redirectlocale=en-US&redirectslug=DOM%2FUsing_the_Page_Visibility_API)


:::
## Construct a `Listenable` instance
:::

To construct a `Listenable` instance (Object), use the `Listenable` constructor, which takes two parameters:

::: ariaLabel="Listenable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `eventName` | String | yes | The name of the event that will be made listenable. See the [Valid event names](#valid-event-names) section for more guidance. |
| `options` | Object | no | Passes options for the `Listenable` instance. See the [`Listenable` constructor options](#Listenable-constructor-options) section for more guidance. |


:::
### Valid event names
:::

`Listenable` supports a ton of different event names and is able to deduce which web APIs to use based on the `eventName` you pass. 


Most of the time, you don't need to be concerned with exactly which web API is being used, and you can think of it as an implementation detail. But in cases where you want to customize the way a certain web API behaves, you'll need to know which API is being used in order to know what customization options are available. You'll find more guidance down below, in the [How to customize `listen` behavior](#how-to-customize-listen-behavior) section.

The table below has a breakdown of valid event names, the corresponding web APIs that `Listenable` uses under the hood, and the main purpose of the API.

::: ariaLabel="Listenable event names and web APIs"
| Event name | Web APIs | Purpose |
| --- | --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | Detect basic events |
| `intersect` | [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/) | Detect when a DOM element intersects with an ancestor element or with the top-level document's viewport. |
| `resize` | [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) | Detect when a DOM element is resized |
| `mutate` | [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) | Detect when a DOM element is mutated (e.g. children added or removed) |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`removeListener`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/removeListener) | Detect changes to browser metadata (e.g. screen size, or color scheme preference) |
| `idle` | [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) | Detect when the end user is idle |
| `visibilitychange` | [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API?redirectlocale=en-US&redirectslug=DOM%2FUsing_the_Page_Visibility_API) | Detect when the end user switches to a different tab, or returns to your tab |
| Key combos and click combos (see the [How to format key combos and click combos](#how-to-format-key-combos-and-click-combos) section for more guidance) | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | Detect when keys are pressed or clicks are performed, optionally in combination with modifier keys |
| `recognizeable` | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | <p>Detects custom gestures, powered by [`Recognizeable`](/docs/logic/classes/recognizeable).</p><p>See the [How to detect and handle custom gestures](#how-to-detect-and-handle-custom-gestures) section for more guidance.</p> |
:::


:::
#### How to format key combos and click combos
:::

`Listenable` makes it easy to listen for key combos and click combos—keys or clicks combined with modifier keys. The Baleada docs, for example, use `Listenable` to listen for `Shift + D` (toggle dark theme) and `Shift + M` (toggle minimalist theme).

To achieve this or something similar, you just need to format your `eventName` properly when passing it to the `Listenable` constructor. Here are the steps you can follow:
1. Optionally, choose up to four modifiers from the options below:
   - `shift`
   - `ctrl`
   - `cmd`
   - `alt` a.k.a. `opt`
2. Choose one of the following things:
   - Any number
   - Any letter
   - `enter`
   - `backspace`
   - `tab`
   - Any arrow direction—`up`, `right`, `down`, or `left`
3. Join your modifiers and your key (or click) choice with `+`

Here are some more specific examples:

::: ariaLabel="Examples of key combo and click combo event names"
| Desired combo | `eventName` |
| --- | --- |
| B | `b` |
| Command + 1 | `cmd+1` |
| Shift + Command + Enter | `shift+cmd+enter` |
| Shift + Control + Option + Click | `shift+ctrl+opt+click` or `shift+ctrl+alt+click`|
| Shift + Control + Option + Command + Up Arrow | `shift+ctrl+opt+cmd+up` or `shift+ctrl+alt+cmd+up` |
:::



:::
### `Listenable` constructor options
:::

::: ariaLabel="Listenable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `recognizeable` | Object | none | Passes options for a new instance of the [`Recognizeable`](/docs/logic/classes/recognizeable) class. See the [How to detect and handle custom gestures](#how-to-detect-and-handle-custom-gestures) section for more guidance. |
:::



:::
## Access state and methods
:::

The constructed `Listenable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Listenable state and methods" classes="wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `eventName` | Getter/Setter | See return value | N/A | <p>The event name you passed to the `Listenable` constructor.</p><p>If you assign a value directly to `eventName`, a setter will pass the new value to `setEventName`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Listenable` instance.</p><p>`status` is `ready` after the instance is constructed, and changes to `listening` after the `listen` method is called for the first time, and change to `stopped` after all web API activity has been stopped and cleaned up.</p> |
| `activeListeners` | Getter | See return value | N/A | An array (Array) of objects that describe all the currently active listeners, observers, etc. |
| `recognizeable` | Getter | See return value | N/A | <p>The `Recognizeable` instance constructed using the object you passed to `options.recognizeable`.</p><p>If you didn't pass that option, the `recognizeable` property will be `undefined`.</p><p>See the [How to detect and handle custom gestures](#how-to-detect-and-handle-custom-gestures) section for more guidance. |
| `setEventName(eventName)` | Function | Sets a new `eventName`, after stopping and cleaning up all web API activity. | The new eventName (String). | The `Listenable` instance |
| `listen(callback, options)` | Function | Detects the events specified by your `eventName`, and executes a callback function when the events happen. | <p>A callback (Function, required) that will be executed when the events are detected, and an optional `options` object.</p><p>To learn more about handling events with your callback, see the </p> | The `Listenable` instance |
| `stop(target)` | Function | Stops and cleans up all web API activity. | <p>An optional target (a DOM element or `document`).</p><p>If a target is passed, only activity related to that target will be stopped, and if no target is passed, all activity is stopped.</p> | The `Listenable` instance |

:::


:::
### How to handle events
:::

Depending on your `eventName`, your `callback`—passed as the required first argument of the `listen` method—will receive different parameters.

The table below has a full breakdown of what the `listen` method passes to your callback for each specific event name:

::: ariaLabel="List of event names and the arguments your callback will receive" class="wide-2"
| `eventName` | What your `callback` receives |
| --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| `intersect` | One argument: an array of [IntersectionObserverEntry](IntersectionObserverEntry) objects |
| `resize` | One argument: an array of [ResizeObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects |
| `mutate` | One argument: an array of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | One argument: a [MediaQueryListEvent](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListEvent) object |
| `idle` | One argument: an [IdleDeadline](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline) object |
| `visibilitychange` | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| Key combos and click combos | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| `recognizeable` | <p>Three arguments, in the following order:</p><ol><li>An [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object for the latest event in the event sequence you are recognizing</li><li>The `Listenable` instance's `recognizeable` instance (which you can also access via `myListenable.recognizeable`)</li><li>The `recognizeableListenerApi`</li></ol><p>See the [How to detect and handle custom gestures](#how-to-detect-and-handle-custom-gestures) section for more guidance on the `recognizeableListenerApi`.</p> |

:::


:::
### How to customize `listen` behavior
:::

The `listen` method accepts an optional second argument, which is an `object` whose properties customize the behavior of the web APIs `Listenable` uses under the hood.

Depending on your `eventName` only certain properties will have an effect.

First, here's a breakdown of what each `options` property does, and below that, in the [Available options for each `eventName`](#available-options-for-each-eventname) section, you'll find a table of which properties can be used for each `eventName`:

::: ariaLabel="listen method options" class="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | HTMLElement, Document | See [Default values for `target` based on `eventName`](#default-values-for-target-based-on-eventname) | The target that will be listened to in order to detect events |
| `addEventListener` | Object | none | The `options` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `useCapture` | Boolean | none | A value for the standalone `useCapture` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `wantsUntrusted` | Boolean | none | A value for the standalone `wantsUntrusted` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `except` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, should *not* cause your `callback` to be executed.</p><p>When the `only` option is a non-empty array, `except` is ignored.</p> |
| `only` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, *should* cause your `callback` to be executed.</p><p>When `only` is a non-empty array, `except` is ignored.</p><p>An empty `only` array is ignored (otherwise, the `callback` would never execute).</p> |
| `observer` | Object | none | The `options` parameter of the [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) |
| `observe` | Object | none | The `options` parameter of the [`MutationObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe) and [`ResizeObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe) methods |
| `requestIdleCallback` | Object | none | The `options` parameter of [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) |

:::


:::
#### Default values for `target` based on `eventName`
:::

The default value for the `listen` method's `target` option depends on your `eventName`. The table below has a full breakdown.

::: ariaLabel="Default values for target based on eventName"
| `eventName` | Default `target` |
| --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | `document` |
| `intersect` | `document.querySelector('html')` |
| `resize` | `document.querySelector('html')` |
| `mutate` | `document.querySelector('html')` |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | N/A |
| `idle` | N/A |
| `visibilitychange` | `document` (Can't be overridden) |
| Key combos and click combos | `document` |
| `recognizeable` | `document` |
:::


:::
#### Available options for each `eventName`
:::
| `eventName` | Available options |
| --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
| `intersect` | `observer` |
| `resize` | `observe` |
| `mutate` | `observe` |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | none |
| `idle` | `requestIdleCallback` |
| `visibilitychange` | <ul><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li></ul> |
| Key combos and click combos | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
| `recognizeable` | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
:::



:::
### How to detect custom gestures
:::

WIP


:::
## API design compliance
:::

::: ariaLabel="A table showing Listenable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <ApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <ApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <ApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <ApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <ApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <ApiDesignSpecCheckmark /> | `eventName`  |
| Has a public method you can use to set a new value for that public getter | <ApiDesignSpecCheckmark /> | `setEventName` |
| Has a setter for that getter so you can assign a new value directly | <ApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <ApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <ApiDesignSpecCheckmark /> | `status`, `activeListeners`, `recognizeable` |
| Has one or more public methods that expose core functionality | <ApiDesignSpecCheckmark /> | `listen`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <ApiDesignSpecCheckmark /> | `stop` |
| Uses the sentence template to decide what state type should be accepted by a constructor | <ApiDesignSpecCheckmark /> | "An event name can be listened for." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <ApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <ApiDesignSpecCheckmark /> | |
:::
