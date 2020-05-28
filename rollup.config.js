import dts from 'rollup-plugin-dts'
import pkg from './package.json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'

/**
 * @param {import('rollup').RollupOptions} config
 */
const defineConfig = config => config

/**
 * @param {import('rollup').ModuleFormat[]} formats
 * @param {(format: import('rollup').ModuleFormat) => import('rollup').OutputOptions} fn
 */
const defineOutput = (formats, fn) => formats.map(format => fn(format))

export default [
  defineConfig({
    input: './node_modules/.cache/build/index.js',
    output: defineOutput(['esm', 'cjs', 'umd'], format => ({
      name: pkg.name,
      format: format,
      file: `./lib/index${format === 'cjs' ? '' : `.${format}`}.js`,
      sourcemap: true,
    })),
    plugins: [resolve()],
  }),
  defineConfig({
    input: './lib/index.esm.js',
    output: defineOutput(['esm', 'cjs', 'umd'], format => ({
      name: pkg.name,
      format: format,
      file: `./lib/index${format === 'cjs' ? '' : `.${format}`}.min.js`,
      sourcemap: true,
    })),
    plugins: [terser()],
  }),
  defineConfig({
    input: './node_modules/.cache/build/index.d.ts',
    output: defineOutput(['esm'], format => ({
      format: format,
      file: './lib/index.d.ts',
    })),
    external: ['lodash-es'],
    plugins: [
      resolve({
        extensions: ['.d.ts'],
      }),
      dts(),
    ],
  }),
]
