---
title: Animateable
tags: UI logic, Vue, React, Svelte
publish: true
order: 0
---

`Animateable` is a class that enriches an array of keyframes, allowing it to:
- Compute intermediate frames between keyframes at a rate of 60 frames per second, passing frame data to a callback function specified by you
- Customize the animation by giving it a duration, a timing function, and a number of iterations it should repeat, and indicating whether it should alternate or just progress in one direction
- Store the number of completed iterations
- Play, pause, or reverse the animation
- Seek to a specific frame
- Restart the animation while it's playing or reversing
- Store the status of the animation (e.g. `playing'`, `reversing'`, `paused'`, etc.)
- Store the elapsed time, remaining time, and time progress of the animation

In other words, `Animateable` implements all the main features of [CSS `@keyframes` animations](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) in JavaScript, then adds lots of methods to help you control the animation itself.

`Animateable` depends on:
- [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) and [`cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame)
- [BezierEasing](https://github.com/gre/bezier-easing)
- [The chroma.js `mix` method](https://vis4.net/chromajs/#chroma-mix) (imported from the light version of chroma.js, so it has a lower impact on bundle size.)
- [`Listenable`](/docs/logic/classes/Listenable)


::: type="info"
Need some animation theory before you put it into practice? Check out [Motion & Playfulness](https://vimeo.com/282452432), a talk by [Benjamin De Cock](https://twitter.com/bdc)
:::


:::
## Construct an `Animateable` instance
:::

To construct an `Animateable` instance (Object), use the `Animateable` constructor, which accepts two parameters:

::: ariaLabel="Animateable constructor parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |
| `keyframes` | Array | yes | Passes the keyframes that will be made animatable. See the [How to format keyframes](#how-to-format-keyframes) section for more guidance on formatting the array. |
| `options` | Object | no | Passes options for the `Animateable` instance. See the [`Animateable` constructor options](#Animateable-constructor-options) section for more guidance. |
:::


:::
```js
import { Animateable } from '@baleada/logic'

const instance = new Animateable(keyframes[, options])
```
:::

Or, if you're using [Baleada Composition](/docs/compositon):

:::
```js
import { useAnimateable } from '@baleada/vue-composition'

const reactiveInstance = useAnimateable(keyframes[, options])
```
:::


:::
### How to format keyframes
:::

`keyframes` is an Array, and each individual keyframe in the array is an Object. Keyframe objects can have the following properties:

::: ariaLabel="Animateable keyframe format" classes="wide-4"
| Property | Type | Required | Description |
| --- | --- | --- | --- |
| `progress` | Number | yes | <p>A number between `0` and `1` indicating the time through the animation sequence at which the keyframe occurs.</p><p>The `progress` property is exactly like percentage progress in CSS `@keyframe` animations, except that it's between `0` and `1` instead of `0` and `100`.</p> |
| `data` | Object | yes | <p>Specifies properties and values for the keyframe, which `Animateable` will reference when computing frames between keyframes.</p><p>Each property can be any valid Object property. Properties are **not** required to be valid CSS properties.</p><p>Values can be Numbers, Strings, or Arrays. See the [How data types are animated](#How-data-types-are-animated) section for more guidance on how to format your values so that they get animated properly.</p> |
| `timing` | Array | no | <p>Customizes the timing function used to compute frame data as progress is made toward the next keyframe.</p><p>See the [How to format timing](#how-to-format-timing) section for more guidance on formatting the `timing` array.</p><p>Just like the [`animation-timing-function` CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function), any `timing` specified on the last keyframe will have no effect.</p><p>If `timing` is not specified on the keyframe itself, `Animateable` will use the default timing function, which can be customized using the `timing` option in the constructor. See the [`Animateable` constructor options](#Animateable-constructor-options) section for more info about the global timing function.</p> |
:::

::: type="info"
You don't have to order `keyframes` by `progress`. For example, you can list all the keyframes that animate a specific property, all the way from `progress: 0` to `progress: 1`. Then, in the same `keyframes` array, just list out the next set of keyframes that animate a different property from `progress: 0` to `progress: 1`.

It's also perfectly fine if the same `progress` value appears in multiple different keyframes in the array.

Internally, `Animateable` sorts and analyze all keyframes to extract individual keyframe-to-keyframe property transitions, so feel free to organize keyframes in a way that makes sense to you!
:::


:::
#### How data types are animated
:::

Values inside the `data` object of each keyframe can be Numbers, Strings, or Arrays. See the table below for more guidance on how each data type is handled when `Animateable` computes animation frames.

::: ariaLabel="How data values are animated"
| When the value is a... | `Animateable`... |
| --- | --- |
| Number | Computes a number between the numbers of two consecutive keyframes, proportional to the time progress of the animation. |
| String | <p>Strings are assumed to be colors in [hex](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet), [hsl](https://en.wikipedia.org/wiki/HSL_and_HSV), [rgb](https://en.wikipedia.org/wiki/RGB_color_model), or [lab](https://en.wikipedia.org/wiki/CIELAB_color_space) format (you can use different formats across keyframes, even if it's the same property on your `data` object).</p><p>`Animateable` uses [the chroma.js `mix` method](https://vis4.net/chromajs/#chroma-mix) with `lrgb` color interpolation to compute a color between the colors of two consecutive keyframes. Just like with numbers, the computed color is proportional to the time progress of the animation.</p> |
| Array | <p>Determines the lengths of the arrays in two consecutive keyframes, then computes a new length between those two lengths (exactly like it would compute any other number). Finally, `Animateable` [slices](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) the array, starting from the `0` index and stopping at the computed index.</p><p>Just like with numbers and colors, the new length of the array is proportional to the time progress of the animation.</p> |
:::

To ensure that all of these computations are proportional to the time progress of the animation, `Animateable` uses [BezierEasing](https://github.com/gre/bezier-easing) to compute the actual animation progress for any given time progress.


::: type="warning"
Each individual property in your keyframes' `data` objects **must** contain the same data type across all keyframes.

It's not possible, for example, to set `myProperty` to a String in the first keyframe and a Number in the next keyframe. All values for `myProperty` must be the same data type.
:::


::: type="info"
**Why would I want to animate an array?**

Array animations are designed to be an easy way to achieve the "typewriter" effect in your animation.

Simply pass an empty array to the first keyframe (usually at progress `0`), and in subsequent keyframes, pass a string [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) by empty quotes.

`Animateable` will progressively lengthen your array throughout the animation, adding more characters onto the end of it. In each frame of the animation, you can [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) the array to rebuild the string, and set it as the `textContent` of a DOM element, and it will look like your string is being typed out across the screen.

Add custom timing functions as you see fit to make the "typewriter" feel more natural. 
:::



:::
#### How to format timing
:::

In individual keyframes and in the `Animateable` constructor's `options` object, the `timing` property's value should be an Array of four Numbers. In order, those numbers should be:
1. The `x` coordinate of the first control point
2. The `y` coordinate of the first control point
3. The `x` coordinate of the second control point
4. The `y` coordinate of the second control point

In other words, the array should contain exactly what you would normally pass to the [`cubic-bezier()` function in CSS](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function).

For example:

:::
```js
// This timing array produces the easeInOutQuad curve 
// from easings.net
[
  0.455, 0.030, // Point 1
  0.515, 0.955, // Point 2
]

```
:::

`cubic-bezier()` examples abound on the internet, so it should be relatively easy to find and copy/paste control points. But for an even smoother experience, you can install the Baleada Animateable Timings package, which simply exports arrays of control points as variables.

:::
```bash
npm i @baleada/animateable-timings
```
:::

:::
```js
import { materialStandard } from '@baleada/animateable-timings'

const instance = new Animateable(
  myKeyframes, 
  { timing: materialStandard }
)
```
:::

Here's a list of the available `timing` arrays in the package:

::: ariaLabel="List of timings in Baleada Animateable Timings" classes="wide-3"
| Variable | Source | Coordinates |
| --- | --- | --- |
| `linear` | none | `0.00, 0.00, 1.00, 1.00`
| `materialStandard` | [Material Design](https://material.io/design/motion/speed.html#easing) | `0.40, 0.00, 0.20, 1.00`
| `materialDecelerated` | [Material Design](https://material.io/design/motion/speed.html#easing) | `0.00, 0.00, 0.20, 1.00`
| `materialAccelerated` | [Material Design](https://material.io/design/motion/speed.html#easing) | `0.40, 0.00, 1.00, 1.00`
| `verouEase` | [cubic-bezier.com](https://cubic-bezier.com/) | `0.25, 0.10, 0.25, 1.00`
| `verouEaseIn` | [cubic-bezier.com](https://cubic-bezier.com/) | `0.42, 0.00, 1.00, 1.00`
| `verouEaseOut` | [cubic-bezier.com](https://cubic-bezier.com/) | `0.00, 0.00, 0.58, 1.00`
| `verouEaseInOut` | [cubic-bezier.com](https://cubic-bezier.com/) | `0.42, 0.00, 0.58, 1.00`
| `easingsNetInSine` | [easings.net](https://easings.net) | `0.12, 0.00, 0.39, 0.00`
| `easingsNetOutSine` | [easings.net](https://easings.net) | `0.61, 1.00, 0.88, 1.00`
| `easingsNetInOutSine` | [easings.net](https://easings.net) | `0.37, 0.00, 0.63, 1.00`
| `easingsNetInQuad` | [easings.net](https://easings.net) | `0.11, 0.00, 0.50, 0.00`
| `easingsNetOutQuad` | [easings.net](https://easings.net) | `0.50, 1.00, 0.89, 1.00`
| `easingsNetInOutQuad` | [easings.net](https://easings.net) | `0.45, 0.00, 0.55, 1.00`
| `easingsNetInCubic` | [easings.net](https://easings.net) | `0.32, 0.00, 0.67, 0.00`
| `easingsNetOutCubic` | [easings.net](https://easings.net) | `0.33, 1.00, 0.68, 1.00`
| `easingsNetInOutCubic` | [easings.net](https://easings.net) | `0.65, 0.00, 0.35, 1.00`
| `easingsNetInQuart` | [easings.net](https://easings.net) | `0.50, 0.00, 0.75, 0.00`
| `easingsNetInQuint` | [easings.net](https://easings.net) | `0.64, 0.00, 0.78, 0.00`
| `easingsNetOutQuint` | [easings.net](https://easings.net) | `0.22, 1.00, 0.36, 1.00`
| `easingsNetInOutQuint` | [easings.net](https://easings.net) | `0.83, 0.00, 0.17, 1.00`
| `easingsNetInExpo` | [easings.net](https://easings.net) | `0.70, 0.00, 0.84, 0.00`
| `easingsNetOutExpo` | [easings.net](https://easings.net) | `0.16, 1.00, 0.30, 1.00`
| `easingsNetInOutExpo` | [easings.net](https://easings.net) | `0.87, 0.00, 0.13, 1.00`
| `easingsNetInCirc` | [easings.net](https://easings.net) | `0.55, 0.00, 1.00, 0.45`
| `easingsNetOutCirc` | [easings.net](https://easings.net) | `0.00, 0.55, 0.45, 1.00`
| `easingsNetInOutCirc` | [easings.net](https://easings.net) | `0.85, 0.00, 0.15, 1.00`
| `easingsNetInBack` | [easings.net](https://easings.net) | `0.36, 0.00, 0.66,-0.56`
| `easingsNetOutBack` | [easings.net](https://easings.net) | `0.34, 1.56, 0.64, 1.00`
| `easingsNetInOutBack` | [easings.net](https://easings.net) | `0.68,-0.60, 0.32, 1.6 `
:::


:::
### `Animateable` constructor options
:::

::: ariaLabel="Animateable constructor options" classes="wide-4"
| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `duration` | Number | `0` | Indicates the duration in milliseconds of the animation. |
| `timing` | Array | `[0,0,1,1]` | <p>Customizes the global timing function used by `Animateable` to compute values between frames. The default timing function is linear.</p><p>See the [How to format timing](#how-to-format-timing) section for more guidance on formatting the `timing` array.</p> |
| `iterations` | Number, Boolean | `1` | <p>Indicates the number of iterations the animation will repeat when playing or reversing.</p><p>The minimum is `1`, and you can pass `true` to make the animation iterate infinitely.</p> |
| `alternates` | Boolean | `false` | <p>Indicates whether or not the animation will alternate back and forth, or only proceed in one direction.</p><p>When `alternates` is `true`, each full back-and-forth cycle is considered 1 iteration.</p> |
:::


:::
## Access state and methods
:::

The constructed `Animateable` instance is an Object, and state and methods can be accessed via its properties:


::: ariaLabel="Animateable state and methods" classes="wide-3 wide-4 wide-5"
| Property | Type | Description | Parameters | Return value |
| --- | --- | --- | --- | --- |
| `keyframes` | Getter/Setter | See return value | N/A | <p>A shallow copy (Array) of the `keyframes` array passed to the constructor.</p><p>If you assign a value directly to `keyframes`, a setter will pass the new value to `setKeyframes`.</p> |
| `playbackRate` | Getter/Setter | See return value | N/A | <p>A number indicating the playback rate of the animation. Defaults to `1`.</p><p>If you assign a value directly to `playbackRate`, a setter will pass the new value to `setPlaybackRate`.</p> |
| `status` | Getter | See return value | N/A | Indicates the current status (String) of the `Animateable` instance. See the [How methods affect status, and vice-versa](#how-methods-affect-status-and-vice-versa) section for more information. |
| `iterations` | Getter | See return value | N/A | The number of iterations (Number) that the animation has completed. |
| `request` | Getter | See return value | N/A | The request ID (`long` integer) returned by [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). |
| `time` | Getter | See return value | N/A | An Object with two keys: `elapsed` and `remaining`. Both keys' values are numbers indicating the time elapsed and time remaining in milliseconds. |
| `progress` | Getter | See return value | N/A | <p>An Object with two keys: `time` and `animation`. Both keys' values are numbers between `0` and `1` indicating the time progress and animation progress of the animation.</p><p>In other words, `progress.time` and `progress.animation` are the x and y coordinates of the current point on the global timing function's easing curve.</p> |
| `setKeyframes(keyframes)` | Function | Sets the `Animateable` instance's `keyframes` | The new `keyframes` (Array) | The `Animateable` instance |
| `setPlaybackRate(playbackRate)` | Function | Sets the playback rate for the animation. | The playback rate: a Number greater than `0`. | The `Animateable` instance |
| `play(callback)` | Function | Starts the animation, progressing forward. Can't be called until the DOM is available. | <p>`play` accepts a callback function to handle individual frames. Your callback will be called 60 times per second and will receive the current frame as its only argument.</p><p>See the [How to handle frames](#how-to-handle-frames) section for more guidance.</p> | The `Animateable` instance. |
| `reverse(callback)` | Function | Starts the animation, progressing backward. Can't be called until the DOM is available. | <p>`reverse` accepts a callback function to handle individual frames. Your callback will be called 60 times per second and will receive the current frame as its only argument.</p><p>See the [How to handle frames](#how-to-handle-frames) section for more guidance.</p> | The `Animateable` instance. |
| `pause()` | Function | Pauses the animation. Can't be called until the DOM is available. | None | The `Animateable` instance. |
| `seek(progress, callback)` | Function | <p>Seeks to a specific time progress in the animation. If `status` is `playing` or `reversing'`, the animation will continue progressing in the same direction after seeking to the time progress.</p><p>If your animation is supposed to repeat for more than one iteration, you can pass a time progress that is greater than `1` to seek to a specific iteration. For example, to seek halfway through the third iteration, you can call `seek(2.5)`.</p><p>Can't be called until the DOM is available.</p> | <p>`seek` Accepts two parameters: a time progress to seek to, and a callback function to handle the frame(s) that will be computed.</p><p>The `progress` parameter is always required, but the `callback` is only required if the animation is not currently playing or reversing.</p> | The `Animateable` instance. |
| `restart()` | Function | <p>Restarts the animation, using the same `callback` that was previously passed to `play` or `reverse` to handle frames.</p><p>`restart` only has an effect if the animation is currently playing or reversing.</p><p>Can't be called until the DOM is available.</p> | Callback function. | The `Animateable` instance. |
| `stop()` | Function | Cancels the animation, stopping it in its tracks and cleaning up side effects. Can't be called until the DOM is available. | None | The `Animateable` instance. |
:::


:::
### How methods affect status, and vice-versa
:::

Each `Animateable` instance maintains a `status` property that allows it to take appropriate action based on the methods you call, in what order you call them, and when you call them.

At any given time, `status` will always be one (and only one) of the following values:
- `ready'`
- `playing'`
- `played'`
- `reversing'`
- `reversed'`
- `paused'`
- `sought'`
- `stopped'`

There's a lot of complexity involved in the way each `status` is achieved (it's affected by which methods you call, in what order you call them, and exactly when you call them), but you likely will never need to worry about that. `status` is available to you if you feel you need it, but for all intended use cases, it's an implementation detail, and you can ignore it.

