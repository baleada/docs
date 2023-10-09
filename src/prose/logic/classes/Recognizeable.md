---
title: Recognizeable
tags: UI logic
source: true
publish: true
order: 0
---

`Recognizeable` is a class that enriches a sequence of DOM events, allowing it to:
- Recognize itself as something more abstract, like a "swipe" gesture, a keychord, etc.
- Store metadata about itself
- Store a status (`'ready'`, `recognizing`, `recognized`, or `denied`)


::: type="warning"
`Recognizeable` is a lower-level tool designed to allow the [`Listenable`](/docs/logic/classes/Listenable) class to listen for custom gestures and sequences of events.

Before constructing a `Recognizeable` instance of your own, you should test out [Baleada's collection of pre-built `Recognizeable` configurations](/docs/logic/factories-overview#recognizeable-effects) that allow `Listenable` to listen for common gestures like swipe, pan, keycombos, and more.

If these configurations don't suit your needs, continue learning about `Recognizeable` so you can define your own custom gestures!
:::


:::
## Construct a `Recognizeable` instance
:::

::: type="info"
The `Listenable` class internally constructs it's own `Recognizeable` instance as needed. Constructing a `Recognizeable` instance outside of `Listenable` is uncommon.
:::

The `Recognizeable` constructor accepts two parameters:

::: ariaLabel="Recognizeable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `sequence` | Array | yes | <p>Passes the event sequence (Array) that will be made recognizable.</p><p>In all intended use cases, `Listenable` will be constructing the `Recognizeable` instance for you, and it will pass an empty array here.</p> |
| `options` | Object | no | <p>Passes options for the `Recognizeable` instance. See the [`Recognizeable` constructor options](#Recognizeable-constructor-options) section for more guidance.</p><p>This is where `Listenable` delivers the options object you pass to `Listenable`'s `recognizeable` option.</p> |
:::


:::
### `Recognizeable` constructor options
:::

::: ariaLabel="Recognizeable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `effects` | Object, Function | `0` | <p>The object that contains the side effect functions that help recognize your custom sequence.</p><p>`effects` can also be a function that returns an array of tuples that define your effects, but this format is only necessary if you want TypeScript support.</p><p>See the [How to format effects](#how-to-format-effects) section for more guidance on formatting the `effects` object.</p> |
| `maxSequenceLength` | Number, `true` | `true` | <p>Indicates the number of events that should be stored in the `sequence` array. When a new event is received, `Recognizeable` removes the first event in the `sequence` if its length would otherwise exceed `maxSequenceLength`.</p><p>Set `maxSequenceLength` to `true` if you don't want to limit the number of events that are stored.</p> |
:::


:::
#### How to format effects
:::

`effects` is an object, and its properties can be [any valid `Listenable` event type](/docs/logic/classes/Listenable#valid-event-types).


:::
```js
const instance = new Recognizeable(
  [],
  {
    effects: {
      click: ...,
      intersect: ...,
      message: ...,
    }
  }
)
```
:::

The value for each property should be an "effect": a function designed to handle incoming items in your sequence. Your `Recognizeable` instance will pass two arguments those functions:
1. The most recent item that was added to the `sequence`
2. The Effect API.

:::
```js
const instance = new Recognizeable(
  [],
  {
    effects: {
      click: (mouseEvent, effectApi) => {
        ...
      },
      intersect: (intersectionObserverEntry, effectApi) => {
        ...
      },
      message: (messageEvent, effectApi) => {
        ...
      },
    }
  }
)
```
:::

Here's a breakdown of the Effect API:

::: ariaLabel="Effect API breakdown" classes="wide-1 wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `getStatus()` | Function | <p>Gets the current `status` from the `Recognizeable` instance.</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `status`.</p> | none | The `Recognizeable` instance's `status` |
| `getMetadata()` | Function | <p>Gets the current `metadata` from the `Recognizeable` instance.</p><p>This `metadata` object is mutable, and any changes to it will directly affect the `Recognizeable` instance's `metadata` property.</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `metadata`.</p> | none | The `Recognizeable` instance's `metadata` object |
| `setMetadata(metadata)` | Function | Replaces the entire `metadata` object with a new one. | The new `metadata` | none |
| `recognized()` | Function | <p>Sets the `Recognizeable` instance's `status` to `recognized`, and updates the `sequence` to include the most recent event.</p><p>You should _only_ call this function after the information you've gathered from events and stored in `metadata` proves that your custom gesture has occurred.</p> | none | none |
| `denied()` | Function | <p>Sets the `Recognizeable` instance's `status` to `denied`, resets the instance's `metadata` to an empty object, and resets the instance's `sequence` to an empty array.</p><p>You should _only_ call this function after the information you've gathered from events and stored in `metadata` proves that your custom gesture can't possibly occur, and everything should reset so you can start recognizing again with a clean slate.</p> | none | none |
| `getSequence()` | Function | <p>Gets the current `sequence` from the `Recognizeable` instance (including the most recent `sequenceItem` at the end).</p><p>See the [Access state and methods](#access-state-and-methods) section for more info about `sequence`.</p> | none | The `Recognizeable` instance's `sequence` |
:::

You can use that API to extract information from each item in the sequence, store it in `metadata`, and decide when the sequence has been recognized.

:::
```js
const instance = new Recognizeable(
  [],
  {
    effects: {
      click: (event, effectApi) => {
        const { getMetadata, recognized } = effectApi,
              metadata = getMetadata(),
              { clientX, clientY } = event

        metadata.lastClickPosition = {
          x: clientX,
          y: clientY,
        }

        if (metadata.lastClickPosition.x === 420 && metadata.lastClickPosition.y === 420) {
          recognized()
        }
      },
      intersect: effectApi => ...,
      message: effectApi => ...,
    }
  }
)
```
:::

That's a lot of information to throw at you! If this is your first read through, you should be confused at this point. Don't sweat it—later on, the [Effect workflow](#effect-workflow) section should give more clarity.


:::
## State and methods
:::

::: ariaLabel="Recognizeable state and methods" classes="wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `sequence` | Getter/Setter | See return value | N/A | <p>The `sequence` array passed to the constructor.</p><p>If you assign a value directly to `sequence`, a setter will pass the new value to `setSequence`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Recognizeable` instance. See the [How methods affect status](#how-methods-affect-status) section for more information. |
| `metadata` | Getter | See return value | N/A | An object where you can access any metadata stored by the side effect functions passed to the `effects` option. |
| `setSequence(sequence)` | Function | Sets the `sequence` | The new sequence | The `Recognizeable` instance |
| `recognize(sequenceItem)` | Function |  | <p>An event, array of observer entries, etc.</p><p></p> | The `Recognizeable` instance |
:::


:::
## Effect workflow
:::

Now that you've read about `Recognizeable`'s state and methods, and you've finished drowning in the Effect API breakdown, it's time to learn more about `Recognizeable`'s effect workflow.

Here's what the workflow looks like:
1. A sequence item gets passed to the `recognize` method.
2. Internally, the `recognize` method deduces the type of that sequence item.
3. The `recognize` method looks through its `effects` (passed to the constructor option) to finds the effect that matches the deduced event type.
4. `recognize` calls that effect function, passing the Effect API (which includes the original sequence item).
5. Your effect function should extract some information from the Effect API. In most cases, this information will be extracted from `effectApi.sequenceItem`. For example: at what `x` and `y` coordinates did a `mousedown` take place? Which keyboard key was just released? According to the latest `ResizeObserver` entry, what's the new width of a certain element?
6. Your effect function can use the Effect API's `getMetadata` function to access the `Recognizeable` instance's `metadata` object. To store your extracted information, you can freely assign values to the properties of that object.
7. Based on all of the information you've gathered, your effect should make a decision: 
    - Has the custom gesture or sequence been recognized? If so, call the `recognized` function. `Recognizeable` will update its status to `recognized`.
    - Still not sure, and need to wait for more events? Do nothing—`Recognizeable` will keep its status as `recognizing`.
    - Final option: did something happen that makes your custom gesture or sequence impossible (e.g. a `mouseup` event when you're trying to recognize a drag/pan gesture)? If so, call the `denied` function to explicitly deny the sequence. `Recognizeable` will update its status to `denied`.


:::
## Using with TypeScript
:::

`Recognizeable` is designed to provide robust autocomplete and type checking, especially inside your `effects` functions, on the instance's `recognize` method, in the instance's `metadata` property.

Let's dive right into an annotated code example to see how TypeScript support works:

:::
```ts
// Pass a union type to `Recognizeable`'s first generic type
// to tell the instance what types of events it's allowed to
// recognize. Any valid `Listenable` event type is supported.
//
// Use the second generic type to define the shape of the 
// instance's `metadata` property.
type MyTypes = 'mousedown' | 'intersect' | 'message'
type MyMetadata = {
  x: number,
  y: number,
}
const instance = new Recognizeable<MyTypes, MyMetadata>(
  // This sequence will automatically have a type of:
  // (MouseEvent | IntersectionObserverEntry[] | MessageEvent)[]
  [],
  {
    effects: {
      mousedown: (sequenceItem, effectApi) => {
        // `sequenceItem` is correctly type checked and
        // autocompleted as a MouseEvent.
        console.log(sequenceItem)

        const metadata = effectApi.getMetadata()

        // TypeScript knows the shape of `metadata` here. It will
        // autocomplete `metadata` and allow you to do this
        // assignment.
        metadata.x = sequenceItem.clientX
        metadata.y = sequenceItem.clientY
      },
      intersect: (sequenceItem, effectApi) => {
        // `sequenceItem` is correctly type checked and
        // autocompleted as an array of Intersection Observer
        // entries.
        console.log(sequenceItem)
      },
      message: (sequenceItem, effectApi) => {
        // `sequenceItem` is correctly type checked and
        // autocompleted as a MessageEvent.
        console.log(sequenceItem)
      },
      // TypeScript will throw a type error here! `pointerdown`
      // is not included in the union we passed to the instance's
      // first generic type.
      pointerdown: (sequenceItem, effectApi) => {
        console.log(sequenceItem)
      },
    }
  }
)

// TypeScript will allow you to pass MouseEvents, MessageEvents,
// and IntersectionObserverEntry[] arrays to the `recognize` method.
instance.recognize(new MouseEvent('click'))
instance.recognize(new MessageEvent('message'))

// TypeScript will not allow you to pass other events.
// This will throw a type error!
instance.recognize(new TouchEvent('touchstart'))

// TypeScript knows the shape of `metadata`, and will type check
// this assignment.
const myVariable: number = instance.metadata.x
```
:::

Let's review a few key details from that code.

**The `Recognizeable` constructor accepts two generic types**. Use the first type to define which [valid `Listenable` event types](/docs/logic/classes/Listenable#valid-event-types) can be recognized by the instance. Use the second type to define the shape of `Recognizeable.metadata`.

**TypeScript reads the keys of `options.effects`** to provide great type checking for each side effect individually.

**TypeScript won't allow you to `recognize` unsupported events**. If `options.effects` isn't prepared to handle a given effect, TypeScript won't let you pass it in.

Finally, be aware that all of these same principles apply when you're using `Recognizeable` with `Listenable`, which is what you'll be doing in pretty much every use case.

Here's an annotated code example of using `Recognizeable` via `Listenable`:

:::
```ts
// Pass a union type to Listenable's first generic type
// to tell the instance what types of events it's allowed to
// listen for.
//
// Use Listenable's second generic type to define the shape of the 
// `metadata` for the Recognizeable instance that Listenable
// will construct internally.
type MyTypes = 'mousedown' | 'intersect' | 'message'
type MyMetadata = {
  x: number,
  y: number,
}
const instance = new Listenable<MyTypes, MyMetadata>(
  // Assert that the string 'recognizeable' is compatible with your
  // type union. This of course is not type safe, but it's a
  // small tradeoff that was made to simplify Listenable's inner
  // workings and public-facing API.
  'recognizeable' as MyTypes,
  {
    // Use options.recognizeable to pass your Recognizeable options
    recognizeable: {
      effects: {
        // Listenable and Recognizeable work together to provide
        // type checking for each individual side effect.
        mousedown: ...,
        intersect: ...,
        message: ...,
      }
    }
  }
)

instance.listen(() => {
  // In your Listenable.listen callbacks, you can access
  // Recognizeable metadata via your Listenable instance's
  // `recognizeable` property.
  //
  // Listenable.recognizeable.metadata will be aware of
  // the shape of your Recognizeable metadata, and it will
  // type check and autocomplete accordingly.
  const x: number = instance.recognizeable.metadata.x
})
```
:::

Again, let's review a few key details from that code.

**The `Listenable` constructor accepts two generic types**. Use the first type to define which [valid `Listenable` event types](/docs/logic/classes/Listenable#valid-event-types) can be listened to by the instance. These are also the types that the internal `Recognizeable` instance will be able to recognize. Use the second type to define the shape of `Listenable.recognizeable.metadata`.

**TypeScript reads the keys of `options.recognizeable.effects`** to provide great type checking for each side effect individually.

**Access `listenableInstance.recognizeable.metadata` from inside a `listen` callback** to get type-safe metadata about the gesture you're listening for.


:::
## API design compliance
:::

::: ariaLabel="Recognizeable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `sequence`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setSequence` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `metadata` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `recognize` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A sequence can be recognized." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
