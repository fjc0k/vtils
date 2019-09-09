import { jestExpectEqual } from './enhanceJest'
import { removeByValue } from './removeByValue'

test('删除正常', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    removeByValue(arr, 2),
    [1, 3],
  )
})

test('删除不存在的值正常', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    removeByValue(arr, 4),
    [1, 2, 3],
  )
})

test('是原地删除', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    removeByValue(arr, 2) === arr,
    true,
  )
})
