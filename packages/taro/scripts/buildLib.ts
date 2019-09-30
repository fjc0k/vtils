import * as acorn from 'acorn'
// @ts-ignore
import * as acornWalk from 'acorn-walk'
import _ from 'shelljs'
import fs from 'fs-extra'
import MagicString from 'magic-string'
import path from 'path'
import {ii, tryGet} from 'vtils'

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

  // 将 react 替换为 @tarojs/taro
  _.ls('lib/*.js').forEach(file => {
    const code = fs.readFileSync(file).toString()

    const magicString = new MagicString(code)

    acornWalk.simple(
      acorn.parse(code, {
        ecmaVersion: 6,
        sourceType: 'module',
      }),
      {
        CallExpression(node: any) {
          if (
            node.callee.name === 'require'
              && node.arguments[0]
              && node.arguments[0].value === 'react'
          ) {
            magicString.overwrite(
              node.arguments[0].start,
              node.arguments[0].end,
              JSON.stringify('@tarojs/taro'),
            )
          } else if (
            tryGet(() => node.callee.name.startsWith('__assign'))
              || tryGet(() => node.callee.object.name === 'Object' && node.callee.property.name === 'assign')
          ) {
            magicString.overwrite(
              node.callee.start,
              node.callee.end,
              'vtils.assign',
            )
          } else if (tryGet(() => node.callee.name.startsWith('__rest'))) {
            magicString.overwrite(
              node.callee.start,
              node.callee.end,
              'vtils.omit',
            )
          }
        },
        VariableDeclaration(node: any) {
          const __var = tryGet<string>(
            () => node.declarations[0].id.name,
            '',
          )
          if (__var) {
            if (__var.startsWith('__assign') || __var.startsWith('__rest')) {
              magicString.remove(node.start, node.end)
            }
          }
        },
      },
    )

    fs.writeFileSync(file, magicString.toString())
  })
})
