import 'markdown-it-multimd-table'

const config = {
  html: true,
  injected: true,
  use: [
    ['markdown-it-multimd-table', { enableMultilineRows: true }],
  ],
}

export default config
