import {clamp} from './clamp'
import {jestExpectEqual} from './enhanceJest'

test('上下限值之间返回原值', () => {
  jestExpectEqual(
    clamp(5, 1, 20),
    5,
  )
  jestExpectEqual(
    clamp(0, -0.001, 0.11),
    0,
  )
})

test('边界值处返回边界值', () => {
  jestExpectEqual(
    clamp(1, 1, 20),
    1,
  )
  jestExpectEqual(
    clamp(0.11, -0.001, 0.11),
    0.11,
  )
})
