---
title: Broadcastable
tags: UI Logic
source: true
publish: true
order: 0
---

`Broadcastable` is a class that enriches application state, allowing it to:
- Broadcast itself
- Store the `BroadcastChannel` instance used for broadcasting

::: type="info"
`Broadcastable` adds very little extra functionality to the [`BroadcastChannel`](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API) web API. It's intended to be a thin wrapper, simply ensuring that it conforms to all of Baleada Logic's API design specs and naming conventions.
:::

:::
## Construct a `Broadcastable` instance
:::

To construct a `Broadcastable` instance, use the `Broadcastable` constructor, which accepts two parameters:

::: ariaLabel="Broadcastable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | any | yes | <p>Passes the state that will be made broadcastable.</p><p>`state` can be [any type supported by the structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#supported_types).</p> |
| `options` | Object | no | Passes options for the `Broadcastable` instance. See the [Broadcastable constructor options](#Broadcastable-constructor-options) section for more guidance. |
:::


:::
### `Broadcastable` constructor options
:::

::: ariaLabel="Broadcastable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `name` | String | `baleada` | Sets the name of the `BroadcastChannel` instance that `Broadcastable` uses to send messages. |
:::


:::
## State and methods
:::

::: ariaLabel="Broadcastable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `state` | Getter/Setter | See return value | N/A | <p>The state passed to the `Broadcastable` constructor.</p><p>If you assign a value directly to `state`, a setter will pass the new value to `setState`.</p> |
| `status` | Getter | See return value | N/A | <p>The status of the `Broadcastable` instance.</p><p>One of `'ready'`, `'broadcasting'`, `'broadcasted'`, `'errored'`, or `'stopped'`.</p> |
| `channel` | Getter | See return value | N/A | <p>The `BroadcastChannel` instance that `Broadcastable` uses to send messages.</p> |
| `error` | Getter | See return value | N/A | <p>The error that was thrown during the last broadcast operation, when applicable.</p> |
| `setState(newState)` | Function | Sets the `Broadcastable` instance's `state` | The new `state` | The `Broadcastable` instance (`this`) |
| `broadcast()` | Function | Broadcasts the `Broadcastable` instance's `state` | N/A | The `Broadcastable` instance (`this`) |
| `stop()` | Function | Closes the `BroadcastChannel` instance that `Broadcastable` uses to send messages | N/A | The `Broadcastable` instance (`this`) |
:::


:::
## Using with `Listenable`
:::

`Broadcastable` is designed to work seamlessly with [`Listenable`](/docs/logic/classes/Listenable).

To listen for messages:
1. Construct your `Listenable` instance, passing `message` as the event type.
2. Use the `toMessageListenParams` function exported from Baleada Logic to easily format your `Broadcastable` instance and your `onMessage` callback into parameters for `Listenable`'s `listen` method.

:::
```ts
import {
  Listenable,
  Broadcastable,
  toMessageListenParams,
} from '@baleada/logic'

const broadcastable = new Broadcastable('hello world'),
      message = new Listenable('message')

message.listen(...toMessageListenParams(
  broadcastable,
  event => {
    console.log(event)
  }
))
```
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Broadcastable` with TypeScript 🚀



:::
## API design compliance
:::

::: ariaLabel="Broadcastable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `state`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setState` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `channel`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `broadcast`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "State can be broadcasted." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
