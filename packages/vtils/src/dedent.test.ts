import {dedent} from './dedent'
import {indent} from './indent'
import {jestExpectEqual} from './enhanceJest'

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

  test('bug 1', () => {
    const x = dedent`
      String literal, provides the branch for the current build.

      @example
      \`\`\`sh
      DRONE_COMMIT_BRANCH=master
      \`\`\`
    `
    const y = dedent(indent`
      String literal, provides the branch for the current build.

      @example
      \`\`\`sh
      DRONE_COMMIT_BRANCH=master
      \`\`\`
    `)
    jestExpectEqual(x, y)
  })

  // 经排查是 indent 标签模板字符串的 bug，保留做测试
  test('bug 2', () => {
    const t = dedent`
      d
      e
    `
    const x = dedent`
      a
      b

      c

      ${t}
    `
    const y = 'a\nb\n\nc\n\nd\ne'
    jestExpectEqual(x, y)
  })
})