The only thing you may want to be aware of is how `status` affects your ability to call certain methods—some methods can be called at any time, and some can only be called when `status` has a specific value.

The table below has a full breakdown:

::: ariaLabel="How status affects methods"
| Method | Can be called when `status` is... |
| --- | --- |
| `setKeyframes` | Anything |
| `play` | Anything except `playing` |
| `reverse` | Anything except `reversing` |
| `pause` | `playing` or `reversing` |
| `seek` | Anything |
| `restart` | `playing` or `reversing` |
| `stop` | Anything |
:::

Or, just remember:
- You can't `play` while the animation is already playing, and likewise, you can't `reverse` while the animation is already reversing.
- You can only `pause` and `restart` while the animation is playing or reversing
- You can `setKeyframes`, `seek`, and `stop` at any time. Just remember that `setKeyframes` will always `stop` the animation, and if you call `seek` while an animation is progressing, the animation will continue progressing after it seeks to the time progress you specified.

::: type="info"
If you call a method when it's not supposed to be called, it won't cause any errors, it will simply have no effect on the animation.
:::

::: type="info"
All methods always return the `Animateable` instance (i.e. `this`), regardless of `status`.
:::


:::
### How to handle frames
:::

Finally, the good stuff!

The first step to handling frames is to pass a callback function to the `play`, `reverse` or `seek` methods when you call them. `Animateable` will call that function at a rate of 60 frames per second, passing the current frame as the first argument.

