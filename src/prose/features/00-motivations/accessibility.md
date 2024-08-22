---
title: Accessibility
publish: true
order: 0
---

Baleada Features implements comprehensive, reusable, flexible features for **accessibility**, one of the core motivations behind the package.

Some accessibility features—like ARIA role & attribute management, keyboard interactions, and focus management—are always required.
Baleada Features takes care of all of those things for you!

For example, use your mouse, keyboard, touch, and screen reader to play with this custom multiselectable listbox, and note:
- It announces itself properly to assistive tech, including selection state and disabled state
- It supports Excel-inspired pointer and keyboard interactions
- It automatically manages focus on the listbox options

<ExampleListboxAccessible class="mt-6 mx-auto w-full with-max-w" variant="default" />

Other accessibility features are optional or situational.

For example, after you add the required accessible label to a listbox, you might want to add an optional description, announced to assistive tech. Baleada Features makes it easy to do so.

<ExampleListboxAccessible class="mt-6 mx-auto w-full with-max-w" variant="described" />

Other accessibility features are required, but configurable.

For example, in the listboxes above:
- We use a vertical orientation
- We don't allow disabled options to receive keyboard focus
- We allow the listbox to be cleared, via the Escape key and pointer interactions
- When focus reaches the last option, it wraps around to the first option

But in a different context, even within the same UI, you might want to:
- Use a horizontal orientation
- Allow disabled options to receive keyboard focus
- Prevent the listbox from being cleared
- Stop focus from wrapping around to the first option

All of this is allowed by the WAI-ARIA spec, as long as keyboard interactions and other accessibility features work as expected.

Here's the same listbox, but with those customizations:

<ExampleListboxAccessible class="mt-6 mx-auto w-full with-max-w" variant="configured" />

There are even some accessibility features that need to change dynamically at runtime.

For example, consider Excel's default keyboard interactions:
- Arrow keys will navigate the cells
- Shift + arrow keys will select multiple cells
- With multiple cells selected, the next arrow key will destroy the selection and start over

<ExampleGridAccessible class="mt-6 mx-auto w-full with-max-w" variant="default" />

To select a second, disconnected cell range, without wiping out the first range, sighted users typically hold down the Command or Control key, and click-and-drag to add the second range. But this is not an option for keyboard-only users.

Keyboard-only users in Excel actually toggle an ["Add to Selection" mode](https://support.microsoft.com/en-us/office/excel-status-bar-options-6055ecd9-e20f-4a7a-a611-4481bd488c55#:~:text=Add%20to%20Selection%20when%20you%20press,by%20using%20the%20arrow%20keys) that allows them to navigate to and select the second range without losing the first range.

In other words, the user changes app state, and the app responds by changing its accessibility features on the fly.

Baleada Features supports these dynamic accessibility features, too:

<ExampleGridAccessible class="mt-6 mx-auto w-full with-max-w" variant="dynamic" />

And on top of that, Baleada Features adds these features to UI elements where you might not expect them, but will definitely appreciate them. Returning to our original example, notice how Excel-inspired dynamic keyboard interactions are available in Baleada's multiselect listboxes, too:

<ExampleListboxAccessible class="mt-6 mx-auto w-full with-max-w" variant="dynamic" />

The web platform is amazing, but when it comes to accessibility, it's still missing so many UI components, and so much configurability.

Baleada Features aims to close that gap.

::: type="success"
Accessibility is great UX!
:::
