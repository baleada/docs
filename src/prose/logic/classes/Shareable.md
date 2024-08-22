---
title: Shareable
source: true
tests: browser/Shareable.test.ts
publish: true
order: 0
---


The `Shareable` class enhances [share data](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#parameters), allowing it to:
- Determine whether or not the data can be shared with the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API)
- Share the data using the Web Share API, if possible
- Store any error that might happen while trying to share data
- Store a status ('ready', 'sharing', 'shared', or 'errored')


::: type="info"
`Shareable` adds very little extra functionality to the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API). It's intended to be a thin wrapper, simply ensuring that the Web Share API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Shareable` instance
:::

The `Shareable` constructor accepts two parameters:

::: ariaLabel="Shareable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `shareData` | [ShareData](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/share#parameters) | yes | The shareData that will be made shareable. |
| `options` | Object | no | Options for the `Shareable` instance. See the [`Shareable` constructor options](#Shareable-constructor-options) section for more guidance. |
:::


:::
### `Shareable` constructor options
:::

`Shareable`'s `options` object currently does not accept any options.


:::
## State and methods
:::

::: ariaLabel="Shareable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `shareData` | Getter/Setter | See return value | N/A | <p>The shareData passed to the constructor.</p><p>If you assign a value directly to `shareData`, a setter will pass the new value to `setShareData`.</p> |
| `status` | Getter | See return value | N/A | The status (String) of the `Shareable` instance. `status` is `ready` after the instance is constructed, `sharing` immediately after the `share` method is called, and `shared` after the `share` method finishes. `status` can also be `errored` if there is an error during the `share` operation. |
| `can` | Getter | See return value | N/A | <p>A [`Resolveable`](/docs/logic/classes/resolveable) instance. Call `shareableInstance.can.resolve()` to asynchronously check whether `shareData` can be shared.</p><p>When `shareableInstance.can.status` changes to `resolved`, you can check `shareableInstance.can.value` to read the result of the check.</p> |
| `error` | Getter | See return value | N/A | <p>The error that was thrown during the last share operation, when applicable.</p> |
| `setShareData(shareData)` | Function | Sets the `Shareable` instance's `shareData`, and updates `can` with a new `Resolveable` instance | The new `shareData` (ShareData) | The `Shareable` instance |
| `share()` | Function | Shares the `Shareable` instance's `shareData` | None | The `Shareable` instance |
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Shareable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Shareable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> | The `options` object doesn't currently have any valid properties. |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `shareData`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setShareData` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `can`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `share` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "Share data can be shared." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