Each frame is an Object with a `data` property and a `progress` property. The value of each of those properties is also an Object, and they keys in both objects are all the properties from your `keyframes`.

In the `frame.data` object, the value of each property is the actual computed value for the property at that point in the animation.

:::
```js
// frame.data
{
  data: {
 myProperty: 10,
  },
  progress: {...},
}
```
:::

In the `frame.progress` object, the value of each property is an object with a `time` property and an `animation` property, which each contain a number between `0` and `1` representing the time progress and animation progress between the previous and next keyframes for that property.

:::
```js
// frame.progress
{
  data: {...},
  progress: {
    myProperty: {
      time: 0.25,
      animation: 0.5,
    },
  },
}
```
:::

For a simple example, imagine you passed these keyframes:

:::
```js
[
  {
    progress: 0,
    data: { myProperty: 0 }
  },
  {
    progress: 1,
    data: { myProperty: 100 }
  }
]
```
:::

After you call the `play` method, the first frame for your callback function would look like this:

:::
```js
{
  data: { myProperty: 0 }
}
```
:::

Assuming you're using the default linear timing function, this is the frame your callback function would receive exactly halfway through the animation:

:::
```js
{
  data: { myProperty: 50 },
  progress: {
    myProperty: {
      time: 0.5,
      animation: 0.5,
    },
  }
}
```
:::

