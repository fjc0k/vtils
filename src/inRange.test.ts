import {inRange, InRangeIntervalType} from './inRange'

test('开区间', () => {
  expect(inRange(5, 2, 6, InRangeIntervalType.open)).toBeTruthy()
  expect(inRange(2, 2, 6, InRangeIntervalType.open)).toBeFalsy()
  expect(inRange(6, 2, 6, InRangeIntervalType.open)).toBeFalsy()
  expect(inRange(7, 2, 6, InRangeIntervalType.open)).toBeFalsy()
  expect(inRange(2.0001, 2, 6, InRangeIntervalType.open)).toBeTruthy()
  expect(inRange(5.9999, 2, 6, InRangeIntervalType.open)).toBeTruthy()
})

test('闭区间', () => {
  expect(inRange(5, 2, 6, InRangeIntervalType.closed)).toBeTruthy()
  expect(inRange(2, 2, 6, InRangeIntervalType.closed)).toBeTruthy()
  expect(inRange(6, 2, 6, InRangeIntervalType.closed)).toBeTruthy()
  expect(inRange(2.0001, 2, 6, InRangeIntervalType.closed)).toBeTruthy()
  expect(inRange(5.9999, 2, 6, InRangeIntervalType.closed)).toBeTruthy()
})

test('半开半闭区间', () => {
  expect(inRange(2, 2, 6, InRangeIntervalType.leftOpenRightClosed)).toBeFalsy()
  expect(inRange(2, 2, 6, InRangeIntervalType.leftClosedRightOpen)).toBeTruthy()
  expect(inRange(6, 2, 6, InRangeIntervalType.leftOpenRightClosed)).toBeTruthy()
})
