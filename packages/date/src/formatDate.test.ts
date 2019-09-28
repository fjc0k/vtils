import {formatDate} from './formatDate'
import {jestExpectEqual} from 'vtils'

test('表现正常', () => {
  jestExpectEqual(
    formatDate('2019-9-1', 'YYYY年M月D日'),
    '2019年9月1日',
  )

  jestExpectEqual(
    formatDate('2019-9-1 4:05', 'YYYY年M月D日 HH时m分'),
    '2019年9月1日 04时5分',
  )

  jestExpectEqual(
    formatDate(1569643555, 'YYYY年MM月D日'),
    '2019年09月28日',
  )
})
