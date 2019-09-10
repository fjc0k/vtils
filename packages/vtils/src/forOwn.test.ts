import {forOwn} from './forOwn'
import {jestExpectEqual} from './enhanceJest'

test('遍历对象正常', () => {
  const obj = {
    x: 1,
    y: '2',
    z: [1, 2, 3, true],
    0: 'x',
  }
  const generatedObj: typeof obj = {} as any
  forOwn(obj, (value, key) => {
    generatedObj[key] = value
  })
  jestExpectEqual(generatedObj, obj)
})

test('仅遍历可枚举的属性', () => {
  const sym = Symbol(1)
  const obj = {
    x: 1,
    y: '2',
    z: [1, 2, 3, true],
    [sym]: 'symbol',
  }
  const generatedObj: typeof obj = {} as any
  forOwn(obj, (value, key) => {
    generatedObj[key] = value
  })
  jestExpectEqual(sym in generatedObj, false)
})

test('遍历函数返回 false 可提前退出遍历', () => {
  const obj = {
    x: 1,
    y: '2',
    z: [1, 2, 3, true],
  }

  // 遍历完成
  let traverseCount = 0
  forOwn(obj, () => {
    traverseCount++
  })
  jestExpectEqual(traverseCount, Object.keys(obj).length)

  // 中途退出
  traverseCount = 0
  forOwn(obj, () => {
    traverseCount++
    return false
  })
  jestExpectEqual(traverseCount, 1)
})
