import { readdir, stat, readFile } from 'fs/promises'
import { resolve, parse } from 'path'
import  matter from 'gray-matter'
import { gitlogPromise as gitlog } from 'gitlog'
import { toDirIds } from '@baleada/source-transform-utils'
import { clipable, asyncFilterable, asyncMapable } from '@baleada/logic'

const basePath = resolve('')

export default async function proseFilesToManifest () {
  console.log('Creating manifest...')

  const dirIds = await toDirIds(`${basePath}/src/prose`),
        manifest = [
          {
            level: 1,
            name: 'overview',
            articles: await toManifested(`${basePath}/src/prose`),
          },
          ...(await
            asyncMapable(dirIds).asyncMap(
              async id => ({
                level: clipable(id).clip(basePath).clip('/src/prose/').split('/').length,
                name: parse(id).name.replace(/-/g, ' '),
                articles: await toManifested(id),
              })
            )
          )
        ]

  const totalArticles = manifest.reduce((totalArticles, { articles }) => totalArticles + articles.length, 0)
  console.log(`${totalArticles} articles from ${manifest.length} directories added to the manifest`)

  return `export default ${JSON.stringify(manifest)}`
}

async function toManifested (id) {
  const files = await readdir(id),
        manifestable = await asyncFilterable(files).asyncFilter(async file => (await stat(`${id}/${file}`)).isFile()),
        published = await asyncFilterable(manifestable).asyncFilter(async file => matter(await readFile(`${id}/${file}`, 'utf8')).data.publish === true),
        manifested = await asyncMapable(published).asyncMap(
          async file => {
            const { data: { title, tags: rawTags, order } } = matter(await readFile(`${id}/${file}`, 'utf8')),
            tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
            fileName = parse(`${id}/${file}`).name,
            href = `/docs${clipable(id).clip(basePath).clip('/src/prose')}${clipable(`/${fileName}`).clip(/^\/index$/)}`,
            authorDate = (await toStats(`${id}/${file}`)).authorDate

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

async function toStats (id) {
  const basePath = resolve(''),
        relativePath = `${clipable(id).clip(basePath).clip(/^\//)}`,
        { 0: stats } = await gitlog({ repo: basePath, file: relativePath, number: 1 })
  
  return stats
}

function byOrder (a, b) {
  if (a.order - b.order !== 0) {
    return a.order - b.order
  } else {
    return 0
  }
}
