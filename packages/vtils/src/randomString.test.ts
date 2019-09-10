import {jestExpectEqual} from './enhanceJest'
import {randomString} from './randomString'
import {range} from './range'

test('百万次无重复', () => {
  const strList = range(0, 1000000).map(() => randomString())
  const uniqStrList = new Set(strList)

  jestExpectEqual(
    uniqStrList.size,
    strList.length,
  )
})
