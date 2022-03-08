import { expectType } from '../dev'
import { prepareData } from './prepareData'

describe('prepareData', () => {
  test('ok', async () => {
    const data = await prepareData({
      x: 1,
      y: Promise.resolve(Promise.resolve('y')),
      z: null,
    })
    expectType<typeof data['x'], number>()
    expectType<typeof data['y'], string>()
    expectType<typeof data['z'], null>()
    expect(data).toEqual({
      x: 1,
      y: 'y',
      z: null,
    })
  })
})
