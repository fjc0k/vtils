import { dedent } from './dedent'
import { indent } from './indent'

describe('dedent', () => {
  test('空字符串正常', () => {
    expect(dedent``).toBe('')
  })

  test('单行字符串', () => {
    expect(dedent`hello`).toBe('hello')
  })

  test('有缩进的多行字符串', () => {
    expect(dedent` hello\n  world`).toBe('hello\n world')
  })

  test('首尾存在换行符的多行字符串', () => {
    expect(dedent`
      ${'  '}
      hello

      world
        ---

    `).toBe('hello\n\nworld\n  ---')
  })

  test('杂项 1', () => {
    const x = dedent`
      String literal, provides the branch for the current build.
      @example
      \`\`\`sh
      DRONE_COMMIT_BRANCH=master
      \`\`\`
    `
    const y = dedent`${indent`
      String literal, provides the branch for the current build.
      @example
      \`\`\`sh
      DRONE_COMMIT_BRANCH=master
      \`\`\`
    `}`
    expect(x).toBe(y)
  })

  test('杂项 2', () => {
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
    expect(x).toBe(y)
  })

  test('通过函数调用正常', () => {
    expect(
      dedent(`
        a
        b
      `),
    ).toBe('a\nb')
    expect(dedent('')).toBe('')
  })
})
