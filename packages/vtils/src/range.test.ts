import {jestExpectEqual} from './enhanceJest'
import {range} from './range'

test('start < end', () => {
  jestExpectEqual(
    range(2, 6),
    [2, 3, 4, 5],
  )
})

test('start === end', () => {
  jestExpectEqual(
    range(2, 2),
    [],
  )
})

test('start > end', () => {
  jestExpectEqual(
    range(6, 2, -1),
    [6, 5, 4, 3],
  )
})

test('step 为小数', () => {
  jestExpectEqual(
    range(6, 2, -0.5),
    [6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5],
  )
})
