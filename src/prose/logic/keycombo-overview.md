---
title: Keycombo
tags: UI Logic
publish: true
order: 7
---

In Baleada Logic, there are several functions that deal with **keycombos**:
- The [keycombo match](/docs/logic/pipes/keycombo-match) pipe
- The [keypress](/docs/logic/factories/keypress) factory
- The [keyrelease](/docs/logic/factories/keyrelease) factory
- The [keychord](/docs/logic/factories/keychord) factory

As their first parameter, all of these function accept a keycombo, as defined by Baleada.

In Baleada, a keycombo is a lowercase string of `+`-delimited key aliases. These are all examples of keycombos:

::: ariaLabel="Examples of keycombos"
| Keycombo | Corresponding keys |
| --- | --- |
| `a` | `a` |
| `shift+cmd+opt+a` | Shift key, Meta key, Option key, and `a` |
| `shift+meta+alt+a` | Same as above |
| `enter` | Enter key |
| `right` | Right arrow key |
| `a+b` | `a` and `b` held down at the same time |
| `!` | Using Baleada's default implementation of a US keyboard layout, this would be Shift key and `1` |
:::

Notice a few things:
- Any key can be included in a combo
- Multiple modifiers and multiple non-modifiers can be included in a combo
- Meta can be referred to as `meta`, `cmd`, or `command`
- Alt can be referred to as `alt`, `opt`, or `option`
- Control can be referred to as `control` or `ctrl`
- Arrow keys are aliased as `up`, `down`, `left`, and `right`
- Keycombos are always lowercase (and if you don't write them lowercase, they'll be lowercased internally), so capital letters should be identified as `shift+<letter>`
- Same goes for characters like `å`, which should be written as `alt+a`
- On the other hand, special characters that you access by holding `shift` on a US keyboard are supported. `shift+1` will work just fine, but you can also just write `!`
- By default, Baleada assumes a US keyboard layout. In any Baleada function that deals with keycombos, some extremely flexible optional parameters (explained below) allow you to change this as needed.


:::
## Configuring different keyboard layouts
:::

::: type="warning"
I love this configuration system, but it's kind of wild. Proceed with caution and caffeine.
:::

Before you can configure different keyboard layouts, you need to understand some of the core UI logic for identifying keycombos.

Internally, Baleada's process for identifying a keycombo is:
1. Split the keycombo string into an array of key aliases
2. Transform each key alias into an array of key codes (i.e. the `code` property of a `KeyboardEvent`), all of which need to be pressed down in order to identify the alias
3. In memory, keep track of all key codes for keys that are currently down
4. To decide whether a given keycombo is down, there's only one thing to consider: for each alias, are all of the alias' key codes currently down?
5. To decide whether the current keyboard state is a perfect match to a given keycombo, Baleada needs to assert that each alias' keys are currently down, but it also needs to answer a second question: for every key code that is currently down, is there an alias that could match it? To answer that question, it transforms all the currently down key codes into arrays of aliases that could possible match.

A quick example:

:::
```ts
// keycombo:
'shift+cmd+a'

// This keycombo splits into
['shift', 'cmd', 'a']

// The aliases map to these arrays of key codes:
[
  ['Shift'],
  ['Meta'],
  ['KeyA']
]

// To decide whether shift+cmd+a is down, Baleada tests
// whether Shift, Meta, and KeyA are currently down, according
// to the internal keydown state, which would look like this:
[
  ['Shift', 'down'],
  ['Meta', 'down'],
  ['KeyA', 'down']
]

// Given that keyboard state, shift+cmd+a is considered "down".
//
// Now imagine the `b` key goes down. Internal keyboard state
// would look like this:
[
  ['Shift', 'down'],
  ['Meta', 'down'],
  ['KeyA', 'down'],
  ['KeyB', 'down']
]

// shift+cmd+a is _still_ considered "down", because for each
// alias, all of the corresponding key codes are down.
//
// But this keyboard state is not a perfect match to shift+cmd+a.
// Baleada will know that by translating each key code to an
// array of aliases that could match it:
[
  /* Shift -> */ ['shift'],
  /* Meta -> */ ['cmd', 'command', 'meta'],
  /* KeyA -> */ ['a'],
  /* KeyB -> */ ['b'],
]

// To decide whether the current keyboard state is a perfect
// match to shift+cmd+a, Baleada tests all of these arrays of
// potential aliases, checking the original keycombo to see
// if there's a match.
//
// It would match `shift`, `cmd`, and `a`, but when it gets to
// the aliases for `KeyB`, it would not find any match in the
// given keycombo. So in this case, Baleada would assert that
// shift+cmd+a is down, but the current keyboard state is not
// a perfect match to shift+cmd+a.
``` 
:::

The crucial steps here are step #2 (transforming aliases to arrays of down key codes) and step #5 (transforming down key codes to arrays of aliases that could match).

These steps are completely configurable, and as mentioned above, Baleada's default configuration is designed to work with a US keyboard layout, and support a few common aliases for each modifier key.

Here are some examples of how Baleada's default configuration transforms key aliases for a US keyboard layout:

::: ariaLabel="Examples of keycombo translation"
| Alias | Key codes | Notes |
| --- | --- | --- |
| `a` | `['KeyA']` | Simple aliases will just have one key code in their array |
| `!` | `['Shift', 'Digit1']` | Other aliases will have two key codes in their array, to assert that both keys must be pressed down to match the alias |
| `shift` | `['Shift']` | <p>Technically `Shift` is not a key code—the key codes on a US keyboard are `ShiftLeft` and `ShiftRight`.</p><p>But for modifier keys, Baleada supports these simpler translations—if the alias is translated to a key code without the `Left` or `Right` direction, Baleada will still be able to recognize the correct key.</p> |
:::

And here are some examples of how Baleada's default configuration transforms key codes into possible matching key aliases:



:::
### Customizing key alias translation
:::

Every Baleada function that accepts a keycombo as a parameter will also accept one or more optional parameters that allow you to customize the translation of key aliases to key codes. These parameters are:

:::
| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| `toDownCodes` | Function | See description | <p>A function that accepts a key alias and should return an array of key codes that represent that alias.</p><p>The default implementation, which supports a US keyboard layout, is [`fromAliasToDownCodes`](https://github.com/baleada/logic/blob/main/src/extracted/fromAliasToDownCodes.ts).</p> |
| `toAliases` | Function | See description | <p>A function that accepts a key code and should return an array of key aliases that it could possibly match.</p><p>The default implementation, which supports a US keyboard layout, is [`fromCodeToAliases`](https://github.com/baleada/logic/blob/main/src/extracted/fromCodeToAliases.ts).</p> |
:::
