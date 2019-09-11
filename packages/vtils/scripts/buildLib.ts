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

  // 生成类型文件
  try {
    _.exec('api-extractor run')
  } catch (err) {}

  // 合并 ***.d.ts 为 index.d.ts
  _.ls('lib/**/*.d.ts').forEach(file => {
    if (!file.endsWith('lib/index.d.ts')) {
      _.rm('-rf', file)
    }
  })
  _.rm('-rf', 'lib/*.json')

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
