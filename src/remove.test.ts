import {jestExpectEqual} from './enhanceJest'
import {remove} from './remove'

test('删除正常', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    remove(arr, 1),
    [1, 3],
  )
})

test('越界正常', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    remove(arr, 6),
    [1, 2, 3],
  )

  jestExpectEqual(
    remove(arr, -1),
    [1, 2, 3],
  )
})

test('是原地删除', () => {
  const arr = [1, 2, 3]

  jestExpectEqual(
    remove(arr, 1) === arr,
    true,
  )
})
