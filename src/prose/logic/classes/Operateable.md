---
title: Operateable
source: true
tests: browser/Operateable.test.ts
publish: true
order: 0
---

`Operateable` is a class that enriches an [`IDBObjectStore`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore), allowing it to:
- Perform database operations (add, put, get, delete, etc.) in sequence
- Track the status of those operations
- Expose any error that occurs during an operation

::: type="info"
`Operateable` is designed to be used inside the `effect` callback of [`Transactable`](/docs/logic/classes/transactable)'s `transact`, `readonly`, or `readwrite` methods. `Transactable` manages the database lifecycle (opening, closing, deleting), while `Operateable` manages the work done inside a transaction.
:::


:::
## Construct an `Operateable` instance
:::

The `Operateable` constructor accepts two parameters:

::: ariaLabel="Operateable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `objectStore` | `IDBObjectStore` | yes | The object store that will be made operable. |
| `options` | Object | no | Options for the `Operateable` instance. No options are currently accepted. |
:::


:::
## State and methods
:::

::: ariaLabel="Operateable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `objectStore` | Getter/Setter | See return value | N/A | <p>The `objectStore` (`IDBObjectStore`) passed to the constructor.</p><p>If you assign a value directly to `objectStore`, a setter will pass the new value to `setObjectStore`.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Operateable` instance.</p><p>See the [Status reference](#status-reference) section for all possible values and their meanings.</p> |
| `error` | Getter | See return value | N/A | The most recent `Error` encountered, populated after `operateerrored`. |
| `setObjectStore(objectStore)` | Function | Stops all active listeners and sets a new object store. | The new `objectStore` (`IDBObjectStore`) | The `Operateable` instance |
| `operate(descriptors)` | Function | Runs a sequence of operations against the object store. | An array of `OperationDescriptor` objects. See the [Operation descriptors](#operation-descriptors) section for more guidance. | The `Operateable` instance |
| `add(descriptor)` | Function | Runs an `add` operation against the object store. | An `add` descriptor object, i.e. an `OperationDescriptor` object for the `add` operation, omitting the `operation` key. | The `Operateable` instance |
| `put(descriptor)` | Function | Runs a `put` operation against the object store. | A `put` descriptor object, i.e. an `OperationDescriptor` object for the `put` operation, omitting the `operation` key. | The `Operateable` instance |
| `get(descriptor)` | Function | Runs a `get` operation against the object store. | A `get` descriptor object, i.e. an `OperationDescriptor` object for the `get` operation, omitting the `operation` key. | The `Operateable` instance |
| `getKey(descriptor)` | Function | Runs a `getKey` operation against the object store. | A `getKey` descriptor object, i.e. an `OperationDescriptor` object for the `getKey` operation, omitting the `operation` key. | The `Operateable` instance |
| `getAll(descriptor)` | Function | Runs a `getAll` operation against the object store. | A `getAll` descriptor object, i.e. an `OperationDescriptor` object for the `getAll` operation, omitting the `operation` key. | The `Operateable` instance |
| `getAllKeys(descriptor)` | Function | Runs a `getAllKeys` operation against the object store. | A `getAllKeys` descriptor object, i.e. an `OperationDescriptor` object for the `getAllKeys` operation, omitting the `operation` key. | The `Operateable` instance |
| `getAllRecords(descriptor)` | Function | Runs a `getAllRecords` operation against the object store. | A `getAllRecords` descriptor object, i.e. an `OperationDescriptor` object for the `getAllRecords` operation, omitting the `operation` key. | The `Operateable` instance |
| `delete(descriptor)` | Function | Runs a `delete` operation against the object store. | A `delete` descriptor object, i.e. an `OperationDescriptor` object for the `delete` operation, omitting the `operation` key. | The `Operateable` instance |
| `clear(descriptor)` | Function | Runs a `clear` operation against the object store. | A `clear` descriptor object, i.e. an `OperationDescriptor` object for the `clear` operation, omitting the `operation` key. | The `Operateable` instance |
| `count(descriptor)` | Function | Runs a `count` operation against the object store. | A `count` descriptor object, i.e. an `OperationDescriptor` object for the `count` operation, omitting the `operation` key. | The `Operateable` instance |
| `openCursor(descriptor)` | Function | Runs an `openCursor` operation against the object store. | An `openCursor` descriptor object, i.e. an `OperationDescriptor` object for the `openCursor` operation, omitting the `operation` key. | The `Operateable` instance |
| `openKeyCursor(descriptor)` | Function | Runs an `openKeyCursor` operation against the object store. | An `openKeyCursor` descriptor object, i.e. an `OperationDescriptor` object for the `openKeyCursor` operation, omitting the `operation` key. | The `Operateable` instance |
| `stop()` | Function | Stops all active event listeners. | None | The `Operateable` instance |
:::


:::
### Status reference
:::

::: ariaLabel="Operateable status reference" classes="wide-2"
| Status | Description |
| --- | --- |
| `constructing` | The instance is being constructed. |
| `ready` | Construction is complete; no operations have been run yet. |
| `operating` | `operate()` has been called and operations are in progress. |
| `operated` | All operations completed successfully. |
| `operateerrored` | An operation encountered an error. |
:::


:::
### Operation descriptors
:::

`operate` accepts an array of operation descriptors (objects). Each descriptor has an `operation` property that determines which [`IDBObjectStore`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore) method is called, as well as additional properties specific to that method.

Operations run sequentially: each operation waits for the previous one to succeed before starting.

For read operations, an optional `effect` callback receives the result of the operation.

::: ariaLabel="Operation descriptors" classes="wide-2 wide-3"
| `operation` | Other properties | Description |
| --- | --- | --- |
| `add` | `value: any`, `key?: IDBValidKey` | Adds a new record. Errors if the key already exists. |
| `put` | `value: any`, `key?: IDBValidKey` | Adds or replaces a record. |
| `get` | `query: IDBValidKey \| IDBKeyRange`, `effect?: (result: any) => void` | Retrieves a record by key or key range. |
| `getKey` | `query: IDBValidKey \| IDBKeyRange`, `effect?: (result: IDBValidKey \| undefined) => void` | Retrieves the primary key of the first record matching the query. |
| `getAll` | `query?: IDBValidKey \| IDBKeyRange \| null`, `count?: number`, `effect?: (result: any[]) => void` | Retrieves all records matching the query. |
| `getAllKeys` | `query?: IDBValidKey \| IDBKeyRange \| null`, `count?: number`, `effect?: (result: IDBValidKey[]) => void` | Retrieves all primary keys matching the query. |
| `getAllRecords` | `query?: IDBValidKey \| IDBKeyRange \| null`, `count?: number`, `effect?: (result: any[]) => void` | Retrieves all records as `{ key, primaryKey, value }` objects. Experimental — browser support may vary. |
| `delete` | `query: IDBValidKey \| IDBKeyRange` | Deletes the record(s) matching the query. |
| `clear` | (none) | Deletes all records in the object store. |
| `count` | `query?: IDBValidKey \| IDBKeyRange`, `effect?: (result: number) => void` | Counts the records matching the query. |
| `openCursor` | `query?: IDBValidKey \| IDBKeyRange \| null`, `direction?: IDBCursorDirection`, `effect?: (cursor: IDBCursorWithValue \| null) => void` | Opens a cursor to iterate over records. |
| `openKeyCursor` | `query?: IDBValidKey \| IDBKeyRange \| null`, `direction?: IDBCursorDirection`, `effect?: (cursor: IDBCursor \| null) => void` | Opens a cursor to iterate over keys only. |
:::


:::
## Using with `Transactable`
:::

`Operateable` is designed to pair with [`Transactable`](/docs/logic/classes/transactable):

:::
```js
const transactable = new Transactable('baleada')

transactable.open({
  version: 1,
  upgradeEffect: db => {
    db.createObjectStore('ingredients', { keyPath: 'id' })
  },
})

// Asynchronously, transactable status will change to 'opened'.
// Later in the application's lifecycle, you can run database
// transactions, like this transaction in `readwrite` mode:
transactable.readwrite(
  // Pass a callback to perform side effects when the
  // transaction is open:
  transaction => {
    // Inside of transaction effect callbacks, construct an
    // Operateable instance around an object store:
    const operateable = new Operateable(transaction.objectStore('ingredients'))

    // Easily run sequences of database operations without
    // closing the transaction:
    operateable.operate([
      { operation: 'add', value: { id: 1, name: 'Tortilla' } },
      { operation: 'add', value: { id: 2, name: 'Beans' } },
      {
        operation: 'getAll',
        effect: ingredients => {
          console.log(ingredients)
        },
      },
    ])
    
    // Or, synchronously request individual operations, which
    // the browser will run independently and asynchronously:
    operateable.add({ value: { id: 3, name: 'Egg' } })
    operateable.openCursor({ effect: cursor => {
      // Handle database cursor
    }})
  },
  { storeNames: ['ingredients'] }
)
```
:::


:::
## Using with TypeScript
:::

`Operateable` can strongly type the values you read from and write to your object store. To get this working, use the `createDefineObjectStore` helper function:

:::
```ts
import { Operateable, createDefineObjectStore } from '@baleada/logic'

// Define a TypeScript type for your database, where the keys
// are store names and the indexed types are object schemas:
type MyDatabase = {
  ingredients: { id?: number, name: string },
  ...
}

// Create your type inference helper:
const defineObjectStore = createDefineObjectStore<MyDatabase>()

// Use your type inference helper when retrieving the object
// store that you'll pass to `Operateable`:
transactable.readwrite(
  transaction => {
    // `ingredientsObjectStore` is now strongly typed.
    // TypeScipt knows the exact shape of stored objects.
    const ingredientsObjectStore = defineObjectStore(transaction, 'ingredients')
    
    // Pass the store to `Operateable`, which will infer its type:
    const operateable = new Operateable(ingredientsObjectStore)
    
    // Now, all of Operateable's methods are type-safe:
    operateable
      .operate([
        {
          operation: 'add',
          value: {
            id: 1,
            // Type error: `title` does not exist on this type
            // (should be `name` instead)
            title: 'Tortilla'
          }
        },
      ])
      .openCursor({
        effect: cursor => {
          // Type error: `title` does not exist on this type
          // (should be `name` instead)
          console.log(cursor.value.title)
          
          // `cursor.value.name` is strongly typed as `string`
          console.log(cursor.value.name)
        }
      })
  },
  { storeNames: ['ingredients'] }
)
````
:::

:::
## API design compliance
:::

::: ariaLabel="Operateable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state, and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> | The `IDBObjectStore` is passed in; no DOM access occurs during construction. |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `objectStore` |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setObjectStore` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `error` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `operate`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "An object store can be operated on." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
