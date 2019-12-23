---
title: Listenable
framework: agnostic
publish: false
order: 0
---

Listenable is a class that enriches an event type (String) by:
:::
- Giving it the methods necessary to listen for that event
- Giving it the methods necessary to remove listeners for that event
- Allowing it to retrieve a list of active listeners that have been added for that event type
:::

Listener is written in vanilla JavaScript with no external dependencies except for [Baleada Gesture](/docs/gesture) wraps a consistent API around the following tools:
:::
- [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) and [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener)
- [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver), [Resize Observer](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver), and [Mutation Observer](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) and [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback)
- A collection of custom gesture recognizers, built on top of [Baleada Gesture](/docs/gesture)
- Any custom gesture recognizer you define
:::




- intersect
- resize
- mutate
- idle
- clicks
- drag
- dragdrop
- pan
- pinch
- press
- rotate
- swipe
- taps


:::
## API design compliance
:::

::: ariaLabel="A table showing Listenable's compliance status for API design specs"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <EvaCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <EvaCheckmark /> |  |
| Takes the form of a JavaScript Object | <EvaCheckmark /> |  |
| State and methods are accessible through properties | <EvaCheckmark /> |  |
| Methods always return the instance | <EvaCheckmark /> |  |
| Stores a shallow copy of the constructor's state in a public property named after the state's type | <EvaCheckmark /> | `this.eventName`  |
| Has a public method you can use to assign a new value to each public property | <EvaCheckmark /> | `this.setEventName` |
| Outside of the methods listed above, it never writes to its own public properties. | <EvaCheckmark /> |  |
| Has one or more public getters | <EvaCheckmark /> | `this.activeListeners` |
| Has one or more public methods that expose core functionality | <EvaCheckmark /> | `listen`, `stop` |
| These methods don't create mutated state and don't have `on<Method>` functions | <EvaCheckmark /> |  |
| Has side effects that can be cleaned up with a `stop` method | <EvaCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <EvaCheckmark /> | "An event name can be listened to (by a custom gesture recognizer)" |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <EvaCheckmark /> | See options for `listen` and `stop` |
:::
