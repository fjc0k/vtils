import { swap } from './swap.ts'

describe('swap', () => {
  test('是原地交换且交换正常', () => {
    const arr = [1, 2, 3]
    expect(swap(arr, 0, 2)).toBe(arr).toEqual([3, 2, 1])
    expect(swap(arr, 1, 1)).toBe(arr).toEqual([3, 2, 1])
  })
})
