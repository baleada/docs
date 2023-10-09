---
title: Keycombo
tags: UI Logic
publish: true
order: 7
---

In Baleada Logic, there are several functions that deal with **keycombos**:
- The [keypress](/docs/logic/factories/keypress) factory
- The [keyrelease](/docs/logic/factories/keyrelease) factory
- The [keychord](/docs/logic/factories/keychord) factory
- The [keycombo match](/docs/logic/pipes/keycombo-match) pipe

As their first parameter, all of these function accept a keycombo, as defined by Baleada.

In Baleada, a keycombo is a lowercase string of `+`-separated key aliases. These are all examples of keycombos:

::: ariaLabel="Examples of keycombos"
| Keycombo | Corresponding keys |
| --- | --- |
| `a` | `a` |
| `A` | Shift and `a` |
| `shift+cmd+opt+a` | Shift key, Meta key, Option key, and `a` |
| `shift+meta+alt+a` | Same as above |
| `enter` | Enter key |
| `right` | Right arrow key |
| `a+b` | `a` and `b` held down at the same time |
| `1` | `1` |
| `!` | Shift and `1` |
:::

Notice a few things:
- Any key can be included in a combo
- Multiple modifiers and multiple non-modifiers can be included in a combo
- Meta can be referred to as `meta`, `cmd`, or `command`
- Alt can be referred to as `alt`, `opt`, or `option`
- Control can be referred to as `control` or `ctrl`
- Arrow keys are aliased as `up`, `down`, `left`, and `right`
- Both lowercase and capital letters are supported
- Likewise, numbers and special characters are supported, as well as the special characters accessed by pressing shift and those characters on a US keyboard layout

Regarding that last note: by default, Baleada assumes a US keyboard layout when identifying things like `!`, which is interpreted as `shift+1`. In any Baleada function that deals with keycombos, some extremely flexible optional parameters (explained below) allow you to extend and customize this as needed.


:::
## Configuring the keycombo system
:::

::: type="warning"
I love this configuration DX, but it's kind of wild. If you don't need to support custom key aliases or non-US keyboard layouts, you can ignore this whole situation.

Proceed with caution, and caffeine!
:::

Before you can configure the keycombo system, you need to understand the core UI logic for identifying keycombos.

Internally, Baleada's process for identifying a keycombo is:
1. Split the keycombo string into an array of key aliases
2. Transform any shorthand key aliases into longhand keycombos, where each alias in the keycombo corresponds to exactly one keyboard key (e.g. `A` becomes `shift+a`, `!` becomes `shift+1`, etc.)
3. Transform each key alias into corresponding key codes (i.e. the `code` property of a `KeyboardEvent`), all of which need to be pressed down in order to identify the alias
4. In memory, keep track of all key codes for keys that are currently down
5. To decide whether a given keycombo is down, there's only one thing to consider: for each alias, are all of the alias' key codes currently down?
6. To decide whether the current keyboard state is a perfect match to a given keycombo, Baleada needs to assert that each alias' keys are currently down, but it also needs to answer a second question: for every key code that is currently down, is there an alias that could match it? To answer that question, it transforms all the currently down key codes into arrays of aliases that could possible match.

A quick example:

:::
```ts
// keycombo:
'cmd+?'

// Which splits into
['cmd', '?']

// Which transforms to
['cmd', 'shift+/']

// Which splits into
['cmd', 'shift', '/']

// The aliases map to these key codes:
['Meta', 'Shift', 'Slash']

// To decide whether cmd+? is down, Baleada tests
// whether Shift, Meta, and Slash are currently down, according
// to the internal keydown state, which would look like this:
[
  ['Shift', 'down'],
  ['Meta', 'down'],
  ['Slash', 'down']
]

// Given that keyboard state, cmd+? is considered "down".
//
// Now imagine the `b` key goes down. Internal keyboard state
// would look like this:
[
  ['Shift', 'down'],
  ['Meta', 'down'],
  ['Slash', 'down'],
  ['KeyB', 'down']
]

// cmd+? is _still_ considered "down", because for each
// alias, all of the corresponding key codes are down.
//
// But this keyboard state is not a perfect match to cmd+?.
// Baleada will know that by translating each key code to an
// array of aliases that could match it:
[
  /* Shift -> */ ['shift'],
  /* Meta -> */ ['cmd', 'command', 'meta'],
  /* Slash -> */ ['/'],
  /* KeyB -> */ ['b'],
]

// To decide whether the current keyboard state is a perfect
// match to cmd+?, Baleada tests all of these arrays of
// potential aliases, checking the original keycombo to see
// if there's a match.
//
// It would match `cmd` and `?`, but when it gets to
// the aliases for `KeyB`, it would not find any match in the
// given keycombo. So in this case, Baleada would assert that
// cmd+? is down, but the current keyboard state is not
// a perfect match to cmd+?.
``` 
:::

The crucial steps here are step #2 (transforming shorthand aliases to longhand keycombos), step #3 (transforming each alias to a key code) and step #6 (transforming key codes to arrays of aliases that might match).

These steps are completely configurable, and as mentioned above, Baleada's default configuration is designed to work with a US keyboard layout and support a few common aliases for each modifier key.

