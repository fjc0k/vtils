import {chunk} from './chunk'
import {jestExpectEqual} from './enhanceJest'

test('区块长度为非正整数时抛出错误', () => {
  expect(() => chunk([], -111)).toThrowErrorMatchingInlineSnapshot(
    `"size 应为正整数"`,
  )
  expect(() => chunk([1, 2], 0)).toThrowErrorMatchingInlineSnapshot(
    `"size 应为正整数"`,
  )
  expect(() => chunk([1, 2], 1.1)).toThrowErrorMatchingInlineSnapshot(
    `"size 应为正整数"`,
  )
})

test('数组为空时返回空数组', () => {
  [1, 2, 999].forEach(size => {
    jestExpectEqual(
      chunk([], size),
      [],
    )
  })
})

test('拆分正确', () => {
  jestExpectEqual(
    chunk([1, 2, 3], 1),
    [[1], [2], [3]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 2),
    [[1, 2], [3]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 3),
    [[1, 2, 3]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 4),
    [[1, 2, 3]],
  )
})

test('支持填充物', () => {
  jestExpectEqual(
    chunk([1, 2, 3], 1, () => 0),
    [[1], [2], [3]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 2, () => 0),
    [[1, 2], [3, 0]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 3, () => 0),
    [[1, 2, 3]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 4, () => 0),
    [[1, 2, 3, 0]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 5, () => 0),
    [[1, 2, 3, 0, 0]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 6, i => i),
    [[1, 2, 3, 0, 1, 2]],
  )
  jestExpectEqual(
    chunk([1, 2, 3], 7, () => null),
    [[1, 2, 3, null, null, null, null]],
  )
})
