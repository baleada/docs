---
title: Animatable
framework: agnostic
publish: true
order: 0
---

`Animatable` is a class that enriches an array of keyframes, allowing it to:
- Compute intermediate steps between keyframes at a rate of 60 frames per second
- Store an update the current frame's data
- Seek to a specific frame
- Play, pause, reverse, or restart the animation
- Store the time the animation began and ended
- Store the animation's percentage progress toward completion (or, in the case of infinitely looping animations, the percentage progress toward the next loop)

`Animatable` is written in vanilla JS with no dependencies, except for [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) and [`cancelAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window/cancelAnimationFrame).

::: type="danger"
Documentation for `Animatable` is still in progress.
:::

:::
## Further resources
:::

- [Motion & Playfulness](https://vimeo.com/282452432), a talk by [Benjamin De Cock](https://twitter.com/bdc)
