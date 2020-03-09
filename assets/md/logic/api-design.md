---
title: API design
framework: agnostic
publish: true
order: 3
---

For any individual piece of UI logic, there are plenty of ways to implement it, and plenty of packages already published that can `npm install` your troubles away.

But implementing these things yourself, or learning the APIs of disparate packages, adds **complexity and mental overhead** to engineering tasks that are usually several steps removed from the actual business logic of the app or site you're building.

Baleada Logic implements all kinds of UI logic for you, which is nice! But arguably more important is the fact that Baleada Logic's classes and factories all have **predictable, intuitive APIs**. In other words, you can construct all classes and factories in the same way, you can customize their behavior in the same way, and you can access their state and methods in the same way.

:::
> Baleada Logic implements all kinds of UI logic for you, which is nice! But arguably more important is the fact that Baleada Logic's classes and factories all have **predictable, intuitive APIs**.
:::

To accomplish that, Baleada Logic's classes and factories all follow strict rules in these specific areas:
1. How they are **constructed**
2. How **state and methods** are made available to you
3. How classes & factories, their constructor options, their state, and their methods are **named**
4. Why classes and factories provide certain state and methods
5. Why constructors accept certain state and options

This guide explains all the core concepts, rules, and patterns that classes and factories follow. The words "all", "always", "any", and "never" are displayed in bold, to emphasize the rules that apply to every single class and subclass in Baleada Logic.


:::
## How to construct classes and factories
:::

You can access the functionality of **all** classes and factories by **constructing new instances** of them.

:::
```js
const instance = new Example(...)
```
:::

That `...` represents the arguments you'll pass to constructor functions. The basic arguments for class constructors differ slightly from those of subclass constructors. Details are explained below.


:::
### Class constructors
:::


**All** class constructors accept two parameters:
1. A piece of state (i.e. data—strings, arrays, objects, DOM elements, etc.),
2. An `options` object.

The `state` parameter is **always** required, and the `options` parameter is **always** optional. Given these parameters, the constructor **always** returns an instance of itself, which **always** takes the form of an Object with state and methods.

:::
```js
const instance = new Example(state[, options])

typeof instance // -> 'object'
```
:::

The `state` parameter is **always** used to pass a piece of state whose core functionality will be enhanced by the class. The `options` parameter is **always** an Object that serves as a catch-all for **all** optional parameters that affect how a class behaves.

:::
```js
const instance = new Example(state, {
  optionalBooleanParam: true,
  optionalStringParam: 'baleada',
  optionalFunctionParam: thing => doThe(thing)
})
```
:::


:::
### Factory functions
:::

Factory functions accept two parameters:
1. The piece of state that will be augmented with a new method prototype will be extended by the subclass.
2. An `options` object.

The `state` parameter is **always** required, and the `options` parameter is **always** optional. Given these parameters, the constructor **always** returns the original `state` in Object form, with one new method added.

For example, if you pass a String, the factory will return a String object, just like you would get if you passed your string to `new String()`.

:::
```js
// This example factory accepts a string
const instance = example('baleada')

instance instanceof String // -> true
typeof instance === 'string' // -> false

instance // -> { 0: "b", 1: "a", 2: "l", 3: "e", 4: "a", 5: "d", 6: "a", length: 7}
`${instance}` // -> 'baleada'
instance.toString() // -> 'baleada'
```
:::


:::
## How state and methods are made available to you
:::

:::
### Class state and methods
:::

Instances of classes take the form of JavaScript Objects, and **all** state and methods are accessible through the properties of those objects.

:::
```js
const instance = new Example(state)

instance.exampleState // Access state through properties
instance.exampleMethod() // Access methods through properties
```
:::

Class instances' methods **always** return the instance itself. The main benefit of this is that you can use method chaining if needed.

:::
```js
const instance = new Example(state)

instance.exampleMethod() // -> returns instance
instance
  .exampleMethod()
  .anotherMethod()
  .yetAnotherMethod() // -> Works 👍 and returns instance
```
:::


Class instances **always** store a version of their constructors' state in a public [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) named after the state's type (e.g. `string`, `array`, `keyframes`, etc.).

Class instances **always** have a public method you can use to set a new value for that public getter. The method follows a naming convention of `set<PropertyName>` (e.g. `setString`, `setArray`, `setKeyframes`, etc.).

The `set<PropertyName>` methods have two benefits:
1. Since they return the instance itself, you can method chain after updating your state
2. Internally, they perform **any** and **all** side effects and validation that should happen before or after updating state, so that you don't have to be concerned with those things.

