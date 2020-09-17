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
      // Generate virtual manifest
      proseFilesToManifest = require('./source-transforms/proseFilesToManifest'),
      // Generate virtual search candidates
      proseFilesToSearchableCandidates = require('./source-transforms/proseFilesToSearchableCandidates'),
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
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/state/manifest'),
      transform: () => ({
        type: 'js',
        source: proseFilesToManifest(),
      })
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/state/searchableCandidates'),
      transform: () => ({
        type: 'js',
        source: proseFilesToSearchableCandidates(),
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
      virtual({
        include: '**/state/manifest',
        transform: () => proseFilesToManifest(),
      }),
      virtual({
        include: '**/state/searchableCandidates',
        transform: () => proseFilesToSearchableCandidates(),
      }),
    ]
  },
  rollupPluginVueOptions: {
    include: ['**/*.vue', '**/*.prose'],
  },
}

