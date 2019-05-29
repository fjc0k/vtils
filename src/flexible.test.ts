import { flexible } from './flexible'
import { jestExpectEqual } from './enhanceJest'

test('表现正常', () => {
  flexible()

  jestExpectEqual(
    !!document.body.style.fontSize,
    true,
  )
})
