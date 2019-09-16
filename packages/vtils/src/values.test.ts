import {jestExpectEqual} from './enhanceJest'
import {values} from './values'

test('有原生 Object.values 表现正常', () => {
  const sym = Symbol()
  const obj = {
    id: 1,
    name: 'Jay',
    age: 20,
    2: 0, // 数字键属性
    [sym]: [], // 不可枚举属性
  }

  jestExpectEqual(
    values(obj).sort(),
    [1, 'Jay', 20, 0].sort(),
  )

  // 运行时添加的属性
  ;(obj as any).runtime = true

  jestExpectEqual(
    values(obj).sort(),
    [1, 'Jay', 20, 0, true].sort(),
  )
})

test('无原生 Object.values 表现正常', () => {
  const originalObjectValues = Object.values
  Object.values = null as any

  const sym = Symbol()
  const obj = {
    id: 1,
    name: 'Jay',
    age: 20,
    2: 0, // 数字键属性
    [sym]: [], // 不可枚举属性
  }

  jestExpectEqual(
    values(obj).sort(),
    [1, 'Jay', 20, 0].sort(),
  )

  // 运行时添加的属性
  ;(obj as any).runtime = true

  jestExpectEqual(
    values(obj).sort(),
    [1, 'Jay', 20, 0, true].sort(),
  )

  Object.values = originalObjectValues
})
