---
title: Fullscreenable
tags: UI logic
source: true
tests: browser/Fullscreenable.test.ts
publish: true
order: 0
---

`Fullscreenable` is a class that enriches an element, allowing it to:
- Asynchronously enter and exit full screen
- Store a status (`ready`, `fullscreened`, `exited`, or `errored`)
- Store any error that gets thrown while entering or exiting full screen

::: type="info"
`Fullscreenable` adds very little extra functionality to the [Fullscreen API](https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API). It's intended to be a thin wrapper, simply ensuring that the Fullscreen API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Fullscreenable` instance
:::

The `Fullscreenable` constructor accepts two parameters:

::: ariaLabel="Fullscreenable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `getElement` | Function | yes | A function that, when called, will return the element that will be made fullscreenable. |
| `options` | Object | no | Options for the `Fullscreenable` instance. See the [`Fullscreenable` constructor options](#Fullscreenable-constructor-options) section for more guidance. |
:::


:::
### `Fullscreenable` constructor options
:::

`Fullscreenable`'s `options` object currently does not accept any options.


:::
## State and methods
:::

::: ariaLabel="Fullscreenable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `getElement` | Getter/Setter | See return value | N/A | <p>A copy of the `getElement` function passed to the constructor.</p><p>If you assign a value directly to `getElement`, a setter will pass the new value to `setGetElement`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Fullscreenable` instance. See the [How methods affect status](#how-methods-affect-status) section for more information. |
| `element` | Getter | See return value | N/A | The element returned by the `getElement`. Can't be accessed until the DOM is available. |
| `error` | Getter | See return value | N/A | `undefined` before the `fullscreen` or `exit` methods throw an error, and the error (Error) after any error is thrown. |
| `setGetElement(newGetElement)` | Function | Sets the `getElement` | The new `getElement` (Array) | The `Fullscreenable` instance |
| `fullscreen()` | Function | Asynchronously fullscreens the `element`. | none | The `Fullscreenable` instance |
| `enter()` | Function | An alias for `fullscreen`. | none | The `Fullscreenable` instance |
| `exit()` | Function | Asynchronously exits fullscreen. | none | The `Fullscreenable` instance |
:::


:::
### How methods affect status
:::

Each `Fullscreenable` instance maintains a `status` property that keeps you informed of what's going on internally. As mentioned above, the value of `status` is a string, and that string can be one of the following:
- `ready`
- `fullscreened`
- `exited`
- `errored`

`Fullscreenable`'s status is pretty easy to predict:
- After the instance is constructed, `status` will be `ready`.
- When the `fullscreen` or `enter` methods are called, `status` will be `fullscreened` if the method is successful and `errored` if it isn't.
- When the `exit` method is called, `status` will be `exited` if the method is successful and `errored` if it isn't.


:::
## Using with TypeScript
:::

The `Fullscreenable` constructor accepts one generic type that you can use to enforce a type for the element returned by `getElement`. By default, TypeScript will infer the element type from the initial `getElement` function you pass to the constructor, but you can specify the type manually if needed.

:::
```ts
const withInferredTypes = new Fullscreenable(() => document.querySelector('button'))
withInferredTypes.getElement = () => document.querySelector('input') // Type error

const withManualTypes = new Fullscreenable<HTMLInputElement | HTMLButtonElement>(() => document.querySelector('button'))
withManualTypes.getElement = () => document.querySelector('input') // No type error
```
:::


:::
## API design compliance
:::

::: ariaLabel="Fullscreenable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> | The `options` object doesn't currently have any valid properties. |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `getElement`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setGetElement` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `element`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `fullscreen`, `enter`, `exit` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "An element (retrieved by an element getter) can be fullscreened." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::

