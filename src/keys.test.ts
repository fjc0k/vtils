import {jestExpectEqual} from './enhanceJest'
import {keys} from './keys'

test('表现正常', () => {
  const sym = Symbol()
  const obj = {
    id: 1,
    name: 'Jay',
    age: 20,
    2: 0, // 数字键属性
    [sym]: [], // 不可枚举属性
  }

  jestExpectEqual(
    keys(obj).sort(),
    ['id', 'age', 'name', '2'].sort(),
  )

  // 运行时添加的属性
  ;(obj as any).runtime = true

  jestExpectEqual(
    keys(obj).sort(),
    ['id', 'age', 'name', '2', 'runtime'].sort(),
  )
})
