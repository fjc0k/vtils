import { GeoCoord } from './GeoCoord'

describe('GeoCoord', () => {
  test('ok', () => {
    expect(
      GeoCoord.WGS84ToGCJ02({
        longitude: 238,
        latitude: 34,
      }),
    ).toMatchSnapshot()
  })
})
