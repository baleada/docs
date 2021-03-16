import { readFileSync } from 'fs'
import { resolve, parse } from 'path'
import matter from 'gray-matter'
import { toFileIds } from '@baleada/source-transform-utils'
import { Pipeable, createClip } from '@baleada/logic'
import prerender from './util/md.js'
import MarkdownIt from 'markdown-it'
import MarkdownItTextContent from '@baleada/markdown-it-text-content'

const basePath = resolve('')

export default function proseFilesToSearchableCandidates () {
  console.log('Creating searchable candidates...')
  const ids = toFileIds(`${basePath}/src/prose`),
        candidates = ids
          .filter(id => matter(readFileSync(id, 'utf8')).data.publish === true)
          .map(id => {
            const { content, data: { tags: rawTags } } = matter(readFileSync(id, 'utf8')),
                  searchableContent = toSearchableContent(content),
                  tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
                  { name: fileName, dir } = parse(id),
                  href = `/docs${new Pipeable(dir).pipe(createClip(basePath), createClip('/src/prose'))}/${new Pipeable(fileName).pipe(createClip(/^index$/))}`

            return {
              searchableContent,
              tags,
              href,
            }
          })

  console.log(`${candidates.length} articles added to searchable candidates`)
  return `export default ${JSON.stringify(candidates)}`
}

const postrender = (new MarkdownIt({ html: true })).use(MarkdownItTextContent)

function toSearchableContent (markdown) {
  const prerendered = prerender.render(markdown)
  return postrender.render(prerendered.replace(/\n{2,}/g, '\n'))
}
