import _ from 'shelljs'
import fs from 'fs-extra'
import path from 'path'
import { Defined, forOwn, groupBy, ii } from '../src'
import { Reflection, ReflectionKind } from 'typedoc'

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

  // 切换至工作目录
  _.cd(wd)

  // 构建包
  _.exec(`typedoc --ignoreCompilerErrors --excludeNotExported --excludePrivate --excludeProtected --json ${typedocDataFile} --mode file src/index.ts`)

  // 创建文档
  const list = (await fs.readJSON(typedocDataFile)).children as Item[]
  const listByKind = groupBy(list, item => item.kind)
  const briefListByKind: Record<ReflectionKind, Brief[]> = {} as any
  const readMeFlagByKind: Partial<Record<ReflectionKind, string>> = {
    [ReflectionKind.Function]: '工具函数',
    [ReflectionKind.Class]: '工具类',
    [ReflectionKind.TypeAlias]: '工具类型',
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
              return `
                ${desc}

                ${example}
              `.replace(/^ {16}/gm, '').trim()
            }).join('\n\n'),
            source: item.sources![0],
          })
        })
        break
      case ReflectionKind.Class:
        list.forEach(item => {
          const desc = getDesc(item)
          const example = getExample(item)
            ;(briefListByKind[kind] || (briefListByKind[kind] = [])).push({
            name: item.name,
            body: `
                ${desc}

                ${example}
              `.replace(/^ {16}/gm, '').trim(),
            source: item.sources![0],
          })
        })
        break
      case ReflectionKind.TypeAlias:
        list.forEach(item => {
          if (item.sources![0].fileName !== 'enhanceType.ts') return
          const desc = getDesc(item)
          const example = getExample(item)
          ;(briefListByKind[kind] || (briefListByKind[kind] = [])).push({
            name: item.name,
            body: `
              ${desc}

              ${example}
            `.replace(/^ {14}/gm, '').trim(),
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
      readme = readme.replace(
        new RegExp(`(<!-- ${readMeFlagByKind[kind]}! -->).+?(<!-- ${readMeFlagByKind[kind]}i -->)`, 's'),
        `$1\n${
          briefList.map(
            brief => {
              const sourceUrl = `https://github.com/fjc0k/vtils/blob/master/src/${brief.source.fileName}#L${brief.source.line}`
              const apiUrl = (
                Number(kind) === ReflectionKind.Class
                  ? `https://fjc0k.github.io/vtils/classes/${brief.name.toLowerCase()}.html`
                  : `https://fjc0k.github.io/vtils/globals.html#${brief.name.toLowerCase()}`
              )
              return `
                #### 💡 ${brief.name}

                <small>[源码](${sourceUrl}) | [API](${apiUrl})</small>

                ${brief.body}
              `.replace(/^ {16}/gm, '').trim()
            },
          ).join('\n\n')
        }\n$2`,
      )
    }
  })

  await fs.writeFile(readMeFile, readme)

  // 构建文档
  _.rm('-rf', typedocPath)
  _.exec(`typedoc --ignoreCompilerErrors --excludeNotExported --excludePrivate --excludeProtected --out ${typedocPath} --theme minimal --mode file src/index.ts`)
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
        .replace(/\n/g, '')
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
