import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    dir: 'lib',
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'vtils',
    sourceMap: true,
  },
  babel: {
    minimal: true,
    objectAssign: '__OBJECT_ASSIGN__',
  },
}

export default config
