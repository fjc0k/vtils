import {move} from './move'

test('表现正常', () => {
  expect(move([1, 2, 3], 0, 1)).toEqual([2, 1, 3])
  expect(move([1, 2, 3, 4], 0, -1)).toEqual([2, 3, 4, 1])
  expect(move([1, 2, 3, 4], 0, -2)).toEqual([2, 3, 1, 4])
})
