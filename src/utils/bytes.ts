const _b = 1
const _kb = _b * 1024
const _mb = _kb * 1024
const _gb = _mb * 1024
const _tb = _gb * 1024
const _pb = _tb * 1024

export type BytesUnit = 'PB' | 'TB' | 'GB' | 'MB' | 'KB' | 'B'
export type BytesNumberValue = number
export type BytesStringValue = `${number}${BytesUnit}`
export type BytesValue = BytesNumberValue | BytesStringValue

const unitToBytes: Record<BytesUnit, number> = Object.create({
  PB: _pb,
  TB: _tb,
  GB: _gb,
  MB: _mb,
  KB: _kb,
  B: _b,
})

const re = /^(\d+(?:\.\d+)?)(PB|TB|GB|MB|KB|B)$/

/**
 * 获取字节值。
 *
 * @param value 值
 * @param unit 单位
 */
export function bytes(value: number, unit: BytesUnit): number
/**
 * 获取字节值。
 *
 * @param value 值
 */
export function bytes(value: BytesValue): number
export function bytes(value: BytesValue, unit?: BytesUnit): number {
  let bytesValue!: number

  if (typeof value === 'string' && value.length > 0) {
    const match = re.exec(value)
    if (!match) {
      throw new TypeError(`value 值非法: value=${JSON.stringify(value)}`)
    }
    const v = parseFloat(match[1])
    const u: BytesUnit = match[2] as any
    const t = unitToBytes[u]
    bytesValue = v * t
  } else if (typeof value === 'number' && isFinite(value)) {
    if (unit != null) {
      if (typeof unit === 'string') {
        const t = unitToBytes[unit]
        if (!t) {
          throw new TypeError(`unit 值非法: unit=${JSON.stringify(unit)}`)
        }
        bytesValue = value * t
      } else {
        throw new TypeError('unit 必须是一个字符串')
      }
    } else {
      bytesValue = value
    }
  } else {
    throw new TypeError('value 必须是字符串或数字')
  }

  return bytesValue
}
