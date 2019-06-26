import { EasyValidator, EasyValidatorRules } from './EasyValidator'
import { ii } from './ii'
import { jestExpectEqual } from './enhanceJest'
import { pluck } from './pluck'
import { wait } from './wait'

type Data = {
  number?: string,
  integer?: string,
  chineseMobilePhoneNumber?: string,
  chineseIdCardNumber?: string,
  url?: string,
  email?: string,
  chineseName?: string,
  customRegExp?: string,
  customSyncFn?: string,
  customAsyncFn?: string,
  pass1?: string,
  pass2?: string,
  required: string,
  updateMessage: string,
}

test('综合测试', async () => {
  const rules: EasyValidatorRules<Data> = [
    {
      key: 'number',
      type: 'number',
      message: '请输入数字',
    },
    {
      key: 'integer',
      type: 'integer',
      message: '请输入正整数',
    },
    {
      key: 'chineseMobilePhoneNumber',
      type: 'chineseMobilePhoneNumber',
      message: '请输入手机号码',
    },
    {
      key: 'chineseIdCardNumber',
      type: 'chineseIdCardNumber',
      message: '请输入身份证号',
    },
    {
      key: 'url',
      type: 'url',
      message: '请输入网址',
    },
    {
      key: 'email',
      type: 'email',
      message: '请输入邮箱',
    },
    {
      key: 'email',
      test: /@163\.com$/,
      message: '请输入网易邮箱',
    },
    {
      key: 'chineseName',
      type: 'chineseName',
      message: '请输入姓名',
    },
    {
      key: 'customRegExp',
      test: /abc/,
      message: '请输入包含abc的文字',
    },
    {
      key: 'customSyncFn',
      test: ({ customSyncFn }) => /abc/.test(customSyncFn!),
      message: '请输入包含abc的文字',
    },
    {
      key: 'customAsyncFn',
      test: async ({ customAsyncFn }) => {
        await wait(500)
        return /abc/.test(customAsyncFn!)
      },
      message: '请输入包含abc的文字',
    },
    {
      key: 'pass1',
      required: true,
      test: ({ pass1 }) => pass1!.length > 6,
      message: '请输入大于6位的密码',
    },
    {
      key: 'pass2',
      test: ({ pass1, pass2 }) => pass2 === pass1,
      message: '请输入和密码一相同的密码',
    },
    {
      key: 'required',
      required: true,
      message: '请输入',
    },
    {
      key: 'updateMessage',
      test: (_, { updateMessage }) => {
        if (_.updateMessage !== 'x') {
          updateMessage('出错啦')
          return false
        }
      },
      message: 'x',
    },
  ]

  const v = new EasyValidator<Data>(rules)

  jestExpectEqual(
    await v.validate({
      number: '122.3',
      integer: '12',
      chineseMobilePhoneNumber: '18842611520',
      chineseIdCardNumber: '130401200101011678',
      chineseName: '方剑成',
      url: 'http://github.com',
      email: 'fjc@163.com',
      customRegExp: 'abc2',
      customSyncFn: '2abc',
      customAsyncFn: '2abc2',
      pass1: '1234567',
      pass2: '1234567',
      required: 'req',
      updateMessage: 'x',
    }),
    {
      valid: true,
      unvalidRules: [],
      messages: {},
    },
  )
  jestExpectEqual(
    await v.validate({
      number: '122.3',
      integer: '12.2', // 1
      chineseMobilePhoneNumber: '18842611520',
      chineseIdCardNumber: '130401200101011678',
      url: 'http://github.com',
      email: 'fjc@163', // 5
      // email: '', // 6
      chineseName: '方剑成',
      customRegExp: 'abd2', // 8
      customSyncFn: '2abc',
      customAsyncFn: '2abs2', // 10
      pass1: '1234567',
      pass2: '12345678', // 12
      required: undefined as any, // 13
      updateMessage: 'y', // 14
    }),
    ii(() => {
      const unvalidRules = [
        rules[1],
        rules[5],
        rules[8],
        rules[10],
        rules[12],
        rules[13],
        {
          ...rules[14],
          message: '出错啦',
        },
      ]
      return {
        valid: false,
        unvalidRules: unvalidRules,
        messages: pluck(unvalidRules, item => item.message, item => item.key),
      }
    }),
  )
})

test('示例', async () => {
  async function checkPhoneNumberAsync(_num: string) {
    await wait(500)
    return {
      valid: true,
      message: '',
    }
  }
  interface Data {
    name: string,
    phoneNumber: string,
    pass1: string,
    pass2: string,
  }
  const ev = new EasyValidator<Data>([
    {
      key: 'name',
      type: 'chineseName',
      message: '请输入真实姓名',
    },
    {
      key: 'phoneNumber',
      type: 'chineseMobilePhoneNumber',
      message: '请输入正确的手机号码',
    },
    {
      key: 'phoneNumber',
      test: async ({ phoneNumber }, { updateMessage }) => {
        const result = await checkPhoneNumberAsync(phoneNumber)
        if (!result.valid) {
          updateMessage(result.message)
          return false
        }
      },
      message: '请输入正确的手机号码',
    },
    {
      key: 'pass1',
      test: ({ pass1 }) => pass1.length > 6,
      message: '密码应大于6位',
    },
    {
      key: 'pass2',
      test: ({ pass1, pass2 }) => pass2 === pass1,
      message: '两次密码应一致',
    },
  ])
  const res = await ev.validate({
    name: '方一一',
    phoneNumber: '18087030070',
    pass1: '1234567',
    pass2: '12345678',
  })
  expect(res.valid).toBeFalsy()
  jestExpectEqual(
    res.unvalidRules[0].key,
    'pass2',
  )
})
