---
title: API design
framework: agnostic
publish: true
order: 3
---

For any individual piece of UI logic, there are plenty of ways to implement it, and plenty of packages already published that can `npm install` your troubles away.

But implementing these things yourself, or learning the APIs of disparate packages, adds **complexity and mental overhead** to engineering tasks that are usually several steps removed from the actual business logic of the app or site you're building.

Baleada Logic implements all kinds of UI logic for you, which is nice, but arguably more important is the fact that Baleada Logic's classes and factories all have **predictable, intuitive APIs**. In other words, you can construct all classes and factories in the same way, you can customize their behavior in the same way, and you can access their state and methods in the same way.

::: canTweet
> Baleada Logic implements all kinds of UI logic for you, which is nice, but arguably more important is the fact that Baleada Logic's classes and factories all have **predictable, intuitive APIs**.
:::

To accomplish that, Baleada Logic's classes and factories all follow strict rules in these specific areas:
1. How they are **constructed**
1. How **state and methods** are made available to you
1. How classes & factories, their constructor options, their state, and their methods are **named**
1. Why classes and factories provide certain state and methods
1. Why constructors accept certain state and options

This guide explains all the core concepts, rules, and patterns that classes and factories follow. The words "all", "always", and "never" are displayed in bold, to emphasize the rules that apply to every single class and subclass in Baleada Logic.


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

typeof instance // --> 'object'
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

instance instanceof String // --> true
typeof instance === 'string' // --> false

instance // --> { 0: "b", 1: "a", 2: "l", 3: "e", 4: "a", 5: "d", 6: "a", length: 7}
`${instance}` // -> 'baleada'
instance.toString() // --> 'baleada'
```
:::


:::
## How state and methods are made available to you
:::

:::
### Class state and methods
:::

Classes take the form of JavaScript Objects, and **all** state and methods are accessible through the properties of those objects.

:::
```js
const instance = new Example(state)

instance.exampleState // Access state through properties
instance.exampleMethod() // Access methods through properties
```
:::

Classes methods **always** return the instance through which they were called. The benefit of this is that you can use method chaining if needed.

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




Classes **always** store a shallow copy of their constructors' state in a public property named after the state's type (e.g. `string`, `array`, etc.).

Classes also **always** have a public method you can use to assign a new value to that public property. The method follows a naming convention of `set<PropertyName>` (e.g. `setString`, `setArray`, etc.).

:::
```js
// The Searchable class's constructor accepts an Array
const instance = new Searchable(['Baleada', 'Logic', 'Composition', 'Icons'])

instance.array // --> ['Baleada', 'Logic', 'Composition', 'Icons']
instance.setArray(['tortilla', 'beans', 'egg', 'avocado']) // --> returns instance
instance.array  // --> ['tortilla', 'beans', 'egg', 'avocado']
```
:::

Some classes, particularly those that were designed to capture input from your end users, have additional public properties. Those classes also **always** have public methods you can use to assign a new value to the additional public properties, and those methods follow the same  `set<PropertyName>` naming convention.

:::
```js
// The Completable class's constructor accepts a String
const instance = new Completable('Baleada')

instance.string // --> 'Baleada'
instance.location // --> 0

instance.setString('tortilla') // --> returns instance
instance.setLocation('3') // --> returns instance
```
:::


Note that public properties are writeable—it's possible to assign values to them directly. But, in some classes, certain side effects need to be performed after writing to public properties, to make sure everything keeps working properly. When this is the case, the classes' `set<PropertyName>` methods will perform **all** necessary side effects, and you won't have to think about them. Because of that, it's **always** recommended that you use the `set<PropertyName>` methods instead of writing to public properties directly.


:::
```js
// The Editable class's constructor accepts state of any type
const instance = new Editable('Baleada')

instance.state // --> 'Baleada'
instance.editableState // --> 'Baleada'

/*
 * It's possible to write to instance.state directly.
 * However, for Editable to work correctly, instance.editableState
 * should be edited at the same time to avoid unexpected behavior.
 */
instance.state = 'Logic' // --> It works
instance.state // --> 'Logic'
instance.editableState // --> 'Baleada'

/*
 * If you use instance.setState instead, the required side effect
 * (updating instance.editableState) is taken care of by Editable.
 */
instance.setState('🌮')
instance.state // --> '🌮'
instance.editableState // --> '🌮'
```
:::


Outside of `set<PropertyName>` methods, classes **never** write to their own public properties.

However, some classes do have public methods that create mutated versions of one or more public properties' values. These classes **always** accept an `on<Method>` option, where `<Method>` is the name of the public method that mutates the values. The `on<Method>` option is **always** a function gets called after you call `instance.<Method>`, and `on<Method>` **always** accepts two parameters: the mutated value, and the instance itself (i.e. `this`).

Instead of writing the mutated value to its own public property after you call `instance.<Method>`, the class will pass the mutated value as the first argument of your `on<Method>` function.


:::
```js
let totalStringCompletions = 0

