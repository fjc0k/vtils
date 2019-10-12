<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/@vtils/taro"><img src="https://badge.fury.io/js/%40vtils%2Ftaro.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center"><a href="https://github.com/fjc0k/vtils/tree/master/packages/vtils">vtils</a> 在 Taro 中的应用，且对 <a href="https://github.com/streamich/react-use">react-use</a>、<a href="https://github.com/fjc0k/vtils/tree/master/packages/react">@vtils/react</a> 中部分常用的工具函数、Hooks 进行了重新导出以适配 Taro。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/taro">https://fjc0k.github.io/vtils/taro</a>
</p>

## 安装

```bash
# yarn
yarn add vtils @vtils/taro

# or, npm
npm i vtils @vtils/taro --save
```

## 使用

```js
import { useToggle } from '@vtils/taro'

export default function Edit() {
  const [showMore, toggleShowMore] = useToggle(false)
  return (
    // ...
  )
}
```

<!-- TYPEDOC -->

## 导出自 <a href="https://github.com/streamich/react-use">react-use</a> 的 Hooks

- [useToggle](https://github.com/streamich/react-use/blob/master/docs/useToggle.md)
- [useBoolean](https://github.com/streamich/react-use/blob/master/docs/useBoolean.md)
- [useGetSet](https://github.com/streamich/react-use/blob/master/docs/useGetSet.md)
- [useGetSetState](https://github.com/streamich/react-use/blob/master/docs/useGetSetState.md)
- [usePrevious](https://github.com/streamich/react-use/blob/master/docs/usePrevious.md)
- [useSetState](https://github.com/streamich/react-use/blob/master/docs/useSetState.md)
- [useCounter](https://github.com/streamich/react-use/blob/master/docs/useCounter.md)
- [useNumber](https://github.com/streamich/react-use/blob/master/docs/useNumber.md)
- [useList](https://github.com/streamich/react-use/blob/master/docs/useList.md)
- [useMap](https://github.com/streamich/react-use/blob/master/docs/useMap.md)
- [useDebounce](https://github.com/streamich/react-use/blob/master/docs/useDebounce.md)
- [useThrottle](https://github.com/streamich/react-use/blob/master/docs/useThrottle.md)
- [useThrottleFn](https://github.com/streamich/react-use/blob/master/docs/useThrottleFn.md)
- [useEffectOnce](https://github.com/streamich/react-use/blob/master/docs/useEffectOnce.md)
- [useMount](https://github.com/streamich/react-use/blob/master/docs/useMount.md)
- [useUnmount](https://github.com/streamich/react-use/blob/master/docs/useUnmount.md)
- [useMountedState](https://github.com/streamich/react-use/blob/master/docs/useMountedState.md)
- [useAsync](https://github.com/streamich/react-use/blob/master/docs/useAsync.md)
- [useAsyncFn](https://github.com/streamich/react-use/blob/master/docs/useAsyncFn.md)

## 导出自 <a href="https://github.com/fjc0k/vtils/tree/master/packages/react">@vtils/react</a> 的工具函数、Hooks

- [buildFunctionComponentCreator](https://github.com/fjc0k/vtils/tree/master/packages/react#buildfunctioncomponentcreator)
- [useEasyValidator](https://github.com/fjc0k/vtils/tree/master/packages/react#useeasyvalidator)
- [useLiveEasyValidator](https://github.com/fjc0k/vtils/tree/master/packages/react#useliveeasyvalidator)
- [useLoadMore](https://github.com/fjc0k/vtils/tree/master/packages/react#useloadmore)

## 自产的工具函数、Hooks 目录
<!-- Main!目录 -->
👇 | 👇 | 👇
--- | --- | ---
[useAccountInfo](#useaccountinfo) | [useLaunchOptions](#uselaunchoptions) | [useMenuButtonBoundingClientRect](#usemenubuttonboundingclientrect)
[useNavigationBarLoading](#usenavigationbarloading) | [useNavigationBarTitle](#usenavigationbartitle) | [useScope](#usescope)
[useScrollLoadMore](#usescrollloadmore) | [useSystemInfo](#usesysteminfo) | 
<!-- Maini目录 -->

## 自产的工具函数、Hooks 列表
<!-- Main!内容 -->
#### useAccountInfo

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useAccountInfo.ts#L20) | [API](https://fjc0k.github.io/vtils/taro/globals.html#useaccountinfo) | [回目录](#目录)</small>

获取当前帐号信息。

```ts
const accountInfo = useAccountInfo()
// {
//   miniProgram: {
//     appId: '小程序 appid'
//   },
//   plugin: {
//     appId: '插件 appid',
//     version: '插件版本号'
//   }
// }
```

#### useLaunchOptions

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useLaunchOptions.ts#L12) | [API](https://fjc0k.github.io/vtils/taro/globals.html#uselaunchoptions) | [回目录](#目录)</small>

获取小程序启动时的参数。

```ts
const launchOptions = useLaunchOptions()
// { path: '启动小程序的路径', ... }
```

#### useMenuButtonBoundingClientRect

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useMenuButtonBoundingClientRect.ts#L12) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usemenubuttonboundingclientrect) | [回目录](#目录)</small>

获取菜单按钮（右上角胶囊按钮）的布局位置信息。坐标信息以屏幕左上角为原点。

```ts
const rect = useMenuButtonBoundingClientRect()
// { width: 333, ... }
```

#### useNavigationBarLoading

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useNavigationBarLoading.ts#L20) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usenavigationbarloading) | [回目录](#目录)</small>

控制导航条加载动画的显示、隐藏。

```ts
// 加载列表数据时显示导航条加载动画
const [loading, setLoading] = useState(true)
useNavigationBarLoading(loading)
useEffect(() => {
  setLoading(true)
  getListApi().then(() => {
    setLoading(false)
  })
}, [])
```

#### useNavigationBarTitle

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useNavigationBarTitle.ts#L17) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usenavigationbartitle) | [回目录](#目录)</small>

动态设置当前页面的标题。

```ts
// 以产品名称作为页面标题
const [product, setProduct] = useState({})
useNavigationBarTitle(product.name || '')
useEffect(() => {
  getProductDetail().then(setProduct)
}, [])
```

#### useScope

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useScope.ts#L11) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usescope) | [回目录](#目录)</small>

获取小程序原生作用域。同类组件中的 `this.$scope`。

```ts
const scope = useScope()
```

#### useScrollLoadMore

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useScrollLoadMore.ts#L45) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usescrollloadmore) | [回目录](#目录)</small>

滚动数据加载。

```ts
const [catId, setCatId] = useState(1)

const loader = useScrollLoadMore(
  // 在这里加载数据
  payload => {
    return getListByCatId({
      id: catId,
      pageNumber: payload.pageNumber
    }).then(res => {
      // 返回的数据结构必须为一个对象或数组，对象的结构如下，
      // 若返回数组，当数组为空时即视为加载完成
      return {
        data: res.data,
        total: res.total
      }
    })
  },
  // 依赖若发生变化则从首页重新加载数据
  [catId]
)

const handleCatChange = useCallback((catId: number) => {
  setCatId(catId)
}, [])

console.log(loader.loading) // 是否正在加载中
console.log(loader.initialLoading) // 是否初次加载中，重新加载也视为初次加载
console.log(loader.incrementalLoading) // 是否增量加载中
console.log(loader.noMore) // 数据是否已加载完成
console.log(loader.pageNumber) // 已经加载到多少页
console.log(loader.total) // 数据总量
```

#### useSystemInfo

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/taro/src/hooks/useSystemInfo.ts#L12) | [API](https://fjc0k.github.io/vtils/taro/globals.html#usesysteminfo) | [回目录](#目录)</small>

获取系统信息。

```ts
const systemInfo = useSystemInfo()
// { screenWidth: 750, ... }
```
<!-- Maini内容 -->

## 许可

MIT ©️ Jay Fong
