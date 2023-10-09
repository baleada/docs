---
title: Recognizeable effects
tags: UI logic
publish: true
order: 0
---

With a few exceptions, Baleada Logic uses the [factory](/docs/logic/factories-overview) pattern almost exclusively to create objects that can be passed to the `effects` option of [the `Recognizeable` class](/docs/logic/classes/recognizeable).

These functions are designed to recognize common gestures. The factory functions that fall into this category are:
- [`keychord`](/docs/logic/factories/keychord)
- [`keypress`](/docs/logic/factories/keypress)
- [`keyrelease`](/docs/logic/factories/keyrelease)
- [`mousepress`](/docs/logic/factories/mousepress)
- [`mouserelease`](/docs/logic/factories/mouserelease)
- [`touchpress`](/docs/logic/factories/touchpress)
- [`touchrelease`](/docs/logic/factories/touchrelease)
- [`touchrotate`](/docs/logic/factories/touchrotate)

The rest of this guide describes shared patterns that are applied to these these factory functions.


:::
## `Listenable` subclasses
:::

All factory functions that return `Recognizeable` effects also export a `Listenable` subclass that makes it easier to use `Listenable` to listen for custom gestures.

To appreciate this, let's look first at how you'd configure `Listenable` to listen for a drag-and-drop gesture, using `createMouserelease`, and _without_ using the nice subclass:

:::
```ts
import {
  Listenable,
  createMouserelease
} from '@baleada/logic'
import type {
  MousereleaseType,
  MousereleaseMetadata
} from '@baleada/logic'

const dragAndDrop = new Listenable(
  // To get type inference working properly, we need to
  // manually assert that this `recognizeable` string is a
  // `MousereleaseType`. This obviously isn't true, but
  // it represents the way Listenable's internal logic
  // would handle the `recognizeable` string, so it's safe
  // and necessary to do this.
  'recognizeable' as MousereleaseType,
  // Then we use a somewhat funky nested optional object
  // to pass the return value of `createMouserelease` to
  // the `Listenable` instance, so that `Listenable` is
  // equipped to handle all the related events.
  {
    recognizeable: {
      effects: createMouserelease(),
    },
  }
)

// Finally, we list for drag and drop on any given element:
dragAndDrop.listen(
  () => console.log('dragged and dropped 😎'),
  { target: myElement },
)
```
:::

That's not a _huge_ amount of work, but it's kind of annoying, and it really highlights some difficult tradeoffs that `Listenable` had to make in order to support common use cases, but also be as flexible as possible, letting you recognize literally any sequence of any events as your own custom gesture, all in your own userland code.

`Listenable` subclasses offer a much nicer DX:

:::
```ts
import { Mouserelease } from '@baleada/logic'

const dragAndDrop = new Mouserelease()

dragAndDrop.listen(
  () => console.log('dragged and dropped 😎'),
  { target: myElement },
)
```
:::

The `Mouserelease` subclass does all the `Listenable` configuration and type assertion for you 🎯

Its constructor also accepts all parameters that you would pass to `createMouserelease`:

:::
```ts
import { Mouserelease } from '@baleada/logic'

const dragAndDrop = new Mouserelease({
  minDuration: 1000,
  minDistance: 100,
  ...
})
```
:::

Each of the factory functions listed above has a corresponding `Listenable` subclass. The `Listenable` subclasses are:
- [`Keychord`](/docs/logic/classes/keychord)
- [`Keypress`](/docs/logic/classes/keypress)
- [`Keyrelease`](/docs/logic/classes/keyrelease)
- [`Mousepress`](/docs/logic/classes/mousepress)
- [`Mouserelease`](/docs/logic/classes/mouserelease)
- [`Touchpress`](/docs/logic/classes/touchpress)
- [`Touchrelease`](/docs/logic/classes/touchrelease)
- [`Touchrotate`](/docs/logic/classes/touchrotate)


:::
## Pointer metadata
:::

**Pointer metadata** is an object that gets stored in `Recognizeable` metadata by all of Baleada Logic's `Recognizeable` effects that deal with point interactions.

