const fs = require('fs')

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
  getDirs
}
