import {
  getMenuButtonBoundingClientRect,
  getSystemInfoSync,
} from '@tarojs/taro'

export interface GetTopBarInfoResult {
  /**
   * 状态栏高度。
   */
  statusBarHeight: number

  /**
   * 菜单按钮宽度。
   */
  menuButtonWidth: number

  /**
   * 菜单按钮高度。
   */
  menuButtonHeight: number

  /**
   * 菜单按钮垂直外边距。
   */
  menuButtonVerticalMargin: number

  /**
   * 菜单按钮水平外边距。
   *
   * **注意: QQ 小程序下该项为 0，请自行选取默认值**
   */
  menuButtonHorizontalMargin: number

  /**
   * 导航栏高度。
   */
  navigationBarHeight: number

  /**
   * 顶栏高度。
   */
  topBarHeight: number
}

/**
 * 获取顶栏信息。
 *
 * @returns 返回获取到的顶栏信息
 */
export function getTopBarInfo(): GetTopBarInfoResult {
  const menuRect = getMenuButtonBoundingClientRect()
  const sysInfo = getSystemInfoSync()

  // 部分情况下 statusBarHeight 可能不存在或为 0，需手动计算，如：
  // 苹果手机 iOS 版本 < 13 时下开启热点等
  if (!sysInfo.statusBarHeight) {
    sysInfo.statusBarHeight = sysInfo.screenHeight - sysInfo.windowHeight
  }

  const statusBarHeight = sysInfo.statusBarHeight
  const menuButtonWidth = menuRect.width
  const menuButtonHeight = menuRect.height
  const menuButtonVerticalMargin = menuRect.top - statusBarHeight
  const menuButtonHorizontalMargin = sysInfo.windowWidth - menuRect.right
  const navigationBarHeight = menuButtonHeight + menuButtonVerticalMargin * 2
  const topBarHeight = statusBarHeight + navigationBarHeight

  return {
    statusBarHeight,
    menuButtonWidth,
    menuButtonHeight,
    menuButtonVerticalMargin,
    menuButtonHorizontalMargin,
    navigationBarHeight,
    topBarHeight,
  }
}
