---
title: Configurability
publish: true
order: 2
---

Baleada Features supports deep **configurability**, to serve a massive variety of custom design systems with different use cases. Optional composable parameters, deeply reactive data stores, and plenty of exposed methods allow you to customize many behaviors that other libraries tend to lock away internally.

It does enforce some strong opinions—for example, thoroughly researched systems and architecture for press interactions, keyboard shortcuts, Excel-inspired pointer and keyboard interactions on grids and lists, etc. But even these systems and opinions try to provide only the bare minimum features needed for functionality and accessibility, while leaving the rest up to you.

For example, here's a custom listbox, using Baleada Features systems to provide basic pointer and keyboard interactions, but with the following configured custom behaviors:
- Uses a horizontal orientation
- Allows disabled options to receive keyboard focus
- Prevents the listbox from being cleared
- Stops focus from wrapping around to the first option

<ExampleListboxAccessible class="mt-6 mx-auto w-full with-max-w" variant="configured" />

All of this configurability means you can match your exact design requirements and user experience goals, while still benefiting from Baleada Features' work on the hardest parts of accessibility and interaction handling.

Baleada Features exists for people building custom design systems from scratch. It offers all the configurability needed to serve that use case.
