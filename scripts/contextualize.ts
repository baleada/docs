import { contextualize } from '@alexvipond/llm-context'
import { readdir, stat } from 'node:fs/promises'
import matter from 'gray-matter'

const directories = await (async () => {
        const candidates = await readdir('src/prose/'),
              directories = []
        for (const candidate of candidates) {
          const stats = await stat(`src/prose/${candidate}`)
          if (!stats.isDirectory()) continue;
          directories.push(candidate)
        }
        return directories
      })()

for (const directory of directories) {
  contextualize({
    destination: `public/llm-context/${directory}/llms.txt`,
    sections: [
      {
        heading: 'Docs',
        include: {
          patterns: [`src/prose/${directory}/**/*.md`],
          should: ({ code }) => {
            const { data } = matter(code)
            return !!data.publish
          }
        }
      },
    ],
  })
}
