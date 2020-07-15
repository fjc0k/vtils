function getAvaliableSize(size: number): number {
  return Math.min(1000, Math.max(10, Math.round(size / 10) * 10))
}

/**
 * 给定大小获取占位猫咪图片。
 *
 * @param size 大小
 * @returns 返回占位图地址
 */
export function placeKitten(size: number): string

/**
 * 给定宽高获取占位猫咪图片。
 *
 * @param width 宽度
 * @param height 高度
 * @returns 返回占位图地址
 */
export function placeKitten(width: number, height: number): string

export function placeKitten(width: number, height?: number): string {
  height = height ?? width
  width = getAvaliableSize(width)
  height = getAvaliableSize(height)
  return `https://cdn.jsdelivr.net/gh/fjc0k/placekitten/images/${width}/${height}.jpg`
}
