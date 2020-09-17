const { parse } = require('parse5')

module.exports = function markdownItTextContent (md) {
  md.renderer.rules.html_block = (tokens) => toTextContent(parse(tokens[0].content))
}

function toTextContent (parsed) {
  return parsed.childNodes.reduce((textContent, node) => `${textContent}${node?.value || toTextContent(node)}`, '')
}