:::
```js
// The Searchable class's constructor accepts an Array
const instance = new Searchable(['Baleada', 'Logic', 'Composition', 'Icons'])

instance.candidates // -> ['Baleada', 'Logic', 'Composition', 'Icons']
instance.setCandidates(['tortilla', 'beans', 'egg', 'avocado']) // updates the Searchable instance's candidates and its `trie` property, and returns the Searchable instance
instance.candidates  // -> ['tortilla', 'beans', 'egg', 'avocado']
```
:::

If you _don't_ need to method chain after updated your state, but you _do_ want to feel confident that side effects are performed correctly, you can simply assign a new value directly to the getter property. These getter properties also have their own [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) that pass your new value the `set<PropertyName>` method, ensuring that side effects and validation are performed.

:::
```js
const instance = new Searchable(['Baleada', 'Logic', 'Composition', 'Icons'])
instance.candidates = ['tortilla', 'beans', 'egg', 'avocado'] // Internally, the setter updates candidates performs the side effect of updating the `trie` property
instance.candidates // -> ['tortilla', 'beans', 'egg', 'avocado']
```
:::

Some classes, particularly those that were designed to capture text input from your end users, create additional public getters that you'll frequently need to update.

Those public getters follow **all** of the same rules:
- They each have a public method you can use to assign a new value to the property and perform necessary side effects and validation
- Those methods follow the same  `set<PropertyName>` naming convention
- If you assign a value to the property directly, its setter will still perform necessary side effects

:::
```js
// The Completeable class's constructor accepts a String
const instance = new Completeable('Baleada')

instance.string // -> 'Baleada'
instance.location // -> 0

instance.setString('tortilla') // --> returns instance
// OR
instance.string = 'tortilla' // Works just fine 👍


instance.setLocation('3') // --> returns instance
// OR
instance.location = 3 // Works just fine 👍
```
:::


**All** class instances also have one or more non-editable public getters. These getter properties share the following important characteristics:
1. They allow you to access state that is useful for building certain UI features, but is not part of the core functionality or benefit of the class.
2. **All** updates to the getter properties are considered side effects of other public methods.
3. You'll **never** find a situation where it would make sense for you to edit the property directly. You'll **always** rely on the instance to manage the properties' values, updating it after other methods are called.
4. When applicable, getter functions' behavior can be customized using properties in the `options` object that gets passed to the class constructor.

:::
```js
// The Animateable class's constructor accepts an array of keyframes
const instance = new Animateable(myKeyframes, myOptions)

instance.play() // Plays the animation (and returns the instance)
instance.progress.time // -> A number between 0 and 1 indicating the time progress of the animation. Updated at 60fps.
instance.progress.time = 3 // Doesn't work (and shouldn't work!)
```
:::

Some classes have side effects in the DOM that need to be cleaned up in order to avoid memory leaks. **All** of these classes have a public `stop` method that you can use to clean up.

:::
```js
// Listenable can be used to listen to DOM events, media queries, Observer entries, and window idle periods.
const instance = new Listenable(myEventType)

instance.listen(myCallback) // Adds event listeners, connects observers, etc.

instance.stop() // Removes all listeners, disconnects all observers, etc.
```
:::

::: type="info"
If you use [Baleada Composition](/docs/composition) to bring Balaeda Logic into a React, Vue, or Svelte component, all side effects will be cleaned up for you automatically at the end of the component's lifecycle.

So, when you're using Baleada Composition, you never need to call the `stop` method unless you want to clean up side effects somewhere in the middle of a component's lifecycle.
:::




:::
### Factory state and methods
:::

Objects returned by Baleada Logic's factories **never** have public state; they **always** have one method.

