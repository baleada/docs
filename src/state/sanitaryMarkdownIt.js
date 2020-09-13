import MarkdownIt from 'markdown-it'
import MarkdownItSpaLinks from '@baleada/markdown-it-spa-links'
import MarkdownItLinkAttributes from 'markdown-it-link-attributes'

const md = new MarkdownIt({
  html: false,
  linkify: true
})

md.use(MarkdownItSpaLinks, { spa: 'vue', base: 'https://manu-o-ku.app' })
md.use(MarkdownItLinkAttributes, { attrs: { rel: 'noopener' } })

export default md