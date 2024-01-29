import {
  subDays,
  subHours,
  subMinutes,
  subMonths,
  subSeconds,
  subYears,
} from 'date-fns'
import { formatDistanceAgo } from './formatDistanceAgo.ts'

describe('formatDistanceAgo', () => {
  test('表现正常', () => {
    expect(formatDistanceAgo(subYears(new Date(), 6))).toMatchSnapshot('年')
    expect(formatDistanceAgo(subMonths(new Date(), 3))).toMatchSnapshot('月')
    expect(formatDistanceAgo(subDays(new Date(), 10))).toMatchSnapshot('天')
    expect(formatDistanceAgo(subHours(new Date(), 1))).toMatchSnapshot('时')
    expect(formatDistanceAgo(subMinutes(new Date(), 4))).toMatchSnapshot('分')
    expect(formatDistanceAgo(subSeconds(new Date(), 20))).toMatchSnapshot('秒')
  })
})
