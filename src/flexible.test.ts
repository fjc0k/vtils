import {flexible} from './flexible'
import {jestExpectEqual} from './enhanceJest'

const docEl = document.documentElement

test('基本正常', () => {
  jestExpectEqual(
    !!docEl.style.fontSize,
    false,
  )

  flexible()

  jestExpectEqual(
    !!docEl.style.fontSize,
    true,
  )
})