And this is the last frame your callback would receive:

:::
```js
{
  data: { myProperty: 100 },
  progress: {
    myProperty: {
      time: 1,
      animation: 1,
    },
  }
}
```
:::

Things get slightly more complex when your keyframes don't just start at `progress: 0` and end at `progress: 1`. Consider the following keyframes:

:::
```js
[
  {
    progress: 0,
    data: { myProperty: 0 }
  },
  {
    progress: .5,
    data: { myProperty: 25 }
  },
  {
    progress: 1,
    data: { myProperty: 100 }
  }
]
```
:::

Assuming you're using the default linear timing function, this is the frame your callback function would receive exactly one quarter of the way through the animation, when the Animateable instance's `progress.time` is `0.25`:

:::
```js
{
  data: { myProperty: 12.5 },
  progress: {
    myProperty: {
      time: 0.5, // Halfway between the previous and next keyframes
      animation: 0.5, // With linear timing, animation progress equals time progress
    },
  }
}
```
:::

This is the frame your callback function would receive exactly halfway through the animation, when the Animateable instance's `progress.time` is `0.5`:

:::
```js
{
  data: { myProperty: 25 },
  progress: {
    myProperty: {
      time: 0, // Time progress resets to 0 when you get to next keyframe
      animation: 0,
    },
  }
}
```
:::


