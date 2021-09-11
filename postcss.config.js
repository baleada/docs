const { configureable } = require('@baleada/prepare')

module.exports = new configureable.Postcss()
  .import()
  .nested()
  .tailwindcss()
  .autoprefixer()
  .configure()

// module.exports = {
//   plugins: [
//     require('postcss-import'),
//     require('postcss-nested'),
//     require('tailwindcss'),
//   ]
// }
