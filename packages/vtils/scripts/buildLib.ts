import _ from 'shelljs'
import biliConfig from '../bili.config'
import fs from 'fs-extra'
import path from 'path'
import {assign, escapeRegExp, ii} from '../src'

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

  // 删除多余的文件
  _.ls('-d', 'lib/*').forEach(file => {
    if ((
      file.endsWith('.d.ts')
        || file.endsWith('.json')
        || fs.statSync(file).isDirectory()
    ) && (
      !file.endsWith('index.d.ts')
    )) {
      _.rm('-rf', file)
    }
  })

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
