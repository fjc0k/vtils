import {has} from './has'
import {jestExpectEqual} from './enhanceJest'

test('空值时返回 false', () => {
  ['1', 'x', 'ff', ''].forEach(key => {
    jestExpectEqual(has(null, key), false)
    jestExpectEqual(has(undefined, key), false)
  })
})

test('仅属性存在且为自身的时返回 true', () => {
  const id = Symbol()
  const obj = {
    x: 1,
    0: true,
    21: 1,
    200: false,
    [id]: 'hello',
  }
  jestExpectEqual(Boolean(obj.toString), true)
  jestExpectEqual(has(obj, 'toString'), false)
  jestExpectEqual(has(obj, 'x'), true)
  jestExpectEqual(has(obj, 0), true)
  jestExpectEqual(has(obj, 21), true)
  jestExpectEqual(has(obj, 200), true)
  jestExpectEqual(has(obj, id), true)
})

test('若对象为数组，支持检测下标是否存在', () => {
  const arr = [1, 2, 3, 4]
  jestExpectEqual(Boolean(arr.slice), true)
  jestExpectEqual(has(arr, 'slice'), false)
  arr.forEach((_, i) => {
    jestExpectEqual(has(arr, i), true)
  })
  jestExpectEqual(has(arr, arr.length), false)
})
