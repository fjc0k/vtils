import {swap} from './swap'

test('表现正常', () => {
  const arr = [1, 2, 3, 4, 5]
  const arrCopy = arr.slice()
  const swappedArrCopy = swap(arrCopy, 0, 1)
  expect(swappedArrCopy).toBe(arrCopy)
  expect(swappedArrCopy.slice()).toEqual([2, 1, 3, 4, 5])
  expect(swap(arr.slice(), 6, 1)).toEqual([1, undefined, 3, 4, 5, undefined, 2])
  expect(swap([1, 2, 3], 0, 2)).toEqual([3, 2, 1])
})
