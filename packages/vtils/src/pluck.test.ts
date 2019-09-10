import {jestExpectEqual} from './enhanceJest'
import {pluck} from './pluck'

test('提取为数组正常', () => {
  jestExpectEqual(
    pluck([{x: 1, y: 'z'}, {y: 2, x: 5}], item => item.x),
    [1, 5],
  )
})

test('提取为对象正常', () => {
  jestExpectEqual(
    pluck([{x: 1, y: 'z'}, {y: 2, x: 5}], item => item.x, item => item.y),
    {z: 1, 2: 5},
  )
})
