const { readdirSync, statSync, readFileSync } = require('fs'),
      { resolve, parse } = require('path'),
      matter = require('gray-matter'),
      { default: gitlog } = require('gitlog'),
      { toDirIds } = require('@baleada/source-transform-utils'),
      { clipable } = require('@baleada/logic'),
      basePath = resolve('')

module.exports = function proseFilesToManifest () {
  const dirIds = toDirIds(`${basePath}/src/prose`),
        manifest = [
          {
            level: 1,
            name: 'overview',
            articles: toManifested(`${basePath}/src/prose`),
          },
          ...dirIds.map(id => ({
            level: clipable(id).clip(basePath).clip('/src/prose/').split('/').length,
            name: parse(id).name.replace(/-/g, ' '),
            articles: toManifested(id),
          }))
        ]

  console.log(manifest[24])
  return `export default ${JSON.stringify(manifest)}`
}

function toManifested (id) {
  const files = readdirSync(id).filter(item => statSync(`${id}/${item}`).isFile())

  return files
    .filter(file => matter(readFileSync(`${id}/${file}`, 'utf8')).data.publish === true)
    .map(file => {
      const { data: { title, tags: rawTags, order } } = matter(readFileSync(`${id}/${file}`, 'utf8')),
            tags = rawTags ? rawTags.split(',').map(tag => tag.trim()) : [],
            fileName = parse(`${id}/${file}`).name,
            href = `/docs${clipable(id).clip(basePath).clip('/src/prose')}/${clipable(fileName).clip(/^index$/)}`,
            updatedAt = toStats(`${id}/${file}`).authorDate
      
      return {
        title,
        tags,
        href,
        updatedAt,
        order,
      }
    })
    .slice().sort(byOrder)
}

function toStats (id) {
  const basePath = resolve(''),
        relativePath = `${clipable(id).clip(basePath).clip(/^\//)}`,
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
