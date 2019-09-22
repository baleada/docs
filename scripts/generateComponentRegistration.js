const fs = require('fs'),
      componentType = process.argv[2]

function generateComponentRegistration (componentType) {
  const files = fs.readdirSync(`./components/${componentType}`),
        components = files.map(path => path.split('/').reverse()[0].split('.')[0]),
        imports = components.reduce((imports, component) => `${imports}import ${component} from '~/components/${componentType}/${component}.vue'\n`, ''),
        registration = components.reduce((registration, component) => `${registration}Vue.component('${component}', ${component})\n`, '')

  fs.writeFileSync(
    `./plugins/${componentType}-components.js`,
    `\
import Vue from 'vue'\n\
${imports}\n\
${registration}\
`
  )

  console.log(`Registered ${components.length} ${componentType} components.`)
}

generateComponentRegistration(componentType)
