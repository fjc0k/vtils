import globby from 'globby'
import { join, relative } from 'path'

async function main() {
  const rootDir = join(__dirname, '../src')
  const files = await globby('**/*.perf.ts', {
    onlyFiles: true,
    absolute: true,
    cwd: rootDir,
  })
  for (const file of files) {
    console.log(`===> ${relative(process.cwd(), file)} <===`)
    require(file)
    console.log()
  }
}

main()