const instance = new Completable('Baleada', {
  onComplete: (completedString, instance) {
    instance.setString(completedString)
    totalStringCompletions++
  }
})

instance.string // --> 'Baleada'
totalStringCompletions // --> 0

/*
 * When you call instance.complete, the Completable instance will create
 * a mutated version of instance.string. Then, it will call your
 * onComplete function, passing the mutated version of instance.string
 * AND itself as the two arguments.
 *
 * In this example, your onComplete function will set instance.string
 * to the new value and will mutate the external variable,
 * totalStringCompletions.
 */
instance.complete('Baleada: a toolkit for building web apps')
instance.string // --> 'Baleada: a toolkit for building web apps'
totalStringCompletions // --> 1
```
:::

These `on<Method>` functions are a great way to hook into state changes and run code just before or just after the state change actually happens. However, for ease of use, **all** classes that accept `on<Method>` functions already have sensible default functions that set state for you.

:::
```js
const instance = new Completable('Baleada') // Completable has a default onComplete function defined for you

instance.string // --> 'Baleada'

/*
 * When you call instance.complete, the Completable instance will create
 * a mutated version of instance.string. Then, it will call its default
 * onComplete function, passing the mutated version of instance.string
 * AND itself as the two arguments.
 *
 * Completable's default onComplete function will set instance.string
 * to the new value.
 */
instance.complete('Baleada: a toolkit for building web apps')
instance.string // --> 'Baleada: a toolkit for building web apps'
```
:::


All classes also have one or more public [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). When you access these getters, they compute and return state that is useful for building certain UI features, but is not part of the core functionality or benefit of the class.

:::
```js
const instance = new Completable(
  'Baleada: a toolkit',
  { segmentsFromDivider: true }
)

instance.segment // --> 'toolkit'
instance.segment = 'Baleada' // Doesn't work, since instance.segment is a getter
```
:::

Some classes don't have any methods that create mutated versions of the values in their public properties. These classes **always** have one or more other public methods that expose their core functionality. These methods **never** have `on<Method>` functions associated with them, because they aren't creating any mutated state, so there is nothing valuable to pass to the functions.

:::
```js
// The Animatable class's constructor accepts a Node or NodeList
const instance = new Animatable(mySelectedElement, myAnimationOptions)

instance.play() // -> Plays an animation and returns the instance, but does nothing else
```
:::

Some classes have side effects that need to be cleaned up in order to avoid memory leaks. **All** of these classes have a public `stop` method that you can use to clean up.

:::
```js
// Listenable can be used to listen to DOM events, media queries, Observer entries, and window idle periods.
const instance = new Listenable(myEventType)

instance.listen(myCallback) // --> Adds event listeners, connects observers, etc.

instance.stop() // -> Removes all listeners, disconnects all observers, etc.
```
:::

::: type="info"
If you use [Baleada Composition](/docs/composition) to bring Balaeda Logic into a React, Vue, or Svelte component, all side effects will be cleaned up for you automatically at the end of the component's lifecycle.

So, when you're using Baleada Composition, you never need to call the `stop` method unless you want to clean up side effects somewhere in the middle of a component's lifecycle.
:::




:::
### Factory state and methods
:::

Baleada Logic's factories **never** have public state; they **always** have one method.

Factories' public methods **never** mutate the original state passed to their constructors. They **always** follow three main steps:
1. Create a mutated version of the original state
2. Pass it to their own constructor along with any options you originally passed
3. Return the new instance

Thus, factories always return a new instance of themselves, respecting any original options you passed.

:::
```js
// Renamable is a subclass of Map that allows the map to easily rename one of its keys
const originalMap = [['one', 'value'], ['two', 'value']],
      instance = new Renamable(originalMap),
      renamedMap = instance.invoke('one', 'uno')

originalMap // -> [['one', 'value'], ['two', 'value']]
renamedMap // -> [['uno', 'value'], ['two', 'value']]
renamedMap instanceof Renamable // -> true
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

For example, the `Searchable` class' core action is to search/fuzzy search an array of items. The `Searchable` constructor's `state` parameter is an Array, and the class has a `search` method that accepts a search query as its only argument. This fits into the sentence template nicely:

:::
```
An **Array** can be **searched** by a **query**.
```
:::

Some classes and factories have core actions that don't take arguments—in those cases, the last part of the sentence template is omitted. Take the `markupable` factory for example:

:::
```text
**Markdown** (String) can be **marked up**.
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

WIP
