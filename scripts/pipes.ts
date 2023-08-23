import { resolve, parse, dirname } from 'path'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { config } from 'dotenv'

config({ path: resolve('./.env') })
const relativePathToLogic = process.env.RELATIVE_PATH_TO_LOGIC

function write () {
  const files: string[] = []
  for (const { name, title, createdName, fileName, kind } of toLogicPipeMetadata().pipes) {
    const path = `./src/prose/logic/pipes/${fileName}.md`,
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

\`${name}\` is a pipe that accepts ${kind === 'any' ? 'anything' : `a${/^[aeiou]/.test(kind) ? 'n' : ''} ${kind.replace(/ async/, '')}`} as an input, and ${kind.includes('async') ? 'asynchronously ' : ''}outputs <!--TODO-->.

${
  kind.includes('array')
    ? `\
::: type="info"
\`${name}\` is a light wrapper around [\`${createdName.replace(/Async/, '')}\`](https://github.com/RobinMalfait/lazy-collections#${createdName.replace(/Async/, '')}) and [\`toArray\`](https://github.com/RobinMalfait/lazy-collections#toarray) from \`lazy-collections\`.

If you're sending your array through multiple transformations, prefer using \`lazy-collections\` directly, to maximize [its benefits](https://alexvipond.dev/blog/im-obsessed-with-lazy-collections).
:::

`
    : ''
}
:::
## Create \`${createdName}\`
:::

Call \`${name}\` with no parameters to create your \`${createdName}\` function.

Call \`${name}\` with the parameters listed below to create your \`${createdName}\` function:

::: ariaLabel="${name} parameters" classes="wide-4"
| Parameter | Type | Required | Description |
| --- | --- | --- | --- |

:::


:::
## Using with TypeScript
:::

Nothing special to know about using \`${name}\` with TypeScript 🚀
`

    writeFileSync(path, contents, { encoding: 'utf8' })

    files.push(fileName)
  }

  console.log(`Wrote ${files.length} pipe documentation files`)
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

export function toLogicPipeMetadata (): { pipes: PipeMetadatum[] } {
  const pipes = readFileSync(`${relativePathToLogic}/src/pipes/index.ts`, { encoding: 'utf8' }),
        pipeMetadata = toPipeMetadata(pipes),
        metadata = {
          pipes: pipeMetadata,
        }

  console.log(`toLogicPipeMetadata: Scraped metadata for ${metadata.pipes.length} pipes`)

  return metadata
}

const exportBlockRE = /(export \{([^\}]|\n)*?\}) from '\.\/([-A-Za-z]+)'/g
const pipeRE = /( {2,}create\w+,| as create\w+,)/g
const kindRE = /from '\.\/([-A-Za-z]+)/
function toPipeMetadata (pipes: string) {
  return (pipes.match(exportBlockRE) || [])
    .flatMap(block => {
      const kind = block.match(kindRE)?.[1].replace(/-/g, ' ')
      return (block.match(pipeRE) || [])
        .map(
          pipe => {
            const name = pipe
                    .replace(/ {2,}/, '')
                    .replace(/,/, '')
                    .replace(/ as /, ''),
                  title = pipe
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
