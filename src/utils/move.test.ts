import { move, moveDown, moveToBottom, moveToTop, moveUp } from './move.ts'

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

  test('移动至负数位置正常', () => {
    const arr: any[] = [1, 2, 3]
    expect(move(arr.slice(), 0, -1)).toEqual([1, 2, 3])
    expect(move(arr.slice(), 0, -2)).toEqual([1, 2, 3])
    expect(move(arr.slice(), 1, -1)).toEqual([2, 1, 3])
    expect(move(arr.slice(), 1, -200)).toEqual([2, 1, 3])
    expect(move(arr.slice(), 5, -1)).toEqual([1, 2, 3])
    expect(move(arr.slice(), 5, -100)).toEqual([1, 2, 3])
  })

  test('moveUp 正常', () => {
    const arr: any[] = [1, 2, 3]
    expect(moveUp(arr.slice(), -1)).toEqual([1, 2, 3])
    expect(moveUp(arr.slice(), 0)).toEqual([1, 2, 3])
    expect(moveUp(arr.slice(), 1)).toEqual([2, 1, 3])
    expect(moveUp(arr.slice(), 2)).toEqual([1, 3, 2])
    expect(moveUp(arr.slice(), 3)).toEqual([1, 2, 3])

    expect(moveUp(arr.slice(), -1, 2)).toEqual([1, 2, 3])
    expect(moveUp(arr.slice(), 0, 2)).toEqual([1, 2, 3])
    expect(moveUp(arr.slice(), 1, 2)).toEqual([2, 1, 3])
    expect(moveUp(arr.slice(), 2, 2)).toEqual([3, 1, 2])
    expect(moveUp(arr.slice(), 3, 2)).toEqual([1, 2, 3])
  })

  test('moveDown 正常', () => {
    const arr: any[] = [1, 2, 3]
    expect(moveDown(arr.slice(), -1)).toEqual([1, 2, 3])
    expect(moveDown(arr.slice(), 0)).toEqual([2, 1, 3])
    expect(moveDown(arr.slice(), 1)).toEqual([1, 3, 2])
    expect(moveDown(arr.slice(), 2)).toEqual([1, 2, 3])
    expect(moveDown(arr.slice(), 3)).toEqual([1, 2, 3])

    expect(moveDown(arr.slice(), -1, 2)).toEqual([1, 2, 3])
    expect(moveDown(arr.slice(), 0, 2)).toEqual([2, 3, 1])
    expect(moveDown(arr.slice(), 1, 2)).toEqual([1, 3, 2])
    expect(moveDown(arr.slice(), 2, 2)).toEqual([1, 2, 3])
    expect(moveDown(arr.slice(), 3, 2)).toEqual([1, 2, 3])
  })

  test('moveToTop 正常', () => {
    const arr: any[] = [1, 2, 3]
    expect(moveToTop(arr.slice(), -1)).toEqual([1, 2, 3])
    expect(moveToTop(arr.slice(), 0)).toEqual([1, 2, 3])
    expect(moveToTop(arr.slice(), 1)).toEqual([2, 1, 3])
    expect(moveToTop(arr.slice(), 2)).toEqual([3, 1, 2])
    expect(moveToTop(arr.slice(), 3)).toEqual([1, 2, 3])
  })

  test('moveToBottom 正常', () => {
    const arr: any[] = [1, 2, 3]
    expect(moveToBottom(arr.slice(), -1)).toEqual([1, 2, 3])
    expect(moveToBottom(arr.slice(), 0)).toEqual([2, 3, 1])
    expect(moveToBottom(arr.slice(), 1)).toEqual([1, 3, 2])
    expect(moveToBottom(arr.slice(), 2)).toEqual([1, 2, 3])
    expect(moveToBottom(arr.slice(), 3)).toEqual([1, 2, 3])
  })
})
