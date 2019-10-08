---
title: API design
framework: agnostic
publish: true
order: 1
---

For any individual piece of UI logic, there are plenty of ways to implement it, and plenty of packages already published that can `npm install` your troubles away. But implementing these things yourself, or learning the APIs of disparate packages, adds **complexity and mental overhead** to engineering tasks that are usually a few steps removed from the actual business logic of the app or site you're building.

Baleada Logic implements all kinds of UI logic for you, which is nice, but arguably more important is the fact that Baleada Logic's classes and subclasses all have **predictable, intuitive APIs**. In other words, you can construct all classes and subclasses in the same way, you can customize their behavior in the same way, and you can access their state and methods in the same way.

To accomplish that, Baleada Logic's classes and subclasses all follow strict rules in three specific areas:
1. How they are **constructed**
2. How **state and methods** are made available to you
3. How they, their constructor options, their state, and their methods are **named**

This guide explains all the core concepts, rules, and patterns that classes and subclasses follow. The words "all", "always", and "never" are displayed in bold, to emphasize the rules that apply to every single class and subclass in Baleada Logic.


<NiftyHeading level="2">
Constructing classes and subclasses
</NiftyHeading>

You can access the functionality of **all** classes and subclasses by **constructing new instances** of them.

<NiftyCodeblock>

```js
const instance = new Example(...)
```

</NiftyCodeblock>

That `...` represents the arguments you'll pass to constructor functions. The basic arguments for class constructors differ slightly from those of subclass constructors. Details are explained below.


<NiftyHeading level="3">
Class constructors
</NiftyHeading>


All classes' constructors accept two parameters:
1. A piece of state (i.e. data—strings, arrays, objects, DOM elements, etc.),
2. An `options` object.

The `state` parameter is **always** required, and the `options` parameter is **always** optional. Given these parameters, the constructor **always** returns an instance of itself, which **always** takes the form of an Object.

<NiftyCodeblock>

```js
const instance = new Example(state[, options])

typeof instance // --> 'object'
```

</NiftyCodeblock>

The `state` parameter is **always** used to pass a piece of state whose core functionality will be enhanced by the class. The `options` parameter is **always** an Object that serves as a catch-all for **all** optional parameters that affect how a class behaves.

<NiftyCodeblock>

```js
const instance = new Example(state, {
  optionalBooleanParam: true,
  optionalStringParam: 'baleada',
  optionalFunctionParam: thing => doThe(thing)
})
```

</NiftyCodeblock>


<NiftyHeading level="3">
Subclass constructors
</NiftyHeading>

Subclass constructors accept only one parameter: the piece of state whose prototype will be extended by the subclass. Given this parameter, the subclass will **always** return an object that is an instance of the prototype it's extending.

<NiftyCodeblock>

```js
// The Example subclass extends String in this example
const instance = new Example(state)

instance instanceof String // --> true
```

</NiftyCodeblock>


<NiftyHeading level="2">
How state and methods are made available to you
</NiftyHeading>

<NiftyHeading level="3">
Class state and methods
</NiftyHeading>

Classes take the form of JavaScript Objects, and **all** state and methods are accessible through the properties of those objects.

<NiftyCodeblock>

```js
const instance = new Example(state)

instance.exampleState // Access state through properties
instance.exampleMethod() // Access methods through properties
```

</NiftyCodeblock>

Classes methods **always** return the instance through which they were called. The benefit of this is that you can use method chaining if needed.

<NiftyCodeblock>

```js
const instance = new Example(state)

instance.exampleMethod() // -> returns instance
instance
  .exampleMethod()
  .anotherMethod()
  .yetAnotherMethod() // -> Works 👍 and returns instance
```

</NiftyCodeblock>


Classes **always** store a shallow copy of their constructors' state in a public property named after the state's type (e.g. `string`, `array`, etc.).

Classes also **always** have a public method you can use to assign a new value to that public property. The method follows a naming convention of `set<PropertyName>` (e.g. `setString`, `setArray`, etc.).

<NiftyCodeblock>