Here's the frame at three quarters progress, when the Animateable instance's `progress.time` is `0.75`:

:::
```js
{
  data: { myProperty: 62.5 },
  progress: {
    myProperty: {
      time: 0.5,
      animation: 0.5,
    },
  }
}
```
:::

And this is the last frame your callback would receive, when the Animateable instance's `progress.time` is `1`:

:::
```js
{
  data: { myProperty: 100 },
  progress: {
    myProperty: {
      time: 1,
      animation: 1,
    },
  }
}
```
:::


So what should you do with that frame inside your callback function? The intention behind `Animateable` is that you'll use `frame.data` to assign styles to an element.

Take this callback function for example:

:::
```js
const el = document.querySelector('#el')

function handleFrame (frame) {
  el.style.transform = `translateX(${frame.data.myProperty}%)`
}
```
:::

That callback function translates an element to the right by a percentage value determined by your frame data. As the animation progresses, the element will move from `0%` to `100%`.

In the same callback function, you could set additional styles with the exact same frame data, if you wanted:

:::
```js
const el = document.querySelector('#el')

function handleFrame (frame) {
  el.style.transform = `translateX(${frame.data.myProperty}%)`
  el.style.backgroundColor = `rgb(255, 255, ${frame.data.myProperty})`
}
```
:::

