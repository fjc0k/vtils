import exec from 'execa'
import fs from 'fs-extra'
import globby from 'globby'
import prompts, { Choice } from 'prompts'
import { basename, join } from 'path'

async function main(rootDir: string) {
  const srcDir = join(rootDir, './src')

  const cats = (
    await globby('*', {
      cwd: srcDir,
      onlyDirectories: true,
    })
  ).map(cat => basename(cat))

  const { cat, name: util } = await prompts([
    {
      name: 'cat',
      type: 'select',
      choices: cats.map<Choice>(cat => ({
        title: cat,
        value: cat,
      })),
      message: '选择工具所属分类',
    },
    {
      name: 'name',
      type: 'text',
      message: '输入要创建的工具名称',
    },
  ])

  if (!cat || !util) return

  const utilsDir = join(srcDir, `./${cat}`)
  const utilFile = join(utilsDir, `${util}.ts`)
  const utilTestFile = join(utilsDir, `${util}.test.ts`)

  const isType = cat === 'types'
  const isClass = !isType && /^[A-Z]/.test(util)

  console.log('开始写入文件...')

  await Promise.all([
    fs.writeFile(
      utilFile,
      isType
        ? `
          /**
           * ${util}。
           */
          export type ${util} = {}
        `
        : isClass
        ? `
          /**
           * ${util}。
           */
          export class ${util} {

          }
        `
        : `
          /**
           * ${util}。
           *
           * @param value 值
           * @returns 返回结果
           */
          export function ${util}(value: any): number {
            const res = 1
            return res
          }
        `,
    ),
    isType
      ? Promise.resolve()
      : fs.writeFile(
          utilTestFile,
          `
            import { ${util} } from './${util}'

            describe('${util}', () => {
              test('ok', () => {
                expect(${util}).toBe(${util})
              })
            })
          `,
        ),
  ])

  console.log('✔️ 写入文件成功')

  await exec('npm', ['run', 'generate-index'], {
    cwd: rootDir,
    stdio: 'inherit',
  })
}

main(join(__dirname, '..'))
