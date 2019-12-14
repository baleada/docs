---
title: Concepts
framework: agnostic
publish: false
order: 1
---




:::
## A simple example
:::

Consider these components, which appear in all kinds of user interfaces:
- Carousel
- Custom dropdown menu
- Date picker
- Solitaire

Ok fine, solitaire isn't common—but a solitaire component's behavior has a lot more in common with carousels, dropdowns, and date pickers than you might notice at first glance.

More specifically: visually, these components are so different that it feels clean and correct to build them all in isolation, or install isolated packages that contain them. But if you look more closely, these components share a decent number of different behaviors:

::: ariaLabel="Behaviors that carousels, dropdowns, date pickers, and solitaire have in common"

| Behavior | Carousel | Dropdown | Date picker | Solitaire |
| --- | --- | --- | --- | --- |
| Click a button or use an arrow key to move backward or forward | yes | yes | yes | yes |
| Loop back to the beginning after navigating forwards past the last item | usually | yes | N/A  | yes |
| Loop back to the end after navigating backwards past the first item | usually | yes | N/A | no |
| Go to a specific item | yes | not usually | yes | no |
| Move forward and back in custom increments | yes, if the carousel displays more than 1 image at a time | no | yes | yes (3-card or 1-card advance) |
| Go to a random item | sometimes | no | sometimes | no |

:::

Across each of these components, the code that implements this collection of array-navigating behaviors is more or less the same. But when you're using Baleada Logic, you don't have to write or install the same array-navigating code separately for each one of those components. Instead, you just build your array of images, dropdown options, years/months/days, or playing cards, and you pass the array to the constructor of **Navigable**—one of Baleada Logic's classes—to create an instance of the Navigable class.

The Navigable class has all the methods you need to navigate forward, backward, to a specific item, or to a random item. Its methods for moving forward and backward can handle custom increments (e.g. moving forward 3 cards) and can loop around to the beginning or end of the array (both features are optional based on parameters you pass to the method when it's called).

Array navigation is on the simpler end of the UI logic spectrum, but it's a great example of logic that can easily get tangled up and repeated inside seemingly unrelated components instead of being extracted into something more reusable and feature-complete.


:::
## A more complex example
:::

For something complex, imagine you're building the following components:
- Custom image component for a social networking app
- A sidebar navigation menu for a documentation site
- A message in an inbox

These components are wildly different, but let's double-check some of the behaviors these components should have, to see if we can find similarities:

::: ariaLabel="Behaviors that image components and navigation menus need"

| Behavior | Custom image | Sidebar nav | Inbox message |
| --- | --- | --- | --- |
| Don't load the resource until the element is visible | yes | no | it's possible |
| Do something when the user hits a specific keystroke | no | yes (toggle dark mode) | yes (reply all, compose new message, etc.) |
| Do something when the user double taps | yes ("like" the image) | no | probably not |
| Do something when the user swipes right | yes (initiate mating sequence) | yes (on mobile, open the menu) | yes (archive the message) |

:::

Hmm...okay, it looks like some of these behaviors overlap, but not that closely.

Notice, however, that all of these behaviors have a similar structure: when something specific happens, take an action. In other words, when an event or combination of events is fired, execute a callback function.

If you were writing all of this behavior yourself across each of these components, you would most likely use an Intersection Observer, a third-party gesture recognition library that supports "swipe right" and "double tap", and `addEventListener`. You would also need to make sure that, when the components are removed from the DOM, the Intersection Observer disconnects from the images, the gesture recognizer is properly destroyed, and you executed `removeEventListener` for each corresponding `addEventListener`.

All this work just to make your app do something after something else happens!

With Baleada Logic, you would instead follow a straightforward process:
1. Identify the name of the "something" that you're waiting for. For the components above, the "somethings" would be `'keydown'` `'intersect'`, `'tap'`, and `'swipe'`.
1. Pass the name of your "something" to the Listenable constructor to create an instance of the Listenable class.
1. Pass your callback function to your Listenable instance's `listen` method to make sure the event triggers the appropriate action. You can also pass optional parameters to only listen on a specific element (instead of `document`), pass options through to the Intersection Observer being used under the hood, or even define your own custom set of event listeners that recognize gestures like swipe and double-tap.
1. Before the component is removed from the DOM, call the `stop` method to stop all listening and observing.

At the end of the day, who cares if you need shiny, nifty Observers or good old `addEventListener` to listen for some event? Who cares if a gesture is not a real event, but is instead a specific sequence of tightly coupled events? These are implementation details in their truest form, and they shouldn't prevent you from using a single, unified API to add their features and functionality to your project.


:::
## A sweeping conclusion
:::

The purpose of Baleada Logic is to abstract repetitive UI logic into something more reusable, so that you can focus on the aesthetics and business logic of your project instead of fiddling with web APIs, doing simple math, performing basic state management, getting into the weeds with `this`, remembering all the methods of native prototypes and where to use them, etc.
