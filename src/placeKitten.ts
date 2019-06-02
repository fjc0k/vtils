/**
 * 给定大小获取占位猫咪图片，图片来自：https://placekitten.com/
 *
 * @param size 占位图片大小（单位：px）
 * @returns 返回占位图片链接
 * @example
 * ```ts
 * placeKitten(100) // => https://placekitten.com/100/100
 * ```
 */
export function placeKitten(size: number): string

/**
 * 给定宽高获取占位猫咪图片，图片来自：https://placekitten.com/
 *
 * @param width 占位图片宽（单位：px）
 * @param height 占位图片高（单位：px）
 * @returns 返回占位图片链接
 * @example
 * ```ts
 * placeKitten(100, 200) // => https://placekitten.com/100/200
 * ```
 */
export function placeKitten(width: number, height: number): string

export function placeKitten(width: number, height?: number): string {
  height = height || width
  return `https://placekitten.com/${width}/${height}`
}
