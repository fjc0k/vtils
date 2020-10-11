import exec from 'execa'
import fs from 'fs-extra'
import globby from 'globby'
import pkg from '../package.json'
import { basename, join } from 'path'
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor'

async function main(rootDir: string) {
  const libDir = join(rootDir, './lib')
  const docsDir = join(rootDir, './docs')
  const docsMetaDataDir = join(docsDir, './metaData')
  const docsDistDir = join(docsDir, './dist')

  await fs.emptyDir(docsDir)

  const cats = (
    await globby(['*', '!_*'], {
      cwd: libDir,
      onlyDirectories: true,
    })
  ).map(cat => basename(cat))

  await Promise.all(
    cats.map(async cat => {
      const entryFile = join(libDir, cat, 'index.d.ts')
      const metaDataFile = join(docsMetaDataDir, `${cat}.api.json`)
      const config = ExtractorConfig.prepare({
        configObjectFullPath: join(rootDir, './api-extractor.json'),
        configObject: {
          projectFolder: rootDir,
          mainEntryPointFilePath: entryFile,
          apiReport: { enabled: false, reportFileName: 'report.api.md' },
          dtsRollup: { enabled: false },
          tsdocMetadata: { enabled: false },
          docModel: {
            enabled: true,
            apiJsonFilePath: metaDataFile,
          },
          compiler: {
            tsconfigFilePath: join(rootDir, './tsconfig.json'),
          },
          newlineKind: 'lf',
        },
        packageJsonFullPath: join(rootDir, './package.json'),
        packageJson: {
          ...pkg,
          name: cat,
        } as any,
      })

      Extractor.invoke(config, {
        localBuild: true,
      })
      await exec(
        'api-documenter',
        ['markdown', '-i', docsMetaDataDir, '-o', docsDistDir],
        {
          cwd: rootDir,
          stdio: 'inherit',
        },
      )
    }),
  )
}

main(join(__dirname, '..')).catch(console.log)
