import {jestExpectEqual} from './enhanceJest'
import {last} from './last'

test('空数组返回 undefined', () => {
  jestExpectEqual(
    last([]),
    undefined,
  )

  jestExpectEqual(
    last([] as string[]),
    undefined,
  )
})

test('非空数组返回最后一项', () => {
  jestExpectEqual(
    last(['x', 'y', 2]),
    2,
  )
})
