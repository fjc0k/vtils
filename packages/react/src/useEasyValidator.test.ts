import {act, renderHook} from '@testing-library/react-hooks'
import {useCallback, useState} from 'react'
import {useEasyValidator} from './useEasyValidator'
import {wait} from 'vtils'

test('表现正常', async () => {
  let evResult: any

  const {result} = renderHook(() => {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const ev = useEasyValidator({name, pass}, [
      {
        key: 'name',
        required: true,
        message: '姓名不能为空',
      },
      {
        key: 'pass',
        test: data => data.pass.length >= 6,
        message: '密码至少应为6位',
      },
    ])
    const handleRegisterClick = useCallback(() => {
      ev.validate().then(res => {
        evResult = res
      })
    }, [])
    return {setName, setPass, handleRegisterClick}
  })

  result.current.handleRegisterClick()
  await wait(10)
  expect(evResult).toMatchSnapshot('姓名、密码皆为空')

  act(() => result.current.setName('方方'))
  result.current.handleRegisterClick()
  await wait(10)
  expect(evResult).toMatchSnapshot('姓名不为空、密码为空')

  act(() => result.current.setPass('123'))
  result.current.handleRegisterClick()
  await wait(10)
  expect(evResult).toMatchSnapshot('姓名、密码都不为空，但密码少于6位')

  act(() => result.current.setPass('123456'))
  result.current.handleRegisterClick()
  await wait(10)
  expect(evResult).toMatchSnapshot('姓名、密码都不为空，且密码等于6位')
})
