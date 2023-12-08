import { isCuid2 } from './isCuid2'

describe('isCuid2', () => {
  test('ok', () => {
    expect(isCuid2('tz4a98xxat96iws9zmbrgj3a')).toBeTrue()

    expect(isCuid2('1')).toBeFalse()
    expect(isCuid2('tz4aws9zmbrgj3a')).toBeFalse()
  })
})
