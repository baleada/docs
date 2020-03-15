---
title: Recognizeable
tags: UI logic
publish: true
order: 0
---

`Recognizeable` is a class that enriches a sequence of DOM events, allowing it to:
- Recognize the sequence as something more abstract, like a "swipe" gesture, or a double-tap
- Store metadata about the sequence
- Store the most recent event, for easier access
- Store a status (`'ready'`, `'recognizing'`, `'recognized'`, or `'denied'`)

`Recognizeable` is written in vanilla JS.


::: type="info"
`Recognizeable` is a lower-level tool whose main purpose is to allow the [`Listenable`](/docs/logic/classes/Listenable) class to listen for custom gestures.

Before using `Recognizeable` to define your own custom gesture, you should test out [Baleada Listenable Gestures](/docs/listenable-gestures), a collection of pre-made `Recognizeable` configurations that allow `Listenable` to listen for common gestures like swipe, pan, drag-and-drop, double-tap, double-click, and more.

If Baleada Listenable Gestures doesn't suit your needs, feel free to continue learning about `Recognizeable` so you can define your own custom gestures!
:::

::: type="danger"
Documentation for `Recognizeable` is still in progress.
:::