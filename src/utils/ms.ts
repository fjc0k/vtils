// 参考： https://github.com/vercel/ms/blob/master/src/index.ts

const _ms = 1
const _s = _ms * 1000
const _m = _s * 60
const _h = _m * 60
const _d = _h * 24
const _w = _d * 7
const _y = _d * 365.25

export type MsUnit = 'y' | 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
export type MsNumberValue = number
export type MsStringValue = `${number}${MsUnit}`
export type MsValue = MsNumberValue | MsStringValue

const unitToTimes: Record<MsUnit, number> = Object.create({
  y: _y,
  w: _w,
  d: _d,
  h: _h,
  m: _m,
  s: _s,
  ms: _ms,
})

const re = /^(\d+(?:\.\d+)?)(y|w|d|h|m|s|ms)$/

/**
 * 获取毫秒值。
 *
 * @param value 值
 * @param unit 单位
 * @param returnSeconds 是否返回秒值
 */
export function ms(value: number, unit: MsUnit, returnSeconds?: boolean): number
/**
 * 获取毫秒值。
 *
 * @param value 值
 * @param returnSeconds 是否返回秒值
 */
export function ms(value: MsValue, returnSeconds?: boolean): number
export function ms(
  value: MsValue,
  unit?: MsUnit | boolean,
  returnSeconds?: boolean,
): number {
  if (typeof unit === 'boolean') {
    returnSeconds = unit
    unit = undefined
  }

  let msValue!: number

  if (typeof value === 'string' && value.length > 0) {
    const match = re.exec(value)
    if (!match) {
      throw new TypeError(`value 值非法: value=${JSON.stringify(value)}`)
    }
    const v = parseFloat(match[1])
    const u: MsUnit = match[2] as any
    const t = unitToTimes[u]
    msValue = v * t
  } else if (typeof value === 'number' && isFinite(value)) {
    if (unit != null) {
      if (typeof unit === 'string') {
        const t = unitToTimes[unit]
        if (!t) {
          throw new TypeError(`unit 值非法: unit=${JSON.stringify(unit)}`)
        }
        msValue = value * t
      } else {
        throw new TypeError('unit 必须是一个字符串')
      }
    } else {
      msValue = value
    }
  } else {
    throw new TypeError('value 必须是字符串或数字')
  }

  return returnSeconds ? Math.round(msValue / 1000) : msValue
}
