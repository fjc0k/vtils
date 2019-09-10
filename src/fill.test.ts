import {fill} from './fill'
import {jestExpectEqual} from './enhanceJest'

test('默认 start 为 0，end 为 arr.length', () => {
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*'),
    ['*', '*', '*'],
  )
})

test('returnValue 接收参数正确', () => {
  jestExpectEqual(
    fill([1, 2, 3, 4], (v, i) => v + i),
    [1, 3, 5, 7],
  )
})

test('start 不为整数时报错', () => {
  expect(
    () => fill(new Array(3) as string[], () => '*', 1.2),
  ).toThrowErrorMatchingInlineSnapshot(
    `"start 应为整数"`,
  )
})

test('end 不为整数时报错', () => {
  expect(
    () => fill(new Array(3) as string[], () => '*', 1, 3.2),
  ).toThrowErrorMatchingInlineSnapshot(
    `"end 应为整数"`,
  )
})

test('start 为正整数', () => {
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', 1),
    [undefined, '*', '*'],
  )
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', 2),
    [undefined, undefined, '*'],
  )
})

test('start 为正整数且大于或等于 arr.length', () => {
  jestExpectEqual(
    fill(new Array(3) as (string | undefined)[], () => '*', 3),
    [undefined, undefined, undefined],
  )
  jestExpectEqual(
    fill(new Array(3) as (string | undefined)[], () => '*', 4),
    [undefined, undefined, undefined],
  )
})

test('start 为负整数', () => {
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -1),
    [undefined, undefined, '*'],
  )
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -2),
    [undefined, '*', '*'],
  )
})

test('start 为负整数且小于或等于 -arr.length', () => {
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -3),
    ['*', '*', '*'],
  )
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -4),
    ['*', '*', '*'],
  )
})

test('end 为正整数', () => {
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', 1, 2),
    [undefined, '*', undefined],
  )
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -2, 3),
    [undefined, '*', '*'],
  )
})

test('end 为负整数', () => {
  jestExpectEqual(
    fill(new Array(3) as (string | undefined)[], () => '*', 1, -2),
    [undefined, undefined, undefined],
  )
  jestExpectEqual(
    fill(new Array(3) as string[], () => '*', -2, -1),
    [undefined, '*', undefined],
  )
})

test('end 小于或等于 start', () => {
  jestExpectEqual(
    fill(new Array(3) as (string | undefined)[], () => '*', 1, 0),
    [undefined, undefined, undefined],
  )
  jestExpectEqual(
    fill(new Array(3) as (string | undefined)[], () => '*', -2, -3),
    [undefined, undefined, undefined],
  )
})
