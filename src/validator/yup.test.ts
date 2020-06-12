import { enUS } from './locale/enUS'
import { yup } from './yup'
import { zhCN } from './locale/zhCN'

describe('yup', () => {
  test('默认语言为中文', async () => {
    expect(yup.getLocale().mixed.required).toInclude('必填')
    await expect(yup.string().validate(1)).rejects.toThrowError(
      /必须是一个字符串/,
    )
  })

  test('可切换语言', () => {
    yup.setLocale(enUS)
    expect(yup.getLocale().mixed.required).toInclude('required')
    yup.setLocale(zhCN)
  })

  test('chineseMobilePhoneNumber 正常', async () => {
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('10086'),
    ).rejects.toThrowError(/必须是一个合法的手机号码/)
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('13907199856'),
    ).resolves.toBe('13907199856')
  })

  test('chineseIDCardNumber 正常', async () => {
    await expect(
      yup.string().chineseIDCardNumber().validate('123456'),
    ).rejects.toThrowError(/必须是一个合法的身份证号码/)
    await expect(
      yup.string().chineseIDCardNumber().validate('11010119881101331X'),
    ).resolves.toBe('11010119881101331X')
  })
})
