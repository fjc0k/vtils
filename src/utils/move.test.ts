import { move } from './move'

describe('move', () => {
  test('是原地移动且移动正常', () => {
    const arr = [1, 2, 3]
    expect(move(arr, 0, 1)).toBe(arr).toEqual([2, 1, 3])
    expect(move(arr, 1, 1)).toBe(arr).toEqual([2, 1, 3])
  })
})
