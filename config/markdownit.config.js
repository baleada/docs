import 'markdown-it-multimd-table'

const config = {
  html: true,
  highlight: str => str,
  use: [
    ['markdown-it-multimd-table', { enableMultilineRows: true }],
  ],
}

export default config
