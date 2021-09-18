import { readdirSync, statSync, readFileSync } from 'fs'
import { resolve, parse } from 'path'
import matter from 'gray-matter'
import gitlog from 'gitlog'
import fastGlob from 'fast-glob'

export function proseFilesToManifest (): string {
  console.log('Creating manifest...')

  let words: number = 0
  const incrementWords = (increment: number) => (words += increment)

  const dirIds = fastGlob.sync('src/prose/**', { onlyDirectories: true }).sort(),
        manifest = [
          {
            level: 1,
            name: 'overview',
            articles: toManifested('src/prose', incrementWords),
          },
          ...dirIds.map(
            id => ({
              level: id.replace('src/prose/', '').split('/').length,
              name: parse(id).name.replace(/-/g, ' '),
              articles: toManifested(id, incrementWords),
            })
          )
        ].filter(({ articles }) => articles.length > 0)

  const totalArticles = manifest.reduce((totalArticles, { articles }) => totalArticles + articles.length, 0)
  console.log(`${totalArticles} articles with ${new Intl.NumberFormat('en-US', { style: 'decimal' }).format(words)} words from ${manifest.length} directories added to the manifest`)

  return `export const manifest = ${JSON.stringify(manifest)}`
}

function toManifested (dirPath: string, incrementWords: (increment: number) => void) {
  const files = readdirSync(dirPath),
        manifestable = files.filter(file => (statSync(`${dirPath}/${file}`)).isFile()),
        manifested = manifestable.reduce((manifested, file) => {
          const contents = readFileSync(`${dirPath}/${file}`, 'utf8'),
                frontMatter = matter(contents)

          incrementWords(frontMatter.content.split(' ').length)

          if (!frontMatter.data.publish) {
            return manifested
          }

          const { data: { title, tags: rawTags, order } } = matter(readFileSync(`${dirPath}/${file}`, 'utf8')),
                tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
                fileName = parse(`${dirPath}/${file}`).name,
                href = `/docs${dirPath.replace('src/prose', '')}${`/${fileName}`.replace(/^\/index$/, '')}`,
                authorDate = (toStats(`${dirPath}/${file}`)).authorDate

          manifested.push({
            title,
            tags,
            href,
            authorDate,
            order,
          })

          return manifested
        }, [])
        
  return manifested.sort(byOrder)
}

function toStats (filePath) {
  const basePath = resolve(''),
        relativePath = filePath.replace(/^\//, ''),
        { 0: stats } = gitlog({ repo: basePath, file: relativePath, number: 1 })

  if (!stats) {
    throw new Error(`${relativePath} has no git log`)
  }
  
  return stats
}

function byOrder (a, z) {
  return a.order - z.order
}

