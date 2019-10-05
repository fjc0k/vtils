import {jestExpectEqual} from 'vtils'
import {numeralDayToChineseDay} from './numeralDayToChineseDay'

test('表现正常', () => {
  jestExpectEqual(
    numeralDayToChineseDay(0),
    '日',
  )
  jestExpectEqual(
    numeralDayToChineseDay(1),
    '一',
  )
  jestExpectEqual(
    numeralDayToChineseDay(2),
    '二',
  )
  jestExpectEqual(
    numeralDayToChineseDay(3),
    '三',
  )
  jestExpectEqual(
    numeralDayToChineseDay(4),
    '四',
  )
  jestExpectEqual(
    numeralDayToChineseDay(5),
    '五',
  )
  jestExpectEqual(
    numeralDayToChineseDay(6),
    '六',
  )
  jestExpectEqual(
    numeralDayToChineseDay(7),
    '日',
  )
})