That callback function would move the element to the right and steadily change its background color at the same time.

`frame.progress` is less useful, but is exactly what you will need if you ever want to visualize the progress of individual keyframe-to-keyframe transitions (`time` and `animation` progress are the `x` and `y` coordinates of the current point on an easing curve).

Note that if you have multiple unique properties in your `keyframes`, every property will be included in every frame's data.

Take these keyframes for example:

:::
```js
[
  // translateX
  {
    progress: 0,
    data: { translateX: 0 }
  },
  {
    progress: 1,
    data: { translateX: 100 }
  },

  // blueChannel (of rgb color)
  {
    progress: 0.5,
    data: { blueChannel: 0 }
  },
  {
    progress: 1,
    data: { blueChannel: 255 }
  },
]
```
:::

Given those keyframes, and assuming you're still using the default linear timing function, here's the frame you would receive when the `Animateable` instance's `progress.time` is `0.25`:

:::
```js
{
  data: {
    translateX: 25,
    blueChannel: 0,
  },
  progress: {
    translateX: { time: 0.25, animation: 0.25 },
    blueChannel: { time: 0.5, animation: 0.5 }, // Halfway from the animation start to the start of its first keyframe
  }
}
```
:::

Here's what you would get when the `Animateable` instance's `progress.time` is `0.5`:

:::
```js
{
  data: {
    translateX: 50,
    blueChannel: 0,
  },
  progress: {
    translateX: { time: 0.5, animation: 0.5 },
    blueChannel: { time: 0, animation: 0 }, // Starting its first keyframe transition
  }
}
```
:::

And here's what you would get when the `Animateable` instance's `progress.time` is `0.75`:

:::
```js
{
  data: {
    translateX: 75,
    blueChannel: 127.5,
  },
  progress: {
    translateX: { time: 0.75, animation: 0.75 },
    blueChannel: { time: 0.5, animation: 0.5 }, // Halfway through its keyframe transition
  }
}
```
:::

The important thing to remember is that all properties are included in every frame, even if their value doesn't change, and regardless of how your keyframes are ordered and organized.

