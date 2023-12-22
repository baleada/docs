---
title: Grantable
tags: UI logic
source: true
tests: browser/Grantable.test.ts
publish: true
order: 0
---

`Grantable` is a class that enriches a [permission descriptor](https://developer.mozilla.org/en-US/docs/Web/API/Permissions/query#parameters), giving it the ability to:
- Attempt to grant its permission status
- Store its permission status
- Store an error, if one occurs
- Store a status (`ready`, `granting`, `granted`, or `errored`)


::: type="info"
`Grantable` adds very little extra functionality to the [Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions). It's intended to be a thin wrapper, simply ensuring that the Permissions API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Grantable` instance
:::

The `Grantable` constructor accepts two parameters:

::: ariaLabel="Grantable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `descriptor` | PermissionDescriptor | yes | The permission descriptor that will be made grantable. |
| `options` | Object | no | Options for the `Grantable` instance. See the [`Grantable` constructor options](#Grantable-constructor-options) section for more guidance. |
:::


:::
### `Grantable` constructor options
:::

`Grantable`'s `options` object currently does not accept any options.


:::
## State and methods
:::

::: ariaLabel="Grantable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `descriptor` | Getter/Setter | See return value | N/A | <p>The permission descriptor (PermissionDescriptor) passed to the constructor.</p><p>If you assign a value directly to `descriptor`, a setter will pass the new value to `setDescriptor`.</p> |
| `permission` | Getter | See return value | N/A | <p>The permission status (PermissionStatus) of the `Grantable` instance.</p><p>`permission` is `undefined` before the `grant` method is called, and it changes to a `PermissionStatus` object after the `grant` method is called.</p> |
| `status` | Getter | See return value | N/A | The status (String) of the `Grantable` instance. `status` is `ready` after the instance is constructed, and changes to `granting` while the `grant` method is running. It changes to `granted` after the `grant` method finishes, and it changes to `errored` if the `grant` method encounters an error. |
| `error` | Getter | See return value | N/A | `undefined` before the `grant` method is called, and an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors) object after the `grant` method is called and encounters an error. |
| `setDescriptor(descriptor)` | Function | Sets the `Grantable` instance's `descriptor` | The new `descriptor` (PermissionDescriptor) | The `Grantable` instance |
| `grant()` | Function | Queries the `Grantable` instance's permission status. | None | The `Grantable` instance |
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Grantable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Grantable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `descriptor`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setDescriptor` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `permission`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `grant` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A permission (described by a permission descriptor) can be granted." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
