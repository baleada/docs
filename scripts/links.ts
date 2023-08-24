import { resolve, parse, dirname } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: resolve('./.env') })
const relativePathToLogic = process.env.RELATIVE_PATH_TO_LOGIC

function write () {
  const files: string[] = []
  for (const { name, title, createdName, fileName, kind } of toLogicLinkMetadata().links) {
    const path = `./src/prose/logic/links/${fileName}.md`,
          fileExists = readdirSync(dirname(path)).includes(parse(path).base)
    
    if (fileExists) continue

    const contents = `\
---
title: ${title}
tags: UI Logic
source: ${kind}.ts
publish: true
order: 0
---

\`${name}\` is a [link](/docs/logic/links-overview) that <!--TODO--> ${kind === 'any' ? 'anything' : `a${/^[aeiou]/.test(kind) ? 'n' : ''} ${kind.replace(/ async/, '')}`}.


:::
## Create ${title}
:::

Call \`${name}\` with no parameters to create your \`${createdName}\` function.

Call \`${name}\` with these parameters to create your \`${createdName}\` function:

::: ariaLabel="${name} parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::

`

    writeFileSync(path, contents, { encoding: 'utf8' })

    files.push(fileName)
  }

  console.log(`Wrote ${files.length} link documentation files`)
}

export type PipeMetadatum = {
  name: string,
  title: string,
  createdName: string,
  fileName,
  kind: 'any'
    | 'array async'
    | 'array'
    | 'associative array'
    | 'class value'
    | 'color'
    | 'decision tree'
    | 'directed acyclic async'
    | 'directed acyclic'
    | 'element'
    | 'generator async'
    | 'generator'
    | 'graph async'
    | 'graph tree'
    | 'graph'
    | 'keyboard event key'
    | 'keyboard event'
    | 'many'
    | 'map'
    | 'number'
    | 'object'
    | 'string'
    | 'tree',
}

export function toLogicLinkMetadata (): { links: PipeMetadatum[] } {
  const links = readFileSync(`${relativePathToLogic}/src/links/index.ts`, { encoding: 'utf8' }),
        linkMetadata = toPipeMetadata(links),
        metadata = {
          links: linkMetadata,
        }

  console.log(`toLogicLinkMetadata: Scraped metadata for ${metadata.links.length} links`)

  return metadata
}

const exportBlockRE = /(export \{([^\}]|\n)*?\}) from '\.\/([-A-Za-z]+)'/g
const linkRE = /( {2,}create\w+,| as create\w+,)/g
const kindRE = /from '\.\/([-A-Za-z]+)/
function toPipeMetadata (links: string) {
  return (links.match(exportBlockRE) || [])
    .flatMap(block => {
      const kind = block.match(kindRE)?.[1].replace(/-/g, ' ')
      return (block.match(linkRE) || [])
        .map(
          link => {
            const name = link
                    .replace(/ {2,}/, '')
                    .replace(/,/, '')
                    .replace(/ as /, ''),
                  title = link
                    .replace(/ {2,}create/, '')
                    .replace(/,/, '')
                    .replace(/ as create/, '')
                    .replace(/([A-Z])/g, ' $1')
                    .trim()
                    .toLowerCase(),
                  fileName = title.replace(/ /g, '-'),
                  createdName = title.replace(/ [a-z]/g, match => match.toUpperCase().trim())

            return {
              name,
              createdName,
              title,
              fileName,
              kind,
            }
          }
        )
    })
    .sort((a, b) => a.kind.localeCompare(b.kind))
}

write()
