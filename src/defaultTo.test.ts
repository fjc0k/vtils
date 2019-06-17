import { defaultTo } from './defaultTo'
import { jestExpectEqual } from './enhanceJest'

test('表现正常', () => {
  jestExpectEqual(
    defaultTo(1, 2),
    1,
  )

  ;[NaN, null, undefined].forEach(item => {
    jestExpectEqual(
      defaultTo(item, 2),
      2,
    )
  })
})
