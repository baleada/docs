---
title: Copyable
tags: UI logic
publish: true
order: 0
---

`Copyable` is a class that enriches a string, allowing it to:
- Be copied to the clipboard
- Store its status (`ready`, `copying`, `copied`, or `errored`)
- Tell you whether it matches the current clipboard text


::: type="info"
`Copyable` adds very little extra functionality to the [Clipboard](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard) web API. It's intended to be a thin wrapper, simply ensuring that the Clipboard API conforms to all of Baleada Logic's API design specs and naming conventions.
:::


:::
## Construct a `Copyable` instance
:::

To construct a `Copyable` instance (Object), use the `Copyable` constructor, which accepts two parameters:

::: ariaLabel="Copyable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `string` | String | yes | The string that will be made copyable. |
| `options` | Object | no | Passes options for the `Copyable` instance. See the [`Copyable` constructor options](#Copyable-constructor-options) section for more guidance. |
:::


:::
```js
const instance = new Copyable(resource[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/composition):

:::
```js
const reactiveInstance = useCopyable(resource[, options])
```
:::


:::
### `Copyable` constructor options
:::

::: ariaLabel="Navigateable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `clipboard` | Object | none | An object with a single `text` property where `Copyable` can write the `string` to after copy operations. See the [Integrating multiple instances](#integrating-multiple-instances) section for more guidance. |
:::


:::
## Access state and methods
:::

The constructed `Copyable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Copyable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `string` | Getter/Setter | See return value | N/A | <p>The `string` passed to the constructor.</p><p>If you assign a value directly to `string`, a setter will pass the new value to `setString`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Copyable` instance. `status` is `ready` after the instance is constructed, `copying` immediately after the `copy` method is called, and `copied` after the `string` has been successfully copied. `status` can also be `errored` if there is an error during the `copy` operation. |
| `isClipboardText` | Getter | See return value | N/A | <p>The value of `isClipboardText` changes based on whether or not you passed a `clipboard` object in your `options`.</p><p>If you passed a `clipboard` object, `isClipboardText` is a Boolean that indicates whether or not the `string` currently matches `clipboard.text`.</p><p>If you didn't pass a `clipboard` object, `isClipboardText` returns a Promise that resolves to a Boolean indicating whether or not the `string` currently matches the Clipboard API's text.</p> |
| `setString(string)` | Function | Sets the `string` | The new `string` (String) | The `Copyable` instance |
| `copy(options)` | Function | <p>Copies the string.</p><p>For more guidance on the `copy` method, see the [How to copy text](#how-to-copy-text) section.</p> | An options object, as explained in the [How to copy text](#how-to-copy-text) section. | The `Copyable` instance |
:::


:::
### How to copy text
:::

By default, your `Copyable` instance will use the asynchronous Clipboard API to copy text to the clipboard. In most cases, you can `await` the `copy` method to store your `string` on the end users clipboard:

:::
```js
const instance = new Copyable('Baleada: a toolkit for building web apps')

await instance.copy()
// The text is now stored on the clipboard!
```
:::

If you're working in a browser that doesn't support the asynchronous Clipboard API (specifically its `writeText` method), you can pass an `options` object to the `copy` method to force your instance to use an older technique:
1. Add an HTML input to the DOM
2. Set the input's value to your `string`
3. Select and copy the `string`
4. Remove the HTML input from the DOM

This isn't recommended, because of the DOM side effects, and also because the APIs that allow this are being deprecated. That said, this technique still has wider browser support than the Clipboard API.

To use this technique, your `options` object should have a `type` property whose value is `deprecated`:

:::
```js
const instance = new Copyable('Baleada: a toolkit for building web apps')

await instance.copy({ type: 'deprecated' })
```
:::


:::
### Integrating multiple instances
:::

In many cases, you'll have multiple `Copyable` instances active at one time, each one responsible for a different piece of text, and each one with a button on screen that lets the end user copy the text.

You'll often want to change that button visually based on whether or not its corresponding text is currently copied.

The `isClipboardText` property can help you with this. In this example, the Boolean value of `isClipboardText` indicates whether or not you should apply special styling to your button (e.g. replacing a copy icon with a checkmark icon).

In [environments that support the `readText` method of the Clipboard API](https://caniuse.com/mdn-api_clipboard_readtext), you can use `isClipboardText` out of the box in this way:

:::
```js
const instance = new Copyable('Baleada: a toolkit for building web apps')

await instance.copy()
// The text is now stored on the clipboard!

await instance.isClipboardText // -> true
// Note that, without additional configuration, the 
// isClipboardText getter property returns a Promise that
// resolves to a Boolean.
```
:::

In environments that don't support `readText`, you can use the `clipboard` constructor option to pass your own object where clipboard text can be stored.

Then, your `Copyable` instance will reference your `clipboard` when you access the `isClipboardText` property.

:::
```js
const clipboard = { text: '' }
const instance = new Copyable(
  'Baleada: a toolkit for building web apps',
  { clipboard }
)

await instance.copy()
// The text is now stored in clipboard.text!

instance.isClipboardText // -> true
// When using options.clipboard, the isClipboardText getter
// property returns a Boolean, not a Promise.
```
:::

So, to integrate multiple instances, pass the same `clipboard` object to each one. Each time you access any `isClipboardText` property on any instance, it will reference the up-to-date `clipboard.text`.

:::
```js
const clipboard = { text: '' }
const firstInstance = new Copyable('Baleada', { clipboard })
const secondInstance = new Copyable('Logic', { clipboard })

await firstInstance.copy()
clipboard.text // -> 'Baleada'
firstInstance.isClipboardText // -> true
secondInstance.isClipboardText // -> false

await secondInstance.copy()
clipboard.text // -> 'Logic'
firstInstance.isClipboardText // -> false
secondInstance.isClipboardText // -> true
```
:::

With this configuration, you can use the shared `clipboard` object and each instance's `isClipboardText` property to inform your decisions about which buttons should have special decorations on your screen, etc.


:::
## Using with TypeScript
:::

Nothing special to know about using `Copyable` with TypeScript! Enjoy IDE autocomplete and type checking while you construct and use your instance.


:::
## API design compliance
:::

::: ariaLabel="A table showing Copyable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `string`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setString` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | none |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `isClipboardText` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `copy` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "A string can be copied." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | |
:::

