import { move } from './move'

describe('move', () => {
  test('是原地移动且移动正常', () => {
    const arr = [1, 2, 3]
    expect(move(arr, 0, 1)).toBe(arr).toEqual([2, 1, 3])
  })

  test('from 等于 to 时移动正常', () => {
    const arr = [1, 2, 3]
    expect(move(arr, 1, 1)).toBe(arr).toEqual([1, 2, 3])
  })

  test('超过长度时不补空', () => {
    const arr = [1, 2, 3]
    expect(move(arr.slice(), 0, 5)).toEqual([2, 3, 1])
    expect(move(arr.slice(), 7, 1)).toEqual([1, 2, 3])
  })

  test('对空数组移动应返回空数组', () => {
    const arr: any[] = []
    expect(move(arr.slice(), 0, 1)).toEqual([])
    expect(move(arr.slice(), 1, 1)).toEqual([])
  })
})
