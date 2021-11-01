import { AnyObject, Defined } from '../types'
import { EventBus, EventBusBeforeOn, EventBusListener } from '../utils'
import { patchMiniProgram } from './patchMiniProgram'

export interface MiniProgramBusRouteChangePageInfo {
  url: string
  path: string
  query: AnyObject
}

export type MiniProgramBusRouteChangeAction = 'replace' | 'pop' | 'push'

export interface MiniProgramBusRouteChangePayload {
  from: MiniProgramBusRouteChangePageInfo | undefined
  to: MiniProgramBusRouteChangePageInfo
  action: MiniProgramBusRouteChangeAction
}

export interface MiniProgramBusListeners {
  appLaunch: Defined<WechatMiniprogram.App.Options<{}>['onLaunch']>
  appShow: Defined<WechatMiniprogram.App.Options<{}>['onShow']>
  appHide: Defined<WechatMiniprogram.App.Options<{}>['onHide']>
  appError: Defined<WechatMiniprogram.App.Options<{}>['onError']>
  appThemeChange: Defined<WechatMiniprogram.App.Options<{}>['onThemeChange']>
  appUnhandledRejectionThrow: Defined<
    WechatMiniprogram.App.Options<{}>['onUnhandledRejection']
  >
  pageNotFound: Defined<WechatMiniprogram.App.Options<{}>['onPageNotFound']>
  pageLoad: Defined<WechatMiniprogram.Page.Options<{}, {}>['onLoad']>
  pageShow: Defined<WechatMiniprogram.Page.Options<{}, {}>['onShow']>
  pageHide: Defined<WechatMiniprogram.Page.Options<{}, {}>['onHide']>
  pageReady: Defined<WechatMiniprogram.Page.Options<{}, {}>['onReady']>
  pageUnload: Defined<WechatMiniprogram.Page.Options<{}, {}>['onUnload']>
  pagePullDownRefresh: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onPullDownRefresh']
  >
  pageReachBottom: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onReachBottom']
  >
  pageShareAppMessage: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onShareAppMessage']
  >
  pageShareTimeline: Defined<
    // @ts-ignore
    WechatMiniprogram.Page.Options<{}, {}>['onShareTimeline']
  >
  pageAddToFavorites: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onAddToFavorites']
  >
  // 影响性能，暂不支持
  // pageScroll: Defined<WechatMiniprogram.Page.Options<{}, {}>['onPageScroll']>
  pageResize: Defined<WechatMiniprogram.Page.Options<{}, {}>['onResize']>
  pageTabItemTap: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onTabItemTap']
  >
  currentPageShow: Defined<WechatMiniprogram.Page.Options<{}, {}>['onShow']>
  currentPageHide: Defined<WechatMiniprogram.Page.Options<{}, {}>['onHide']>
  currentPageReady: Defined<WechatMiniprogram.Page.Options<{}, {}>['onReady']>
  currentPageUnload: Defined<WechatMiniprogram.Page.Options<{}, {}>['onUnload']>
  currentPagePullDownRefresh: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onPullDownRefresh']
  >
  currentPageReachBottom: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onReachBottom']
  >
  currentPageShareAppMessage: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onShareAppMessage']
  >
  currentPageShareTimeline: Defined<
    // @ts-ignore
    WechatMiniprogram.Page.Options<{}, {}>['onShareTimeline']
  >
  currentPageAddToFavorites: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onAddToFavorites']
  >
  // 影响性能，暂不支持
  // currentPageScroll: Defined<WechatMiniprogram.Page.Options<{}, {}>['onPageScroll']>
  currentPageResize: Defined<WechatMiniprogram.Page.Options<{}, {}>['onResize']>
  currentPageTabItemTap: Defined<
    WechatMiniprogram.Page.Options<{}, {}>['onTabItemTap']
  >
  routeChange: (payload: MiniProgramBusRouteChangePayload) => any
}

/** @private */
export const pageListenerToCurrentPageListener: Partial<
  Record<keyof MiniProgramBusListeners, keyof MiniProgramBusListeners>
> = {
  pageShow: 'currentPageShow',
  pageHide: 'currentPageHide',
  pageReady: 'currentPageReady',
  pageUnload: 'currentPageUnload',
  pagePullDownRefresh: 'currentPagePullDownRefresh',
  pageReachBottom: 'currentPageReachBottom',
  pageShareAppMessage: 'currentPageShareAppMessage',
  pageShareTimeline: 'currentPageShareTimeline',
  pageAddToFavorites: 'currentPageAddToFavorites',
  pageResize: 'currentPageResize',
  pageTabItemTap: 'currentPageTabItemTap',
}

/** @private */
export const pageListeners = Object.keys(
  pageListenerToCurrentPageListener,
) as Array<keyof MiniProgramBusListeners>
/** @private */
export const currentPageListeners = pageListeners.map(
  pageListener => pageListenerToCurrentPageListener[pageListener],
) as Array<keyof MiniProgramBusListeners>

// @ts-ignore
export const miniProgramBus = new EventBus<MiniProgramBusListeners>({
  beforeOn: currentPageListeners.reduce<
    // @ts-ignore
    EventBusBeforeOn<MiniProgramBusListeners>
  >((res, currentPageListenerName) => {
    res[currentPageListenerName] = function (cb: EventBusListener) {
      cb.__EVENT_BUS_TAG__ = patchMiniProgram.__CURRENT_PAGE_ID__
      return cb
    }
    return res
  }, {}),
})
