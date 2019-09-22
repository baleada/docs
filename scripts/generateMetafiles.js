const fs = require('fs'),
      fm = require('front-matter'),
      { generateDirectories } = require('./util/generateDirectories.js'),
      { generatePages } = require('./util/generatePages.js'),
      { generateManifest } = require('./util/generateManifest.js'),
      { generateSearchable } = require('./util/generateSearchable.js')

function generateMetafiles () {
  const files = getFiles('./assets/markdown'),
        metadata = getMetadata(files)

  fs.writeFileSync('./assets/json/metadata.json', JSON.stringify(metadata, null, 2))
  generateDirectories(metadata)
  generatePages(metadata)
  generateManifest(metadata)
  // generateSearchable(metadata)

  console.log(`Analyzed ${files.length} articles for metadata`)
}

function getFiles (dir) {
  return fs.readdirSync(dir)
    .filter(item => item !== '.DS_Store')
    .reduce((files, item) => {
      item = item.includes('.') ? [`${dir}/${item}`] : getFiles(`${dir}/${item}`)
      return [
        ...files,
        ...item
      ]
    }, [])
}

function getMetadata (files) {
  return files.map(path => {
    const contents = fs.readFileSync(path, 'utf8'),
          { attributes: { title, framework, publish }, body } = fm(contents),
          { mtime: updatedAt } = fs.statSync(path),
          { fileName, siteUrl } = toPathMetadata(path)
          
    return {
      title,
      framework,
      publish,
      body,
      updatedAt,
      path,
      fileName,
      siteUrl
    }
  })
}

function toPathMetadata (path) {
  const fileName = path.match(/[A-Za-z-]+\.md$/)[0].replace(/\.md$/, ''),
        siteUrlPrefix = `/docs${path.replace(/\.\/assets\/markdown/, '').replace(/\/[A-Za-z-]+\.md$/, '')}`,
        siteUrlSuffix = `${fileName === 'index' ? '' : '/' + fileName}`,
        siteUrl = `${siteUrlPrefix}${siteUrlSuffix}`

  return { fileName, siteUrl }
}

generateMetafiles()
