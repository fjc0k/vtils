import globby from 'globby'
import rollupPluginDts from 'rollup-plugin-dts'
import { join } from 'path'
import { remove } from 'fs-extra'
import { rollup } from 'rollup'

async function main(rootDir: string) {
  const typesDir = join(rootDir, './lib/types')
  const typesFile = join(typesDir, './index.d.ts')
  const bundle = await rollup({
    input: typesFile,
    treeshake: true,
    plugins: [rollupPluginDts({ respectExternal: true })],
  })
  await bundle.generate({
    file: typesFile,
    format: 'es',
  })
  await bundle.write({
    file: typesFile,
    format: 'es',
  })
  const files = await globby(['*', '!index.d.ts'], {
    cwd: typesDir,
    absolute: true,
  })
  await Promise.all(files.map(file => remove(file)))
}

main(join(__dirname, '..'))
