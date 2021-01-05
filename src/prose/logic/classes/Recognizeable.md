---
title: Recognizeable
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

`Recognizeable` is a class that enriches a sequence of DOM events, allowing it to:
- Recognize the sequence as something more abstract, like a "swipe" gesture, or a double-tap
- Store metadata about the sequence
- Store the most recent event, for easier access
- Store a status (`'ready'`, `'recognizing'`, `'recognized'`, or `'denied'`)

`Recognizeable` depends on [`object-path`](https://github.com/mariocasciaro/object-path).


::: type="warning"
`Recognizeable` is a lower-level tool whose intended purpose is to allow the [`Listenable`](/docs/logic/classes/Listenable) class to listen for custom gestures.

Before using `Recognizeable` to define your own custom gesture, you should test out [Baleada Recognizeable Handlers](/docs/recognizeable-handlers), a collection of pre-made `Recognizeable` configurations that allow `Listenable` to listen for common gestures like swipe, pan, drag-and-drop, double-tap, double-click, and more.

If Baleada Recognizeable Handlers doesn't suit your needs, feel free to continue learning about `Recognizeable` so you can define your own custom gestures!
:::


:::
## Construct a `Recognizeable` instance
:::

To construct a `Recognizeable` instance (Object), use the `Recognizeable` constructor, which takes two parameters:

::: ariaLabel="Recognizeable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sequence` | Array | yes | <p>Passes the event sequence (Array) that will be made recognizable.</p><p>In all intended use cases, `Listenable` will be constructing the `Recognizeable` instance for you, and it will pass an empty array here.</p> |
| `options` | Object | no | <p>Passes options for the `Recognizeable` instance. See the [`Recognizeable` constructor options](#Recognizeable-constructor-options) section for more guidance.</p><p>This is where `Listenable` delivers the options object you pass to `Listenable`'s `recognizeable` option.</p> |
:::


:::
```js
const instance = new Recognizeable(sequence[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
const reactiveInstance = useRecognizeable(sequence[, options])
```
:::



:::
### `Recognizeable` constructor options
:::

::: ariaLabel="Recognizeable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `handlers` | Object | `0` | <p>The object that contains the event handler functions that help recognize your the custom gesture.</p><p>See the [How to format handlers](#how-to-format-handlers) section for more guidance on formatting the `handlers` object.</p> |
| `maxSequenceLength` | Number, Boolean | `true` | <p>Indicates the number of events that should be stored in the `sequence` array. When a new event is received, `Recognizeable` removes the first event in the `sequence` if its length would otherwise exceed `maxSequenceLength`.</p><p>Set `maxSequenceLength` to `true` if you don't want to limit the number of events that are stored.</p> |
:::


:::
#### How to format handlers
:::

`handlers` is an Object, and the properties of that object should be the names of DOM events—more specifically, any event that can be listened to using [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

The value for each property should be a function, and your `Recognizeable` will pass one argument to those functions: the Handler API object. Here's a breakdown of that object:

::: ariaLabel="Handler API breakdown" classes="wide-1 wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `event` | Event | The DOM event that just occurred | N/A | N/A |
| `getSequence()` | Function | <p>Gets the current `sequence` from the `Recognizeable` instance (including the most recent `event` at the end).</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `sequence`.</p> | none | The `Recognizeable` instance's `sequence` |
| `getStatus()` | Function | <p>Gets the current `status` from the `Recognizeable` instance.</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `status`.</p> | none | The `Recognizeable` instance's `status` |
| `getMetadata()` | Function | <p>Gets the current `metadata` from the `Recognizeable` instance.</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `metadata`.</p> | none | The `Recognizeable` instance's `metadata` object |
| `setMetadata({ path, value })` | Function | Sets a new value for a property in the `metadata` object. | <p>An object with two properties: `path` and `value`.</p><p>`path`'s value should be a dot-delimited path (String) to the property that you want to edit on the `metadata` object.</p><p>`value`'s value should be the actual value you want to store in the `metadata` object.</p>  | none |
| `pushMetadata({ path, value })` | Function | Adds a new value to the end of an array stored in the `metadata` object. | <p>An object with two properties: `path` and `value`.</p><p>`path`'s value should be a dot-delimited path (String) to the array that you want to add a new value to.</p><p>`value`'s value should be the actual value you want to add to the array.</p><p>If there is no existing array at the `path` you passed, `Recognizeable` will automatically set up a new one for you, then add your new value to it.</p>  | none |
| `insertMetadata({ path, value, index })` | Function | Inserts a new value into an array stored in the `metadata` object. | <p>An object with three properties: `path`, `value`, and `index`.</p><p>`path`'s value should be a dot-delimited path (String) to the array that you want to add a new value to.</p><p>`value`'s value should be the actual value you want to insert into the array.</p><p>`index` should be the index-based position (Number) where you want the value to be inserted.</p><p>If there is no existing array at the `path` you passed, `Recognizeable` will automatically set up a new one for you, then insert your new value into it.</p> | none |
| `recognized()` | Function | <p>Sets the `Recognizeable` instance's `status` to `'recognized'`, and updates the `sequence` to include the most recent event.</p><p>You should _only_ call this function after the information you've gathered from events and stored in `metadata` proves that your custom gesture has occurred.</p> | none | none |
| `denied()` | Function | <p>Sets the `Recognizeable` instance's `status` to `'denied'`, resets the instance's `metadata` to an empty object, and resets the instance's `sequence` to an empty array.</p><p>You should _only_ call this function after the information you've gathered from events and stored in `metadata` proves that your custom gesture can't possibly occur, and everything should reset so you can start recognizing again with a clean slate.</p> | none | none |
| `toPolarCoordinates({ xA, yA, xB, yB })` | Function | <p>A utility function that converts a pair of cartesian coordinates to polar coordinates.</p><p>Super useful when calculating the angle and distance of a moving cursor or touch point!</p> | <p>An object with four properties: `xA`, `yA`, `xB`, and `yB`.</p><p>`xA` and `yA` are the cartesian coordinates (Numbers) of the first point, and `xB` and `yB` are the cartesian coordinates (Numbers) of the second point.</p> | <p>An object with two properties: `distance` and `angle`.</p><p>`distance` is the straight-line distance (Number) from point A to point B.</p><p>`angle` is an object with two properties: `radians` and `degrees`. Each property contains the angle (Number) in radians or degrees of the straight line between point A and point B.</p> |
:::

That's a lot of information to throw at you! If this is your first read through, you should be confused at this point. Don't sweat it—later on, the [Handler workflow](#handler-workflow) section will clear things up.


:::
## Access state and methods
:::

The constructed `Recognizeable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Recognizeable state and methods" classes="wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `sequence` | Getter/Setter | See return value | N/A | <p>A shallow copy (Array) of the `sequence` array passed to the constructor.</p><p>If you assign a value directly to `sequence`, a setter will pass the new value to `setSequence`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Recognizeable` instance. See the [How methods affect status](#how-methods-affect-status) section for more information. |
| `metadata` | Getter | See return value | N/A | <p>An object where you can access any metadata stored by the event handler functions passed to the `handlers` option.</p><p>Data gets added to the `metadata` object when event handlers call the `setMetadata`, `pushMetadata`, or `insertMetadata` functions in the [Handler API](#how-to-format-handlers).</p> |
| `setSequence(sequence)` | Function | Sets the `sequence` | The new sequence | The `Recognizeable` instance |
| `recognize(event)` | Function |  | A DOM event | The `Recognizeable` instance |

:::


:::
### How methods affect status
:::

Each `Recognizeable` instance maintains a `status` property that allows it to take appropriate action after after your `handlers` process a new event received by the `recognize` method.

At any given time, `status` will always be one (and only one) of the following values:
- `'ready'`
- `'recognizing'`
- `'recognized'`
- `'denied'`

`Recognizeable`'s status is pretty easy to predict:
1. After the instance is constructed, `status` will be `ready`.
1. Any time the `recognize` method is called, `status` switches to `recognizing` before the new event is passed to your event handlers.
2. `status` remains `recognizing` until one of your handlers calls the `recognized` or `denied` functions in the [Handler API](#how-to-format-handlers), at which point `status` becomes `recognized` or `denied` (depending on which function your handler called).

Also, be aware that the `denied` function doesn't _just_ set `status` to `denied`—it also resets `metadata` to an empty object and resets `sequence` to an empty array.


::: type="info"
All methods always return the `Recognizeable` instance (i.e. `this`), regardless of `status`.
:::


:::
## Handler workflow
:::

Now that all of `Recognizeable`'s state and methods have been defined and you've finished drowning in the Handler API breakdown, it's time to learn more about `Recognizeable`'s handler workflow.

Here's what the workflow looks like:
1. A DOM event gets passed to the `recognize` method.
2. Internally, the `recognize` method discerns the type of that DOM event.
3. The `recognize` method looks through the `handlers` object (passed to the constructor option) and finds the property that matches the discerned event type.
4. `recognize` calls the handler function stored at that property, passing the Handler API (which includes the original DOM event).
5. Your handler function receives the DOM event and should extract some information from it. For example: at what `x` and `y` coordinates did the event take place? At what time did the event take place?
6. Your handler function can use the Handler API's `setMetadata`, `pushMetadata` and `insertMetadata` functions to store metadata about the event for future use. You can also use `getMetadata` to retrieve the entire metadata object in case you need to reference some information you've already stored.
7. Based on all of the information you've gathered, your handler should make a decision: 
    - Has the custom gesture been recognized? If so, call the `recognized` function. `Recognizeable` will update the `sequence` with the most recent event and leave `metadata` in its current state.
    - Still not sure, and need to wait for more events? Do nothing—just like with `recognized`, `Recognizeable` will update the `sequence` with the most recent event and leave `metadata` in its current state.
    - Final option: did something happen that makes your custom gesture impossible (e.g. a `mouseup` event when you're trying to recognize a drag/pan gesture)? If so, call the `denied` function to deny the event, trigger a full reset, and start the workflow from the beginning.

::: type="info"
Still not sure how to use this workflow to recognize your custom gestures? If you're up for a source dive, you can [check out the Baleada Recognizeable Handlers source code](https://github.com/baleada/recognizeable-handlers) for inspiration.
:::


:::
## API design compliance
:::

::: ariaLabel="A table showing Recognizeable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `sequence`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setSequence` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `metaData`, `lastEvent` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `recognize` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A sequence can be recognized." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
