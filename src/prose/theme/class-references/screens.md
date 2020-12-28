---
title: Screens 
tags: Configuration utilities, Tailwind CSS
publish: true
order: 0
---



Baleada Theme's `all:` screen is configured so that it shows up last in your cascade. That way, you can prefix responsive classes with `all:` to make them override other styles. Think of it as a less drastic `!important`.

::: ariaLabel="Screens class reference"
| Class prefix | Tailwind equivalent | Value |
| --- | --- | --- |
| `sm:` | `sm:` | `640px` |
| `md:` | `md:` | `768px` |
| `lg:` | `lg:` | `1024px` |
| `xl:` | `xl:` | `1280px` |
| `2xl:` | `2xl:` | `1536px` |
| `all:` | none | `0` |
:::

