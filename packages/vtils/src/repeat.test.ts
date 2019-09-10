import {jestExpectEqual} from './enhanceJest'
import {repeat} from './repeat'

test('n 不为 0 或正整数时报错', () => {
  expect(() => repeat('x', -1)).toThrowErrorMatchingInlineSnapshot(
    `"n 应是 0 或正整数"`,
  )
  expect(() => repeat('x', 1.2)).toThrowErrorMatchingInlineSnapshot(
    `"n 应是 0 或正整数"`,
  )
})

test('表现正常', () => {
  [0, 1, 2, 3, 4].forEach(n => {
    jestExpectEqual(repeat('', n), '')
  })

  jestExpectEqual(repeat('x', 0), '')
  jestExpectEqual(repeat('x', 1), 'x')
  jestExpectEqual(repeat('x', 2), 'xx')

  jestExpectEqual(repeat('x-', 0), '')
  jestExpectEqual(repeat('x-', 1), 'x-')
  jestExpectEqual(repeat('x-', 2), 'x-x-')
})
