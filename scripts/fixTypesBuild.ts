import fs from 'fs-extra'
import globby from 'globby'
import rollupPluginDts from 'rollup-plugin-dts'
import { join } from 'path'
import { rollup } from 'rollup'

async function main(rootDir: string) {
  const typesDir = join(rootDir, './lib/types')
  const typesFile = join(typesDir, './index.d.ts')
  const indexFile = join(typesDir, './index.js')
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
  const files = await globby(['*', '!index.js', '!index.d.ts'], {
    cwd: typesDir,
    absolute: true,
  })
  await Promise.all(files.map(file => fs.remove(file)))
  const [indexContent, typesContent] = await Promise.all([
    fs.readFile(indexFile, 'utf8'),
    fs.readFile(typesFile, 'utf8'),
  ])
  const indexDocs = indexContent.split(/(?<=\*\/)/)[0]
  await Promise.all([
    fs.writeFile(typesFile, `${indexDocs}\n${typesContent}`),
    fs.writeFile(indexFile, 'export {}'),
  ])
}

main(join(__dirname, '..'))
