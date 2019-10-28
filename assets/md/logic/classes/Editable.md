---
title: Editable
framework: agnostic
publish: true
order: 0
---


Editable is a library that enriches a piece of state by:
- Allowing it to infer its data type
- Allowing it to store and make changes to an editable version of itself, instead of mutating the original state
- Giving it the methods necessary to handle different kinds of edits (write, overwrite, full delete, partial delete, cancel &amp; revert to original value, etc.)

Editable is written in vanilla JS with no dependencies.

<ProseHeading level="2">
Construct a Editable instance
</ProseHeading>

To construct a Editable instance (Object), use the Editable constructor, which takes two parameters:

<ProseTable>

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `state` | any | yep | Passes the state that will be made editable. |
| `options` | Object | nope | Passes options for the Editable instance. See the <NuxtLink to="#Editable-constructor-options">Editable constructor options</NuxtLink> section for more guidance. |

</ProseTable>


<ProseCodeblock>
```js
const instance = new Editable(state[, options])
```
</ProseCodeblock>

<ProseTable>

| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `type` | String | none | <p>Tells the Editable instance what data type your state is. If you don't pass this option, the Editable instance will infer the data type based on the state passed to the constructor.</p><ProseAside type="warning">You should pass the `type` option any time your original state is not the same type as the state that will be written—for example, when you're using Editable to edit a Date, a File, or a FileList, but your store's placeholder value is a String or an empty Object.</ProseAside><ProseAside type="info"><p>You can pass any String as the <code>type</code> option, or you can pick from one of the following intended types:</p><ul><li>`'array'`</li><li>`'boolean'`</li><li>`'date'`</li><li>`'file'`</li><li>`'filelist'`</li><li>`'map'`</li><li>`'number'`</li><li>`'object'`</li><li>`'string'`</li></ul></ProseAside> | N/A | N/A |
| `onEdit(newState, instance)` | Function | <p>See the <NuxtLink to="#How-Editable-edits-state">How Editable edits state</NuxtLink> section for more guidance.</p> | <p>Called by the Editable instance after either writing or erasing state.</p><p>For more guidance, see the <NuxtLink to="#How-Editable-edits-state">How Editable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Editable instance (Object) | N/A |
| `onWrite(newState, instance)` | Function | none | <p>Called by the Editable instance after writing state.</p><p>For more guidance, see the <NuxtLink to="#How-Editable-edits-state">How Editable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Editable instance (Object) | N/A |
| `onErase(newState, instance)` | Function | none | <p>Called by the Editable instance after erasing state.</p><p>For more guidance, see the <NuxtLink to="#How-Editable-edits-state">How Editable edits state</NuxtLink> section.</p> | The new state (can be any type) and the Editable instance (Object) | N/A |

</ProseTable>

<ProseHeading level="2">
Access state and methods
</ProseHeading>

The constructed Editable instance is an Object, and state and methods can be accessed via its properties:


<ProseTable>

| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `state` | any | A shallow copy of the state passed to the Editable constructor | N/A | N/A |
| `editableState` | any | A shallow copy of `state` that you can edit. | N/A | N/A |
| `type` | Getter | See return value | N/A | The Editable instance's inferred data type (String) |
| `setState(newState)` | Function | Sets the Editable instance's `state` | The new `state` (any) | The Editable instance (`this`) |
| `setEditableState(newEditableState)` | Function | Sets the Editable instance's `editableState` | The new `editableState` (any) | The Editable instance (`this`) |
| `cancel()` | Function | <p>Resets `editableState` to a shallow copy of `state`.</p><ProseAside type="info">`cancel` does not trigger the Editable instance to call your `onEdit`, `onWrite`, or `onErase` functions.</ProseAside> | none | The Editable instance (`this`) |
| `write(options)` | Function | <p>Writes `editableState` to `state`.</p><p>The exact write behavior depends on `type` and the `write` function's `options` parameter. See the <NuxtLink to="#How-Editable-writes-state">How Editable writes state</NuxtLink> section for more guidance.</p> | <p>An `options` object.</p><p>See the <NuxtLink to="#How-Editable-writes-state">How Editable writes state</NuxtLink> section for more guidance.</p> | The Editable instance (`this`) |
| `erase(options)` | Function | <p>Erases `state`.</p><p>The exact erase behavior depends on `type` and the `erase` function's `options` parameter. See the <NuxtLink to="#How-Editable-erases-state">How Editable erases state</NuxtLink> section for more guidance.</p> | <p>An `options` object.</p><p>See the <NuxtLink to="#How-Editable-erases-state">How Editable erases state</NuxtLink> section for more guidance.</p> | The Editable instance (`this`) |

</ProseTable>


<ProseHeading level="3">
How Editable edits state
</ProseHeading>

In general, whenever the `write` or `erase` methods are called, the Editable instance creates an edited version of its original state, then calls your `onEdit` function, passing the edited state as the first argument and itself (i.e. `this`) as the second argument.

The default `onEdit` function, shown below, sets `state` to the edited state each time you call one of the editing methods:

<ProseCodeblock>

```js
/*
 * Default onEdit function for Editable
 */
(newState, instance) => instance.setState(newState)
```

</ProseCodeblock>

Immediately afterward, the Editable instance will also call your `onWrite` or `onErase` functions, depending on which method you called. `onWrite` and `onErase` also receive the edited state as the first argument and the Editable instance (i.e. `this`) as the second argument.

