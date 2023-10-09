---
title: Storeable
tags: UI logic
source: true
publish: true
order: 0
---

`Storeable` is a class that enriches a storage key (String), allowing it to:
- Store state in [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) or [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)
- Remove itself from `localStorage` or `sessionStorage`
- Store a status (`ready`, `stored`, or `removed`) in `localStorage` or `sessionStorage`
- Remove its status from `localStorage` or `sessionStorage`

::: type="info"
`Storeable` adds very little extra functionality to the `localStorage` and `sessionStorage` APIs. It's intended to be a thin wrapper, simply ensuring that those APIs conform to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Storeable` instance
:::

The `Storeable` constructor accepts two parameters:

::: ariaLabel="Storeable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | String | yes | The key (i.e. from a key/value pair) that will be made storable. |
| `options` | Object | no | Options for the `Storeable` instance. See the [`Storeable` constructor options](#Storeable-constructor-options) section for more guidance. |
:::


:::
### `Storeable` constructor options
:::

::: ariaLabel="Storeable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `kind` | String | `local` | Indicates the kind of storage that your `Storeable` instance should use. Valid values are `local` and `session`. |
| `statusKeySuffix` | String | ` status` | <p>Indicates the suffix your `Storeable` instance should add to your `key` when generating the key used to store `status`.</p><p>See the [Access state and methods](#access-state-and-methods) table to learn more about `status`.</p> |
:::


:::
## State and methods
:::

::: ariaLabel="Storeable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `key` | Getter/Setter | See return value | N/A | <p>The `key` (String) passed to the constructor.</p><p>If you assign a value directly to `key`, a setter will pass the new value to `setKey`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Storeable` instance.</p><p>`status` is `constructing` while the instance is constructing and `ready` after it's constructed. It changes to `stored` after a value has been stored for your `key`, and it changes to `removed` after your key/value pair has been removed from storage.</p><p>`status` also gets stored in `localStorage` or `sessionStorage`. See the [How to use persistent status](#how-to-use-persistent-status) section for more guidance on this.</p> |
| `storage` | Getter | See return value | N/A | `localStorage` or `sessionStorage`, depending on what options were passed to the `Storeable` constructor. |
| `string` | Getter | See return value | N/A | The value (String) stored under your `key` in `localStorage` or `sessionStorage`. |
| `error` | Getter | See return value | N/A | `undefined` before any storage has been attempted The value (String) stored under your `key` in `localStorage` or `sessionStorage`. |
| `setKey(newKey)` | Function | Sets the `key` and updates `trie`. | The new `key` (Array) | The `Storeable` instance |
| `store(string)` | Function | Stores the `key` in `localStorage` or `sessionStorage`, along with any String you want to store as the value for your `key`. | The String you want to store. If you don't pass this parameter, `Storeable` will store `undefined` as the value for your `key`. | The `Storeable` instance |
| `remove()` | Function | Removes the `key` from `localStorage` or `sessionStorage`. | None | The `Storeable` instance |
| `removeStatus()` | Function | Removes the stored `status` from `localStorage` or `sessionStorage`. | None | The `Storeable` instance |
:::


:::
### How to use persistent status
:::

As mentioned in the table above, each `Storeable` instance stores its `status` in `localStorage` or `sessionStorage`. After the instance is constructed, `status` will be `ready`, and if the DOM is available, `status` will be stored.

The key used for your `Storeable` instance's `status` is your `key` suffixed with the `statusKeySuffix` option. For example, if the `key` is `baleada`, and the `statusKeySuffix` option is left as the default, `status` will be stored under the `baleada status` key.

Persistent status isn't quite as useful when using `sessionStorage`, but makes it particularly easy to write explicit, readable code when using `localStorage`.

Here's an example of how you could use `status` to make a decision about whether or not to apply "theme 1" or "theme 2" to a page:

:::
```js
const theme = new Storeable('theme')

switch (theme.status) {
  case 'ready':
    theme.store('theme 1') // Set "theme 1" by default
    break
  case 'stored':
    // do nothing - respect the stored theme choice
    break
}

// Add the theme to the body so that other elements can read it
// and change their styles.
document.body.dataset.theme = theme.string
```
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Storeable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Storeable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `key`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setKey` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `storage`, `string`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `store`, `remove`, `removeStatus` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A key can be stored." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
