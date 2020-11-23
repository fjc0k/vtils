import fs from 'fs-extra'
import rawPackageInfo from '../package.json'
import { join } from 'path'
import { omit } from 'lodash-uni'
import { PackageJson } from '../src/types'

async function main(rootDir: string) {
  const packageDir = join(rootDir, './lib')
  const packageJsonFile = join(packageDir, './package.json')
  const cjsPackageJsonFile = join(packageDir, './_cjs/package.json')

  const packageInfo = omit(rawPackageInfo, ([
    'husky',
    'lint-staged',
    'devDependencies',
    'scripts',
  ] as Array<keyof typeof rawPackageInfo>) as any)

  ;(packageInfo as any).type = 'module'

  await Promise.all([
    fs.writeJSON(packageJsonFile, packageInfo, { spaces: 2 }),
    fs.outputJSON(
      cjsPackageJsonFile,
      {
        type: 'commonjs',
      } as PackageJson,
      { spaces: 2 },
    ),
    ...['LICENSE', 'README.md'].map(file => {
      return fs.copyFile(join(rootDir, file), join(packageDir, file))
    }),
  ])
}

main(join(__dirname, '..'))
