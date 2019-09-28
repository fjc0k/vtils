import rawDayjs from 'dayjs'
import {dayjs} from './enhanceDayjs'
import {jestExpectEqual} from 'vtils'

test('表现正常', () => {
  jestExpectEqual(
    dayjs,
    rawDayjs,
  )

  jestExpectEqual(
    !!(dayjs.min && dayjs.max),
    true,
  )

  jestExpectEqual(
    !!(
      dayjs().fromNow
        && dayjs().isLeapYear
        && dayjs().isSameOrAfter
        && dayjs().isSameOrBefore
        && dayjs().toArray
        && dayjs().toObject
    ),
    true,
  )
})