Here are some examples of how Baleada's default configuration transforms key aliases for a US keyboard layout:

::: ariaLabel="Examples of keycombo translation"
| Alias | Longhand | Key codes | Notes |
| --- | --- | --- | --- |
| `a` | `a` | `KeyA` | Simple aliases will transform directly |
| `A` | `shift+a` | `Shift`, `KeyA` | Capital letters and some special characters will be transformed to a `shift+<character>` keycombo, then resolved to two key codes |
| `shift` | `shift` |  `Shift` | <p>Technically `Shift` is not a key code—the key codes on a US keyboard are `ShiftLeft` and `ShiftRight`.</p><p>But for modifier keys, Baleada supports these simpler translations—if the alias transforms to a key code without the `Left` or `Right` direction, Baleada will still be able to recognize the correct key.</p> |
:::

And here are some examples of how Baleada's default configuration transforms key codes into possible matching key aliases:

::: ariaLabel="Examples of key code translation"
| Key code | Aliases | Notes |
| --- | --- | --- |
| `KeyA` | `a` | Note that `KeyA` does **not** list capital `A` as a possible alias. Key codes should only list aliases that they exactly match, and `KeyA` does not exactly match capital `A`, (because capital `A` is matched by the combination of `Shift` and `KeyA`.) |
| `Slash` | `/` | Just like `KeyA`, `Slash` only lists exact matches. It does not list `?`, because `?` is not just `Slash`, it's `Shift` plus `Slash`. |
| `Meta` | `meta`, `cmd`, `command` | `Control`, `Meta`, and `Alt` all have multiple aliases that are exact matches |
:::


:::
### Customizing alias and code transformation
:::

Every Baleada function that accepts a keycombo as a parameter will also accept one or more optional parameters that allow you to customize the translation of key aliases to key codes. These parameters are:

:::
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `toLonghand` | Function | See description | <p>A function that accepts a single shorthand alias and should return a keycombo that represents the longhand form, where each alias in the longhand keycombo corresponds to exactly one keyboard key.</p><p>For example, in Baleada's default `toLonghand` function, the `A` shorthand gets transformed to the longhand `shift+a`.</p><p>When `toLonghand` receives an alias that already corresponds to exactly one keyboard key (e.g. `a`), it should return that alias unchanged.</p><p>The default implementation, which supports a US keyboard layout, is [`fromShorthandAliasToLonghandAlias`](https://github.com/baleada/logic/blob/main/src/extracted/fromShorthandAliasToLonghandAlias.ts).</p> |
| `toCode` | Function | See description | <p>A function that accepts a key alias and should return the key code that represents that alias.</p><p>The default implementation, which supports a US keyboard layout, is [`fromAliasToCode`](https://github.com/baleada/logic/blob/main/src/extracted/fromAliasToCode.ts).</p> |
| `toAliases` | Function | See description | <p>A function that accepts a key code and should return an array of key aliases that it could exactly match.</p><p>The default implementation, which supports a US keyboard layout, is [`fromCodeToAliases`](https://github.com/baleada/logic/blob/main/src/extracted/fromCodeToAliases.ts).</p><p>**For the [keycombo match](/docs/logic/pipes/keycombo-match) pipe only**, `toAliases` accepts a "keyboard event descriptor", which is just an object with the following `KeyboardEvent` properties: `code`, `shiftKey`, `metaKey`, `altKey`, `ctrlKey`.</p><p>It should return the same thing: an array of key aliases that the event descriptor could exactly match. The only difference is that those aliases can be written in _shorthand_ form as well as longhand.</p><p>For example, given a descriptor with `code: KeyA` and `shiftKey: true`, you can return the alias `A` as a capital letter.</p><p>The default `toAliases` for the keycombo match pipe is [`fromKeyboardEventDescriptorToAliases`](https://github.com/baleada/logic/blob/main/src/extracted/fromKeyboardEventDescriptorToAliases.ts), which is actually the same function called under the hood of `fromCodeToAliases`, the default `toAliases` for all other keycombo-related functions.</p> |
:::

:::
#### Extending Baleada's alias and code transformation
:::

If you like most of Baleada's default configuration for keycombos, but you want to support additional aliases, or tweak the way some key codes get resolved, you can import the default `toLonghand`, `toCode`, and `toAliases` functions and wrap them.

Here's an example:

:::
```ts
import {
  createKeycomboMatch,
  fromShorthandAliasToLonghandAlias
} from '@baleada/logic'

const toLonghand = alias => {
  switch (alias) {
    // Alias some food emojis to their first letter
    case '🍔': return 'b'
    case '🌮': return 't'
    case '🍕': return 'p'
    // Fall back to Baleada's defaults
    default: return fromShorthandAliasToLonghandAlias(alias)
  }
}

const keycomboMatch = createKeycomboMatch(
  'ctrl+🍕',
  { toLonghand }
)

keycomboMatch(new KeyboardEvent(
  'keydown',
  { code: 'KeyP', ctrlKey: true }
)) // true
```
:::

All the functions mentioned in the table above can be imported and wrapped:
- `fromShorthandAliasToLonghandAlias`
- `fromAliasToCode`
- `fromCodeToAliases`
- `fromKeyboardEventDescriptorToAliases`
