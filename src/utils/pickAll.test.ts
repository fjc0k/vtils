import { pickAll } from './pickAll'

describe('pickAll', () => {
  test('ok', () => {
    const data: {
      id: number
      name: string
    } = {
      id: 1,
      name: 'jack',
    }
    // @ts-expect-error
    data.gender = 1
    expect(pickAll(data, ['id', 'name'])).toEqual({
      id: 1,
      name: 'jack',
    })
    expect(pickAll(data, ['name', 'id'])).toEqual({
      id: 1,
      name: 'jack',
    })
    // @ts-expect-error
    expect(pickAll(data, ['name'])).toEqual({
      name: 'jack',
    })
    expect(pickAll(data, ['name', 'id', 'id'])).toEqual({
      id: 1,
      name: 'jack',
    })
    // @ts-expect-error
    expect(pickAll(data, ['id', 'name', 'gender'])).toEqual({
      id: 1,
      name: 'jack',
      gender: 1,
    })
  })
})
