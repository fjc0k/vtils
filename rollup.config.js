import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

/**
 * @param {import('rollup').RollupOptions} config
 */
const defineConfig = config => config

/**
 * @param {import('rollup').ModuleFormat} format
 * @param {Boolean} minify
 */
const createConfig = (format, minify) =>
  defineConfig({
    input: './lib/esm/index.js',
    external: ['lodash', ...(format === 'umd' ? [] : ['tslib'])],
    output: {
      name: pkg.name,
      format: format,
      file: `./lib/${format}/index${minify ? '.min' : ''}.js`,
      sourcemap: true,
      globals: {
        lodash: '_',
      },
    },
    plugins: [
      alias({
        entries: {
          'lodash-es': 'lodash',
        },
      }),
      resolve(),
      minify && terser(),
    ],
  })

export default [
  createConfig('cjs'),
  createConfig('umd'),
  createConfig('cjs', true),
  createConfig('umd', true),
  defineConfig({
    input: './src/index.ts',
    output: {
      format: 'esm',
      file: './lib/index.d.ts',
    },
    plugins: [dts()],
  }),
]
