import { enUS } from './locale/enUS'
import { zhCN } from './locale/zhCN'

describe('locale', () => {
  for (const [name, locale] of Object.entries({ enUS, zhCN })) {
    test(name, () => {
      expect(Object.keys(locale)).toEqual([
        'mixed',
        'string',
        'number',
        'date',
        'boolean',
        'object',
        'array',
      ])
    })
  }
})
