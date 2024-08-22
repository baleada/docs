---
title: Identifying UI logic
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
2. [`results`](/docs/logic/pipes/results) searches a list of options for the segment (fuzzy matching is optional)
3. [`Listenable`](/docs/logic/classes/listenable) detects when the dropdown menu starts leaving the viewport, and gives you some information so that you can simply apply a CSS `transform: translate` to move the menu into a visible spot.
4. [`Navigateable`](/docs/logic/classes/navigateable) tracks which option should be in focus, and can loop around to the beginning or end of the list as needed.
5. `Completable` completes the segment of text with a completed value chosen by the user.

It might seem strange to break this feature down and implement it with so many separate tools, but this approach is what allows logic to become abstract enough to be reusable. An autocomplete feature is only useful in situations where you need to autocomplete, but a fuzzy-matching search feature is useful in all kinds of different places.

Anyway, that's the basic concept, but let's explore some more concrete examples of how individual Baleada Logic tools can be reused across various UI features.


:::
## An example of reusability
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
| Move forward and back in custom increments | yes, if the carousel displays more than 1 image at a time | not usually | yes | yes (3-card or 1-card advance) |
| Go to a random item | sometimes | not usually | sometimes | no |
:::

Across each of these components, the code that implements this collection of array-navigating behaviors is more or less the same. But when you're using Baleada Logic, you don't have to write or install the same array-navigating code separately for each one of those components.

Instead, you just build your array of images, dropdown options, years/months/days, or playing cards, and you pass the array to the constructor of `Navigateable`—one of Baleada Logic's classes—to create an instance of the `Navigateable` class.

The `Navigateable` class has all the methods you need to navigate forward, backward, to a specific item, or even to a random item. Its methods for moving forward and backward can handle custom increments (e.g. moving forward 3 cards in solitaire) and can loop around to the beginning or end of the array (both features are optional based on parameters you pass to the method when it's called).

Array navigation is on the simpler end of the UI logic spectrum, but it's a great example of logic that can easily get tangled up and repeated inside seemingly unrelated components instead of being extracted into something more reusable and feature-complete.

:::
> Array navigation is a great example of logic that can easily get tangled up and repeated inside seemingly unrelated components instead of being extracted into something more reusable and feature-complete.
:::


:::
## A sweeping conclusion
:::

The purpose of Baleada Logic is to abstract repetitive but relatively complex UI logic into something more reusable, so that you can focus on the aesthetics and business logic of your project instead of fiddling with web APIs, doing algebra, performing array operations, getting into the weeds with `this`, searching for high quality third party libraries, etc.

:::
> The purpose of Baleada Logic is to abstract repetitive but relatively complex UI logic into something more reusable, so that you can focus on the aesthetics and business logic of your project.
:::

If you're ready to get your hands dirty, check out the docs listed on the left for individual Baleada Logic tools.
