const fs = require('fs'),
      getDirs = require('./getDirs.js')

function generateDirectories () {
  const dirs = getDirs('./assets/prose')
  dirs.forEach(dir => {
    fs.mkdirSync(
      dir.replace(/assets\/prose/, 'pages/docs'),
      { recursive: true }
    )
  })

  console.log(`Generated ${dirs.length} directories`)
}

module.exports = generateDirectories
