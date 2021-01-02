// const { configureable } = require('@baleada/prepare')

// module.exports = configureable('postcss')
//   .import()
//   .presetEnv()
//   .tailwindcss()
//   .configure()

// import atImport from 'postcss-import'
// import nested from 'postcss-nested'
// import tailwindcss from 'tailwindcss'

// export default {
//   plugins: [
//     atImport,
//     // require('postcss-preset-env'),
//     nested,
//     tailwindcss,
//   ]
// }

module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('tailwindcss'),
  ]
}
