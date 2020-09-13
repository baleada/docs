const { clipable } = require('@baleada/logic')

//    Support prose imported as vue
const sourceTransform = require('@baleada/rollup-plugin-source-transform'),
      getServeAsVue = require('@baleada/vite-serve-as-vue'),
      sourceTransformProseToVueSfc = require('./source-transforms/proseToVueSfc'),
      // Support virtual routes and indices
      virtual = require('@baleada/rollup-plugin-virtual'),
      getServeVirtual = require('@baleada/vite-serve-virtual'),
      // Transform virtual routes
      getFilesToRoutesTransform = require('@baleada/source-transform-files-to-routes'),
      filesToRoutes = getFilesToRoutesTransform('vue', { exclude: ['**/.**', '**/*routes.js'], transformPath: path => `${clipable(path).clip(/^\//)}` }),
      relativeFromRootFilesToRoutes = getFilesToRoutesTransform('vue', { exclude: ['**/.**', '**/*routes.js'], importType: 'relativeFromRoot', transformPath: path => `${clipable(path).clip(/^\//)}` }),
      // Transform virtual indices
      getFilesToIndexTransform = require('@baleada/source-transform-files-to-index'),
      filesToIndex = getFilesToIndexTransform(),
      relativeFromRootFilesToIndex = getFilesToIndexTransform({ importType: 'relativeFromRoot' }),
      // Alias babel runtime
      aliasBabelRuntime = require('@baleada/vite-alias-babel-runtime')

module.exports = {
  alias: aliasBabelRuntime(),
  configureServer: [
    getServeAsVue({
      toVue: sourceTransformProseToVueSfc,
      include: '**/*.prose',
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/assets/js'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToIndex({ id }),
      })
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/components'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToIndex({ id }),
      })
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/docs/routes'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToRoutes({ id }),
      })
    }),
  ],
  rollupInputOptions: {
    plugins: [
      sourceTransform({
        include: '**/*.prose',
        transform: ({ source }) => sourceTransformProseToVueSfc({ source }),
      }),
      virtual({
        include: '**/assets/js',
        transform: ({ id }) => filesToIndex({ id }),
      }),
      virtual({
        include: '**/components',
        transform: ({ id }) => filesToIndex({ id }),
      }),
      virtual({
        include: '**/docs/routes',
        transform: ({ id }) => filesToRoutes({ id }),
      }),
    ]
  },
  rollupPluginVueOptions: {
    include: ['**/*.vue', '**/*.prose'],
  },
}

