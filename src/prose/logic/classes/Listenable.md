---
title: Listenable
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

`Listenable` is a class that enriches an event type (including observation types, media queries, custom gestures, and more), allowing it to:
- Listen for that event type and execute a callback function when it occurs
- Retrieve a list of active listeners that it has added
- Store a status (`ready`, `listening`, or `stopped`)
- Easily clean up all listening activity to avoid memory leaks

`Listenable` depends on [`Recognizeable`](/docs/logic/classes/Recognizeable) (for custom gestures only, but not tree-shakeable), and uses the following web APIs under the hood:
- [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver), [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), and [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback)
- [`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`removeListener`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/removeListener)
- [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API?redirectlocale=en-US&redirectslug=DOM%2FUsing_the_Page_Visibility_API)


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

To construct a `Listenable` instance (Object), use the `Listenable` constructor, which takes two parameters:

::: ariaLabel="Listenable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `type` | String | yes | The type of event that will be made listenable. See the [Valid event types](#valid-event-types) section for more guidance. |
| `options` | Object | no | Passes options for the `Listenable` instance. See the [`Listenable` constructor options](#Listenable-constructor-options) section for more guidance. |
:::

:::
```js
import { Listenable } from '@baleada/logic'
const instance = new Listenable(type[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
import { useListenable } from '@baleada/vue-composition'
const reactiveInstance = useListenable(type[, options])
```
:::


:::
### Valid event types
:::

`Listenable` supports a ton of different event types and can deduce which web APIs to use under the hood based on the `type` you pass. 

Most of the time, you don't need to be concerned with exactly which web API is being used, and you can think of it as an implementation detail. But in cases where you want to customize the way a certain web API behaves, you'll need to know which API is being used in order to know what customization options are available. You'll find more guidance down below, in the [How to customize `listen` behavior](#how-to-customize-listen-behavior) section.

The table below has a breakdown of valid event types, the corresponding web APIs that `Listenable` uses under the hood, and the main purpose of the API.

::: ariaLabel="Listenable event types and web APIs" classes="wide-3"
| Event type | Web APIs | Purpose |
| --- | --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | Listens for basic events |
| `intersect` | [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/) | Listens for DOM elements intersecting with an ancestor element or with the top-level document's viewport. |
| `resize` | [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) | Listens for DOM elements being resized |
| `mutate` | [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) | Listens for DOM element being mutated (e.g. children added or removed) |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) and [`removeListener`](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/removeListener) | Listens for changes to browser metadata (e.g. screen size, or color scheme preference) |
| `idle` | [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) | Listens for the end user going idle |
| `visibilitychange` | [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API?redirectlocale=en-US&redirectslug=DOM%2FUsing_the_Page_Visibility_API) | Listens for the end user switching to a different tab, or returning to your tab |
| Key combos and click combos (see the [How to format key combos and click combos](#how-to-format-key-combos-and-click-combos) section for more guidance) | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | Listens for keys being are pressed or clicks being performed, optionally in combination with modifier keys |
| `recognizeable` | [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) | <p>Listens for custom gestures, powered by [`Recognizeable`](/docs/logic/classes/recognizeable).</p><p>See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p> |
:::


:::
#### How to format key combos and click combos
:::

`Listenable` makes it easy to listen for key combos and click combos—keys or clicks combined with modifier keys. The Baleada docs, for example, use `Listenable` to listen for `Shift + D` (toggle dark theme) and `Shift + M` (toggle minimalist theme).

To achieve this or something similar, you just need to format your `type` properly when passing it to the `Listenable` constructor. Here are the steps you can follow:

1. Optionally, choose modifiers from the options below. You can also add `!` before any modifier to assert that it wasn't pressed during the event:
    - `shift`/`!shift`
    - `ctrl`/`!ctrl`
    - `cmd`/`!cmd`
    - `alt`/`!alt` a.k.a. `opt`/`!opt`
2. Choose one of the following things. You can also add `!` before any of these options to assert that it wasn't pressed during the event:
    - Any number
    - Any letter
    - `enter`
    - `backspace`
    - `tab`
    - `space`
    - `esc`
    - `home`
    - `end`
    - `pagedown`
    - `pageup`
    - `capslock`
    - `f1` (or any other `f` + one-or-two-digit number function key)
    - `camera`
    - `delete`
    - Any individual modifier key: `cmd`, `meta`, `shift`, `ctrl`, `alt`, or `opt`
    - Any arrow direction—`up`, `right`, `down`, `left`, `vertical` (to listen for both `up` and `down`), `horizontal` (to listen for both `right` and `left`), or `arrow` (to listen for any arrow key)
    - Any of the following punctuation: `,` `.` `<` `>` `/` `?` `;` `:` `'` `"` `[` `]` `{` `}` `}` `\` `|` `\` `~` `!` `@` `#` `$` `%` `^` `&` `*` `(` `)` `-` `_` `=` `+` <code>`</code>
    - `click`
    - `mousedown`
    - `mouseup`
    - `rightclick`
3. Join your modifiers and your key or click choice with `+`

Here are some more specific examples:

::: ariaLabel="Examples of key combo and click combo event types"
| Desired combo | `type` |
| --- | --- |
| B | `b` |
| Command + 1 | `cmd+1` |
| Shift + Command + Enter | `shift+cmd+enter` |
| Shift wasn't pressed + Control + Option + Click | `!shift+ctrl+opt+click` or `!shift+ctrl+alt+click`|
| Command + Shift + Up Arrow | `cmd+shift+up` or `cmd+shift+up` |
| Shift + Right click | `shift+rightclick` |
| Control + Plus | `ctrl++` |
| Exclamation mark wasn't pressed | `!!` |
| Command | `cmd` |
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
## Access state and methods
:::

The constructed `Listenable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Listenable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `type` | Getter/Setter | See return value | N/A | <p>The event type you passed to the `Listenable` constructor.</p><p>If you assign a value directly to `type`, a setter will pass the new value to `setType`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Listenable` instance.</p><p>`status` is `ready` after the instance is constructed, and changes to `listening` after the `listen` method is called for the first time, and change to `stopped` after all web API activity has been stopped and cleaned up.</p> |
| `activeListeners` | Getter | See return value | N/A | An array (Array) of objects that describe all the currently active listeners, observers, etc. |
| `recognizeable` | Getter | See return value | N/A | <p>The `Recognizeable` instance constructed using the object you passed to `options.recognizeable`.</p><p>If you didn't pass that option, the `recognizeable` property will be `undefined`.</p><p>See the [How to listen for custom gestures](#how-to-listen-for-custom-gestures) section for more guidance.</p> |
| `setType(type)` | Function | Sets a new `type`, after stopping and cleaning up all existing web API activity. | The new type (String). | The `Listenable` instance |
| `listen(callback, options)` | Function | Listens for the events specified by your `type`, and executes a callback function when the events happen. Can't be called until the DOM is available. | <p>A callback (Function, required) that will be executed when the events are detected, and an optional `options` object.</p><p>To learn more about handling events with your callback, see the [How to handle events](#how-to-handle-events) and [How to customize `listen` behavior](#how-to-customize-listen-behavior) sections.</p> | The `Listenable` instance |
| `stop(target)` | Function | Stops and cleans up all web API activity. Can't be called until the DOM is available. | <p>An optional target (a DOM element or `document`).</p><p>If a target is passed, only activity related to that target will be stopped, and if no target is passed, all activity is stopped.</p> | The `Listenable` instance |

:::


:::
### How to handle events
:::

Depending on your `type`, your `callback`—passed as the required first argument of the `listen` method—will receive different parameters.

The table below has a full breakdown of what the `listen` method passes to your callback for each specific event type:

::: ariaLabel="List of event types and the arguments your callback will receive" class="wide-2"
| `type` | What your `callback` receives |
| --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| `intersect` | One argument: an array of [IntersectionObserverEntry](IntersectionObserverEntry) objects |
| `resize` | One argument: an array of [ResizeObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserverEntry) objects |
| `mutate` | One argument: an array of [MutationRecord](https://developer.mozilla.org/en-US/docs/Web/API/MutationRecord) objects |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | One argument: a [MediaQueryListEvent](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryListEvent) object |
| `idle` | One argument: an [IdleDeadline](https://developer.mozilla.org/en-US/docs/Web/API/IdleDeadline) object |
| `visibilitychange` | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| Key combos and click combos | One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object |
| `recognizeable` | <p>One argument: an [Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) object</p><p>When handling this event, you'll also frequently reach into `listenableInstance.recognizeable.metadata` for additional information about the sequence of events captured by the Recognizeable instance.</p> |
:::


:::
### How to customize `listen` behavior
:::

The `listen` method accepts an optional second argument, which is an Object whose properties customize the behavior of the web APIs `Listenable` uses under the hood.

Depending on your `type` only certain properties will have an effect.

First, here's a breakdown of what each `options` property does, and below that, in the [Available options for each `type`](#available-options-for-each-type) section, you'll find a table of which properties can be used for each `type`:

::: ariaLabel="listen method options" class="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `target` | HTMLElement, Document | See [Default values for `target` based on `type`](#default-values-for-target-based-on-type) | The target that will listen for events |
| `addEventListener` | Object | none | The `options` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `useCapture` | Boolean | none | A value for the standalone `useCapture` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Ignored if an `addEventListener` object was passed. |
| `wantsUntrusted` | Boolean | none | A value for the standalone `wantsUntrusted` parameter of [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) |
| `except` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, should *not* cause your `callback` to be executed.</p><p>When the `only` option is a non-empty array, `except` is ignored.</p> |
| `only` | Array | `[]` | <p>An array of DOM elements that, if they are the target of the event, *should* cause your `callback` to be executed.</p><p>When `only` is a non-empty array, `except` is ignored.</p><p>An empty `only` array is ignored (otherwise, the `callback` would never execute).</p> |
| `observer` | Object | none | The `options` parameter of the [Intersection Observer constructor](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver) |
| `observe` | Object | none | The `options` parameter of the [`MutationObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver/observe) and [`ResizeObserver.observe`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe) methods |
| `requestIdleCallback` | Object | none | The `options` parameter of [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) |
| `keyDirection` | String | `'down'` | <p>Indicates which keyboard event should be listened to when detecting keycombos. Valid options are `down` and `up` .</p><p>The `keyDirection` option only has an effect when your `type` is a keycombo, as described the [How to format key combos and click combos](#how-to-format-key-combos-and-click-combos).</p> |

:::


:::
#### Default values for `target` based on `type`
:::

The default value for the `listen` method's `target` option depends on your `type`. The table below has a full breakdown.

::: ariaLabel="Default values for target based on type"
| `type` | Default `target` |
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
#### Available options for each `type`
:::

::: ariaLabel="Available options for each type"
| `type` | Available options |
| --- | --- |
| All the basics, like `click`, `keydown`, `mousemove`, etc. | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
| `intersect` | `observer` |
| `resize` | `observe` |
| `mutate` | `observe` |
| Media queries (i.e. any valid first argument for the [matchMedia](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method) | none |
| `idle` | `requestIdleCallback` |
| `visibilitychange` | <ul><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li></ul> |
| Key combos and click combos | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li><li>`keyDirection` (key combos only)</li></ul> |
| `recognizeable` | <ul><li>`target`</li><li>`addEventListener`</li><li>`useCapture`</li><li>`wantsUntrusted`</li><li>`except`</li><li>`only`</li></ul> |
:::



:::
### How to listen for custom gestures
:::

`Listenable` allows you to listen for custom gestures defined by Baleada Logic's `Recognizeable` class. For full information on how to use the `Recognizeable` class, [visit the `Recognizeable` docs](/docs/logic/classes/Recognizeable) (especially the [section on constructor options](/docs/logic/classes/Recognizeable#recognizeable-constructor-options) and the [section on accessing state and methods](/docs/logic/classes/Recognizeable#access-state-and-methods)), but keep reading here to learn the overall workflow.

To get started, construct a new instance of `Listenable`, using `'recognizeable'` as the `type`, and passing the `Recognizeable` options object to the `recognizeable` option:

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

At this time, `Listenable` will also extract a list of all the properties in `options.recognizeable.handlers` and store it internally.

:::
```js
const instance = new Listenable('recognizeable', {
  recognizeable: {
    handlers: {...}
  }
})

// The properties of options.recognizeable.handlers
// are the names of events that Listenable should be 
// listening for. Listenable stores them internally
// for use later on (when you call the listen method).
```
:::

::: type="info"
Not sure what to pass to `options.recognizeable.handlers`?

Don't sweat it—check out the [Baleada Recognizeable Handlers](/docs/recognizeable-handlers) package, which gives you access to pre-built `handlers` objects for commonly needed gestures:
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

When you call the `listen` method, passing your `callback` function, `Listenable` will add an event listener for each of the properties/events in `options.recognizeable.handlers`.

`Listenable` will also store your `callback` in the `Recognizeable` instance's `listener` property, where it can be accessed by the `Recognizeable` instance's handlers if needed.

As events occur, `Listenable` will pass them through to your `Recognizeable` instance's `recognize` method, which in turn will pass the events to the `Recognizeable` instance's event handlers.

When your `Recognizeable` instance recognizes a gesture, Listenable will execute your callback. Your callback will receive the latest `event` in the event sequence tracked by `Recognizeable`. More commonly, though, you'll be reaching into the `Recognizeable` instance to access its `metadata`—i.e., you'll be accessing `myListenableInstance.recognizeable.metadata`.


:::
#### Complete custom gesture example
:::

The following code shows how this documentation site combines `Listenable` and `Recognizeable` with custom handlers from [Baleada Recognizeable Handlers](/docs/recognizeable-handlers) to open and close the sidebar navigation and table of contents when a mobile device user swipes left or right.

The original code is written specifically to work with [Vue](https://v3.vuejs.org), but this example has been simplified to plain JavaScript, and heavily commented.

:::
```js
import { Listenable } from '@baleada/logic'
// The touchdragdrop handlers are a great stand-in for swipe
// gesture recognition.
import { touchdragdrop as swipe } from '@baleada/recognizeable-handlers'

// Construct the Listenable instance, passing custom handlers
// to options.recognizeable.handlers
const articleSwipe = new Listenable(
  'recognizeable',
  { recognizeable: { handlers: swipe() } }
)

articleSwipe.listen(
  // In the listen callback, access the Recognizeable instance's
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
    target: referenceToArticle,
    // Elements with a .swiper-no-swiping class are not
    // valid swipe targets, even if they are inside the
    // article. This is useful for ignoring horizontal
    // scrolling on tables and codeblocks in the docs,
    // since the scrolling gesture is physically the same
    // movement as a swipe, and would normally get recognized.
    except: ['.swiper-no-swiping'],
    // For performance reasons, set `passive` to `true`
    // to prevent the callback from running on the main
    // thread when the user is scrolling on a touch-enabled
    // device.
    addEventListener: { passive: true }
  }
)
```
:::



:::
## API design compliance
:::

::: ariaLabel="A table showing Listenable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `type`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setType` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `activeListeners`, `recognizeable` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `listen`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> | `stop` |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A type of event can be listened for." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