The edited state is created differently depending on whether you call `write` or `erase`; keep reading for more guidance.


<ProseHeading level="4">
How Editable writes state
</ProseHeading>

The way Editable writes state varies based on the instance's `type` property and the `options` object passed by you as the `write` method's first argument.

First, here's a breakdown of what `options` can contain:

<ProseTable>

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `item` | any | nope | Passes an item that will be added to the end of an Array |
| `key` | String | Only when `type` is `map` or `object` | Indicates which of the Map or Object's keys will have its value set |
| `value` | any | nope | Passes the value that will be set as the new value for the Map or Object's key (specified by the `key` option) |
| `rename` | String | nope | Indicates which of the Map or Object's keys will be renamed using the String passed to the `key` option |

  </ProseTable>

And here's a breakdown of how all those factors influence write behavior:

<ProseTable>

| When `type` is... | And `options` includes | New state is... |
| --- | --- | --- |
| `'array'` | `item` | `state`, with `options.item` appended as the last item in the array |
| `'array'` | nothing | `editableState` |
| `'map'` or `'object'` | `key`, `value`, and `rename` properties | `state` with the key specified by `rename` renamed to the key specified by `key`, and the value of `state[key]` set to `value` |
| `'map'` or `'object'` | Only `key` and `rename` properties | `state` with the key specified by `rename` renamed to the key specified by `key` (value is unchanged) |
| `'map'` or `'object'` | Only `key` and `value` properties | `state` with the value of `state[key]` set to `value` |
| anything else | anything | `editableState` |

</ProseTable>



<ProseHeading level="4">
How Editable erases state
</ProseHeading>

The way Editable erases state varies based on the instance's `type` property and the `options` object passed by you as the `write` method's first argument.

First, here's a breakdown of what `options` can contain:

<ProseTable>

| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | String | nope | Indicates which key of a Map or Object should be deleted. |
| `item(currentItem)` | String, Function | nope | Indicates which item in an Array should be removed. See the <NuxtLink to="#How-to-erase-items-from-arrays">How to erase items from Arrays</NuxtLink> section for more guidance. |
| `last` | Boolean | nope | <p>Indicates whether or not the Editable instance should remove the last item from an Array or delete the last key of a Map or Object.</p><ProseAside type="warning">The order of keys in JavaScript Objects is not consistent. Deleting the "last" key may not produce the same results across all environments. If the order of keys is important for your use case, consider using Maps instead.</ProseAside> |
| `all` | Boolean | nope | Indicates whether or not Editable should remove all items from an Array or delete all key/value pairs from a Map or Object. |

</ProseTable>


And here's a breakdown of how all those factors influence erase behavior:

<ProseTable>

| When `type` is... | And `options` includes | New state is... |
| --- | --- | --- |
| `'array'` | `item` | See the <NuxtLink to="#How-to-erase-items-from-arrays">How to erase items from Arrays</NuxtLink> section for more guidance. |
| `'array'` | `last: true` | `state`, with the last item removed |
| `'array'` | `all: true` | `[]` |
| `'map'` or `'object'` | `key` | `state`, with the key matching `options.key` deleted |
| `'map'` or `'object'` | `last: true` | <p>`state`, with the last key deleted.</p><ProseAside type="warning">The order of keys in JavaScript Objects is not consistent. Deleting the "last" key may not produce the same results across all environments. If the order of keys is important for your use case, consider using Maps instead.</ProseAside> |
| `'map'` | `all: true` | `new Map()` |
| `'object'` | `all: true` | `{}` |
| `'boolean'` | anything | `false` |
| `'date'` | anything | `new Date()` |
| `'number'` | anything | `0` |
| `'string'` | anything | `''` |
| anything else | anything | `undefined` |

</ProseTable>

<ProseAside type="info">

When erasing arrays, objects, and maps, you can set multiple options. For example, if you pass `{ last: true, item: 'myItem' }` while erasing an array, Syncable will remove `'myItem'` AND will remove the last value in the array.

Erase operations are performed in the following order (from most specific to least specific operation):
1. Erase an item (Arrays only)
2. Erase a key/value pair (Objects and Maps only)
1. Erase the last item from an Array, or the last key/value pair from an Object or Map
1. Erase all items from an Array, or all key/value pairs from an Object or Map

</ProseAside>


<ProseHeading level="5">
How to erase items from Arrays
</ProseHeading>

When `type` is `'array'`, the `erase` method's `item` option indicates which item in `state` should be erased.

If `options.item` is a String, the Editable instance will find and remove all items in `state` that are strictly equal to `options.item`.

If `options.item` is a Function, the Editable instance will iterate through `state`, calling the `options.item` function on each item in the array, passing the item as the first argument. The Editable instance will remove all items for which the `options.item` function returns `true`.

For example, if you have an array of objects that have a unique ID in the `id` key, and you want the Editable instance to find and delete the item whose ID is `'abc'`, you can call `erase` like so:

<ProseCodeblock>
```js
editable.erase({
  item: currentItem => currentItem.id === 'abc'
})
```
</ProseCodeblock>

<ProseAside type="info">
If `options.item(currentItem)` returns `false` for every item in `state`, the Editable instance will not remove any items.

If `options.item(currentItem)` returns `true` for more than one item in `state`, all of the matching items will be removed.
</ProseAside>
