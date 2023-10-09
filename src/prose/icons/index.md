---
title: What is Baleada Icons?
tags: Components
publish: false
order: 0
---

There are [tons of reasons](http://www.fullstackradio.com/47) to use **true SVG icons** instead of icon fonts. But copy/pasting SVG markup all over your website or app is tedious, not readable, and not maintainable.

If you're using a component framework like Vue, React, or Svelte, the clear solution is to wrap up your SVG icons in reusable components, so that you get all the benefits of SVGs while writing efficient code.

Baleada's icon components do just that! Baleada Icons is a collection of lightweight components that render SVG icons.

::: type="info"
All icons used in the Baleada docs are sourced from Baleada Icons 😎
:::

Icons are sourced from the following icon sets:
- [Simple Icons](https://simpleicons.org/)
- [Eva Icons](https://akveo.github.io/eva-icons/)
- [Heroicons](https://heroicons.dev/)
- [Octicons](https://primer.style/octicons/)
- [Teenyicons](https://teenyicons.com/)
- [Radix icons](https://github.com/modulz/radix-icons)

Each icon in those sets has a corresponding component for the following frameworks:
- [Vue](https://vuejs.org/)
- [React](https://reactjs.org/) [WIP]
- [Svelte](https://svelte.dev) [WIP]

::: type="info"
Didn't see your favorite icon set or framework in the list? Feel free to [raise an issue](https://github.com/baleada/docs/issues) and ask for support.
:::


:::
## Available components
:::

Baleada Icons includes a component for each individual icon in the sets listed above.

All components follow a simple naming convention: they start with `Eva`, `Simple`, `Heroicons`, `Octicons`, or `Teenyicons`, depending on which set they are from, and end with the name of the icon.

The names of Eva icons, Heroicons, and Teenyicons are created by:
1. Removing all hyphens
2. Capitalizing the first letter of each word
3. Adding `Outline` to any icons with an outline style (icons with solid style have no suffix). All of these icon sets have both solid and outline variants for each icon.

Here are a few examples:

::: ariaLabel="Table of examples showing how Baleada transforms Eva icon, Heroicons, and Teenyicons names into component names"
| Original icon name | Variant | Icon set | Component name |
| --- | --- | --- | --- |
| bulb | solid | Eva | `EvaBulb` |
| hard-drive-outline | outline | Eva | `EvaHardDriveOutline` |
| globe-2 | solid | Eva | `EvaGlobe2` |
| globe | solid | Heroicons | `HeroiconsGlobe` |
| emoji-happy | solid | Heroicons | `HeroiconsEmojiHappy` |
| menu-alt-4 | outline | Heroicons | `HeroiconsMenuAlt4Outline` |
| globe-africa | outline | Teenyicons | `TeenyiconsGlobeAfricaOutline` |
:::

The names of Octicons are created in almost exactly the same way, except that they are suffixed with `16` or `24` depending on the icon size (each Octicon has a 16x16 and a 24x24 variant):

::: ariaLabel="Table of examples showing how Baleada transforms Octicon names into component names"
| Original icon name | Variant | Component name |
| --- | --- | --- |
| alert | 16x16 | `OcticonsAlert16` |
| alert | 24x24 | `OcticonsAlert24` |
| arrow-up-left | 16x16 | `OcticonsArrowUpLeft16` |
| arrow-up-left | 24x24 | `OcticonsArrowUpLeft24` |
:::

Radix icons are also very similar, but they come in normal and two-tone variants. Normal icons are not suffixed, and two-tone icons are suffixed with TwoTone:

::: ariaLabel="Table of examples showing how Baleada transforms Octicon names into component names"
| Original icon name | Variant | Component name |
| --- | --- | --- |
| rocket | normal | `RadixRocket` |
| rocket | two-tone | `RadixRocketTwoTone` |
| slider | normal | `RadixSlider` |
| slider | two-tone | `RadixSliderTwoTone` |
:::

Simple icons' names are created by:
1. Removing all spaces, exclamation points, colons, and apostrophes
2. Replacing special characters as indicated in the table below
3. Capitalizing the first letter of each word and **preserving** the original case of other letters in the word

::: ariaLabel="Table showing how Baleada replaces special characters in Simple icon names"
| Special character | Replacement |
| --- | --- |
| `.` | Dot |
| `&` | And |
| `+` | Plus |
| `à`, `á`, `â`, `ã`, `ä` | a |
| `ç` | c |
| `è`, `é`, `ê`, `ë` | e |
| `ì`, `í`, `î`, `ï` | i |
| `ñ` | n |
| `ò`, `ó`, `ô`, `õ`, `ö` | o |
| `ù`, `ú`, `û`, `ü` | u |
| `ý`, `ÿ` | y |
:::

Simple icon component examples:

::: ariaLabel="Table of examples showing how Baleada transforms Simple icon names into component names"
| Original icon name | Component name | Notice: |
| --- | --- | --- |
| Geocaching | `SimpleGeocaching` | Nothing special here! |
| Khan Academy | `SimpleKhanAcademy` | Space removed |
| PHP | `SimplePHP` | Original case of PHP is preserved |
| Vue.js | `SimpleVueDotJs` | `.` replaced with `Dot`, `js` capitalized to `Js` |
| C++ | `SimpleCPlusPlus` | `++` replaced with `PlusPlus` |
| AT&T | `SimpleATAndT` | `&` replaced with `And`, original cases of `AT` and `T` are preserved |
| AlloCiné | `SimpleAlloCine` | `é` replaced with `e`, original case of the `C` is preserved |
:::



:::
## Install, import, and use the components
:::

For more guidance on how to install, import, and use the components, see one of the following framework-specific guides:
- [Using icons with Vue](/docs/icons/using-with-vue)



:::
## Language, compilation, browser support, and dependencies
:::

Baleada Icons is written in modern JavaScript. The icons never have dependencies, but depending on the component framework you're using, additional peer dependencies are required:

::: ariaLabel="Peer dependencies by framework"
| Framework | Peer dependencies |
| --- | --- |
| Vue | <p>[vue](https://github.com/vuejs/vue)</p> |
| React | WIP |
| Svelte | WIP |
:::

Baleada Icons is compiled by [Babel](https://babeljs.io) to work in browsers that are used by more than 0.5% of global web visitors AND have had official support or updates in the past 24 months.

To allow for [tree-shaking](https://webpack.js.org/guides/tree-shaking/), Baleada Icons has no side effects and is bundled by [Rollup](https://rollupjs.org/), outputting [ES modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules).
