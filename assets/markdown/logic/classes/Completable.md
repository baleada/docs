---
title: Completable
framework: agnostic
publish: true
order: 0
---

<!-- <BaleadaLogicLibraryIntro
  name="Completable"
  stateType="string"
  allowsTo="[
    'extract a segment of the string'
  ]"
  givesMethodsTo="replace the segment or the full string with a more complete string"
/> -->

Completable is a library that enriches a string by:
  - Allowing it to store a current index-based location
  - Allowing it to extract a segment of the string
  - Giving it the methods necessary to replace the segment or the full string with a more complete string

Completable is written in vanilla JS with no dependencies.


<NiftyHeading level="2">
Construct a Completable instance
</NiftyHeading>

To construct a Completable instance (Object), use the Completable constructor, which takes two parameters:

<NiftyTable>

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `string` | String | yep | Passes the string that will be made completable. |
| `options` | Object | nope | Passes options for the Completable instance. See the <NuxtLink to="#Completable-constructor-options">Completable constructor options</NuxtLink> section for more guidance. |

</NiftyTable>


<NiftyCodeblock>
```js
const instance = new Completable(string[, options])
```
</NiftyCodeblock>


<NiftyHeading level="3">
Completable constructor options
</NiftyHeading>

<NiftyTable>
| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `segmentsFromDivider` | Boolean | `false` | <p>`true` when the Completable instance should start from a divider (for example, the space between words) while extracting a segment, and `false` when it should start from the very beginning of the string.</p><p>See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section for more info.</p> | N/A | N/A |
| `segmentsToLocation` | Boolean | `false` | <p>`true` when the Completable instance should stop at the current location while extracting a segment, and `false` when it should stop at the very end of the string.</p><p>See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section for more info.</p> | N/A | N/A |
| `divider` | RegExp | `/\s/` | <p>Tells the Completable instance how segments of the string are divided. Has no effect when <code>segmentsFromDivider</code> is <code>false</code>.</p><p>See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section for more info.</p> | N/A | N/A |
| `locatesAfterCompletion` | Boolean | `true` | <p><code>true</code> when the Completable instance, after completing the string, should set the current location to the index after the segment's replacement. `false` when it should not change the current location.</p><p>See the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section for more info.</p> | N/A | N/A |
| `onComplete(completedString, instance)` | Function | <p>For more guidance, see the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section.</p> | <p>Called by Completable after completing the string.</p><p>For more guidance, see the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section.</p> | The completed string (String) and the Completable instance (Object). | N/A |
| `onLocate(newLocation, instance)` | Function | <p>For more guidance, see the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section.</p> | <p>Called by Completable after completing the string.</p><p>For more guidance, see the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section.</p> | The new location (Number) and the Completable instance (Object). | N/A |
</NiftyTable>


<NiftyHeading level="2">
Access state and methods
</NiftyHeading>

The constructed Completable instance is an Object, and state and methods can be accessed via its properties:


<NiftyTable>
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `string` | String | A shallow copy of the string passed to the Completable constructor | N/A | N/A |
| `location` | Number | <p>The current index-based location in the <code>string</code>.</p><p>See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section and the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section for more info.</p> | N/A | N/A |
| `segment` | Getter | Extracts and returns a segment of `string`. See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section for more info. | N/A | An extracted segment of `string` (String) |
| `setString(newString)` | Function | Sets the Completable instance's `string` | The new `string` (String) | The Completable instance (`this`) |
| `setLocation(location)` | Function | <p>Sets the location from which the Completable instance will start extracting segments.</p><p>See the <NuxtLink to="#How-the-Completable-instance-extracts-segments">How the Completable instance extracts segments</NuxtLink> section and the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section for more info.</p>  | The new `location` (Number) | The Completable instance (`this`) |
| `complete(completion)` |  | <p>Completes the string, replacing <code>segment</code> with a completion/replacement, and computes a new location based on the <code>locatesAfterCompletion</code> option.</p><p>For more guidance on the `complete` method, see the <NuxtLink to="#How-the-Completable-instance-completes-strings-and-computes-new-locations">How the Completable instance completes strings and computes new locations</NuxtLink> section.</p> | The completion/replacement (String) | The Completable instance (`this`) |
</NiftyTable>


<NiftyHeading level="3">
How the Completable instance extracts segments
</NiftyHeading>

The Completable instance [slices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) the `string` in order to extract a segment. The starting location of the slice differs based on the `segmentsFromDivider` option, and the ending location of the slice differs based on the `segmentsToLocation` option.

The tables below have a full breakdowns:

<NiftyTable>
| When `segmentsFromDivider` is... | `segment` start is... |
| --- | --- |
| `false` | The beginning of the `string` |
| `true` | The index-based location of the previous character(s) matching the regular expression passed to the `divider` option, or `-1` if no matches are found. |
</NiftyTable>

<NiftyTable>
| When `segmentsToLocation` is... | `segment` end is... |
| --- | --- |
| `false` | The end of the `string` |
| `true` | The current `location` |
</NiftyTable>

The sliced `string` becomes the new `segment`.

<NiftyAside type="info">
`segment` is computed each time it is accessed, using a getter.
</NiftyAside>


<NiftyHeading level="3">
How the Completable instance completes strings and computes new locations
</NiftyHeading>

In general, whenever the `complete` method is called, the Completable instance completes the string and computes a new location, then (in the exact order shown here):
1. Calls your `onComplete` function, passing the completed string as the first argument and itself (i.e. `this`) as the second argument.
2. Calls your `onLocate` function, passing the new location as the first argument and itself (i.e. `this`) as the second argument.

The default `onComplete` and `onLocate` functions, shown below, set `string` to the completed string and `location` to the new location each time you call `complete`:

<NiftyCodeblock>

```js
/*
 * Default onComplete function for Completable
 */
(completedString, instance) => instance.setString(completedString)

/*
 * Default onLocate function for Completable
 */
(newLocation, instance) => instance.setLocation(newLocation)
```

</NiftyCodeblock>


When the Completable instance's `complete` method is called, passing a `completion` as the first parameter, Completable will create a completed version of the `string` and will compute a new value for `location`.

The completed string is always the instance's `string`, but with its `segment` replaced by the `completion`. After completing the `string`, the `complete` method calls your `onComplete` function, passing the completed string as the first argument.

The new value for `location` is computed based on the `locatesAfterCompletion` option. When `locatesAfterCompletion` is `true`, the new location will be the the index-based location just after the end of the `completion`. This is equal to the length of any text before the `segment` plus the length of the `completion`. But, when `locatesAfterCompletion` is `false`, the new location will be equal to the old location.

After computing the new location, the `complete` method calls your `onLocate` function, passing the new location as the first argument.

<NiftyAside type="info">
Note that `complete` does not set `string` or `location` to the new values, but you can do so using `setString` and `setLocation`.
</NiftyAside>
