---
title: Fetchable
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

`Fetchable` is a class that enriches a resource (i.e. a URL), allowing it to:
- Asynchronously fetch itself
- Store the response and the response JSON
- Store the status of both the response fetching process and the response JSON updating process

`Fetchable` is written in vanilla JS with no dependencies.

::: type="info"
`Fetchable` adds very little extra functionality to the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) web API. It's mostly intended to be a thin wrapper, simply ensuring that the `fetch` API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Fetchable` instance
:::

To construct a `Fetchable` instance (Object), use the `Fetchable` constructor, which takes two parameters:

::: ariaLabel="Fetchable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | String | yes | The URL of a resource that will be made fetchable. |
| `options` | Object | no | Passes options for the `Fetchable` instance. See the [`Fetchable` constructor options](#Fetchable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Fetchable(resource[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
const reactiveInstance = useFetchable(resource[, options])
```
:::


:::
### `Fetchable` constructor options
:::

`Fetchable`'s `options` object currently does not accept any options.


:::
## Access state and methods
:::

The constructed `Fetchable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Fetchable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `resource` | Getter/Setter | See return value | N/A | <p>The `resource` string passed to the constructor.</p><p>If you assign a value directly to `resource`, a setter will pass the new value to `setResource`.</p> |
| `status` | Getter | See return value | N/A | <p>An object with two properties: `response` and `responseJson`.</p><p>The value of `status.response` is the status (String) of the response-fetching process, and the value of `status.responseJson` is the status (String) of the updating process for the `responseJson` property.</p><p>See the [How methods affect status](#how-methods-affect-status) section for more information.</p> |
| `response` | Getter | See return value | N/A | An empty object `{}` before calling the `fetch` method, and a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object after calling the `fetch` method. |
| `responseJson` | Getter | See return value | N/A | An empty object `{}` before calling the `fetch` method, and a JSON representation (retrieved asynchronously) of the body of the `response` after calling the `fetch` method (assuming the resource was fetched successfully).  |
| `setResource(newResource)` | Function | Sets the `resource` | The new `resource` (Array) | The `Fetchable` instance |
| `fetch(options)` | Function | Asynchronously fetches the resource using the [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch) web API. Can't be called until the DOM is available. | <p>An options object.</p><p>Valid options include anything you would pass to the [`fetch` function's `init` object](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch), e.g. `method` and `headers`.</p> | The `Fetchable` instance |
:::


:::
### How methods affect status
:::

Each `Fetchable` instance maintains a `status` property that keeps you informed of what's going on internally. As mentioned above, the value of `status` is an object with a `response` property and a `responseJson` property.

Immediately after the instance is constructed, `status.response` and `status.responseJson` both have a value of `ready`. After you call the `fetch` method, those status will change. Here's a breakdown:

::: ariaLabel="How Fetchable statuses change" classes="wide-2"
| Status property | How it changes after fetching |
| --- | --- |
| `response` | <p>Immediately after the `fetch` method is called, `status.response` will be `fetching`.</p><p>After the resource has been fetched (successfully or unsuccessfully), `status.response` will change to `fetched`, and the `Fetchable` instance will then update its `response` property.</p> |
| `responseJson` | <p>Immediately after the `response` is updated, the `Fetchable` instance will change `status.responseJson` to `updating` and start updating the `responseJson` property.</p><p>After the `responseJson` property has been updated successfully, `status.responseJson` will change to `updated`.</p><p>If there is an error during the process of updating the `responseJson`, `status.responseJson` will change to `errored` instead of `updated`.</p> |
:::

::: type="info"
All methods always return the `Fetchable` instance (i.e. `this`), regardless of `status`.
:::


:::
## API design compliance
:::

::: ariaLabel="A table showing Fetchable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <ApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <ApiDesignSpecCheckmark /> | The `options` object doesn't currently have any valid properties. |
| Constructor does not access the DOM | <ApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <ApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <ApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <ApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <ApiDesignSpecCheckmark /> | `resource`  |
| Has a public method you can use to set a new value for that public getter | <ApiDesignSpecCheckmark /> | `setResource` |
| Has a setter for that getter so you can assign a new value directly | <ApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <ApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <ApiDesignSpecCheckmark /> | `status`, `response`, `responseJson` |
| Has one or more public methods that expose core functionality | <ApiDesignSpecCheckmark /> | `fetch` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <ApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <ApiDesignSpecCheckmark /> | "A resource can be fetched." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <ApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <ApiDesignSpecCheckmark /> | |
:::

