---
title: Syncable
framework: agnostic
publish: true
order: 0
---


Syncable is a library that enriches a piece of state by:
- Allowing it to infer its data type
- Allowing it to extract an editable version of itself, based on its data type
- Giving it the methods necessary to handle different kinds of edits (write, overwrite, full delete, partial delete, cancel &amp; revert to previous value, etc.)

Syncable is written in vanilla JS with no dependencies.

<NiftyHeading level="2">
Construct a Syncable instance
</NiftyHeading>

To construct a Syncable instance (Object), use the Syncable constructor, which takes two parameters:

<NiftyTable>

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | any | yep | Passes the state that will be made syncable. |
| `options` | Object | nope | Passes options for the Syncable instance. See the <NuxtLink to="#Syncable-constructor-options">Syncable constructor options</NuxtLink> section for more guidance. |

</NiftyTable>


<NiftyCodeblock>
```js
const instance = new Syncable(state[, options])
```
</NiftyCodeblock>

<NiftyTable>

| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `type` | String | none | <p>Tells the Syncable instance what data type your state is. If you don't pass this option, the Syncable instance will infer the data type based on the state passed to the constructor.</p><NiftyAside type="warning">You should pass the `type` option any time your original state is not the same type as the state that will be written—for example, when you're using Syncable to sync a Date, a File, or a FileList, but your store's placeholder value is a String or an empty Object.</NiftyAside><NiftyAside type="info"><p>You can pass any String as the <code>type</code> option, or you can pick from one of the following intended types:</p><ul><li>`'array'`</li><li>`'boolean'`</li><li>`'date'`</li><li>`'file'`</li><li>`'filelist'`</li><li>`'map'`</li><li>`'number'`</li><li>`'object'`</li><li>`'string'`</li></ul></NiftyAside> | N/A | N/A |
| `editsFullArray` | Boolean | `true` | <p>Only has an effect when the state passed to the constructor is an Array.</p><p>`true` when the Syncable instance will be writing/erasing the full array, `false` when the instance will be writing/erasing individual items in the array.</p><p>See the <NuxtLink to="#How-Syncable-edits-state">How Syncable edits state</NuxtLink> section for more guidance.</p> | N/A | N/A |
| `onSync(newState, instance)` | Function | <p>See the <NuxtLink to="#How-Syncable-edits-state">How Syncable edits state</NuxtLink> section for more guidance.</p> | <p>Called by the Syncable instance after either writing or erasing state.</p><p>For more guidance, see the <NuxtLink to="#How-Syncable-edits-state">How Syncable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Syncable instance (Object) | N/A |
| `onWrite(newState, instance)` | Function | none | <p>Called by the Syncable instance after writing state.</p><p>For more guidance, see the <NuxtLink to="#How-Syncable-edits-state">How Syncable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Syncable instance (Object) | N/A |
| `onErase(newState, instance)` | Function | none | <p>Called by the Syncable instance after erasing state.</p><p>For more guidance, see the <NuxtLink to="#How-Syncable-edits-state">How Syncable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Syncable instance (Object) | N/A |

</NiftyTable>

<NiftyHeading level="2">
Access state and methods
</NiftyHeading>

The constructed Syncable instance is an Object, and state and methods can be accessed via its properties:


<NiftyTable>

| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `state` | any | A shallow copy of the state passed to the Syncable constructor | N/A | N/A |
| `editableState` | any | An editable version of `state`. See the <NuxtLink to="#How-Syncable-extracts-an-editable-version-of-its-state">How Syncable extracts an editable version of its state</NuxtLink> section for more information. | N/A | N/A |
| `type` | Getter | See return value | N/A | The Syncable instance's inferred data type (String) |
| `setState(newState)` | Function | Sets the Syncable instance's `state` | The new `state` (any) | The Syncable instance (`this`) |
| `setEditableState(newEditableState)` | Function | Sets the Syncable instance's `editableState` | The new `editableState` (any) | The Syncable instance (`this`) |
| `cancel()` | Function | <p>Resets `editableState` to the initial value extracted from `state`.</p><NiftyAside type="info">`cancel` does not trigger the Syncable instance to call your `onSync`, `onWrite`, or `onErase` functions.</NiftyAside> | none | The Syncable instance (`this`) |
| `write(options)` | Function | <p>Writes `editableState` to `state`.</p><p>The exact write behavior depends on `type`, the `editsFullArray` option, and the `write` function's `options` parameter. See the <NuxtLink to="#How-Syncable-writes-state">How Syncable writes state</NuxtLink> section for more guidance.</p> | <p>An `options` object.</p><p>See the <NuxtLink to="#How-Syncable-writes-state">How Syncable writes state</NuxtLink> section for more guidance.</p> | The Syncable instance (`this`) |
| `erase(options)` | Function | <p>Erases `state`.</p><p>The exact erase behavior depends on `type`, the `editsFullArray` option, and the `erase` function's `options` parameter. See the <NuxtLink to="#How-Syncable-erases-state">How Syncable erases state</NuxtLink> section for more guidance.</p> | <p>An `options` object.</p><p>See the <NuxtLink to="#How-Syncable-erases-state">How Syncable erases state</NuxtLink> section for more guidance.</p> | The Syncable instance (`this`) |

</NiftyTable>


<NiftyHeading level="3">
How Syncable extracts an editable version of its state
</NiftyHeading>

Syncable follows this logic to extract an editable version of its state:
- If `type` is not `'array'`, `editableState` is a shallow copy of `state`
- Otherwise:
  - If `editsFullArray` is `true`, `editableState` is a shallow copy of `state`
  - Otherwise, `editableState` is an empty string


<NiftyHeading level="3">
How Syncable edits state
</NiftyHeading>

In general, whenever the `write` or `erase` methods are called, the Syncable instance creates an edited version of its original state, then calls your `onSync` function, passing the edited state as the first argument and itself (i.e. `this`) as the second argument.

The default `onSync` function, shown below, sets `state` to the edited state each time you call one of the editing methods:

<NiftyCodeblock>

```js
/*
 * Default onSync function for Syncable 
 */
(newState, instance) => instance.setState(newState)
```

</NiftyCodeblock>

Immediately afterward, the Syncable instance will also call your `onWrite` or `onErase` functions, depending on which method you called. `onWrite` and `onErase` also receive the edited state as the first argument and the Syncable instance (i.e. `this`) as the second argument.

The edited state is created differently depending on whether you call `write` or `erase`; keep reading for more guidance.


<NiftyHeading level="4">
How Syncable writes state
</NiftyHeading>

The way Syncable writes state varies based on your `editsFullArray` option, the instance's `type` property, and the `options` object passed by you as the `write` method's first argument.

First, here's a breakdown of what `options` can contain:

<NiftyTable>

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | String | Only when `type` is `map` or `object` | Indicates which of the Map or Object's keys will have its value set |
| `value` | any | nope | Passes the value that will be set as the new value for the Map or Object's key (specified by the `key` option) |
| `rename` | String | nope | Indicates which of the Map or Object's keys will be renamed using the String passed to the `key` option |

  </NiftyTable>

And here's a breakdown of how all those factors influence write behavior:

<NiftyTable>

| When `editsFullArray` is... | And `type` is... | And `options` includes | New state is... |
| --- | --- | --- | --- |
| `true` | `'array'` | anything | `editableState` |
| `false` | `'array'` | anything | `state`, with `editableState` appended as the last item in the array |
| anything | `'map'` or `'object'` | `key`, `value`, and `rename` properties | `state` with the key specified by `rename` renamed to the key specified by `key`, and the value of `state[key]` set to `value` |
| anything | `'map'` or `'object'` | Only `key` and `rename` properties | `state` with the key specified by `rename` renamed to the key specified by `key` (value is unchanged) |
| anything | `'map'` or `'object'` | Only `key` and `value` properties | `state` with the value of `state[key]` set to `value` |
| anything | anything else | anything | `editableState` |

