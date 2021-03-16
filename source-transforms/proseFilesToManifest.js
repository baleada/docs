import { readdirSync, statSync, readFileSync } from 'fs'
import { resolve, parse } from 'path'
import  matter from 'gray-matter'
import gitlog from 'gitlog'
import { toDirIds } from '@baleada/source-transform-utils'
import { Pipeable, createClip } from '@baleada/logic'

const basePath = resolve('')

export default function proseFilesToManifest () {
  console.log('Creating manifest...')

  const dirIds = toDirIds(`${basePath}/src/prose`),
        manifest = [
          {
            level: 1,
            name: 'overview',
            articles: toManifested(`${basePath}/src/prose`),
          },
          ...dirIds.map(
            id => ({
              level: new Pipeable(id).pipe(
                createClip(basePath),
                createClip('/src/prose/')
              ).split('/').length,
              name: parse(id).name.replace(/-/g, ' '),
              articles: toManifested(id),
            })
          )
        ].filter(({ articles }) => articles.length > 0)

  const totalArticles = manifest.reduce((totalArticles, { articles }) => totalArticles + articles.length, 0)
  console.log(`${totalArticles} articles from ${manifest.length} directories added to the manifest`)

  return `export default ${JSON.stringify(manifest)}`
}

function toManifested (id) {
  const files = readdirSync(id),
        manifestable = files.filter(file => (statSync(`${id}/${file}`)).isFile()),
        published = manifestable.filter(file => matter(readFileSync(`${id}/${file}`, 'utf8')).data.publish === true),
        manifested = published.map(
          file => {
            const { data: { title, tags: rawTags, order } } = matter(readFileSync(`${id}/${file}`, 'utf8')),
            tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
            fileName = parse(`${id}/${file}`).name,
            href = `/docs${new Pipeable(id).pipe(createClip(basePath), createClip('/src/prose'))}${new Pipeable(`/${fileName}`).pipe(createClip(/^\/index$/))}`,
            authorDate = (toStats(`${id}/${file}`)).authorDate

            return {
              title,
              tags,
              href,
              authorDate,
              order,
            }
          }
        )
        
  return manifested.sort(byOrder)
}

function toStats (id) {
  const basePath = resolve(''),
        relativePath = `${new Pipeable(id).pipe(createClip(basePath), createClip(/^\//))}`,
        { 0: stats } = gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return stats
}

function byOrder (a, b) {
  if (a.order - b.order !== 0) {
    return a.order - b.order
  } else {
    return 0
  }
}
