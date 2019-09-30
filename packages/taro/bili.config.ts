import {Config} from 'bili'

const config: Config = {
  input: 'src/index.ts',
  banner: true,
  output: {
    dir: 'lib',
    format: ['cjs'],
    sourceMap: true,
  },
  babel: {
    minimal: true,
  },
  bundleNodeModules: [
    '@vtils/react',
    'react-use',
  ],
  externals: [
    // fix: 软链接
    /vtils\/lib/,
  ],
  extendRollupConfig: config => {
    config.inputConfig.treeshake = {
      moduleSideEffects: false,
    }
    return config
  },
}

export default config
