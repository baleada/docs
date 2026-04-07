---
title: Transactable
source: true
tests: browser/Transactable.test.ts
publish: true
order: 0
---

`Transactable` is a class that enriches a database name (String), allowing it to:
- Open an [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) database
- Run transactions against an IndexedDB database
- Close an IndexedDB database connection
- Delete an IndexedDB database


:::
## Construct a `Transactable` instance
:::

The `Transactable` constructor accepts two parameters:

::: ariaLabel="Transactable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | String | yes | The name of the IndexedDB database to be made transactable. |
| `options` | Object | no | Options for the `Transactable` instance. No options are currently accepted. |
:::


:::
## State and methods
:::

::: ariaLabel="Transactable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `name` | Getter/Setter | See return value | N/A | <p>The `name` (String) passed to the constructor.</p><p>If you assign a value directly to `name`, a setter will pass the new value to `setName`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Transactable` instance.</p><p>See the [Status reference](#status-reference) section for all possible values and their meanings.</p> |
| `db` | Getter | See return value | N/A | The `IDBDatabase` instance. Available after the database has been opened. |
| `transaction` | Getter | See return value | N/A | The current `IDBTransaction` instance. Available while a transaction is in progress via `transact`. |
| `error` | Getter | See return value | N/A | The most recent `Error` encountered, populated after `openerrored`, `transacterrored`, or `deleteerrored`. |
| `setName(newName)` | Function | Stops all active listeners and sets a new database name. | The new `name` (String) | The `Transactable` instance |
| `open(options)` | Function | Opens the IndexedDB database. See the [`open` options](#open-options) section. | See below | The `Transactable` instance |
| `transact(effect, options)` | Function | Runs a transaction against the open database. See the [`transact` options](#transact-options) section. | See below | The `Transactable` instance |
| `readonly(effect, options)` | Function | Shorthand for `transact(...)` with `mode: 'readonly'`. | Same as `transact`, except `mode` is not accepted. | The `Transactable` instance |
| `readwrite(effect, options)` | Function | Shorthand for `transact(...)` with `mode: 'readwrite'`. | Same as `transact`, except `mode` is not accepted. | The `Transactable` instance |
| `versionchange(effect, options)` | Function | Shorthand for `transact(...)` with `mode: 'versionchange'`. | Same as `transact`, except `mode` is not accepted. | The `Transactable` instance |
| `close()` | Function | Closes the IndexedDB database connection. | None | The `Transactable` instance |
| `delete()` | Function | Deletes the IndexedDB database. | None | The `Transactable` instance |
| `stop()` | Function | Closes the database and stops any active event listeners. | None | The `Transactable` instance |
:::


:::
### `open` options
:::

::: ariaLabel="open options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `version` | Number | undefined | The version of the IndexedDB database to open. If omitted, the browser uses the existing version (or 1 for a new database). |
| `upgrade` | Function | undefined | A callback `(db: IDBDatabase) => void` called when the database needs to be upgraded (i.e., when `upgradeneeded` fires). Use this to create or modify object stores and indexes. |
:::


:::
### `transact` options
:::

::: ariaLabel="transact options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `storeNames` | String or String[] | `[]` | The name(s) of the object store(s) to include in the transaction. |
| `mode` | String | `'readonly'` | The transaction mode. Valid values are `'readonly'`, `'readwrite'`, and `'versionchange'`. |
| `durability` | String | undefined | The durability hint for the transaction. Passed directly to `IDBDatabase.transaction`. |
:::


:::
### Status reference
:::

::: ariaLabel="Transactable status reference" classes="wide-2"
| Status | Description |
| --- | --- |
| `constructing` | The instance is being constructed. |
| `ready` | Construction is complete; no database has been opened yet. |
| `opening` | `open()` has been called and the database is opening. |
| `opened` | The database has been successfully opened. |
| `openblocked` | The open request was blocked by an existing connection. |
| `openerrored` | The open request encountered an error. |
| `upgradeneeded` | The database requires a version upgrade. The `upgrade` callback runs during this phase, after which status transitions to `opened`. |
| `closing` | `close()` has been called and the database is closing. |
| `closed` | The database connection has been closed. |
| `transacting` | `transact()` has been called and the transaction is in progress. |
| `transacted` | The transaction completed successfully. |
| `transacterrored` | The transaction encountered an error. |
| `transactaborted` | The transaction was aborted. |
| `deleting` | `delete()` has been called and the database is being deleted. |
| `deleteerrored` | The deletion request encountered an error. |
| `deleted` | The database has been successfully deleted. |
:::


:::
## Using with TypeScript
:::

`Transactable` exports the following TypeScript types:

:::
```ts
import type {
  TransactableOptions,
  TransactableStatus,
  TransactEffect,
  OpenOptions,
  TransactOptions,
} from '@baleada/logic'
```
:::


:::
## API design compliance
:::

::: ariaLabel="Transactable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> | IndexedDB is not accessed until `open()` is called. |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `name` |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setName` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `db`, `transaction`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `open`, `transact`, `readonly`, `readwrite`, `versionchange`, `close`, `delete`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A name can be transacted." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
