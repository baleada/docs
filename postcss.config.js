// const { configureable } = require('@baleada/prepare')

// module.exports = configureable('postcss')
//   .import()
//   .presetEnv()
//   .tailwindcss()
//   .configure()

module.exports = {
  plugins: [
    require('postcss-import'),
    // require('postcss-preset-env'),
    require('postcss-nested'),
    require('tailwindcss'),
  ]
}
