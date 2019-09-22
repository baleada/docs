const fs = require('fs')

function generateDirectories () {
  const dirs = getDirs('./assets/markdown')
  dirs.forEach(dir => {
    fs.mkdirSync(
      dir.replace(/assets\/markdown/, 'pages/docs'),
      { recursive: true }
    )
  })

  console.log(`Generated ${dirs.length} directories`)
}

function getDirs (dir) {
  return fs.readdirSync(dir)
    .reduce((dirs, item) => {
      item = !item.includes('.') ? [`${dir}/${item}`, ...getDirs(`${dir}/${item}`)] : []
      return [
        ...dirs,
        ...item
      ]
    }, [])
}

module.exports = {
  generateDirectories
}
