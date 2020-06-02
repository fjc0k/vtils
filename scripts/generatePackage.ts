import fs from 'fs-extra'
import rawPackageInfo from '../package.json'
import { join } from 'path'
import { omit } from 'lodash'

async function main(rootDir: string) {
  const packageDir = join(rootDir, './lib')
  const packageJsonFile = join(packageDir, './package.json')

  const packageInfo = omit(rawPackageInfo, ([
    'husky',
    'lint-staged',
    'devDependencies',
    'scripts',
  ] as Array<keyof typeof rawPackageInfo>) as any)

  await Promise.all([
    fs.writeJSON(packageJsonFile, packageInfo),
    ...['LICENSE', 'README.md', 'mod.ts'].map(file => {
      return fs.copyFile(join(rootDir, file), join(packageDir, file))
    }),
  ])
}

main(join(__dirname, '..'))
