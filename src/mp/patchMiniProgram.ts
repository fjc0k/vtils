import { ensureInMiniProgram } from './ensureInMiniProgram'
import { MiniProgramApi } from '../utils'
import { miniProgramBus } from './miniProgramBus'

function patchAppOptions(
  mp: MiniProgramApi,
  appOptions: WechatMiniprogram.App.Options<{}>,
) {
  const onLaunch = appOptions.onLaunch
  appOptions.onLaunch = function (launchOptions) {
    miniProgramBus.emit({ name: 'appLaunch', context: this }, launchOptions)
    return onLaunch?.call(this, launchOptions)
  }

  const onShow = appOptions.onShow
  appOptions.onShow = function (showOptions) {
    miniProgramBus.emit({ name: 'appShow', context: this }, showOptions)
    return onShow?.call(this, showOptions)
  }

  const onHide = appOptions.onHide
  appOptions.onHide = function () {
    miniProgramBus.emit({ name: 'appHide', context: this })
    return onHide?.call(this)
  }

  const onError = appOptions.onError
  appOptions.onError = function (error) {
    miniProgramBus.emit({ name: 'appError', context: this }, error)
    return onError?.call(this, error)
  }

  const onPageNotFound = appOptions.onPageNotFound
  appOptions.onPageNotFound = function (payload) {
    miniProgramBus.emit({ name: 'pageNotFound', context: this }, payload)
    return onPageNotFound?.call(this, payload)
  }

  const onUnhandledRejection = appOptions.onUnhandledRejection
  appOptions.onUnhandledRejection = function (payload) {
    miniProgramBus.emit(
      { name: 'appUnhandledRejectionThrow', context: this },
      payload,
    )
    return onUnhandledRejection?.call(this, payload)
  }

  const onThemeChange = appOptions.onThemeChange
  appOptions.onThemeChange = function (payload) {
    miniProgramBus.emit({ name: 'appThemeChange', context: this }, payload)
    return onThemeChange?.call(this, payload)
  }
}

function patchPageOptions(
  mp: MiniProgramApi,
  pageOptions: WechatMiniprogram.Page.Options<{}, {}>,
) {
  const onLoad = pageOptions.onLoad
  pageOptions.onLoad = function (pageQuery) {
    if (mp.$brand === '支付宝') {
      // 支持通过 options 获取页面参数
      ;(this as any).options = pageQuery
    }
    ;(this as any).__PAGE_ID__ = ++patchMiniProgram.__CURRENT_PAGE_ID__
    miniProgramBus.emit({ name: 'pageLoad', context: this }, pageQuery)
    return onLoad?.call(this, pageQuery)
  }

  const onShow = pageOptions.onShow
  pageOptions.onShow = function () {
    miniProgramBus.emit({ name: 'pageShow', context: this })
    return onShow?.call(this)
  }

  const onReady = pageOptions.onReady
  pageOptions.onReady = function () {
    miniProgramBus.emit({ name: 'pageReady', context: this })
    return onReady?.call(this)
  }

  const onHide = pageOptions.onHide
  pageOptions.onHide = function () {
    miniProgramBus.emit({ name: 'pageHide', context: this })
    return onHide?.call(this)
  }

  const onUnload = pageOptions.onUnload
  pageOptions.onUnload = function () {
    miniProgramBus.emit({ name: 'pageUnload', context: this })
    return onUnload?.call(this)
  }

  const onPullDownRefresh = pageOptions.onPullDownRefresh
  pageOptions.onPullDownRefresh = function () {
    miniProgramBus.emit({ name: 'pagePullDownRefresh', context: this })
    return onPullDownRefresh?.call(this)
  }

  const onReachBottom = pageOptions.onReachBottom
  pageOptions.onReachBottom = function () {
    miniProgramBus.emit({ name: 'pageReachBottom', context: this })
    return onReachBottom?.call(this)
  }

  const onShareAppMessage = pageOptions.onShareAppMessage
  pageOptions.onShareAppMessage = function (payload) {
    miniProgramBus.emit({ name: 'pageShareAppMessage', context: this }, payload)
    return onShareAppMessage?.call(this, payload)
  }

  // @ts-ignore
  const onShareTimeline = pageOptions.onShareTimeline
  // @ts-ignore
  pageOptions.onShareTimeline = function (payload) {
    miniProgramBus.emit({ name: 'pageShareTimeline', context: this }, payload)
    return onShareTimeline?.call(this, payload)
  }

  const onAddToFavorites = pageOptions.onAddToFavorites
  pageOptions.onAddToFavorites = function (payload) {
    miniProgramBus.emit({ name: 'pageAddToFavorites', context: this }, payload)
    return onAddToFavorites?.call(this, payload) || {}
  }

  const onResize = pageOptions.onResize
  pageOptions.onResize = function (payload) {
    miniProgramBus.emit({ name: 'pageResize', context: this }, payload)
    return onResize?.call(this, payload)
  }

  const onTabItemTap = pageOptions.onTabItemTap
  pageOptions.onTabItemTap = function (payload) {
    miniProgramBus.emit({ name: 'pageTabItemTap', context: this }, payload)
    return onTabItemTap?.call(this, payload)
  }
}

/**
 * 打补丁。
 */
export function patchMiniProgram() {
  ensureInMiniProgram(mp => {
    // 重写 App
    const originalApp = App
    App = function (appOptions) {
      patchAppOptions(mp, appOptions)
      return originalApp(appOptions)
    }

    // 重写 Page
    const originalPage = Page
    Page = function (pageOptions) {
      patchPageOptions(mp, pageOptions)
      return originalPage(pageOptions)
    }

    // 重写 Component
    const originalComponent = Component
    Component = function (componentOptions) {
      componentOptions.methods = componentOptions.methods || ({} as any)
      patchPageOptions(mp, componentOptions.methods as any)
      return originalComponent(componentOptions)
    }
  })
}

patchMiniProgram.__CURRENT_PAGE_ID__ = 0
