<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [mp](./mp.md)

## mp package

小程序工具库。

## Functions

|  Function | Description |
|  --- | --- |
|  [ensureInMiniProgram(cb)](./mp.ensureinminiprogram.md) | 确保当前在小程序环境并执行回调。 |
|  [getCurrentPagePath(pageInstance)](./mp.getcurrentpagepath.md) | 获取当前页面的路径（不含查询参数），始终以 <code>/</code> 开头。 |
|  [getCurrentPageQuery(pageInstance)](./mp.getcurrentpagequery.md) | 获取当前页面的查询参数，已经对每个值执行了 decodeURIComponent。 |
|  [getCurrentPageUrl(pageInstance)](./mp.getcurrentpageurl.md) | 获取当前页面的地址（包含查询参数）。 |
|  [getMiniProgramConfig()](./mp.getminiprogramconfig.md) |  |
|  [getSceneParams(parser)](./mp.getsceneparams.md) | 获取场景参数。 |
|  [getTopBarInfo()](./mp.gettopbarinfo.md) | 获取顶栏信息。 |
|  [navigatePageBack(delta)](./mp.navigatepageback.md) | 关闭当前页面，返回上一页面或多级页面。 |
|  [navigatePageTo(url, query, redirect)](./mp.navigatepageto.md) | 跳转至某个页面，跳转失败时会尝试切换到 Tab 页。<!-- -->\*\*注意：在页面真正切换后 Promise 才会被 resolve，因而此时的页面上下文已经是新页面。\*\* |
|  [patchMiniProgram()](./mp.patchminiprogram.md) | 打补丁。 |
|  [redirectPageTo(url, query)](./mp.redirectpageto.md) | 关闭当前页面，跳转至某个页面，跳转失败时会尝试切换到 Tab 页。 |
|  [setMiniProgramConfig(config)](./mp.setminiprogramconfig.md) |  |
|  [usePullDownRefresh(callback)](./mp.usepulldownrefresh.md) |  |
|  [useSceneParams(parser)](./mp.usesceneparams.md) | 获取场景参数。 |
|  [useShareAppMessage(callback)](./mp.useshareappmessage.md) |  |
|  [useSubmit(action, deps)](./mp.usesubmit.md) | 对提交类行为的封装。 |
|  [useTopBarInfo()](./mp.usetopbarinfo.md) | 获取顶栏信息。 |

## Interfaces

|  Interface | Description |
|  --- | --- |
|  [GetTopBarInfoResult](./mp.gettopbarinforesult.md) |  |
|  [MiniProgramBusListeners](./mp.miniprogrambuslisteners.md) |  |
|  [MiniProgramBusRouteChangePageInfo](./mp.miniprogrambusroutechangepageinfo.md) |  |
|  [MiniProgramBusRouteChangePayload](./mp.miniprogrambusroutechangepayload.md) |  |
|  [MiniProgramConfig](./mp.miniprogramconfig.md) |  |

## Namespaces

|  Namespace | Description |
|  --- | --- |
|  [patchMiniProgram](./mp.patchminiprogram.md) |  |

## Variables

|  Variable | Description |
|  --- | --- |
|  [currentPageListeners](./mp.currentpagelisteners.md) |  |
|  [miniProgramBus](./mp.miniprogrambus.md) |  |
|  [pageListeners](./mp.pagelisteners.md) |  |
|  [pageListenerToCurrentPageListener](./mp.pagelistenertocurrentpagelistener.md) |  |
|  [submit](./mp.submit.md) | 对提交类行为的封装。 |

## Type Aliases

|  Type Alias | Description |
|  --- | --- |
|  [GetSceneParamsParser](./mp.getsceneparamsparser.md) |  |
|  [MiniProgramBusRouteChangeAction](./mp.miniprogrambusroutechangeaction.md) |  |
