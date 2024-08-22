---
title: Completeable
source: true
tests: node/Completeable.test.ts
publish: true
order: 0
---

`Completeable` is a class that enriches a string, allowing it to:
  - Store a current text selection
  - Extract a segment of itself
  - Replace the segment or the full string with a completed string, and automatically update the text selection afterward


:::
## Construct a `Completeable` instance
:::

The `Completeable` constructor accepts two parameters:

::: ariaLabel="Completeable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `string` | String | yes | The string that will be made completable. |
| `options` | Object | no | Options for the `Completeable` instance. See the [Completeable constructor options](#Completeable-constructor-options) section for more guidance. |
:::


:::
### `Completeable` constructor options
:::


::: ariaLabel="Completeable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `segment` | Object | `{ from: 'start', to: 'end' }` | Controls how the `Completeable` instance will extract segments. See the [How the `Completeable` instance extracts segments](#how-the-completeable-instance-extracts-segments) section for more guidance. |
| `divider` | RegExp | `/\s/` | <p>Tells the `Completeable` instance how segments of the string are divided. Has no effect when neither `segments.from` nor `segments.to` are set to `divider`.</p><p>See the [How the `Completeable` instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info.</p> |
:::


:::
## State and methods
:::

::: ariaLabel="Completeable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `string` | Getter/Setter | See return value | N/A | <p>The string passed to the `Completeable` constructor.</p><p>If you assign a value directly to `string`, a setter will pass the new value to `setString`.</p> |
| `selection` | Getter/Setter | See return value | N/A | <p>An object that describes the current selection.</p><p>`selection.start` and `selection.end` indicate the index-based start and end positions (Numbers) of the currently selected text, and `selection.direction` indicates the selection direction (String, `forward`, `backward`, or `none`).</p><p>If you assign a value directly to `selection`, a setter will pass the new value to `setSelection`.</p><p>`Completeable` references `selection` when extracting segments of text. See the [How the `Completeable` instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info on how that works.</p> |
| `status` | Getter | See return value | N/A | <p>The status (String) of the `Completeable` instance.</p><p>`status` is `constructing` while the instance is constructing, and `ready` after the instance is constructed. `status` changes to `completing` right after the `complete` is called, then changes to `completed` after text completion is done.</p> |
| `segment` | Getter | See return value | N/A | An extracted segment of `string`. See the [How the `Completeable` instance extracts segments](#How-the-Completeable-instance-extracts-segments) section for more info. |
| `dividerIndices` | Getter | See return value | N/A | <p>When you use the `segment` constructor option to set `segment.from` or `segment.to` to `divider`, then `dividerIndices` will be an object describing the position of detected dividers around the current `segment`.</p><p>`dividerIndices.before` and `dividerIndices.after` indicate the index-based position (Number) of the divider before the segment, and the divider after the segment.</p><p>If neither `segment.from` nor `segment.to` are set to `divider`, then `dividerIndices` is generally not useful.</p> |
| `setString(newString)` | Function | Sets the `Completeable` instance's `string` | The new `string` (String) | The `Completeable` instance (`this`) |
| `setSelection(selection)` | Function | <p>Sets the `Completeable` instance's `selection`.</p><p>See the [How the `Completeable` instance extracts segments](#How-the-Completeable-instance-extracts-segments) section and the [How the `Completeable` instance completes strings and computes new selections](#How-the-Completeable-instance-completes-strings-and-computes-new-selections) section for more info.</p>  | The new `selection` (Object) | The `Completeable` instance (`this`) |
| `complete(completion, options)` |  | <p>Completes the string, replacing `segment` with a completed piece of text, then computes a new selection based on the `options`.</p><p>For more guidance on the `complete` method, see the [How the `Completeable` instance completes strings and computes new selections](#How-the-Completeable-instance-completes-strings-and-computes-new-selections) section.</p> | The completion/replacement (String), and the options (Object) | The `Completeable` instance (`this`) |
:::


:::
### How the `Completeable` instance extracts segments
:::

`Completeable`'s internal workflow is:
1. Analyze the `string` to determine what portion of text (the `segment`) should be replaced if you call the `complete` method.
2. When the `complete` method is called, replace the `segment` with the `completion` passed as the first argument to the `complete` method.

When analyzing the `string`, your `Completeable` instance is specifically looking for two pieces of information:
1. The index-based position (Number) of the **start** of the `segment`
1. The index-based position (Number) of the **end** of the `segment`

And the factors that influence that analysis are:
1. The `from` and `to` properties of the `options.segment` option passed to the constructor
2. The `options.divider` option passed to the constructor, although this is only relevant when `options.segment.from` OR `options.segment.to` were set to `'divider'`
3. The `start` and `end` properties of the current `selection` object

Here are breakdowns of exactly how each of those factors impacts `Completeable`'s calculation of the `segment` start and end indices:

::: ariaLabel="breakdown of how segment.from impacts segment start index" class="wide-2"
| Value of `segment.from` | Impact on `segment`'s start index |
| --- | --- |
| `start` | `segment`'s start index is always `0` |
| `selection` | `segment`'s start index is always equal to `selection.start` |
| `divider` | <p>To find the start index, `Completeable` goes to the `selection.start` position and steps backward through the `string`, one character at a time, looking for a match to the regular expression passed to `options.divider` (`/\s/` by default).</p><p>The start index of the `segment` is the match's index plus one. If no match is found, the segment's start index will be `0`.</p><p>The match's index also gets stored in `dividerIndices.before` in case you need to reference it, or use it in debugging.</p> |
:::

::: ariaLabel="breakdown of how segment.to impacts segment end index" class="wide-2"
| Value of `segment.to` | Impact on `segment`'s end index |
| --- | --- |
| `end` | `segment`'s end index is always the length of the `string` minus one. |
| `selection` | `segment`'s end index is always equal to `selection.end` |
| `divider` | <p>To find the end index, `Completeable` goes to the `selection.end` position and steps forward through the `string`, one character at a time, looking for a match to the regular expression passed to `options.divider` (`/\s/` by default).</p><p>The end index of the `segment` is the match's index minus one. If no match is found, the segment's end index will be the length of the `string` minus one.</p><p>The match's index also gets stored in `dividerIndices.after` in case you need to reference it, or use it in debugging.</p> |
:::

Finally, to finish extracting the `segment`, `Completeable` slices the `string` from the start index through the end index.

::: type="info"
`segment` is computed each time it is accessed, using a getter.
:::


:::
### How the `Completeable` instance completes strings and computes new selections
:::

As mentioned above, the `complete` method accepts two parameters: `completion` and `options`.

`completion` should be a completed piece of text that will replace the `segment` within the `string` (or the entire string, if you haven't changed the default constructor options).

`options` is an object, with just one property. Here's a breakdown:

::: ariaLabel="complete options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `select` | String | `completion` | <p>Controls how `Completeable` will set the new selection after completing text. Valid values are `completion` or `completionEnd`.</p><p>If `options.select` is `completion`, `Completeable` will set `selection.start` to the start index of the completed text, and `selection.end` to the end index of the completed text.</p><p>If `options.select` is `completionEnd`, `Completeable` will set both `selection.start` and `selection.end` to the end index of the completed text.</p> |
:::


:::
## Using with TypeScript
:::

Nothing special to know about using `Completeable` with TypeScript 🚀


:::
## API design compliance
:::

::: ariaLabel="Completeable's API design compliance"  classes="wide-1 wide-3"
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
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | `setSelection` |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `segment`, `dividerIndices` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `complete` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> | none |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A string can be completed." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::
