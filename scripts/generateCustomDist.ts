import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import globby from 'globby'
import path from 'path'
import yargs from 'yargs'
import { babel } from '@rollup/plugin-babel'
import { getBabelConfig } from 'haoma'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import { rollup } from 'rollup'
// @ts-ignore
import virtual from '@rollup/plugin-virtual'

async function main() {
  const argv: {
    modules: string
    target: string
  } = yargs.parse(process.argv) as any

  const modules = argv.modules.split(',')
  const globModules = modules.filter(mod => !mod.startsWith('@'))
  const specificModules = modules
    .filter(mod => mod.startsWith('@'))
    .map(mod => mod.slice(1))

  const files = await globby(globModules, {
    cwd: path.join(__dirname, '..'),
    absolute: true,
    onlyFiles: true,
  })

  const indexFile = 'index.ts'
  const indexContent = `
    ${files.map(file => `export * from '${file}'`).join('\n')}

    ${specificModules
      .map(mod => {
        const [type, mo] = mod.split('.')
        return `export { ${mo} } from '${path.join(
          __dirname,
          `../src/${type}/index.ts`,
        )}'`
      })
      .join('\n')}
  `

  const bundle = await rollup({
    input: indexFile,
    plugins: [
      commonjs(),
      nodeResolve({
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
      }),
      babel({
        ...(getBabelConfig({
          module: 'esm',
          target: 'browser',
          typescript: true,
        }) as any),
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.es6', '.es', '.mjs'],
        babelHelpers: 'runtime',
      }),
      virtual({
        [indexFile]: indexContent,
      }),
    ],
  })
  await bundle.write({
    file: `dist/${argv.target}/${argv.target}.js`,
    format: 'cjs',
  })
  await bundle.close()

  const bundleDts = await rollup({
    input: indexFile,
    plugins: [
      dts(),
      virtual({
        [indexFile]: indexContent,
      }),
    ],
  })
  await bundleDts.write({
    file: `dist/${argv.target}/${argv.target}.d.ts`,
    format: 'es',
  })
  await bundleDts.close()
}

main()
