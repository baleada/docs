---
title: Identifying UI logic
tags: UI logic, Vue, React, Svelte
publish: true
order: 1
---

:::
## UI features are composed from logic.
:::

The big idea behind Baleada Logic, [React Hooks](https://reactjs.org/docs/hooks-intro.html), the [Vue composition API](https://vue-composition-api-rfc.netlify.com/), and functional programming in general is that the easiest way to create large, complex UI features is to **compose** them from smaller pieces of UI logic. Learning how to identify the discrete pieces of UI logic hidden inside of bigger UI features is the key to success with Baleada Logic.

:::
> The easiest way to create large, complex UI features is to **compose** them from smaller pieces of UI logic.
:::

For example, imagine you want to add an autocomplete feature to your UI, so that the end user can start typing, be prompted with matching options, and pick one to automatically complete the text they were typing.

At first glance, you might think of "autocomplete" as the piece of UI logic you need to create, but autocomplete can actually be broken down into several smaller pieces of logic:
:::
1. As the user is typing, you need to extract the segment of their text that can be completed. In a simple text input, this is the entire value, but in a large text area, it's more likely to be just the current word the user is typing.
2. You need to search a list of autocomplete options, using your segment of text as a search query. The search should fuzzy match, in case the user makes a typo.
3. You need to display the search results in a dropdown menu on the screen. For the best user experience, the dropdown menu should reposition itself automatically, making sure that options are still visible if the user scrolls and changes the amount of available screen space.
4. The dropdown menu should be keyboard accessible. Up and down arrow keys should move options into focus. If the user is at the bottom of the list and presses the down arrow again, you should move focus back to the top of the list.
5. When the user selects an option, you need to replace the original segment of text with the completed version.
:::

Using tools from Baleada Logic, you would approach this list of logic like so:
1. [`Completable`](/docs/logic/classes/completeable) extracts the segment of text
2. [`Searchable`](/docs/logic/classes/searchable) searches a list of options for the segment (fuzzy matching is optional)
3. [`Listenable`](/docs/logic/classes/listenable) detects when the dropdown menu starts leaving the viewport, and gives you some information so that you can simply apply a CSS `transform: translate` to move the menu into a visible spot.
4. [`Navigable`](/docs/logic/classes/navigateable) tracks which option should be in focus, and can loop around to the beginning or end of the list as needed.
5. `Completable` completes the segment of text with a completed value chosen by the user.

It might seem strange to break this feature down and implement it with so many separate tools, but this approach is what allows logic to become abstract enough to be reusable. An autocomplete feature is only useful in situations where you need to autocomplete, but a fuzzy-matching search feature is useful in all kinds of different places.

Anyway, that's the basic concept, but let's explore some more concrete examples of how individual Baleada Logic tools can be reused across various UI features.


:::
## A simple example of reusability
:::

Consider these components, which appear in all kinds of user interfaces:
- Carousel
- Custom dropdown menu
- Date picker
- Solitaire

(Ok fine, solitaire isn't common—but you'll see that a solitaire component's behavior has a lot more in common with carousels, dropdowns, and date pickers than you might think!)

Visually, these components are so different that it feels clean and correct to build them all in isolation, or install isolated packages that contain them. But if you look more closely, these components share a decent number of different behaviors:

::: ariaLabel="Behaviors that carousels, dropdowns, date pickers, and solitaire have in common" classes="wide-1"
| Behavior | Carousel | Dropdown | Date picker | Solitaire |
| --- | --- | --- | --- | --- |
| Click a button or use an arrow key to move backward or forward | yes | yes | yes | yes |
| Loop back to the beginning after navigating forwards past the last item | usually | yes | N/A  | yes |
| Loop back to the end after navigating backwards past the first item | usually | yes | N/A | no |
| Go to a specific item | yes | not usually | yes | no |
| Move forward and back in custom increments | yes, if the carousel displays more than 1 image at a time | no | yes | yes (3-card or 1-card advance) |
| Go to a random item | sometimes | no | sometimes | no |
:::

Across each of these components, the code that implements this collection of array-navigating behaviors is more or less the same. But when you're using Baleada Logic, you don't have to write or install the same array-navigating code separately for each one of those components.

Instead, you just build your array of images, dropdown options, years/months/days, or playing cards, and you pass the array to the constructor of `Navigable`—one of Baleada Logic's classes—to create an instance of the `Navigable` class.

The `Navigable` class has all the methods you need to navigate forward, backward, to a specific item, or even to a random item. Its methods for moving forward and backward can handle custom increments (e.g. moving forward 3 cards in solitaire) and can loop around to the beginning or end of the array (both features are optional based on parameters you pass to the method when it's called).

Array navigation is on the simpler end of the UI logic spectrum, but it's a great example of logic that can easily get tangled up and repeated inside seemingly unrelated components instead of being extracted into something more reusable and feature-complete.

:::
> Array navigation is a great example of logic that can easily get tangled up and repeated inside seemingly unrelated components instead of being extracted into something more reusable and feature-complete.
:::


:::
## A more complex example of reusability
:::

For something more complex, imagine you're building the following components:
- Custom image component for a social networking app
- A sidebar navigation menu for a documentation site
- A message in an inbox
- A wrapper component (or maybe just a plain function) that detects user mouse movements, computes analytics, and sends the analytics to a server

These components are wildly different, but let's double-check some of the behaviors these components should have, to see if we can find similarities:

::: ariaLabel="Behaviors that image components and navigation menus need" classes="wide-1"
| Behavior | Custom image | Sidebar nav | Inbox message | Analytics wrapper |
| --- | --- | --- | --- | --- |
| Don't load the resource until the element is visible | yes | no | it's possible | no |
| Do something when the user hits a specific keystroke | no | yes (toggle dark mode) | yes (reply all, compose new message, etc.) | no |
| Do something when the user moves the mouse | no | no | no | yes (store mouse position for analytics) |
| Do something when the user double taps | yes ("like" the image) | no | probably not | no |
| Do something when the user swipes right | yes (initiate mating sequence) | yes (on mobile, open the menu) | yes (archive the message) | no |
| Do something when the user is idle | no | no | yes (save draft reply) | yes (compute and send analytics) |
:::

Hmm...okay, it looks like some of these behaviors overlap, but not that closely.

Notice, however, that every single one of these behaviors has a similar structure: when something specific happens, take an action. To be more precise: when an event or combination of events is fired, execute a callback function.

If you were writing all of this behavior yourself across each of these components, you would most likely use:
- An [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/intersectionObserver)
- A third-party [gesture recognition library](https://zingchart.github.io/zingtouch/) that supports "swipe right" and "double tap"
- [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
- [`requestIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) (to keep your analytics work off the main thread so that it doesn't slow down other processes)

You would also need to make sure that, when the components reach the end of their lifecycle:
- The Intersection Observer disconnects from the images
- The gesture recognizer is properly destroyed (hopefully the third party library has that option)
- You execute [`removeEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener) for each corresponding `addEventListener`
- You execute [`cancelIdleCallback`](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelIdleCallback) for each corresponding `requestIdleCallback`

All that work and all of those APIs...just to make your app do something after something else happens!

With Baleada Logic, you would instead follow a straightforward process:
1. Identify the name of the "something" that you're waiting for. For the components above, the "somethings" would be `keydown` `intersect'`, `tap'`, `swipe'`, and `idle'`.
2. Pass the name of each "something" to a `Listenable` constructor to create instances of the `Listenable` class.
3. Call your `Listenable` instances' `listen` methods, passing a callback function to each one that will triggers the appropriate action when its "something" happens. (You can also pass options to `listen`, for example, to make sure that you are only listening for an event on a specific element instead of the whole page.)
4. Wait for your events to happen, and rest easy knowing that your callbacks will all run at the appropriate time!
5. At the end of the components' lifecycles, call the `stop` method on your instances to stop all listening and observing (therefore avoiding memory leaks).

The idea behind `Listenable` is, that, at the end of the day, you shouldn't have to know or care whether the right tool to listen for any given "something" is an Observer, a magical gesture recognition library, the somewhat obscure `requestIdleCallback`, or good old `addEventListener`, and you _definitely_ shouldn't have to know or care about how to clean up side effects and avoid memory leaks with each tool.

These tools, as nifty as they are, are implementation details in their truest form. Their inconsistent APIs are the _last_ thing you should be worrying about when all you really need is to add that "do something when something else happens" behavior to your project.


:::
## A sweeping conclusion
:::

The purpose of Baleada Logic is to abstract repetitive but relatively complex UI logic into something more reusable, so that you can focus on the aesthetics and business logic of your project instead of fiddling with web APIs, doing algebra, performing basic state management, getting into the weeds with `this`, remembering where and how to use all the methods of native prototypes, etc.

:::
> The purpose of Baleada Logic is to abstract repetitive but relatively complex UI logic into something more reusable, so that you can focus on the aesthetics and business logic of your project.
:::

Baleada's abstractions take the form of **JavaScript classes** and **factory functions**. These classes and factories do several important things:

:::
- They expose a consistent, unified, intuitive API, regardless of what behaviors and feature you're trying to add to your project
- They avoid side effects in the DOM whenever possible, and when not possible, they offer a consistent API for cleaning up afterward
- The _only_ assumption they make about your DOM is that you have one. And sometimes, they don't even assume that!
- They offer an intentionally limited set of features and functionality. In your project, any component worth its salt won't be powered by a single Baleada Logic class or factory—instead, your components will compose features using more than one class or factory, sometimes even feeding state from one class into the methods of another.
:::
<!-- TODO: more stuff for that list? Clarify benefits? -->

If you're ready to get your hands dirty, check out the docs listed on the left for individual Baleada Logic classes and factories.

If you really want to nerd out on the API design, check out the [API design guide](/docs/logic/api-design).
