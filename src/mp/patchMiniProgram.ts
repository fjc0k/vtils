import { currentPageListeners, miniProgramBus } from './miniProgramBus'
import { ensureInMiniProgram } from './ensureInMiniProgram'
import { last, MiniProgramApi } from '../utils'

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
    patchMiniProgram.__CURRENT_PAGE_ID__ = (this as any).__PAGE_ID__
    miniProgramBus.emit({
      name: 'currentPageShow',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pageShow', context: this })
    return onShow?.call(this)
  }

  const onReady = pageOptions.onReady
  pageOptions.onReady = function () {
    miniProgramBus.emit({
      name: 'currentPageReady',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pageReady', context: this })
    return onReady?.call(this)
  }

  const onHide = pageOptions.onHide
  pageOptions.onHide = function () {
    miniProgramBus.emit({
      name: 'currentPageHide',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pageHide', context: this })
    return onHide?.call(this)
  }

  const onUnload = pageOptions.onUnload
  pageOptions.onUnload = function () {
    miniProgramBus.emit({
      name: 'currentPageUnload',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pageUnload', context: this })
    const res = onUnload?.call(this)
    for (const currentPageListenerName of currentPageListeners) {
      miniProgramBus.off(currentPageListenerName, (this as any).__PAGE_ID__)
    }
    return res
  }

  const onPullDownRefresh = pageOptions.onPullDownRefresh
  pageOptions.onPullDownRefresh = function () {
    miniProgramBus.emit({
      name: 'currentPagePullDownRefresh',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pagePullDownRefresh', context: this })
    return onPullDownRefresh?.call(this)
  }

  const onReachBottom = pageOptions.onReachBottom
  pageOptions.onReachBottom = function () {
    miniProgramBus.emit({
      name: 'currentPageReachBottom',
      context: this,
      tag: (this as any).__PAGE_ID__,
    })
    miniProgramBus.emit({ name: 'pageReachBottom', context: this })
    return onReachBottom?.call(this)
  }

  const onShareAppMessage = pageOptions.onShareAppMessage
  pageOptions.onShareAppMessage = function (payload) {
    const pageListenerData = miniProgramBus.emit(
      {
        name: 'currentPageShareAppMessage',
        context: this,
        tag: (this as any).__PAGE_ID__,
      },
      payload,
    )
    const globalListenerData = miniProgramBus.emit(
      { name: 'pageShareAppMessage', context: this },
      payload,
    )
    const originalListenerData = onShareAppMessage?.call(this, payload)
    return (
      originalListenerData || last(pageListenerData) || last(globalListenerData)
    )
  }

  // @ts-ignore
  const onShareTimeline = pageOptions.onShareTimeline
  // @ts-ignore
  pageOptions.onShareTimeline = function (payload) {
    const pageListenerData = miniProgramBus.emit(
      {
        name: 'currentPageShareTimeline',
        context: this,
        tag: (this as any).__PAGE_ID__,
      },
      payload,
    )
    const globalListenerData = miniProgramBus.emit(
      { name: 'pageShareTimeline', context: this },
      payload,
    )
    const originalListenerData = onShareTimeline?.call(this, payload)
    return (
      originalListenerData || last(pageListenerData) || last(globalListenerData)
    )
  }

  const onAddToFavorites = pageOptions.onAddToFavorites
  pageOptions.onAddToFavorites = function (payload) {
    const pageListenerData = miniProgramBus.emit(
      {
        name: 'currentPageAddToFavorites',
        context: this,
        tag: (this as any).__PAGE_ID__,
      },
      payload,
    )
    const globalListenerData = miniProgramBus.emit(
      { name: 'pageAddToFavorites', context: this },
      payload,
    )
    const originalListenerData = onAddToFavorites?.call(this, payload)
    return (
      originalListenerData ||
      last(pageListenerData) ||
      last(globalListenerData) ||
      {}
    )
  }

  const onResize = pageOptions.onResize
  pageOptions.onResize = function (payload) {
    miniProgramBus.emit(
      {
        name: 'currentPageResize',
        context: this,
        tag: (this as any).__PAGE_ID__,
      },
      payload,
    )
    miniProgramBus.emit({ name: 'pageResize', context: this }, payload)
    return onResize?.call(this, payload)
  }

  const onTabItemTap = pageOptions.onTabItemTap
  pageOptions.onTabItemTap = function (payload) {
    miniProgramBus.emit(
      {
        name: 'currentPageTabItemTap',
        context: this,
        tag: (this as any).__PAGE_ID__,
      },
      payload,
    )
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
