const fs = require('fs')

function generateManifest (metadata) {
  const published = metadata.filter(article => article.publish),
        manifest = published.map(({ title, framework, siteUrl }) => ({ title, framework, siteUrl }))

  fs.writeFileSync('./assets/json/manifest.json', JSON.stringify(manifest, null, 2))

  console.log(`Generated manifest with ${published.length} articles`)
}

module.exports = {
  generateManifest
}
