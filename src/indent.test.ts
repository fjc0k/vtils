import { indent } from './indent'
import { jestExpectEqual } from './enhanceJest'

const text = 'a\nb\n c'

test('空字符串正常', () => {
  jestExpectEqual(
    indent``,
    '',
  )
})

test('插入值支持任意值', () => {
  jestExpectEqual(
    indent`${'x'}`,
    'x',
  )

  jestExpectEqual(
    indent`${2}`,
    '2',
  )

  jestExpectEqual(
    indent`${undefined}`,
    'undefined',
  )
})

test('单行缩进字符串正常', () => {
  jestExpectEqual(
    indent`  ${text}`,
    '  a\n  b\n   c',
  )
})

test('多行缩进字符串正常', () => {
  jestExpectEqual(
    indent`hi\n  ${text}`,
    'hi\n  a\n  b\n   c',
  )
})

test('只处理紧跟前导空白后面的插入值', () => {
  jestExpectEqual(
    indent`hi\n  ${text}  ${text}`,
    'hi\n  a\n  b\n   c  a\nb\n c',
  )
})
