import fs from 'fs-extra'
import globby from 'globby'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'
import { join } from 'path'

async function main(rootDir: string) {
  const typesDir = join(rootDir, './lib/types')
  const typesFile = join(typesDir, './index.d.ts')
  const indexFile = join(typesDir, './index.js')

  const config = ExtractorConfig.prepare({
    configObjectFullPath: join(rootDir, './api-extractor.json'),
    configObject: {
      projectFolder: rootDir,
      mainEntryPointFilePath: typesFile,
      bundledPackages: ['type-fest', 'ts-essentials'],
      apiReport: { enabled: false, reportFileName: 'report.api.md' },
      dtsRollup: { enabled: true, untrimmedFilePath: typesFile },
      tsdocMetadata: { enabled: false },
      docModel: { enabled: false },
      compiler: {
        tsconfigFilePath: join(rootDir, './tsconfig.json'),
      },
      newlineKind: 'lf',
    },
    packageJsonFullPath: join(rootDir, './package.json'),
    packageJson: {
      name: 'vtils',
    } as any,
  })
  Extractor.invoke(config, {
    localBuild: true,
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
