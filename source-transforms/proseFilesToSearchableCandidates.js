const { readFileSync } = require('fs'),
      { resolve, parse } = require('path'),
      matter = require('gray-matter'),
      { toFileIds } = require('@baleada/source-transform-utils'),
      { clipable } = require('@baleada/logic'),
      basePath = resolve(''),
      prerender = require('./util/md'),
      MarkdownIt = require('markdown-it'),
      MarkdownItTextContent = require('@baleada/markdown-it-text-content')

module.exports = function proseFilesToSearchableCandidates () {
  const ids = toFileIds(`${basePath}/src/prose`),
        candidates = ids
          .filter(id => matter(readFileSync(id, 'utf8')).data.publish === true)
          .map(id => {
            const { content, data: { tags: rawTags } } = matter(readFileSync(id, 'utf8')),
                  searchableContent = toSearchableContent(content),
                  tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
                  { name: fileName, dir } = parse(id),
                  href = `/docs${clipable(dir).clip(basePath).clip('/src/prose')}/${clipable(fileName).clip(/^index$/)}`

            return {
              searchableContent,
              tags,
              href,
            }
          })

  return `export default [${JSON.stringify(candidates)}]`
}

const postrender = (new MarkdownIt({ html: true })).use(MarkdownItTextContent)

function toSearchableContent (markdown) {
  const prerendered = prerender.render(markdown)
  return postrender.render(prerendered.replace(/\n{2,}/g, '\n'))
}
