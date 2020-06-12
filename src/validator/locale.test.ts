import { enUS } from './locale/enUS'
import { yup } from './yup'
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

  test('中文', async () => {
    await expect(yup.number().integer().validate(9.2)).rejects.toThrowError(
      /此项必须是一个整数/,
    )
    await expect(
      yup.number().label('年龄').integer().validate(9.2),
    ).rejects.toThrowError(/年龄必须是一个整数/)
  })
})
