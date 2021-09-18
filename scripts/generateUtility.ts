import exec from 'execa'
import fs from 'fs-extra'
import globby from 'globby'
import prompts, { Choice } from 'prompts'
import { basename, extname, join } from 'path'
import { camelCase, capitalize, } from 'lodash-uni'
import { format, Options } from 'prettier'
import { getPrettierConfig } from 'haoma'

const ROOTDIR = join(__dirname, '..')
const SRCDIR = join(ROOTDIR, './src')

const formatOptions: Options = getPrettierConfig({ parser: 'babel' }, ROOTDIR)

const spaces = globby.sync('*', { cwd: SRCDIR, onlyDirectories: true }).map(path => basename(path))

const checkMethodNameExiste = (spaceName: string, methodName: string): boolean =>
  globby
    .sync([`${SRCDIR}/${spaceName}/*.ts`, `!${SRCDIR}/${spaceName}/*.test.ts`], { onlyFiles: true })
    .map(path => basename(path).replace(extname(path), ''))
    .includes(methodName)

const interactiveOptions = () => prompts([
  {
    name: 'spaces',
    type: 'select',
    choices: spaces.map<Choice>((space) => ({
      title: space, value: space,
    })),
    message: '选择工具所属分类',
  },
  {
    name: 'methodName',
    type: 'text',
    message: '输入要创建的工具名称',
  },
])

const generateTypeFileBody = (methodName: string) => {
  const body = `
  /**
   * ${methodName}。
   */
  export type ${methodName} = {}`

  return format(body, formatOptions)
}

const generateClassFileBody = (methodName: string) => {
  const body = `
  /**
   * ${methodName}。
   */
  export class ${methodName}  {}`

  return format(body, formatOptions)
}

const generateFuncFileBody = (methodName: string) => {
  const body = `
    /**
     * ${methodName}。
     *
     * @param value 值
     * @returns 返回结果
     */
    export function ${methodName}(value: any): number {
      const res = 1
      return res
    }`

  return format(body, formatOptions)
}

const generateUnitTestFileBody = (methodName: string): string => {
  const body = `
  import { ${methodName} } from './${methodName}'

  describe('${methodName}', () => {
    test('ok', () => {
      expect(${methodName}).toBe(${methodName})
    })
  })
  `
  return format(body, formatOptions)
}

async function main (): Promise<any> {

  const tasks: Array<{ filePath: string, content: string }> = []

  const { spaces, methodName } = await interactiveOptions()

  const isType = spaces === 'types'
  const isClass = !isType && /^[A-Z]/.test(methodName)
  const utilsDir = join(SRCDIR, spaces)

  const processMethodName = isClass ? capitalize(camelCase(methodName)) : camelCase(methodName)

  if (checkMethodNameExiste(spaces, processMethodName))
    return Promise.reject(
      new Error(`${methodName === processMethodName
        ? methodName
        : `${methodName}(修正后:${processMethodName})`}在src/${spaces}目录中已存在!
      `))

  if (isType) {
    tasks.push({
      filePath: join(utilsDir, `${processMethodName}.ts`),
      content: generateTypeFileBody(processMethodName)
    })
  }
  else {
    if (isClass) {
      tasks.push({
        filePath: join(utilsDir, `${processMethodName}.ts`),
        content: generateClassFileBody(processMethodName)
      })
    }
    else {
      tasks.push({
        filePath: join(utilsDir, `${processMethodName}.ts`),
        content: generateFuncFileBody(processMethodName)
      })
    }
    tasks.push({
      filePath: join(utilsDir, `${processMethodName}.test.ts`),
      content: generateUnitTestFileBody(processMethodName)
    })
  }

  for await (const { filePath, content } of tasks) {
    fs.writeFileSync(filePath, content, { encoding: 'utf-8' })
    console.log(`✔️ ${filePath}`)
  }

  await exec('npm', ['run', 'generate-index'], {
    cwd: ROOTDIR,
    stdio: 'inherit',
  })
}

main()
