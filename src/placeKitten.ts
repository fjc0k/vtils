/**
 * 获取占位图片，来自：https://placekitten.com/
 *
 * @param size 占位图片大小(单位: px)
 * @returns 占位图片链接
 */
function placeKitten(size: number): string
/**
 * 获取占位图片，来自：https://placekitten.com/
 *
 * @param width 占位图片宽(单位: px)
 * @param height 占位图片高(单位: px)
 * @returns 占位图片链接
 */
function placeKitten(width: number, height: number): string
function placeKitten(width: number, height?: number): string {
  height = height || width
  return `https://placekitten.com/${width}/${height}`
}

export default placeKitten
