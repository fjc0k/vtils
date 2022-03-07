import gcoord from 'gcoord'
import type { CRSTypes } from 'gcoord/dist/types/crs/index'

export interface GeoCoordTransformInput {
  /**
   * 经度。
   */
  longitude: number

  /**
   * 纬度。
   */
  latitude: number
}

export interface GeoCoordTransformOutput {
  /**
   * 经度。
   */
  longitude: number

  /**
   * 纬度。
   */
  latitude: number
}

const makeTransformer =
  (from: CRSTypes, to: CRSTypes) =>
  (input: GeoCoordTransformInput): GeoCoordTransformOutput => {
    const res = gcoord.transform([input.longitude, input.latitude], from, to)
    return {
      longitude: res[0],
      latitude: res[1],
    }
  }

/**
 * 地理坐标系转换工具。
 *
 * - `大地坐标系（WGS84 坐标系）`: GPS 全球卫星定位系统使用的坐标系；
 * - `火星坐标系（GCJ02 坐标系）`: 腾讯地图、高德地图等使用的坐标系，是由中国国家测绘局制定的由 WGS84 加密后得到的坐标系；
 * - `百度坐标系（BD09 坐标系）`: 百度地图使用的坐标系，是在 GCJ02 基础上再次加密得到的坐标系。
 */
export class GeoCoord {
  /**
   * `WGS84 坐标系` 转 `GCJ02 坐标系`。
   *
   * 应用场景：GPS 坐标转腾讯地图、高德地图坐标。
   */
  static WGS84ToGCJ02 = makeTransformer(gcoord.WGS84, gcoord.GCJ02)

  /**
   * `WGS84 坐标系` 转 `BD09 坐标系`。
   *
   * 应用场景：GPS 坐标转百度地图坐标。
   */
  static WGS84ToBD09 = makeTransformer(gcoord.WGS84, gcoord.BD09)

  /**
   * `GCJ02 坐标系` 转 `WGS84 坐标系`。
   *
   * 应用场景：腾讯地图、高德地图坐标转 GPS 坐标。
   */
  static GCJ02ToWGS84 = makeTransformer(gcoord.GCJ02, gcoord.WGS84)

  /**
   * `GCJ02 坐标系` 转 `BD09 坐标系`。
   *
   * 应用场景：腾讯地图、高德地图坐标转百度地图坐标。
   */
  static GCJ02ToBD09 = makeTransformer(gcoord.GCJ02, gcoord.BD09)

  /**
   * `BD09 坐标系` 转 `WGS84 坐标系`。
   *
   * 应用场景：百度地图坐标转 GPS 坐标。
   */
  static BD09ToWGS84 = makeTransformer(gcoord.BD09, gcoord.WGS84)

  /**
   * `BD09 坐标系` 转 `GCJ02 坐标系`。
   *
   * 应用场景：百度地图坐标转腾讯地图、高德地图坐标。
   */
  static BD09ToGCJ02 = makeTransformer(gcoord.BD09, gcoord.GCJ02)
}
