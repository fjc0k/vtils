import _ from 'shelljs'
import fs from 'fs-extra'
import path from 'path'
import {chunk, dedent, Defined, fill, forOwn, groupBy, ii} from 'vtils'
import {Reflection, ReflectionKind} from 'typedoc'

const pkg = require('../package.json') as { version: number }

type Item = Reflection & {
  signatures: Array<Item>,
  parameters?: Array<Item>,
}

type Brief = {
  name: string,
  body: string,
  source: Defined<Reflection['sources']>[0],
}

ii(async function main() {
  // 工作目录
  const wd = path.join(__dirname, '..')

  // typedoc 数据文件
  const typedocPath = path.join(__dirname, '../.typedoc')
  const typedocDataFile = path.join(typedocPath, 'data.json')
  const readMeFile = path.join(__dirname, '../README.md')
  const typedocReadMeFile = path.join(__dirname, '../README_TYPEDOC.md')

  // 切换至工作目录
  _.cd(wd)

  // 版本号同步
  _.sed(
    '-i',
    /@vtils\/react@[^/]+/g,
    `@vtils/react@${pkg.version}`,
    readMeFile,
  )

  // 构建包
  _.exec(`typedoc --ignoreCompilerErrors --excludeNotExported --excludePrivate --excludeProtected --json ${typedocDataFile} --mode file src/index.ts`)

  // 创建文档
  const list = (await fs.readJSON(typedocDataFile)).children as Item[]
  const listByKind = groupBy(list, item => item.kind)
  const briefListByKind: Record<ReflectionKind, Brief[]> = {} as any
  const readMeFlagByKind: Partial<Record<ReflectionKind, string>> = {
    [ReflectionKind.Function]: 'React',
  }
  const contentItemCountPerLineByKind: Partial<Record<ReflectionKind, number>> = {
    [ReflectionKind.Function]: 4,
  }

  let readme = (await fs.readFile(readMeFile)).toString()

  forOwn(listByKind, (list, kind) => {
    switch (Number(kind)) {
      case ReflectionKind.Function:
        list.forEach(item => {
          (briefListByKind[kind] || (briefListByKind[kind] = [])).push({
            name: item.name,
            body: (item.signatures || []).map(signature => {
              const desc = getDesc(signature)
              const example = getExample(signature)
              return dedent`
                ${desc}

                ${example}
              `
            }).join('\n\n'),
            source: item.sources![0],
          })
        })
        break
      default:
        break
    }
  })

  forOwn(briefListByKind, (briefList, kind) => {
    if (readMeFlagByKind[kind]) {
      readme = readme
        .replace(
          new RegExp(`(<!-- ${readMeFlagByKind[kind]}!目录 -->).+?(<!-- ${readMeFlagByKind[kind]}i目录 -->)`, 's'),
          `$1\n${
            [
              fill(new Array(contentItemCountPerLineByKind[kind]), () => '👇'),
              fill(new Array(contentItemCountPerLineByKind[kind]), () => '---'),
              ...chunk(
                briefList.map(
                  brief => {
                    return dedent`
                      [${brief.name}](#${brief.name.toLowerCase()})
                    `
                  },
                ),
                contentItemCountPerLineByKind[kind]!,
                () => '',
              ),
            ]
              .map(items => items.join(' | '))
              .join('\n')
          }\n$2`,
        )
        .replace(
          new RegExp(`(<!-- ${readMeFlagByKind[kind]}!内容 -->).+?(<!-- ${readMeFlagByKind[kind]}i内容 -->)`, 's'),
          `$1\n${
            briefList.map(
              brief => {
                const sourceUrl = `https://github.com/fjc0k/vtils/blob/master/packages/react/src/${brief.source.fileName}#L${brief.source.line}`
                const apiUrl = (
                  Number(kind) === ReflectionKind.Class
                    ? `https://fjc0k.github.io/vtils/react/classes/${brief.name.toLowerCase()}.html`
                    : `https://fjc0k.github.io/vtils/react/globals.html#${brief.name.toLowerCase()}`
                )
                return dedent`
                  #### ${brief.name}

                  <small>[源码](${sourceUrl}) | [API](${apiUrl}) | [回目录](#目录)</small>

                  ${brief.body}
                `
              },
            ).join('\n\n')
          }\n$2`,
        )
    }
  })

  await fs.writeFile(readMeFile, readme)

  // typedoc 主页
  await fs.writeFile(
    typedocReadMeFile,
    readme.split('<!-- TYPEDOC -->')[0],
  )

  // 构建文档
  _.rm('-rf', typedocPath)
  _.exec(`typedoc --readme README_TYPEDOC.md --ignoreCompilerErrors --excludeNotExported --excludePrivate --excludeProtected --out ${typedocPath} --theme minimal --mode file src/index.ts`)
})

function getDesc(reflection: Reflection): string {
  const comment: Defined<Reflection['comment']> = (reflection.comment || {} as any)
  return [
    comment.shortText,
    comment.text,
  ]
    .filter(Boolean)
    .map(
      v => v.trim()
        .replace(/\n\n/g, '__NN__')
        .replace(/\n(?!\s*(-|\d\.))/g, '')
        .replace(/__NN__/g, '\n\n'),
    )
    .join('\n\n')
}

function getExample(reflection: Reflection): string {
  const example = ((reflection.comment && reflection.comment.tags) || []).find(
    item => (item as any).tag === 'example',
  )
  return ((example && example.text) || '').trim()
}
