/// <reference types="miniprogram-api-typings" />
import { Defined } from '../types'
import {
  EventBus,
  EventBusBeforeEmit,
  EventBusBeforeOn,
  EventBusListener,
} from '../utils'
import { patchMiniProgram } from './patchMiniProgram'

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
}

// @ts-ignore
export const miniProgramBus = new EventBus<MiniProgramBusListeners>({
  beforeOn: ([
    'currentPageShow',
    'currentPageHide',
    'currentPageReady',
    'currentPageUnload',
    'currentPagePullDownRefresh',
    'currentPageReachBottom',
    'currentPageShareAppMessage',
    'currentPageShareTimeline',
    'currentPageAddToFavorites',
    'currentPageResize',
    'currentPageTabItemTap',
  ] as Array<keyof MiniProgramBusListeners>).reduce<
    // @ts-ignore
    EventBusBeforeOn<MiniProgramBusListeners>
  >((res, name) => {
    res[name] = function (cb: any) {
      ;(cb as EventBusListener).__EVENT_BUS_TAG__ =
        patchMiniProgram.__CURRENT_PAGE_ID__
      return cb
    }
    return res
  }, {}),
  beforeEmit: ([
    'pageShow',
    'pageHide',
    'pageReady',
    'pageUnload',
    'pagePullDownRefresh',
    'pageReachBottom',
    'pageShareAppMessage',
    'pageShareTimeline',
    'pageAddToFavorites',
    'pageResize',
    'pageTabItemTap',
  ] as Array<keyof MiniProgramBusListeners>).reduce<
    // @ts-ignore
    EventBusBeforeEmit<MiniProgramBusListeners>
  >((res, name) => {
    res[name] = function (ctx) {
      this.emit({
        name: `current${name[0].toUpperCase()}${name.slice(1)}` as any,
        context: ctx,
        tag: ctx.__PAGE_ID__,
      })
    }
    return res
  }, {}),
})
