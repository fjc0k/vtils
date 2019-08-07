import { dedent } from './dedent'
import { jestExpectEqual } from './enhanceJest'

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
