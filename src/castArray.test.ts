import { castArray } from './castArray'
import { jestExpectEqual } from './enhanceJest'

test('非数组转换为数组后返回', () => {
  [{}, 1, false, null, 'ddd', () => {}].forEach(item => {
    jestExpectEqual(
      castArray(item),
      [item],
    )
  })
})

test('数组则原样返回', () => {
  [[], [1], new Array(), Array(2)].forEach(item => {
    jestExpectEqual(
      castArray(item),
      item,
    )
  })
})
