---
title: Delayable
source: true
publish: true
order: 0
---

`Delayable` is a class that enriches a function, allowing it to:
- Be called after a certain number of milliseconds, on an infinite loop OR until a user-specified number of executions has been reached
- Store the number of times the function has been executed
- Store time data:
  - Timestamps for each execution
  - Total time elapsed since starting the delay
  - Time elapsed since the last execution
  - Total time remaining until all executions are complete
  - Time remaining until the next execution
- Store a status (`ready`, `delaying`, or `delayed`)

In other words, `Delayable` implements all the main features of [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/window/setTimeout) and [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/setInterval), then exposes data that describes the active timeout or interval.


## Caveat when using `Delayable` in inactive tabs

Notably, `Delayable` doesn't actually use `setTimeout` or `setInterval` under the hood. Instead, it depends on [`Animateable`](/docs/logic/classes/Animateable), which uses [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) (among other dependencies) internally.

Because of this, your `Delayable` delays will pause when the tab is inactive (i.e. when users switch to a different tab), and will resume when the tab is active again (i.e. when users return to your tab).

This is different than the behavior you would get from `setTimeout` and `setInterval`—browsers typically (and inconsistently) throttle those timers when the tab is inactive, rather than pausing and resuming them via `requestAnimationFrame`.

So, just be aware: even though `Delayable`'s API is designed to replace the `setTimeout` and `setInterval` APIs, it does work differently under the hood.


:::
## Construct a `Delayable` instance
:::

The `Delayable` constructor accepts two parameters:

::: ariaLabel="Delayable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `effect` | Function | yes | <p>Passes the callback function that will be made delayable.</p><p>Your `effect` will receive a `timestamp` argument ([DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)) indicating the time since time origin.</p> |
| `options` | Object | no | Options for the `Delayable` instance. See the [`Delayable` constructor options](#Delayable-constructor-options) section for more guidance. |
:::


:::
### `Delayable` constructor options
:::

::: ariaLabel="Delayable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `delay` | Number | `0` | The number of milliseconds that should pass before each execution of the `effect` |
| `executions` | Number, Boolean | `1` | <p>Indicates the number of times the callback function will be delayed and executed.</p><p>Set `executions` to `1` to make it behave like `setTimeout`, set it to any number greater than `1` to make it delay and execute a specific number of times, and set it to `true` to make it behave like `setInterval` (i.e. delay and execute on an infinite loop).</p> |
:::


:::
## State and methods
:::

::: ariaLabel="Delayable state and methods" classes="wide-3 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `effect` | Getter/Setter | See return value | N/A | <p>A slightly altered version of the `effect` you passed to the Delayable constructor. The altered `effect` will execute repeatedly at a rate of 60fps, and it won't call your original function until your number of milliseconds (specified in the `delay` option) have passed.</p><p>If you assign a value directly to `effect`, a setter will pass the new value to `setEffect`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Delayable` instance. See the [How methods affect status, and vice-versa](#how-methods-affect-status-and-vice-versa) section for more information. |
| `executions` | Getter | See return value | N/A | The number (Number) of times your original `effect` has been executed. |
| `time` | Getter | See return value | N/A | An Object with two keys: `elapsed` and `remaining`. Both keys' values are millsecond values (Number), and they indicate the time elapsed since the last execution of the `effect` and the time remaining until the next execution. |
| `progress` | Getter | See return value | N/A | A number (Number) between `0` and `1` indicating the time progress toward the next execution of the `effect`. |
| `setEffect(effect)` | Function | Sets the `effect` | A callback function, which itself can accept the `timestamp` parameter (see the [Construct a Delayable instance](#construct-a-delayable-instance) section for a refresher on that parameter). | The `Delayable` instance |
| `delay()` | Function | <p>Delays the execution(s) of the `effect`.</p><p>If you call `delay` while the `effect` is currently being delayed, it will start over from the beginning (and reset `executions`, `time.elapsed`, and `progress` to `0`).</p><p>Can't be called until the DOM is available.</p> | none | The `Delayable` instance |
| `pause()` | Function | Pauses the delay Can't be called until the DOM is available. | none | The `Delayable` instance |
| `seek(progress)` | Function | <p>Seeks to a specific time progress in the delay. If `status` is `playing` or `reversing`, the animation will continue progressing in the same direction after seeking to the time progress.</p><p>If your `effect` is supposed to execute more than one time, you can pass a time progress that is greater than `1` to seek to a specific execution. For example, to seek halfway through the third delay, you can call `seek(2.5)`. Your `effect` will instantly be executed twice, and will be halfway toward the third execution.</p><p>Can't be called until the DOM is available.</p> | `seek` Accepts one parameter: a time progress to seek to | The `Delayable` instance. |
| `resume()` | Function | After pausing or seeking, resumes the delay from the current time progress. Has no effect if `status` is anything other than `paused` or `sought`. Can't be called until the DOM is available. | none | The `Delayable` instance |
| `stop()` | Function | Cancels the delay, stopping it in its tracks and cleaning up side effects. Can't be called until the DOM is available. | None | The `Delayable` instance. |
:::


:::
### How methods affect status, and vice-versa
:::

Each `Delayable` instance maintains a `status` property that allows it to take appropriate action based on the methods you call, in what order you call them, and when you call them.

At any given time, `status` will always be one (and only one) of the following values:
- `ready`
- `delaying`
- `delayed`
- `paused`
- `sought`
- `stopped`

There's a lot of complexity involved in the way each `status` is achieved (it's affected by which methods you call,in what order you call them, and exactly when you call them), but you likely will never need to worry about that. `status` is available to you if you feel you need it, but for all intended use cases, it's an implementation detail, and you can ignore it.

The only thing you may want to be aware of is how `status` affects your ability to call certain methods—some methods can be called at any time, and some can only be called when `status` has a specific value.

The table below has a full breakdown:

::: ariaLabel="How status affects methods"
| Method | Can be called when `status` is... |
| --- | --- |
| `setEffect` | Anything |
| `delay` | Anything |
| `pause` | `delaying` |
| `seek` | Anything |
| `resume` | `paused` or `sought` |
| `stop` | Anything |
:::

Or, just remember:
- If you `delay` while the animation is already delaying, the delay will start over from the beginning (and reset `executions`, `time.elapsed`, and `progress` to `0`).
- You can only `pause` while the delay process is in progress
- You can `setEffect`, `seek`, and `stop` at any time. Just remember that `setEffect` will always `stop` the delay, and if you call `seek` while a delay is progressing, the animation will continue delaying after it seeks to the time progress you specified.
- You can only `resume` after calling `pause` or `seek`

::: type="info"
If you call a method when it's not supposed to be called, it won't cause any errors, it will simply have no effect on the delay.
:::

::: type="info"
All methods always return the `Delayable` instance (i.e. `this`), regardless of `status`.
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Delayable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Delayable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `effect`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setEffect` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `executions`, `time`, `progress` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `delay`, `pause`, `seek`, `resume`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A callback can be delayed." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
