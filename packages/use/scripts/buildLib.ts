import _ from 'shelljs'
import path from 'path'
import {ii} from 'vtils'

ii(async function main() {
  // 工作目录
  const wd = path.join(__dirname, '..')

  // 切换至工作目录
  _.cd(wd)

  // 清空 lib 文件夹
  _.rm('-rf', 'lib')

  // 构建包
  _.exec('bili')

  // 生成类型文件
  try {
    _.exec('api-extractor run')
  } catch (err) {}

  // 删除类型文件
  _.ls('lib/*.d.ts').forEach(file => {
    if (!file.endsWith('index.d.ts')) {
      _.rm('-rf', file)
    }
  })
  _.rm('-rf', 'lib/*.json')
})