Factory functions **never** directly mutate the original state they receive. They **always** follow three main steps:
1. Create a copy of the original state (it's a deep copy of everything except objects inside Arrays or Maps)
2. Add a new method onto the copy
3. Return the copy

Furthermore, the method added by factory functions always has the following characteristics:
1. It **never** mutates the original object it was called on
2. It **always** creates a new, mutated copy of the object it was called on
3. It **always** passes the mutated copy back to the factory function and returns that value

:::
```js
// renameable is a factory function that allows a Map to easily rename one of its keys
const originalMap = new Map([['one', 'value'], ['two', 'value']]),
      renameableMap = renameable(originalMap),
      renamedMap = renameableMap.rename({ from: 'one', to: 'uno' })

originalMap // -> [['one', 'value'], ['two', 'value']]
renamedMap // -> [['uno', 'value'], ['two', 'value']]
typeof result.rename === 'function' // -> true
```
:::


:::
## Why classes & factories provide certain state and methods
:::

Baleada Logic follows a consistent process for determing which state and methods are provided by classes:
1. Identify one action or several related actions that would be useful in a user interface. These actions become methods on the class.
1. Identify the piece(s) of state that the action will be performed on. In other words, answer the question, "If this method were a standalone function, what would be a required argument?" Each answer to that question becomes a public, writeable property on the class.
2. Identify the piece(s) of state that would be useful for building certain UI features with the class' methods and public properties, but shouldn't be considered part of the core functionality or benefit of the class. Each identified piece of state becomes a getter on the class.



:::
## Why constructors accept certain state types and options
:::

:::
## Constructors' state types
:::

Baleada Logic uses a sentence template to decide what state type (e.g. String, Array, HTMLElement, etc.) should be accepted by a constructor:

:::
```
A `<state type>` can be `<action>`ed (by `<action arguments>`).
```
:::

For example, the `Searchable` class' core action is to search/fuzzy search an array of search candidates. The `Searchable` constructor's `state` parameter is the array of candidates, and the class has a `search` method that accepts a search query as its only argument. This fits into the sentence template nicely:

:::
```
**Search candidates** can be **searched** by a **query**.
```
:::

Some classes and factories have core actions that don't take arguments—in those cases, the last part of the sentence template is omitted. Take the `markupable` factory for example:

:::
```text
**Markdown** (String) can be **marked up**.
```
:::

And some classes have core actions that are actually private methods on the class, with more specific public methods that call the core private method under the hood. The `Animateable` class is a great example—it's constructor accepts an array of keyframes, and in order to animate those keyframes, it internally calls a private `animate` method when you call one of its more specific public methods: `play`, `reverse`, `seek`, or `restart`.

These types of classes still use that core action in their sentence template, even though it's accessed via a private method that you'll never use:

:::
```text
**Keyframes** (Array) can be **animated**.
```
:::



This sentence template ensures that **all** classes' and factories' methods are affordances. In other words, methods tell you what you can do with a given type of state, rather than what that type of state can do to itself or other things.

In the documentation for each individual library and subclass, you can find the filled-out sentence template, explaining why each class and subclass accepts its specific state type.


::: type="info"
The inspiration and motivation for this sentence template came from [Adam Wathan's "Resisting Complexity" talk](https://www.youtube.com/watch?v=dfgtKb-VpRk).
:::

:::
## Constructors' options
:::

Constructors only accept options that:
- Initialize public properties
- Customize the behavior of getter functions
- Pass the `on<Method>` callback functions described earlier in this article

Constructors **never** accept options that customize the behavior of public methods, they **always** allow those options to be passed to the method itself as a parameter.


:::
## Naming conventions
:::

Classes and factories are named after their core action, suffixed with `able`. Class names are proper-cased, and factory names are all lowercase.

Here are a few examples:

::: ariaLabel="Comparison of classes' and factories' core actions and names"
| Core action | Type | Name |
| --- | --- | --- |
| search | class | `Searchable` |
| listen | class | `Listenable` |
| navigate | class | `Navigateable` |
| copy | class | `Copyable` |
| reorder | factory | `reorderable` |
| delete | factory | `deleteable` |
:::

Note that in correct English grammar, the `-able` form of a word is not always this simple. There are a number of ways the grammar can be more complex:
- Often (but not always), when a word ends in `e`, the `e` is ommitted before adding `able`
- Words that end in `y` usually change the `y` to an `i` before adding `able`
- Some words omit several letters from the end of the word before adding `able`

Instead of relying on you to know all these rules of English grammar, Baleada Logic simply breaks them in favor of consistency and predictability. In Baleada Logic classes and factories, the name is **always** just the core action followed by `able`—no strange word modification, no guessing about whether or not the `e` is excluded before `able`, no replacing `y` with `i`, etc.

In the table below, you can explore some examples of core actions, class/factory names, and their proper English counterparts:

::: ariaLabel="Comparison of classes' and factories' core actions, names, and proper English counterparts" classes="wide-4"
| Core action | Class/factory name | Proper English name | Notes |
| --- | --- | --- | --- |
| search | `Searchable` | Searchable | Easy one! The proper English version is the same. |
| copy | `Copyable` | Copiable | Proper English changes `y` to `i` before `able` 🤢 |
| delete | `deleteable` | deletable | Proper English removes the `e` before `able` 😠 |
| rename | `renameable` | renameable | Oh, this one ends in `e` too? Proper English says "f*ck it, leave it in" 🤬 |
| navigate | `Navigateable` | Navigable | Proper English removes `ate` and just uses the stem `Navig` before adding `able` 🤮 |
| reorder | `reorderable` | reorderable | Phew, another easy one! Proper English plays nice here. |
:::

In conclusion, English grammar is annoying, so Baleada Logic ignores it and names everything using the `<core action>able` convention.

:::
> Proper English grammar is annoying. Baleada Logic's naming convention breaks its rules in favor of simplicity, consistency, and predictability.
:::
