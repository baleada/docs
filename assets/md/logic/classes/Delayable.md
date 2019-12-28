---
title: Delayable
framework: agnostic
publish: true
order: 0
---

`Delayable` is a class that enriches a function by allowing it to:
- Be called after a certain number of milliseconds, either once or on an infinite loop
- Store the number of times it has been executed
- Store timestamps for each execution

`Delayable` is written in vanilla JS with no dependencies, except for [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/window/setTimeout), [`setInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/setInterval), [`clearTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/window/clearTimeout), and [`clearInterval`](https://developer.mozilla.org/en-US/docs/Web/API/window/clearInterval).

::: type="danger"
Documentation for `Delayable` is still in progress.
:::
