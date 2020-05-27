import exec from 'execa'
import fs from 'fs-extra'
import prompts from 'prompts'
import { join } from 'path'

async function main(rootDir: string) {
  const { name: util } = await prompts([
    {
      name: 'name',
      type: 'text',
      message: '请输入要创建的 util 名称',
    },
  ])

  const srcDir = join(rootDir, './src')
  const utilsDir = join(srcDir, './utils')
  const utilFile = join(utilsDir, `${util}.ts`)
  const utilTestFile = join(utilsDir, `${util}.test.ts`)

  const isClass = /^[A-Z]/.test(util)

  console.log('开始写入文件...')

  await Promise.all([
    fs.writeFile(
      utilFile,
      isClass
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
    fs.writeFile(
      utilTestFile,
      `
        import { ${util} } from './${util}'

        describe(${util}.name, () => {
          test('ok', () => {
            expect(1).toBe(1)
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
