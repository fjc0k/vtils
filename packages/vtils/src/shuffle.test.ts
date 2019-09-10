import {jestExpectEqual} from './enhanceJest'
import {shuffle} from './shuffle'

test('表现正常', () => {
  jestExpectEqual(
    shuffle([]),
    [],
  )

  jestExpectEqual(
    shuffle([1]),
    [1],
  )

  jestExpectEqual(
    shuffle([1, 2]).sort(),
    [1, 2].sort(),
  )

  jestExpectEqual(
    shuffle([1, 2, '', false, [20]]).sort(),
    [1, 2, '', false, [20]].sort(),
  )
})
