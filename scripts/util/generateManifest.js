const fs = require('fs'),
      getDirs = require('./getDirs.js')

function generateManifest (metadata) {
  const published = metadata.filter(article => article.publish),
        manifest = [
          {
            level: 1,
            name: 'overview',
            pages: getOverviewPages(published)
          },
          ...getDirs('./assets/md').map(dir => {
            const level = dir.match(/\//g).length - 2, // 2 backslashes in ./assets/md,
                  name = dir.match(/(?:\w|-)+$/)[0],
                  pages = getPages(dir, name, published),
                  displayName = name.replace(/-/g, ' ').replace(/markdown it/, 'markdown-it')

            return { level, name: displayName, pages }
          }),
        ]

  fs.writeFileSync('./static/json/manifest.json', JSON.stringify(manifest, null, 2))

  console.log(`Generated manifest with ${published.length} articles`)
}

function getOverviewPages (metadata) {
  const dirRegExp = new RegExp(`/docs/$`)
  return toPages(
    metadata.filter(({ fileName, href }) => dirRegExp.test(href.replace(fileName, '')) || href === '/docs')
  )
}

function getPages (dirPath, dirName, metadata) {
  const dirRegExp = new RegExp(`${dirPath.replace(/\.\/assets\/md\//, '')}/$`)
  console.log(dirPath.replace(/\.\/assets\/md\//, ''))
  return toPages(
    metadata.filter(({ fileName, href }) => dirRegExp.test(href.replace(/\/docs\//, '').replace(fileName, '')) || href === `/docs/${dirName}`)
  )
}

function toPages (articles) {
  return articles
    .sort(byOrder)
    .map(({ title, framework, href }) => ({ title, framework, href }))
}

function byOrder (a, b) {
  if (a.order - b.order !== 0) {
    return a.order - b.order
  } else {
    return 0
  }
}

module.exports = generateManifest
