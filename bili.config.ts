import { Config } from 'bili'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    dir: 'lib',
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'vtils',
  },
}

export default config
