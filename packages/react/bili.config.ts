import {Config} from 'bili'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    dir: 'lib',
    format: ['cjs', 'es', 'umd', 'umd-min'],
    moduleName: 'vr',
    sourceMap: true,
  },
  babel: {
    minimal: true,
  },
  externals: [
    'react',
    'vtils',
    // fix: 软链接
    /vtils\/lib/,
  ],
}

export default config
