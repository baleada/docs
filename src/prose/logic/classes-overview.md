---
title: Classes
tags: UI Logic
publish: true
order: 2
---

In Baleada Logic, lots of UI logic is implemented in [JavaScript classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes). Classes are designed to collocate pieces of related state, and provide methods for working with that state.

Unlike Baleada Logic's [pipes](/docs/logic/pipes-overview), which are more like utility functions, classes are tailor-made for pretty specific browser-based UI features.

Here's a quick example of how you would construct and use one of the classes to manage some of the state needed for a tablist component:

:::
```js
import { Navigateable } from '@baleada/logic'

const tabs = new Navigateable(['Tab #1', 'Tab #2', 'Tab #3'])

tabs.location // 0
tabs.next()
tabs.location // 1
```
:::

You can pair Baleada Logic classes with reactivity tools like [Vue](https://v3.vuejs.org) to perform side effects based on state changes:

:::
```js
import { Navigateable } from '@baleada/logic'
import { ref, watch } from 'vue'

// Create the Navigateable instance as a reactive Vue object
const tabs = ref(
  new Navigateable(['Tab #1', 'Tab #2', 'Tab #3'])
)

// Watch the instance's location property for changes.
// When a change is detected, update the DOM to activate
// a new tab.
watch(
  () => tabs.value.location,
  () => {
    const tabPanels = document.querySelectorAll('.tab-panel')
    tabPanels.forEach(panel => panel.setAttribute('aria-hidden', 'true'))

    const activeTabPanel = tabPanels[tabs.value.location]
    activeTabPanel.setAttribute('aria-hidden', '')
  }
)
```
:::

To learn more, visit the docs for each class exported by Baleada Logic. For a complete list of available classes, see the **Classes** section under the **Logic** heading in the left sidebar.

If you'd like to dive deeper in the design rules and principles behind Baleada Logic's classes, keep reading!


:::
## API design
:::

For any individual piece of UI logic, there are plenty of ways to implement it, and plenty of packages already published that can `npm install` your troubles away.

But implementing these things yourself, or learning the APIs of disparate packages, adds **complexity and mental overhead** to engineering tasks that are usually several steps removed from the actual business logic of the app or site you're building.

Baleada Logic's classes implement all kinds of UI logic for you, which is nice! But arguably more important is the fact that these classes all share a **consistent, predictable design**.

In other words, you can construct all classes in the same way, you can customize their behavior in the same way, and you can access their state and methods in the same way.

:::
> Baleada Logic's classes implement all kinds of UI logic for you, which is nice! But arguably more important is the fact that these classes all share a **consistent, predictable design**.
:::

To accomplish that, classes all follow strict rules in these specific areas:
1. How they are **constructed**
2. How **state and methods** are made available to you
3. How methods accept **arguments**
4. How classes, their constructor options, their state, and their methods are **named**
5. Why classes provide certain state and methods
6. Why constructors accept certain state and options

The rest of this guide explains all the rules that classes follow. The words "all", "always", "any", and "never" are displayed in bold, to emphasize that the rules apply to every single class offered in Baleada Logic.

Final note before we dive in: Baleada Logic is entirely written in TypeScript. This guide on API design is a good overview, but in practice, it's easier to rely on type hints and autocomplete to keep track of constructor parameters, instance properties, method parameters, etc.


:::
## How to construct classes
:::

You can access the functionality of **all** classes by constructing new instances of them.

:::
```js
const instance = new ExampleClass(...)
```
:::

That `...` represents the arguments you'll pass to constructor functions. **All** class constructors accept two parameters:
1. A piece of state
2. An `options` object.

The `state` parameter is **always** required, and the `options` parameter is **always** optional. Given these parameters, the constructed instance **always** takes the form of an object with state and methods.

:::
```js
const instance = new ExampleClass(state[, options])

typeof instance // -> 'object'
```
:::

The `state` parameter is **always** used to pass a piece of state whose core functionality will be enhanced by the class. The `options` parameter is **always** an object that serves as a catch-all for **all** optional parameters that affect how a class behaves.

:::
```js
const instance = new ExampleClass(state, {
  option_1: true,
  option_2: 'baleada',
  option_3_: thing => doThe(thing)
})
```
:::

Class constructors **never** access the DOM internally. This ensures that you can construct any class in a server environment, or on the client side before your JavaScript has access to the DOM.


:::
## How state and methods are made available to you
:::

Instances of classes take the form of JavaScript Objects, and **all** state and methods are accessible through the properties of those objects.

:::
```js
const instance = new ExampleClass(state)

instance.exampleState // Access state through properties
instance.exampleMethod() // Access methods through properties
```
:::

Class instances' methods **always** return the instance itself. The main benefit of this is that you can use method chaining if needed.

:::
```js
const instance = new ExampleClass(state)

instance.exampleMethod() // -> returns instance
instance
  .exampleMethod()
  .anotherMethod()
  .yetAnotherMethod() // -> Works 👍 and returns instance
```
:::

Class instances **always** store their constructors' `state` in a public [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get) named after the state's type (e.g. `string`, `array`, `keyframes`, etc.).

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

If you _don't_ need to method chain after updated your state, but you _do_ want to feel confident that side effects are performed correctly, you can assign a new value directly to the getter property. These getter properties also have their own [setters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) that pass your new value the `set<PropertyName>` method, ensuring that side effects and validation are performed.

:::
```js
const instance = new Searchable(['Vue', 'React', 'Svelte'])

// Internally, the setter that updates `candidates` also
// performs the side effect of updating the `searcher` property
instance.candidates = ['tortilla', 'beans', 'egg', 'avocado']
instance.candidates // -> ['tortilla', 'beans', 'egg', 'avocado']
instance.searcher // -> Updated based on the new candidates
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
// It's `selection` property is used to get and set selection ranges
const instance = new Completeable('Baleada')

instance.string // -> 'Baleada'
instance.selection // -> { start: 6, end: 6 }

instance.setString('tortilla') // --> returns instance
// OR
instance.string = 'tortilla' // Works just fine 👍


instance.setSelection({ start: 0, end: instance.string.length }) // --> returns instance
// OR
instance.selection = { start: 0, end: instance.string.length } // Works just fine 👍
```
:::

**All** class instances also have one or more non-editable public getters. These getter properties share the following important characteristics:
1. They allow you to access state that is useful for building certain UI features, but is not part of the core functionality or benefit of the class.
2. **All** updates to the getter properties are considered side effects of other public methods.
3. You'll **never** find a situation where it would make sense for you to edit the property directly. You'll **always** rely on the instance to manage the getter properties' values, updating them after other methods are called.
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
If you use [Baleada Composition](/docs/composition) to bring Baleada Logic into a Vue component, all side effects will be cleaned up for you automatically at the end of the component's lifecycle.

So, when you're using Baleada Composition, you never need to call the `stop` method unless you want to clean up side effects somewhere in the middle of a component's lifecycle.
:::

:::
## What arguments methods accept
:::

Some methods don't accept any parameters, but the ones that do accept parameters **always** follow consistent rules, based on how many parameters are required or optional:

::: ariaLabel="Method parameter rules"
| Total required parameters | Total optional parameters | Method's design |
| --- | --- | --- |
| 1 | 0 | First argument is the required parameter. |
| More than 1 | 0 | First argument is an object that contains all required parameters. |
| 0 | More than 0 | First argument is an object that contains all optional parameters. |
| 1 | More than 0 | First argument is the required parameter. Second argument is an object that contains all optional parameters. |
| More than 1 | More than 0 | First argument is an object that contains all required parameters. Second argument is an object that contains all optional parameters. |
:::

::: type="info"
Methods **never** accept more than two arguments.
:::


:::
## Why classes provide certain state and methods
:::

Baleada Logic follows a consistent process for determining which state and methods are provided by classes:
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

For example, the `Searchable` class' core action is to search or fuzzy search an array of search candidates. The `Searchable` constructor's `state` parameter is the array of candidates, and the class has a `search` method that accepts a search query as its only argument. This fits into the sentence template nicely:

:::
```
**Search candidates** can be **searched** by a **query**.
```
:::

Some classes have core actions that don't take arguments—in those cases, the last part of the sentence template is omitted. Take the `Sanitizeable` class for example:

:::
```text
**HTML** (String) can be **sanitized**.
```
:::

And some classes have core actions that are actually private methods on the class, with more specific public methods that call the core private method under the hood. The `Animateable` class is a great example—it's constructor accepts an array of keyframes, and in order to animate those keyframes, it internally calls a private `animate` method when you call one of its more specific public methods: `play`, `reverse`, `seek`, or `restart`.

These types of classes still use that core action in their sentence template, even though it's accessed via a private method that you'll never directly use:

:::
```text
**Keyframes** (Array) can be **animated**.
```
:::

This sentence template helps ensure that **all** classes' methods are **affordances**. In other words, methods tell you what you can do with a given type of state, rather than what that type of state can do to itself or other things.

In the "API design compliance" section in the documentation for each individual class, you can find the filled-out sentence template, explaining why that class accepts its specific state type.


::: type="info"
The inspiration and motivation for this sentence template came from [Adam Wathan's "Resisting Complexity" talk](https://www.youtube.com/watch?v=dfgtKb-VpRk).
:::

:::
## Constructors' options
:::

Constructors only accept options that:
- Initialize public properties
- Customize the behavior of getter functions

Constructors **never** accept options that customize the behavior of public methods. Those kinds of options are **always** passed to the method itself as an optional parameter.


:::
## Naming conventions
:::

Classes are named after their core action, suffixed with `able`. Class names are proper-cased.

Here are a few examples:

::: ariaLabel="Examples of classes' names"
| Core action | Type | Name |
| --- | --- | --- |
| search | class | `Searchable` |
| listen | class | `Listenable` |
| navigate | class | `Navigateable` |
| copy | class | `Copyable` |
| animate | pipe | `Animateable` |
:::

Note that in correct English grammar, the `-able` form of a word is not always this simple. There are a number of ways the grammar can be more complex:
- Often (but not always), when a word ends in `e`, the `e` is omitted before adding `able`
- Words that end in `y` usually change the `y` to an `i` before adding `able`
- Some words omit several letters from the end of the word before adding `able`

Instead of relying on you to know all these rules of English grammar, Baleada Logic simply breaks them in favor of consistency and predictability. In Baleada Logic classes, the name is **always** just the core action followed by `able`—no strange word modification, no guessing about whether or not the `e` is excluded before `able`, no replacing `y` with `i`, etc.

In conclusion, English grammar is annoying, so Baleada Logic ignores it and names everything using the `<core action>able` convention.

:::
> Proper English grammar is annoying. Baleada Logic's naming convention breaks its rules in favor of simplicity, consistency, and predictability.
:::

