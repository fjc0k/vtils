import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import fs from 'fs-extra'
import globby from 'globby'
import { getBabelConfig } from 'haoma'
import path from 'path'
import { rollup } from 'rollup'
import dts from 'rollup-plugin-dts'
import yargs from 'yargs'

async function main() {
  const argv: {
    modules: string
    target: string
    moduleType: 'cjs' | 'esm'
  } = yargs.parse(process.argv) as any

  const modules = argv.modules.split(',')
  const moduleType = argv.moduleType
  const globModules = modules.filter(mod => !mod.startsWith('@'))
  const specificModules = modules
    .filter(mod => mod.startsWith('@'))
    .map(mod => mod.slice(1))

  const files = await globby(globModules, {
    cwd: path.join(__dirname, '..'),
    absolute: true,
    onlyFiles: true,
  })

  const indexFile = path.join(__dirname, '../dist/__entry__/index.ts')
  const indexContent = `
    ${files.map(file => `export * from '${file}'`).join('\n')}

    ${specificModules
      .map(mod => {
        const [type, mo] = mod.split('.')
        return `export { ${mo} } from '${path.join(
          __dirname,
          `../src/${type}/index`,
        )}'`
      })
      .join('\n')}
  `
  await fs.outputFile(indexFile, indexContent)

  const babelConfig = getBabelConfig({
    module: 'esm',
    target: moduleType === 'cjs' ? 'browser' : 'node',
    typescript: true,
  })
  if (moduleType === 'esm') {
    // @ts-ignore
    babelConfig.presets[0][1].targets = {
      node: '20',
    }
  }

  const bundle = await rollup({
    input: indexFile,
    plugins: [
      commonjs(),
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
      }),
      babel({
        ...(babelConfig as any),
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
        babelHelpers: 'runtime',
      }),
    ],
  })
  await bundle.write({
    file: `dist/${argv.target}/${argv.target}.js`,
    format: moduleType === 'cjs' ? 'cjs' : 'esm',
  })
  await bundle.close()

  const bundleDts = await rollup({
    input: indexFile,
    plugins: [dts()],
  })
  await bundleDts.write({
    file: `dist/${argv.target}/${argv.target}.d.ts`,
    format: 'es',
  })
  await bundleDts.close()
}

main()
