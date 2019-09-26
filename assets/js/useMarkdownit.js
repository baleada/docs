import MarkdownIt from 'markdown-it'
import 'markdown-it-multimd-table'
import prism from 'markdown-it-prism'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'

export default function useMarkdownit () {
  const md = new MarkdownIt()
  // md.use('markdown-it-multimd-table', { enableMultilineRows: true })
  // md.use(prism)
  return md
}
