---
title: Resolveable
tags: UI logic
source: true
tests: node/Resolveable.test.ts
publish: true
order: 0
---

`Resolveable` is a class that enriches a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise), allowing it to:
- Asynchronously resolve itself
- Store the response or error
- Store a status (`ready`, `resolving`, `resolved`, or `errored`)

::: type="info"
`Resolveable` adds very little extra functionality to native Promises. It's intended to be a thin wrapper, simply ensuring that Promises conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Resolveable` instance
:::

The `Resolveable` constructor accepts two parameters:

::: ariaLabel="Resolveable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `getPromise` | Function | yes | A function that returns the Promise that will be made resolvable. |
| `options` | Object | no | Options for the `Resolveable` instance. See the [`Resolveable` constructor options](#Resolveable-constructor-options) section for more guidance. |
:::


:::
### `Resolveable` constructor options
:::

`Resolveable`'s `options` object currently does not accept any options.


:::
## State and methods
:::

::: ariaLabel="Resolveable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `getPromise` | Getter/Setter | See return value | N/A | <p>The `getPromise` function passed to the constructor.</p><p>If you assign a value directly to `getPromise`, a setter will pass the new value to `setGetPromise`.</p> |
| `status` | Getter | See return value | N/A | The status (String) of the promise-resolving process. See the [How methods affect status](#how-methods-affect-status) section for more information. |
| `value` | Getter | See return value | N/A | The the value resolved from the Promise after calling the `resolve` method. |
| `error` | Getter | See return value | N/A | The error thrown after unsuccessfully calling the `resolve` method. |
| `setGetPromise(newGetPromise)` | Function | Sets `getPromise` | The new `getPromise` (Array) | The `Resolveable` instance |
| `resolve()` | Function | Asynchronously resolves the Promise, updating `value` when done. | None | The `Resolveable` instance |
:::


:::
## Using with TypeScript
:::

The `Resolveable` constructor accepts one generic type that you can use to enforce a type for the resolved Promise value. By default, TypeScript will infer the type from the initial state you pass to the constructor, but you can specify the type manually if needed.

:::
```ts
const withInferredTypes = new Resolveable(async () => await 0)
withInferredTypes.getPromise = async () => await 'baleada' // Type error

const withManualTypes = new Resolveable<string | number>(async () => await 0)
withManualTypes.getPromise = async () => await 'baleada' // No type error
```
:::


:::
## API design compliance
:::

::: ariaLabel="Resolveable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> | The `options` object doesn't currently have any valid properties. |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `getPromise`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setGetPromise` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `response`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `resolve` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A Promise (retrieved by a Promise getter) can be resolved." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
