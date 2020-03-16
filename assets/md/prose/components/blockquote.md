---
title: ProseBlockquote
tags: Components, Vue, React, Svelte
publish: true
order: 0
---

`ProseBlockquote` is a dream come true for all you Twitter fiends out there! It comes with a full-featured tweet button that supports custom hashtags, shortened URLs, and mentions.

:::
## Example
:::

:::
### Markdown
:::

:::
```md
||| canTweet tweetHashtags=[twitterfiends,memers,okboomer,NeverTrump] tweetVia="BaleadaToolkit" tweetUrl="current"
> Baleada Prose Blockquotes are a dream come true for all you Twitter fiends out there!
|||
```
:::

:::
### Rendered
:::

::: tweetHashtags=[twitterfiends,memers,okboomer,NeverTrump]
> Baleada Prose Blockquotes are a dream come true for all you Twitter fiends out there!
:::


:::
## Props
:::

::: ariaLabel="ProseAside props" classes="wide-5"
| Prop | Type | Required? | Default | Description |
| --- | --- | --- | --- | --- |
| `canTweet` | Boolean | no | `false` | Indicates whether or not the tweet button should render. |
| `tweetText` | String | no | Your `blockquote`'s text content | Custom text for your tweet, in case you want to override the default. |
| `tweetHashtags` | Array | no | `[]` | Hashtags (Strings) that will be appended to the tweet text. Omit the `#` in your hashtags. |
| `tweetVia` | String | no | none | A Twitter handle that will be mentioned in the tweet. Omit the `@` from the Twitter handle. |
| `tweetUrl` | String | no | none | <p>A URL that Twitter should shorten and append to the tweet.</p><p>You can also pass the keyword `'current'` to make `ProseBlockquote` use the URL of the page your blockquote is on.</p> |
| `classes` | String | no | none | Adds additional classes to the component's root element. |
:::


:::
## Structure
:::

Here's the structure of `ProseBlockquote`'s markup, written in [Pug](https://github.com/pugjs/pug#syntax) for simplicity:

:::
```pug
section.baleada-prose-blockquote
  section.contents
    slot // <- Your blockquote slots in here
  a
    svg // <-- Twitter icon
```
:::



:::
## API design compliance
:::

[WIP]

<!-- ::: ariaLabel="A table showing ProseAside's API design compliance"  classes="wide-1 wide-3"
| Spec | Compliance status | Notes |
| --- | --- | --- |
::: -->