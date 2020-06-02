import fs from 'fs-extra'
import globby from 'globby'
import { join } from 'path'

async function main(rootDir: string) {
  const cjsDir = join(rootDir, './lib/_cjs')
  const files = await globby('**/*.js', {
    onlyFiles: true,
    absolute: true,
    cwd: cjsDir,
  })
  await Promise.all(
    files.map(async file => {
      const content = await fs.readFile(file, 'utf8')
      const newContent = content.replace(
        /require\("lodash-es"\)/g,
        'require("lodash")',
      )
      if (newContent !== content) {
        await fs.writeFile(file, newContent)
      }
    }),
  )
}

main(join(__dirname, '..'))
