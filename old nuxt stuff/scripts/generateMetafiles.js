const fs = require('fs'),
      fm = require('front-matter'),
      generateDirectories = require('./util/generateDirectories.js'),
      generatePages = require('./util/generatePages.js'),
      generateManifest = require('./util/generateManifest.js'),
      generateSearchable = require('./util/generateSearchable.js')

function generateMetafiles () {
  const files = getFiles('./assets/prose'),
        metadata = getMetadata(files)

  fs.writeFileSync('./static/json/metadata.json', JSON.stringify(metadata, null, 2))
  generateDirectories(metadata)
  generatePages(metadata)
  generateManifest(metadata)
  generateSearchable(metadata)

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
          { attributes: { title, framework, publish, order }, body } = fm(contents),
          { mtime: updatedAt } = fs.statSync(path),
          { fileName, href } = toPathMetadata(path)

    return {
      title,
      framework,
      publish,
      order,
      body,
      updatedAt,
      path,
      fileName,
      href
    }
  })
}

function toPathMetadata (path) {
  const fileName = path.match(/[A-Za-z-]+\.prose$/)[0].replace(/\.prose$/, ''),
        hrefPrefix = `/docs${path.replace(/\.\/assets\/prose/, '').replace(/\/[A-Za-z-]+\.prose$/, '')}`,
        hrefSuffix = `${fileName === 'index' ? '' : '/' + fileName}`,
        href = `${hrefPrefix}${hrefSuffix}`

  return { fileName, href }
}

// module.exports = generateMetafiles
generateMetafiles()
