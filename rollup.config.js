import dts from 'rollup-plugin-dts'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

/**
 * @param {'cjs' | 'esm' | 'umd' | 'dts'} format
 * @param {boolean} minify
 * @returns {import('rollup').RollupOptions}
 */
const getConfig = (format, minify) => ({
  input:
    format === 'dts'
      ? './src/index.ts'
      : './node_modules/.cache/build/index.js',
  output: {
    dir: './lib',
    name: pkg.name,
    format: format === 'dts' ? 'es' : format,
    sourcemap: format !== 'dts',
    entryFileNames:
      format === 'dts'
        ? 'index.d.ts'
        : `index${format === 'cjs' ? '' : `.${format}`}${
            minify ? '.min' : ''
          }.js`,
  },
  treeshake: true,
  plugins: format === 'dts' ? [dts()] : [resolve(), minify && terser()],
})

export default [
  getConfig('esm'),
  getConfig('esm', true),
  getConfig('cjs'),
  getConfig('cjs', true),
  getConfig('umd'),
  getConfig('umd', true),
  getConfig('dts'),
]
