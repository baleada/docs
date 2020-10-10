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
      testRoute = ({ source, id, createFilter }) => {
        // Exclude dotfiles
        if (createFilter('**/.**')(id)) {
          return false
        }

        const { data: { publish } } = matter(source)
        return publish
      },
      matter = require('gray-matter'),
      filesToRoutes = getFilesToRoutesTransform(
        'vue', 
        {
          test: testRoute,
          transformPath: path => `${clipable(path).clip(/^\//)}`
        }
      ),
      relativeFromRootFilesToRoutes = getFilesToRoutesTransform(
        'vue',
        {
          test: testRoute,
          importType: 'relativeFromRoot',
          transformPath: path => `${clipable(path).clip(/^\//)}`
        }
      ),
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
  alias: {
    ...aliasBabelRuntime(),
    '@components': '/src/components',
    '@functions': '/src/functions',
    '@state': '/src/state',
  },
  configureServer: [
    getServeAsVue({
      toVue: sourceTransformProseToVueSfc,
      include: '**/*.prose',
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/components'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToIndex({ id }),
      }),
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/functions'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToIndex({ id }),
      }),
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/state'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToIndex({ id }),
      }),
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/prose/routes'),
      transform: ({ id }) => ({
        type: 'js',
        source: relativeFromRootFilesToRoutes({ id }),
      }),
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/state/manifest'),
      transform: () => ({
        type: 'js',
        source: proseFilesToManifest(),
      }),
    }),
    getServeVirtual({
      test: ({ id }) => id.endsWith('/src/state/searchableCandidates'),
      transform: () => ({
        type: 'js',
        source: proseFilesToSearchableCandidates(),
      }),
    }),
  ],
  rollupInputOptions: {
    plugins: [
      sourceTransform({
        include: '**/*.prose',
        transform: ({ source }) => sourceTransformProseToVueSfc({ source }),
      }),
      virtual({
        include: '**/components',
        transform: ({ id }) => filesToIndex({ id }),
      }),
      virtual({
        include: '**/functions',
        transform: ({ id }) => filesToIndex({ id }),
      }),
      virtual({
        include: '**/state',
        transform: ({ id }) => filesToIndex({ id }),
      }),
      virtual({
        include: '**/prose/routes',
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

