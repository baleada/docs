import { toDirIds, toFileIds } from '@baleada/source-transform-utils'
import { renameSync } from 'fs'
import { resolve, parse } from 'path'

const prose = toFileIds('src/prose').filter(file => parse(file).ext === '.prose')

prose.forEach(file => {
  renameSync(file, parse(file).dir + '/' + parse(file).name + '.md')
})

console.log(prose)
