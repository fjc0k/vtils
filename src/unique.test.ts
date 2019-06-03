import { jestExpectEqual } from './enhanceJest'
import { unique } from './unique'

test('unique', () => {
  jestExpectEqual(
    unique([]),
    [],
  )

  jestExpectEqual(
    unique([1, 2, 1, 3]),
    [1, 2, 3],
  )
})
