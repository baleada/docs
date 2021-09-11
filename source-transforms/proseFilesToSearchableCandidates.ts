import { readFileSync } from 'fs'
import { resolve, parse } from 'path'
import matter from 'gray-matter'
import fastGlob from 'fast-glob'
import { md } from './util'
import MarkdownIt from 'markdown-it'
import { createMarkdownItTextContent } from '@baleada/markdown-it-text-content'

export function proseFilesToSearchableCandidates () {
  console.log('Creating searchable candidates...')
  const paths = fastGlob.sync('src/prose/**', { onlyFiles: true }),
        candidates = paths
          .filter(path => matter(readFileSync(path, 'utf8')).data.publish === true)
          .map(path => {
            const { content, data: { tags: rawTags } } = matter(readFileSync(path, 'utf8')),
                  searchableContent = toSearchableContent(content),
                  tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
                  { name: fileName, dir } = parse(path),
                  href = `/docs${dir.replace('/src/prose', '')}/${fileName.replace(/^index$/, '')}`

            return {
              searchableContent,
              tags,
              href,
            }
          })

  console.log(`${candidates.length} articles added to searchable candidates`)
  return `export const searchableCandidates = ${JSON.stringify(candidates)}`
}

const postrender = (new MarkdownIt({ html: true })).use(createMarkdownItTextContent())

function toSearchableContent (markdown) {
  const prerendered = md.render(markdown)
  return postrender.render(prerendered.replace(/\n{2,}/g, '\n'))
}
