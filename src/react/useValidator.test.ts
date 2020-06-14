import { act, renderHook } from '@testing-library/react-hooks'
import { useState } from 'react'
import { useValidator } from './useValidator'

describe('useValidator', () => {
  describe('string', () => {
    test('验证失败', () => {
      const { result } = renderHook(() =>
        useValidator('10086', _ =>
          _.string().chineseMobilePhoneNumber('手机号不正确'),
        ),
      )
      expect(result.current.data).toBe('10086')
      expect(result.current.valid).toBeFalse()
      expect(result.current.error!.errors[0]).toBe('手机号不正确')
    })

    test('验证成功', () => {
      const { result } = renderHook(() =>
        useValidator('13907199856', _ =>
          _.string().chineseMobilePhoneNumber('手机号不正确'),
        ),
      )
      expect(result.current.data).toBe('13907199856')
      expect(result.current.valid).toBeTrue()
      expect(result.current.error).toBeUndefined()
    })
  })

  describe('object', () => {
    test('完整示例', () => {
      const { result } = renderHook(() => {
        const [phoneNumber, setPhoneNumber] = useState('')
        const [password, setPassword] = useState('')
        const [password2, setPassword2] = useState('')
        const vr = useValidator(
          { phoneNumber, password, password2 },
          [phoneNumber, password, password2],
          _ => ({
            phoneNumber: _.string()
              .label('手机号')
              .required()
              .chineseMobilePhoneNumber(),
            password: _.string().label('密码').required().min(6),
            password2: _.string()
              .label('重复密码')
              .required()
              .oneOf([password], '两次密码必须一致'),
          }),
          [password],
        )
        return { vr, setPhoneNumber, setPassword, setPassword2 }
      })

      expect(result.current.vr).toMatchSnapshot('首次验证')

      act(() => {
        result.current.setPhoneNumber('13907199856')
        result.current.setPassword('123456')
        result.current.setPassword2('1234567')
      })
      expect(result.current.vr).toMatchSnapshot('两次密码不一致')

      act(() => {
        result.current.setPhoneNumber('13907199856')
        result.current.setPassword('123456')
        result.current.setPassword2('123456')
      })
      expect(result.current.vr).toMatchSnapshot('两次密码一致')
    })
  })
})
