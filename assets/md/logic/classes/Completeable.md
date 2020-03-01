---
title: Completeable
framework: agnostic
publish: true
order: 0
---

`Completeable` is a class that enriches a string, allowing it to:
  - Store a current index-based location
  - Extract a segment of itself
  - Replace the segment or the full string with a more complete string

`Completeable` is written in vanilla JS with no dependencies.

::: type="danger"
Documentation for `Completeable` is still in progress.
:::


<!-- :::
## Construct a Completeable instance
:::

To construct a Completeable instance (Object), use the Completeable constructor, which takes two parameters:

:::

| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `string` | String | yes | Passes the string that will be made completable. |
| `options` | Object | no | Passes options for the Completeable instance. See the [Completeable constructor options](#Completeable-constructor-options) section for more guidance. |

:::


:::
```js
const instance = new Completeable(string[, options])
```
:::


:::
### Completeable constructor options
:::

:::
| Option | Type | Default | Description | Parameters | Return value |
| --- | --- | --- | --- | --- | --- |
| `segmentsFromDivider` | Boolean | `false` | <p>`true` when the Completeable instance should start from a divider (for example, the space between words) while extracting a segment, and `false` when it should start from the very beginning of the string.</p><p>See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info.</p> | N/A | N/A |
| `segmentsToLocation` | Boolean | `false` | <p>`true` when the Completeable instance should stop at the current location while extracting a segment, and `false` when it should stop at the very end of the string.</p><p>See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info.</p> | N/A | N/A |
| `divider` | RegExp | `/\s/` | <p>Tells the Completeable instance how segments of the string are divided. Has no effect when <code>segmentsFromDivider</code> is <code>false</code>.</p><p>See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info.</p> | N/A | N/A |
| `onComplete(completedString, instance)` | Function | <p>For more guidance, see the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section.</p> | <p>Called by Completeable after completing the string.</p><p>For more guidance, see the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section.</p> | The completed string (String) and the Completeable instance (Object). | N/A |
| `onLocate(newLocation, instance)` | Function | <p>For more guidance, see the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section.</p> | <p>Called by Completeable after completing the string.</p><p>For more guidance, see the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section.</p> | The new location (Number) and the Completeable instance (Object). | N/A |
:::


:::
## Access state and methods
:::

The constructed Completeable instance is an Object, and state and methods can be accessed via its properties:


:::
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `string` | String | A shallow copy of the string passed to the Completeable constructor | N/A | N/A |
| `location` | Number | <p>The current index-based location in the <code>string</code>.</p><p>See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section and the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section for more info.</p> | N/A | N/A |
| `segment` | Getter | Extracts and returns a segment of `string`. See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info. | N/A | An extracted segment of `string` (String) |
| `setString(newString)` | Function | Sets the Completeable instance's `string` | The new `string` (String) | The Completeable instance (`this`) |
| `setLocation(location)` | Function | <p>Sets the location from which the Completeable instance will start extracting segments.</p><p>See the [How the Completeable instance extracts segments](#How-the-Completeable-instance-extracts-segments) section and the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section for more info.</p>  | The new `location` (Number) | The Completeable instance (`this`) |
| `complete(completion, options)` |  | <p>Completes the string, replacing <code>segment</code> with a completion/replacement, and computes a new location based on the <code>options</code>.</p><p>For more guidance on the `complete` method, see the [How the Completeable instance completes strings and computes new locations](#How-the-Completeable-instance-completes-strings-and-computes-new-locations) section.</p> | The completion/replacement (String) | The Completeable instance (`this`) |
:::


:::
### How the Completeable instance extracts segments
:::

The Completeable instance [slices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice) the `string` in order to extract a segment. The starting location of the slice differs based on the `segmentsFromDivider` option, and the ending location of the slice differs based on the `segmentsToLocation` option.

The tables below have a full breakdowns:

:::
| When `segmentsFromDivider` is... | `segment` start is... |
| --- | --- |
| `false` | The beginning of the `string` |
| `true` | The index-based location of the previous character(s) matching the regular expression passed to the `divider` option, or `-1` if no matches are found. |
:::

:::
| When `segmentsToLocation` is... | `segment` end is... |
| --- | --- |
| `false` | The end of the `string` |
| `true` | The current `location` |
:::

The sliced `string` becomes the new `segment`.

::: type="info"
`segment` is computed each time it is accessed, using a getter.
:::


:::
### How the Completeable instance completes strings and computes new locations
:::

In general, whenever the `complete` method is called, the Completeable instance completes the string and computes a new location, then, in this exact order:
1. Calls your `onComplete` function, passing the completed string as the first argument and itself (i.e. `this`) as the second argument.
2. Calls your `onLocate` function, passing the new location as the first argument and itself (i.e. `this`) as the second argument.

The default `onComplete` and `onLocate` functions, shown below, set `string` to the completed string and `location` to the new location each time you call `complete`:

:::

```js
/*
 * Default onComplete function for Completeable
 */
(completedString, instance) => instance.setString(completedString)

/*
 * Default onLocate function for Completeable
 */
(newLocation, instance) => instance.setLocation(newLocation)
```

:::


When the Completeable instance's `complete` method is called, passing a `completion` as the first parameter, Completeable will create a completed version of the `string` and will compute a new value for `location`.

The completed string is a new version of the instance's `string`, with its `segment` replaced by the `completion`. After completing the `string`, the `complete` method calls your `onComplete` function, passing the completed string as the first argument.

The new value for `location` is computed based on the `locatesAfterCompletion` option, passed using the `complete` function's `options` argument:

:::

```js
completable.complete('my completion', { locatesAfterCompletion: true })
```

:::

`locatesAfterCompletion` defaults to `true`.

When `locatesAfterCompletion` is `true`, the new location will be the the index-based location just after the end of the `completion`. This is equal to the length of any text before the `segment` plus the length of the `completion`. But, when `locatesAfterCompletion` is `false`, the new location will be equal to the old location.

After computing the new location, the `complete` method calls your `onLocate` function, passing the new location as the first argument.

::: type="info"
Note that `complete` does not set `string` or `location` to the new values, but you can do so using `setString` and `setLocation`.
::: -->