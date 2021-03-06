const { configureable } = require('@baleada/prepare')

module.exports = configureable('postcss')
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
