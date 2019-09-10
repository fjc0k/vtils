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

  // 删除类型文件
  _.rm('-rf', 'lib/*.d.ts')

  // 生成类型文件
  _.exec('dts-bundle-generator src/index.ts -o lib/index.d.ts --disable-symlinks-following')
})
