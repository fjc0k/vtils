import {jestExpectEqual} from './enhanceJest'
import {range} from './range'
import {sample} from './sample'

test('数组', () => {
  jestExpectEqual(
    sample([1]),
    1,
  )

  const arr = [1, 2, 3, 5, 9]
  const sampleList = Array.from(
    new Set(
      range(0, 10000).map(
        () => sample(arr),
      ),
    ),
  )
  jestExpectEqual(
    sampleList.length !== 1,
    true,
  )
})

test('对象', () => {
  jestExpectEqual(
    sample({x: 1}),
    1,
  )

  const obj = {x: 1, y: 2, z: 3, m: 5, n: 9}
  const sampleList = Array.from(
    new Set(
      range(0, 10000).map(
        () => sample(obj),
      ),
    ),
  )
  jestExpectEqual(
    sampleList.length !== 1,
    true,
  )
})