</NiftyTable>

<NiftyAside type="info">
Note that `write` does not update `state` or `editableState`, but you can do so using `setState` and `setEditableState`.
</NiftyAside>


<NiftyHeading level="4">
How Syncable erases state
</NiftyHeading>

The way Syncable erases state varies based on your `editsFullArray` option, the instance's `type` property, and the `options` object passed by you as the `write` method's first argument.

First, here's a breakdown of what `options` can contain:

<NiftyTable>

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | String | nope | Indicates which key of a Map or Object should be deleted. |
| `item(currentItem)` | String, Function | nope | Indicates which item in an Array should be removed. See the <NuxtLink to="#How-to-erase-items-from-arrays">How to erase items from Arrays</NuxtLink> section for more guidance. |
| `last` | Boolean | nope | <p>Indicates whether or not the Syncable instance should remove the last item from an Array or delete the last key of a Map or Object.</p><NiftyAside type="warning">The order of keys in JavaScript Objects is not consistent. Deleting the "last" key may not produce the same results across all environments. If the order of keys is important for your use case, consider using Maps instead.</NiftyAside> |
| `all` | Boolean | nope | Indicates whether or not Syncable should remove all items from an Array or delete all key/value pairs from a Map or Object. |

</NiftyTable>


And here's a breakdown of how all those factors influence erase behavior:

<NiftyTable>

| When `editsFullArray` is... | And `type` is... | And `options` includes | New state is... |
| --- | --- | --- | --- |
| `true` | `'array'` | anything | `[]` |
| `false` | `'array'` | `item` | See the <NuxtLink to="#How-to-erase-items-from-arrays">How to erase items from Arrays</NuxtLink> section for more guidance. |
| `false` | `'array'` | `last: true` | `state`, with the last item removed |
| `false` | `'array'` | `all: true` | `[]` |
| anything | `'map'` or `'object'` | `key` | `state`, with the key matching `options.key` deleted |
| anything | `'map'` or `'object'` | `last: true` | <p>`state`, with the last key deleted.</p><NiftyAside type="warning">The order of keys in JavaScript Objects is not consistent. Deleting the "last" key may not produce the same results across all environments. If the order of keys is important for your use case, consider using Maps instead.</NiftyAside> |
| anything | `'map'` | `all: true` | `new Map()` |
| anything | `'object'` | `all: true` | `{}` |
| anything | `'boolean'` | anything | `false` |
| anything | `'date'` | anything | `new Date()` |
| anything | `'number'` | anything | `0` |
| anything | `'string'` | anything | `''` |
| anything | anything else | anything | `undefined` |

</NiftyTable>

<NiftyAside type="info">
Note that `erase` does not update `state` or `editableState`, but you can do so using `setState` and `setEditableState`.
</NiftyAside>


<NiftyHeading level="5">
How to erase items from Arrays
</NiftyHeading>

When `type` is `'array'` and `editsFullArray` is `false`, the `erase` method's `item` option indicates which item in `state` should be erased.

If `options.item` is a String, the Syncable instance will find and remove the first item in `state` that is strictly equal to `options.item`.

If `options.item` is a Function, the Syncable instance will iterate through `state`, calling the `options.item` function on each item, passing the item as the first arugment. the Syncable instance will remove the first item for which the `options.item` function returns `true`.

For example, if you have an array of objects that have a unique ID in the `id` key, and you want the Syncable instance to find and delete the item whose ID is `'abc'`, you can call `erase` like so:

<NiftyCodeblock>
```js
syncable.erase({
  item: currentItem => currentItem.id === 'abc'
})
```
</NiftyCodeblock>

<NiftyAside type="info">
If `options.item(currentItem)` returns `false` for every item in `state`, the Syncable instance will not remove any items.
</NiftyAside>
