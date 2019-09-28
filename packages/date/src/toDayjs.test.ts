import dayjs from 'dayjs'
import {jestExpectEqual} from 'vtils'
import {toDayjs} from './toDayjs'

test('表现正常', () => {
  jestExpectEqual(
    toDayjs('2019-2-1').toISOString(),
    dayjs('2019-2-1').toISOString(),
  )

  jestExpectEqual(
    toDayjs(new Date(2019, 2, 1)).toISOString(),
    dayjs(new Date(2019, 2, 1)).toISOString(),
  )

  jestExpectEqual(
    toDayjs(1569643555).toISOString(),
    dayjs.unix(1569643555).toISOString(),
  )

  jestExpectEqual(
    toDayjs('1569643555').toISOString(),
    dayjs.unix(1569643555).toISOString(),
  )
})
