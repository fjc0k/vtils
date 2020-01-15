import {jestExpectEqual} from './enhanceJest'
import {unique, uniqueBy} from './unique'

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

test('uniqueBy', () => {
  jestExpectEqual(
    uniqueBy([], item => item < 3),
    [],
  )

  jestExpectEqual(
    uniqueBy([1, 2, 1, 3], item => item < 3),
    [1, 3],
  )
})
