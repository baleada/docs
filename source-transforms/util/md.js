const MarkdownIt = require('markdown-it'),
      MarkdownItProseContainer = require('@baleada/markdown-it-prose-container'),
      MarkdownItSpaLinks = require('@baleada/markdown-it-spa-links'),
      MarkdownItLinkAttributes = require('markdown-it-link-attributes'),
      refractor = require('refractor'),
      rehype = require('rehype'),
      markdownItOptions = {
        html: true,
        linkify: true,
        highlight: (code, lang) => {
          try {
            const children = refractor.highlight(code, lang),
                  html = rehype()
                    .stringify({ type: 'root', children })
                    .toString()
            
            // Escape raw Vue expression
            return html.replace(/({{|}})/g, '<span>$1</span>')
          } catch (error) {
            return ''
          }
        },
      },
      md = new MarkdownIt(markdownItOptions)

md.use(MarkdownItProseContainer, { template: 'vue' })
md.use(MarkdownItSpaLinks, { spa: 'vue' })
md.use(MarkdownItLinkAttributes, { attrs: { rel: 'noopener' } })

module.exports = md
