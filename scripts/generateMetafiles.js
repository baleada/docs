const fs = require('fs'),
      fm = require('front-matter'),
      { generatePages } = require('./util/generatePages.js'),
      { generateManifest } = require('./util/generateManifest.js'),
      { generateSearchable } = require('./util/generateSearchable.js')

function generateMetafiles () {
  const files = getFiles('./assets/markdown'),
        metadata = getMetadata(files)

  console.log(metadata[1])
  // generateManifest(metadata)
  // generatePages(article)
  // generateSearchable(metadata)

  console.log(`Metafiles generated for ${files.length} articles.`)
}

function getFiles (dir) {
  return fs.readdirSync(dir)
    .filter(item => item !== '.DS_Store')
    .reduce((fileList, item) => {
      item = item.includes('.') ? [`${dir}/${item}`] : getFiles(`${dir}/${item}`)
      return [
        ...fileList,
        ...item
      ]
    }, [])
}

function getMetadata (files) {
  return files.map(path => {
    const contents = fs.readFileSync(path, 'utf8'),
          { attributes: { title, titleIsCode, framework, publish }, body } = fm(contents),
          { mtime: updatedAt } = fs.statSync(path),
          { fileName, siteUrl } = toPathMetadata(path)

    return {
      title,
      titleIsCode,
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
  const fileName = path.split('/').reverse()[0].split('.')[0],
        siteUrlPrefix = `/docs/${path.split('/').slice(3).reverse().slice(1).reverse().join('/')}`,
        siteUrlSuffix = `/${fileName === 'index' ? '' : fileName}`,
        siteUrl = `${siteUrlPrefix}${siteUrlSuffix}`

  return { fileName, siteUrl }
}

generateMetafiles()
