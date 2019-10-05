import {defaultIndexTo} from './defaultIndexTo'
import {jestExpectEqual} from './enhanceJest'

test('表现正常', () => {
  jestExpectEqual(
    defaultIndexTo(-2, 0),
    -2,
  )
  jestExpectEqual(
    defaultIndexTo(-1, 0),
    0,
  )
  jestExpectEqual(
    defaultIndexTo(0, 0),
    0,
  )
  jestExpectEqual(
    defaultIndexTo(1, 0),
    1,
  )
})
