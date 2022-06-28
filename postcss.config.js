const { configureable } = require('@baleada/prepare')

module.exports = new configureable.Postcss()
  .import()
  .nesting()
  .tailwindcss()
  .autoprefixer()
  .configure()