```js
// The Searchable class's constructor accepts an Array
const instance = new Searchable(['Baleada', 'Logic', 'Composition', 'Icons'])

instance.array // --> ['Baleada', 'Logic', 'Composition', 'Icons']
instance.setArray(['tortilla', 'beans', 'egg', 'avocado']) // --> returns instance
instance.array  // --> ['tortilla', 'beans', 'egg', 'avocado']
```

</NiftyCodeblock>

Some classes, particularly those that were designed to capture input from your end users, have additional public properties. Those classes also **always** have public methods you can use to assign a new value to the additional public properties, and those methods follow the same  `set<PropertyName>` naming convention.

<NiftyCodeblock>

```js
// The Completable class's constructor accepts a String
const instance = new Completable('Baleada')

instance.string // --> 'Baleada'
instance.location // --> 0

instance.setString('tortilla') // --> returns instance
instance.setLocation('3') // --> returns instance
```

</NiftyCodeblock>


Note that public properties are writeable—it's possible to assign values to them directly. But, in some classes, certain side effects need to be performed after writing to public properties, to make sure everything keeps working properly. When this is the case, the classes' `set<PropertyName>` methods will perform **all** necessary side effects, and you won't have to think about them. Because of that, it's **always** recommended that you use the `set<PropertyName>` methods instead of writing to public properties directly.


<NiftyCodeblock>

```js
// The Syncable class's constructor accepts state of any type
const instance = new Syncable('Baleada')

instance.state // --> 'Baleada'
instance.editableState // --> 'Baleada'

/*
 * It's possible to write to instance.state directly.
 * However, for Syncable to work correctly, instance.editableState
 * should be edited at the same time to avoid unexpected behavior.
 */
instance.state = 'Logic' // --> It works
instance.state // --> 'Logic'
instance.editableState // --> 'Baleada'

/*
 * If you use instance.setState instead, the required side effect
 * (updating instance.editableState) is taken care of by Syncable.
 */
instance.setState('🌮')
instance.state // --> '🌮'
instance.editableState // --> '🌮'
```

</NiftyCodeblock>


Outside of `set<PropertyName>` methods, classes **never** write to their own public properties.

However, some classes do have public methods that create mutated versions of one or more public properties' values. These classes **always** accept an `on<Method>` option, where `<Method>` is the name of the public method that mutates the values. The `on<Method>` option is **always** a function gets called after you call `instance.<Method>`, and `on<Method>` **always** accepts two parameters: the mutated value, and the instance itself (i.e. `this`).

Instead of writing the mutated value to its own public property after you call `instance.<Method>`, the class will pass the mutated value as the first argument of your `on<Method>` function.


<NiftyCodeblock>

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

</NiftyCodeblock>

These `on<Method>` functions are a great way to hook into state changes and run code just before or just after the state change actually happens. However, for ease of use, **all** classes that accept `on<Method>` functions already have sensible default functions that set state for you.

<NiftyCodeblock>

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

</NiftyCodeblock>


All classes also have one or more public [getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get). When you access these getters, they compute and return state that is useful for building certain UI features, but is not part of the core functionality or benefit of the class.

<NiftyCodeblock>

```js
const instance = new Completable(
  'Baleada: a toolkit',
  { segmentsFromDivider: true }
)

instance.segment // --> 'toolkit'
instance.segment = 'Baleada' // Doesn't work, since instance.segment is a getter
```

</NiftyCodeblock>

Some classes don't have any methods that create mutated versions of the values in their public properties. These classes **always** have one or more other public methods that expose their core functionality. These methods **never** have `on<Method>` functions associated with them, because they aren't creating any mutated state, so there is nothing valuable to pass to the functions.

<NiftyCodeblock>

```js
// The Animatable class's constructor accepts a Node or NodeList
const instance = new Animatable(mySelectedElement, myAnimationOptions)

instance.play() // -> Plays an animation and returns the instance, but does nothing else
```

</NiftyCodeblock>


<NiftyHeading level="3">
Subclass state and methods
</NiftyHeading>

Baleada Logic's subclasses **never** have public state; they **always** have only one public method.

...WIP


<NiftyHeading level="2">
Naming conventions
</NiftyHeading>

WIP