And that covers all of the basic concepts! But what we haven't covered yet is how to handle strings and arrays that you pass to your keyframes.

As explained in the [How data types are animated](#How-data-types-are-animated) section, strings are always assumed to be colors. So, you can set them to any color property on an element:

:::
```js
const el1 = document.querySelector('#el1'),
      el2 = document.querySelector('#el2'),
      keyframes = [
        // white to red
        {
          progress: 0,
          data: { whiteToIndigo: "#fff" },
        },
        {
          progress: 1,
          data: { whiteToIndigo: 'hsl(246.8, 60.8%, 60%)' }
        },

        // red to white
        {
          progress: 0,
          data: { indigoToWhite: 'hsl(246.8, 60.8%, 60%)' },
        },
        {
          progress: 1,
          data: { indigoToWhite: '#fff' }
        },
      ]

function handleFrame ({ data: { whiteToIndigo, redToWhite } }) { // Use destructuring! It's awesome.
  el1.style.color = redToWhite
  el1.style.backgroundColor = whiteToIndigo

  el2.style.color = whiteToRed
  el2.style.backgroundColor = redToWhite
}
```
:::

Note that you don't have to use the same color format between keyframes—you can freely mix and match hex, hsl, rgb, and lab colors


Arrays are primarily intended to be used to achieve the "typewriter" affect, although there are probably other cool things you can do with them.

Here's an example of how the typewriter effect would work:

:::
```js
const el1 = document.querySelector('#el1'),
      keyframes = [
        // write 'Baleada'
        {
          progress: 0,
          data: { word: [] },
        },
        {
          progress: 1,
          data: { word: 'baleada'.split('') } // Much easier to split the string instead of write the array manually
        },
      ]

function handleFrame ({ data: { word } }) {
  el1.style.textContent = word.join('')
}
```
:::

Given those keyframes and that frame handler, your `Animateable` instance would progressively change the text content of your element, making it look like the word "Baleada" is being typed across the screen.



:::
## API design compliance
:::

::: ariaLabel="A table showing Animateable's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
| Access functionality by constructing an instance | <BrandApiDesignSpecCheckmark /> |  |
| Constructor accepts two parameters: a piece of state,and an `options` object. | <BrandApiDesignSpecCheckmark /> |  |
| Constructor does not access the DOM | <BrandApiDesignSpecCheckmark /> |  |
| Takes the form of a JavaScript Object | <BrandApiDesignSpecCheckmark /> |  |
| State and methods are accessible through properties of the object | <BrandApiDesignSpecCheckmark /> |  |
| Methods always return the instance | <BrandApiDesignSpecCheckmark /> |  |
| Stores the constructor's state in a public getter named after the state's type | <BrandApiDesignSpecCheckmark /> | `keyframes`  |
| Has a public method you can use to set a new value for that public getter | <BrandApiDesignSpecCheckmark /> | `setKeyframes` |
| Has a setter for that getter so you can assign a new value directly | <BrandApiDesignSpecCheckmark /> |  |
| Any other public getters that should be set by you in some cases also have setters and `set<Property>` methods | <BrandApiDesignSpecCheckmark /> | `playbackRate`, `setPlaybackRate` |
| Has at least one additional getter property that you can't (and shouldn't) set directly | <BrandApiDesignSpecCheckmark /> | `status`, `request`, `iterations`, `time`, `progress` |
| Has one or more public methods that expose core functionality | <BrandApiDesignSpecCheckmark /> | `play`, `reverse`, `pause`, `seek`, `restart`, `stop` |
| Either has no side effects or has side effects that can be cleaned up with a `stop` method | <BrandApiDesignSpecCheckmark /> |  |
| Uses the sentence template to decide what state type should be accepted by a constructor | <BrandApiDesignSpecCheckmark /> | "Keyframes can be animated." |
| Constructor does not accept options that only customize the behavior of public methods, it allows those options to be passed to the method itself as a parameter. | <BrandApiDesignSpecCheckmark /> | |
| Named after its core action, proper-cased and suffixed with `able` | <BrandApiDesignSpecCheckmark /> | `animate` (private method) |
:::
