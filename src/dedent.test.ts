import { dedent } from './dedent'
import { indent } from './indent'
import { jestExpectEqual } from './enhanceJest'

describe('函数模式', () => {
  test('空字符串', () => {
    jestExpectEqual(
      dedent(''),
      '',
    )
  })

  test('单行字符串', () => {
    jestExpectEqual(
      dedent('hello'),
      'hello',
    )
  })

  test('没有缩进的多行字符串', () => {
    jestExpectEqual(
      dedent('hello\nworld'),
      'hello\nworld',
    )
  })

  test('有缩进的多行字符串', () => {
    jestExpectEqual(
      dedent(' hello\n  world'),
      'hello\n world',
    )
  })

  test('首尾存在换行符的多行字符串', () => {
    jestExpectEqual(
      dedent(`
        ${'  '}
        hello

        world
          ---

      `),
      'hello\n\nworld\n  ---',
    )
  })
})

describe('标签模板字符串模式', () => {
  const text = 'hello\nworld'

  test('表现正常', () => {
    jestExpectEqual(
      dedent`
        ${text}
          -.-
      `,
      dedent(indent`
        ${text}
          -.-
      `),
      'hello\nworld\n  -.-',
    )
  })
})
