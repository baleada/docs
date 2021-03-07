import { readdir, stat, readFile } from 'fs/promises'
import { resolve, parse } from 'path'
import  matter from 'gray-matter'
import { gitlogPromise as gitlog } from 'gitlog'
import { toDirIds } from '@baleada/source-transform-utils'
import { string, array } from '@baleada/logic'

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
            array(dirIds).asyncMap(
              async id => ({
                level: string(id).clip(basePath).clip('/src/prose/').split('/').length,
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
        manifestable = await array(files).asyncFilter(async file => (await stat(`${id}/${file}`)).isFile()),
        published = await array(manifestable).asyncFilter(async file => matter(await readFile(`${id}/${file}`, 'utf8')).data.publish === true),
        manifested = await array(published).asyncMap(
          async file => {
            const { data: { title, tags: rawTags, order } } = matter(await readFile(`${id}/${file}`, 'utf8')),
            tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
            fileName = parse(`${id}/${file}`).name,
            href = `/docs${string(id).clip(basePath).clip('/src/prose')}${string(`/${fileName}`).clip(/^\/index$/)}`,
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
        relativePath = `${string(id).clip(basePath).clip(/^\//)}`,
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
