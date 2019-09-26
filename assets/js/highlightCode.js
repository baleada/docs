export default function highlightCode (hljs, options) {
  if (hljs === undefined) {
    console.error('Cannot highlight syntax: hljs is undefined in the highlightCode function.')
    return
  }

  options = {
    container: document,
    languages: [],
    blocks: 'pre code',
    ...options
  }

  const blocks = options.container.querySelectorAll(options.blocks)

  blocks.forEach(block => {
    options.languages.forEach(language => {
      block.classList.add(language)
    })
    hljs.highlightBlock(block)
  })
}
