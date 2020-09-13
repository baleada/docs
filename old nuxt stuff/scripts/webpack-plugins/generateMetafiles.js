const generateMetafiles = require('../generateMetafiles')

class GenerateMetafilesPlugin {
  apply (compiler) {
    compiler.hooks.watchRun.tapAsync('Generate Metafiles Plugin', (compilation, done) => {
      generateMetafiles()
      done()
    })
  }
}

module.exports = GenerateMetafilesPlugin
