---
title: Animatable
framework: agnostic
publish: true
order: 0
---

`Animatable` is a class that enriches an array of keyframes, allowing it to:
- Compute intermediate frames between keyframes at a rate of 60 frames per second, passing frame data to a callback function specified by you
- Play, pause, or reverse the animation
- Seek to a specific frame
- Restart the animation while it's playing or reversing
- Store the status of the animation (e.g. `'playing'`, `'reversing'`, `'paused'`, etc.)
- Customize the animation by giving it a duration, a timing function, and a number of iterations it should repeat, and indicating whether it should alternate or just progress in one direction
- Store the number of completed iterations

In other words, `Animatable` implements all the main features of [CSS `@keyframes` animations](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) in JavaScript, then adds lots of methods to help you control the animation itself.

`Animatable` depends on:
- [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) and [`cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame)
- [BezierEasing](https://github.com/gre/bezier-easing)
- [The chroma.js `mix` method](https://vis4.net/chromajs/#chroma-mix) (imported from the light version of chroma.js, so it only supports `lrgb` color interpolation, but has a lower impact on bundle size.)

::: type="danger"
Documentation for `Animatable` is still in progress.
:::

:::
## Further resources
:::

- [Motion & Playfulness](https://vimeo.com/282452432), a talk by [Benjamin De Cock](https://twitter.com/bdc)
