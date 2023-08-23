---
title: Copyable
tags: UI logic
publish: true
order: 0
---

`Copyable` is a class that enriches a string, allowing it to:
- Be copied to the clipboard
- Store its status (`ready`, `copying`, `copied`, or `errored`)
- Tell you whether it matches the current clipboard text


::: type="info"
`Copyable` adds very little extra functionality to the [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) web API. It's intended to be a thin wrapper, simply ensuring that the Clipboard API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Copyable` instance
:::

To construct a `Copyable` instance, use the `Copyable` constructor, which accepts two parameters:

::: ariaLabel="Copyable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `string` | String | yes | The string that will be made copyable. |
| `options` | Object | no | Passes options for the `Copyable` instance. See the [`Copyable` constructor options](#Copyable-constructor-options) section for more guidance. |
:::


:::
### `Copyable` constructor options
:::

`Copyable` currently does not accept any options, only any empty options object.


:::
## State and methods
:::

::: ariaLabel="Copyable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `string` | Getter/Setter | See return value | N/A | <p>The `string` passed to the constructor.</p><p>If you assign a value directly to `string`, a setter will pass the new value to `setString`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Copyable` instance. `status` is `ready` after the instance is constructed, `copying` immediately after the `copy` method is called, and `copied` after the `string` has been successfully copied. `status` can also be `errored` if there is an error during the `copy` operation. |
| `isClipboardText` | Getter | See return value | N/A | <p>A Boolean that indicates whether or not the `string` currently matches the users clipboard text.</p> | `setString(string)` | Function | Sets the `string` | The new `string` (String) | The `Copyable` instance |
| `copy(options)` | Function | <p>Copies the string.</p><p>For more guidance on the `copy` method, see the [How to copy text](#how-to-copy-text) section.</p> | An options object, as explained in the [How to copy text](#how-to-copy-text) section. | The `Copyable` instance |
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Copyable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Copyable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `string`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setString` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `isClipboardText` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `copy` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A string can be copied." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::

