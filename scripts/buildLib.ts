import _ from 'shelljs'
import biliConfig from '../bili.config'
import fs from 'fs-extra'
import globby from 'globby'
import path from 'path'
import {assign, escapeRegExp, ii, parallel} from '../src'

ii(async function main() {
  // 工作目录
  const wd = path.join(__dirname, '..')

  // 切换至工作目录
  _.cd(wd)

  // 清空 lib 文件夹
  _.rm('-rf', 'lib')

  // 构建包
  _.exec('yarn bili')

  // 合并 ***.d.ts 为 index.d.ts
  const dFiles = await globby('lib/**/*.d.ts', {
    cwd: wd,
    absolute: true,
  })
  const contentList = await parallel(
    dFiles.map(dFile => async () => {
      let content = /(index|test)\.d\.ts$/.test(dFile) ? '' : await fs.readFile(dFile)
      content = content.toString().replace(/^import .+ from .+$/gm, '')
      await fs.remove(dFile)
      return content
    }),
  )
  await fs.writeFile(
    path.join(wd, 'lib/index.d.ts'),
    contentList.filter(Boolean).join('\n\n'),
  )

  // 删除空文件夹
  const emptyDirs = await globby('lib/*', {
    cwd: wd,
    onlyDirectories: true,
    absolute: true,
  })
  await parallel(
    emptyDirs.map(emptyDir => async () => {
      await fs.remove(emptyDir)
    }),
  )

  // 替换 Object.assign 为自带的 assign
  _.ls('lib/*.js').forEach(builtFile => {
    _.sed(
      '-i',
      new RegExp(
        escapeRegExp(
          biliConfig.babel
            && biliConfig.babel.objectAssign
            || 'Object.assign',
        ),
        'g',
      ),
      assign.name,
      builtFile,
    )
  })
})
