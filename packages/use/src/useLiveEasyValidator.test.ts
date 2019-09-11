import {act, renderHook} from '@testing-library/react-hooks'
import {useLiveEasyValidator} from './useLiveEasyValidator'
import {useState} from 'react'
import {wait} from 'vtils'

test('表现正常', async () => {
  const {result} = renderHook(() => {
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const evResult = useLiveEasyValidator({name, pass}, [
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
    return {setName, setPass, evResult}
  })

  await wait(10)
  expect(result.current.evResult).toMatchSnapshot('姓名、密码皆为空')

  act(() => result.current.setName('方方'))
  await wait(10)
  expect(result.current.evResult).toMatchSnapshot('姓名不为空、密码为空')

  act(() => result.current.setPass('123'))
  await wait(10)
  expect(result.current.evResult).toMatchSnapshot('姓名、密码都不为空，但密码少于6位')

  act(() => result.current.setPass('123456'))
  await wait(10)
  expect(result.current.evResult).toMatchSnapshot('姓名、密码都不为空，且密码等于6位')
})
