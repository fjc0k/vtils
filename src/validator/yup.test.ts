import { enUS } from './locale/enUS'
import { run } from '../utils'
import { yup } from './yup'
import { zhCN } from './locale/zhCN'

describe('yup', () => {
  test('默认语言为中文', async () => {
    await expect(
      yup
        .string()
        // @ts-expect-error
        .validate(1),
    ).rejects.toThrowError(/此项必须是一个字符串/)
  })

  test('可切换语言', () => {
    yup.setLocale(enUS)
    yup.setLocale(zhCN)
  })

  test('chineseMobilePhoneNumber 正常', async () => {
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('10086'),
    ).rejects.toThrowError(/此项必须是一个合法的手机号码/)
    await expect(
      yup.string().chineseMobilePhoneNumber().validate('13907199856'),
    ).resolves.toBe('13907199856')
  })

  test('chineseIDCardNumber 正常', async () => {
    await expect(
      yup.string().chineseIDCardNumber().validate('123456'),
    ).rejects.toThrowError(/此项必须是一个合法的身份证号码/)
    await expect(
      yup.string().chineseIDCardNumber().validate('11010119881101331X'),
    ).resolves.toBe('11010119881101331X')
  })

  test('validateInOrder 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    const [nameErr] = await run(() =>
      rule.validateInOrder({
        name: '',
        pass: 99,
      }),
    )
    expect(nameErr).toMatchSnapshot('姓名必填')
    const [passErr] = await run(() =>
      rule.validateInOrder({
        pass: 99,
        name: '',
      }),
    )
    expect(passErr).toMatchSnapshot('密码有误')
    expect(
      await rule.validateInOrder({
        name: '8',
        pass: 101,
      }),
    ).toEqual({
      name: '8',
      pass: 101,
    })
  })

  test('validateInOrderSync 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    const [nameErr] = await run(() =>
      rule.validateInOrderSync({
        name: '',
        pass: 99,
      }),
    )
    expect(nameErr).toMatchSnapshot('姓名必填')
    const [passErr] = await run(() =>
      rule.validateInOrderSync({
        pass: 99,
        name: '',
      }),
    )
    expect(passErr).toMatchSnapshot('密码有误')
    expect(
      rule.validateInOrderSync({
        name: '8',
        pass: 101,
      }),
    ).toEqual({
      name: '8',
      pass: 101,
    })
  })

  test('validatePlus 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    expect(
      await rule.validatePlus({
        name: '',
        pass: 99,
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        pass: 99,
        name: '',
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        name: '8',
        pass: 101,
      }),
    ).toMatchSnapshot()
    expect(
      await rule.validatePlus({
        name: '8',
        pass: 101,
        // @ts-ignore
        xxx: 'sss',
      }),
    ).toMatchSnapshot()
  })

  test('validatePlusSync 正常', async () => {
    const rule = yup.object({
      name: yup.string().label('姓名').required(),
      pass: yup.number().label('密码').required().min(100),
    })
    expect(
      rule.validatePlusSync({
        name: '',
        pass: 99,
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        pass: 99,
        name: '',
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: '8',
        pass: 101,
      }),
    ).toMatchSnapshot()
    expect(
      rule.validatePlusSync({
        name: '8',
        pass: 101,
        // @ts-ignore
        xxx: 'sss',
      }),
    ).toMatchSnapshot()
  })
})
