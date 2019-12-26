---
title: Handler API
framework: agnostic
publish: false
order: 1
---

Each time the gesture API's `handle` method is called, passing a DOM event, the gesture API will call the appropriate function defined in the `handlers` option, passing two arguments:
1. The DOM event that just happened
2. The "handler API"

The "handler API" is an object whose properties store things that are useful when writing gesture recognition logic. At the moment, it only has one property: `toPolarCoordinates`, a Function that converts [Cartesian coordinates](https://en.wikipedia.org/wiki/Cartesian_coordinate_system) to [polar coordinates](https://en.wikipedia.org/wiki/Polar_coordinate_system).

`toPolarCoordinates` requires that you pass one parameter: an object of Cartesian coordinates for the starting and ending points of a line. The table below summarizes the required properties of that object.

::: ariaLabel="toPolarCoordinates parameter schema"
| Property | Type | Description |
| --- | --- | --- |
| `xA` | Number | The starting x-coordinate |
| `xB` | Number | The ending x-coordinate |
| `yA` | Number | The starting y-coordinate |
| `yB` | Number | The ending y-coordinate |
:::

Given that parameter, `toPolarCoordinates` will return an object whose structure is summarized in the table below.

::: ariaLabel="toPolarCoordinates return value schema"
| Property | Type | Description |
| --- | --- | --- |
| `distance` | Number | The length of the line, in pixels. |
| `angle` | Object | Has two properties: `radians` and `degrees`, both of which are Numbers that indicate the angle of the line. |
:::