Pointer metadata can be separated into three categories:
- [Pointer start metadata](#pointer-start-metadata)
- [Pointer move metadata](#pointer-move-metadata)
- [Pointer time metadata](#pointer-time-metadata)

Here are the properties included in a pointer metadata object, and the category those properties relate to. Read the descriptions of those categories below to get more info on each property.

::: ariaLabel="pointer metadata" classes="wide-2"
| Property | Category |
| --- | --- |
| `points` | Pointer start metadata |
| `distance` | Pointer move metadata |
| `angle` | Pointer move metadata |
| `direction` | Pointer move metadata |
| `times` | Pointer time metadata |
| `duration` | Pointer time metadata |
| `velocity` | Pointer time metadata |
:::


:::
### Pointer start metadata
:::

Pointer start metadata is stored under the `points` property of pointer metadata. It includes the following properties:

::: ariaLabel="pointer start metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `start` | `{ x: number, y: number }` | The coordinates of the pointer when it first interacted with the target. |
| `end` | `{ x: number, y: number }` | The coordinates of the pointer when it last interacted with the target. |
:::


:::
### Pointer move metadata
:::

Pointer move metadata is stored under the `distance`, `angle`, and `direction` properties of pointer metadata.

In all the tables below that describe `distance`, `angle`, and `direction`, note that `fromStart` tells you how far or in what direction the pointer has moved since the start point (as defined by pointer start metadata), and `fromPrevious` tells you how far or in what direction the pointer has moved since the previous event in the `Recognizeable` sequence.


:::
#### Pointer move distance
:::

`distance` includes the following properties:

::: ariaLabel="pointer distance metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `straight` | `{ fromStart: number, fromPrevious: number }` | The straight-line distance of the pointer from its starting point and from its previous point. |
| `horizontal` | `{ fromStart: number, fromPrevious: number }` | The horizontal distance of the pointer from its starting point and from its previous point. |
| `vertical` | `{ fromStart: number, fromPrevious: number }` | The vertical distance of the pointer from its starting point and from its previous point. |
:::


:::
#### Pointer move angle
:::

`angle` includes the following properties:

::: ariaLabel="pointer angle metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `fromStart` | `Angle` (see below) | The angle of the pointer from its starting point. |
| `fromPrevious` | `Angle` (see below) | The angle of the pointer from its previous point. |
:::

The `Angle` type is an object with two properties:

::: ariaLabel="angle metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `degrees` | number | The angle in degrees. |
| `radians` | number | The angle in radians. |
:::


:::
#### Pointer move direction
:::

`direction` includes the following properties:

::: ariaLabel="pointer direction metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `fromStart` | `Direction` (see below) | The direction of the pointer from its starting point. |
| `fromPrevious` | `Direction` (see below) | The direction of the pointer from its previous point. |
:::

The `Direction` type can be one of the following strings:
- `up`
- `upRight`
- `right`
- `downRight`
- `down`
- `downLeft`
- `left`
- `upLeft`


:::
### Pointer time metadata
:::

Pointer time metadata is stored under the `times`, `duration`, and `velocity` properties of pointer metadata.

Time metadata is calculated using `requestAnimationFrame`, and it updates continuously at 60 frames per second, even if new events are not being added to the `Recognizeable` sequence.

`times` includes the following properties:

::: ariaLabel="pointer time metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `start` | number | The timestamp of the pointer's first interaction with the target. |
| `end` | number | The timestamp of the pointer's last interaction with the target. |
:::

`duration` is the number of milliseconds that have passed since the pointer first interacted with the target.

`velocity` is the number of pixels the pointer has moved per millisecond since the previous event in the `Recognizeable` sequence.


:::
## Keyboard metadata
:::

**Keyboard metadata** is an object that gets stored in `Recognizeable` metadata by all of Baleada Logic's `Recognizeable` effects that deal with keyboard interactions.

Keyboard metadata can be separated into two categories:
- [Keyboard keycombo metadata](#keyboard-keycombo-metadata)
- [Keyboard time metadata](#keyboard-time-metadata)


:::
### Keyboard keycombo metadata
:::

Keyboard keycombo metadata is stored under the `keycombo` property of keyboard metadata.

`keycombo` is a string that tells you which [keycombo](/docs/logic/keycombo-overview) was recognized.


:::
### Keyboard time metadata
:::

Keyboard time metadata is stored under the `times`, and `duration` properties of keyboard metadata.

Time metadata is calculated using `requestAnimationFrame`, and it updates continuously at 60 frames per second, even if new events are not being added to the `Recognizeable` sequence.

`times` includes the following properties:

::: ariaLabel="keyboard time metadata" classes="wide-3"
| Property | Type | Description |
| --- | --- | --- |
| `start` | number | The timestamp of the keyboard's first interaction with the target. |
| `end` | number | The timestamp of the keyboard's last interaction with the target. |
:::

`duration` is the number of milliseconds that have passed since the keyboard first interacted with the target.
