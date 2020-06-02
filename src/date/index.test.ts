import { format } from './index'

describe('date', () => {
  test('format', () => {
    expect(format(new Date(), '')).toEqual(1)
  })
})
