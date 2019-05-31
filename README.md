<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><img src="https://badgen.net/npm/v/vtils" alt="License"> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/bundlephobia/min/vtils" alt="Size"> <img src="https://badgen.net/bundlephobia/minzip/vtils" alt="Gzip Size"> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center">一些常用的 JavaScript 工具函数</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/">https://fjc0k.github.io/vtils/</a>
</p>

## 安装

```bash
# yarn
yarn add vtils

# or, npm
npm i vtils --save
```

## 使用

```js
import { inBrowser,shuffle } from 'vtils'

if (inBrowser()) {
  alert('您在浏览器中...')
}

alert(shuffle([1, 2, 3, 4]))
```

## 工具列表

### 📦 工具函数

<!-- 工具函数! -->
#### 💡 assign

<small>[源码]() | [API]()</small>

分配来源对象的可枚举属性到目标对象上。

来源对象的应用规则是从左到右，随后的下一个对象的属性会覆盖上一个对象的属性。

```ts
assign(
  {},
  { x: 1 },
  { y: 2 },
  { x: 5, z: 9 },
) // => { x: 5, y: 2, z: 9 }
```

#### 💡 base64Decode

<small>[源码]() | [API]()</small>

返回 `base64` 解码后的字符串。

```ts
base64Decode('dnRpbHM=') // => vtils
base64Decode('5Lit5Zu9') // => 中国
base64Decode('8J+RqOKAjfCfkrs=') // => 👨‍💻
```

#### 💡 base64Encode

<small>[源码]() | [API]()</small>

返回 `base64` 编码后的字符串。

```ts
base64Encode('vtils') // => dnRpbHM=
base64Encode('中国') // => 5Lit5Zu9
base64Encode('👨‍💻') // => 8J+RqOKAjfCfkrs=
```

#### 💡 base64UrlDecode

<small>[源码]() | [API]()</small>

返回 `base64url` 解码后的字符串。

```ts
base64Decode('dnRpbHM=') // => vtils
base64Decode('5Lit5Zu9') // => 中国
base64Decode('8J-RqOKAjfCfkrs=') // => 👨‍💻
```

#### 💡 base64UrlEncode

<small>[源码]() | [API]()</small>

返回 `base64url` 编码后的字符串。

```ts
base64UrlEncode('vtils') // => dnRpbHM=
base64UrlEncode('中国') // => 5Lit5Zu9
base64UrlEncode('👨‍💻') // => 8J-RqOKAjfCfkrs=
```

#### 💡 castArray

<small>[源码]() | [API]()</small>

如果 `value` 是数组，直接返回；如果 `value` 不是数组，返回 `[value]`。

```ts
castArray([123, 456]) // => [123, 456]
castArray(123) // => [123]
castArray('hello') // => ['hello']
castArray(null) // => [null]
```

#### 💡 chunk

<small>[源码]() | [API]()</small>

将 `array` 拆分成多个 `size` 长度的区块，并将它们组合成一个新数组返回。

如果 `array` 无法等分，且设置了 `filler`，剩余的元素将被 `filler` 填充。

#### 💡 clamp

<small>[源码]() | [API]()</small>

返回限制在最小值和最大值之间的值。

#### 💡 column

<small>[源码]() | [API]()</small>

返回对象数组中指定的一列。

返回对象数组中指定的一列。

#### 💡 endsWith

<small>[源码]() | [API]()</small>

检查 `str` 是否以 `needle` 结尾。

#### 💡 fill

<small>[源码]() | [API]()</small>

使用 `value` 来填充（替换） `arr`，从 `start` 位置开始, 到 `end` 位置结束（但不包括 `end` 位置）。

#### 💡 flexible

<small>[源码]() | [API]()</small>

移动端屏幕适配。

#### 💡 forOwn

<small>[源码]() | [API]()</small>

遍历对象的可枚举属性。若遍历函数返回 `false`，遍历会提前退出。

注：基于你传入的 `obj`，遍历函数中 `key` 的类型可能为 `number`，但在运行时，`key` 始终为 `string`，因此，你应该始终把 `key` 当作 `string` 处理。（为什么会这样？https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208）

#### 💡 getGlobal

<small>[源码]() | [API]()</small>

获取全局对象。

#### 💡 getType

<small>[源码]() | [API]()</small>

检测 `value` 的类型。

#### 💡 groupBy

<small>[源码]() | [API]()</small>

根据 `iteratee` 返回的值对 `data` 进行分组。

#### 💡 has

<small>[源码]() | [API]()</small>

检查 `key` 是否是对象 `obj` 自身的属性。

#### 💡 ii

<small>[源码]() | [API]()</small>

立即调用函数并返回其返回值。

注：`ii = immediately invoke`

#### 💡 inBrowser

<small>[源码]() | [API]()</small>

检查是否在浏览器环境中。

#### 💡 inIOS

<small>[源码]() | [API]()</small>

检查是否在 `iOS` 设备中。

#### 💡 inNode

<small>[源码]() | [API]()</small>

检查是否在 `Node` 环境中。

#### 💡 inRange

<small>[源码]() | [API]()</small>

检查 `value` 是否在某区间内。

#### 💡 inWechatMiniProgram

<small>[源码]() | [API]()</small>

检查是否在微信小程序环境中。

#### 💡 inWechatWebview

<small>[源码]() | [API]()</small>

检查是否在微信浏览器环境中。

#### 💡 includes

<small>[源码]() | [API]()</small>

检索值 `value` 是否在数组 `arr` 中。

检索可枚举属性值 `value` 是否在对象 `obj` 中。

检索值 `value` 是否在字符串 `str` 中。

#### 💡 isArray

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个数组。

```ts
isArray(['x']) // => true
isArray('x') // => false
```

#### 💡 isBoolean

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个布尔值。

```ts
isBoolean(true) // => true
isBoolean(false) // => true
isBoolean('true') // => false
```

#### 💡 isChineseIDCardNumber

<small>[源码]() | [API]()</small>

检查 `value` 是否是合法的中国大陆居民 `18` 位身份证号码。

```ts
isChineseIDCardNumber('123456') // => false
```

#### 💡 isDate

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个日期。

#### 💡 isEmail

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个邮件地址。

#### 💡 isEmpty

<small>[源码]() | [API]()</small>

检查 `value` 是否是空值，包括：`undefined`、`null`、`''`、`false`、`true`、`[]`、`{}`。

#### 💡 isEqualArray

<small>[源码]() | [API]()</small>

检查给定的数组的各项是否相等。

#### 💡 isFinite

<small>[源码]() | [API]()</small>

检查 `value` 是否是原始有限数值。

#### 💡 isFunction

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个函数。

#### 💡 isHan

<small>[源码]() | [API]()</small>

检查 `value` 是否全是汉字。

#### 💡 isInteger

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个整数。

#### 💡 isLeapYear

<small>[源码]() | [API]()</small>

判断给定的年份是否是闰年。

#### 💡 isNaN

<small>[源码]() | [API]()</small>

检查 `value` 是否是 `NaN`。

#### 💡 isNegativeInteger

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个负整数。

#### 💡 isNil

<small>[源码]() | [API]()</small>

检查 `value` 是否是 `null` 或 `undefined`。

#### 💡 isNull

<small>[源码]() | [API]()</small>

检查 `value` 是否是 `null`。

#### 💡 isNumber

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个数字。

注：`NaN` 不被认为是数字。

```ts
isNumber(1) // => true
isNumber(0.1) // => true
isNumber('1') // => false
```

#### 💡 isNumeric

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个数值。

注：`Infinity`、`-Infinity`、`NaN` 不被认为是数值。

#### 💡 isObject

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个对象。

#### 💡 isPlainObject

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个普通对象。

#### 💡 isPositiveInteger

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个正整数。

#### 💡 isPossibleChineseMobilePhoneNumber

<small>[源码]() | [API]()</small>

检测 `number` 是否可能是中国的手机号码。

#### 💡 isPossibleChineseName

<small>[源码]() | [API]()</small>

检测 `value` 是否可能是中国人的姓名，支持少数名族姓名中间的 `·` 号。

#### 💡 isPromiseLike

<small>[源码]() | [API]()</small>

检查 `value` 是否像 `Promise`。

#### 💡 isRegExp

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个正则对象。

#### 💡 isString

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个字符串。

#### 💡 isUndefined

<small>[源码]() | [API]()</small>

检查 `value` 是否等于 `undefined`。

#### 💡 isUrl

<small>[源码]() | [API]()</small>

检查 `value` 是否是一个有效的网址，仅支持 `http`、`https` 协议，支持 `IP` 域名。

#### 💡 jestExpectEqual

<small>[源码]() | [API]()</small>

#### 💡 keyBy

<small>[源码]() | [API]()</small>

根据 `iteratee` 返回的键对 `data` 进行分组，但只保留最后一个结果。

#### 💡 keys

<small>[源码]() | [API]()</small>

返回 `obj` 的可枚举属性组成的数组。

注：基于你传入的 `obj`，返回的 `key` 的类型可能为 `number`，但在运行时，`key` 始终为 `string`，因此，你应该始终把 `key` 当作 `string` 处理。（为什么会这样？https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208）

#### 💡 last

<small>[源码]() | [API]()</small>

返回数组 `arr` 的最后一项。

#### 💡 loadResource

<small>[源码]() | [API]()</small>

加载图片、代码、样式等资源。

#### 💡 mapValues

<small>[源码]() | [API]()</small>

映射对象的可枚举属性值为一个新的值。

#### 💡 memoize

<small>[源码]() | [API]()</small>

函数结果缓存。

#### 💡 noop

<small>[源码]() | [API]()</small>

无操作函数。

#### 💡 omit

<small>[源码]() | [API]()</small>

创建一个从 `obj` 中剔除选中的可枚举属性的对象。

#### 💡 padEnd

<small>[源码]() | [API]()</small>

在 `str` 右侧填充字符。

#### 💡 padStart

<small>[源码]() | [API]()</small>

在 `str` 左侧填充字符。

#### 💡 parallel

<small>[源码]() | [API]()</small>

并行执行任务，`同步任务`、`异步任务` 皆可。

#### 💡 parseCSSValue

<small>[源码]() | [API]()</small>

解析 `CSS` 值的数值和单位。

#### 💡 pick

<small>[源码]() | [API]()</small>

创建一个从 `obj` 中选中的可枚举属性的对象。

#### 💡 placeKitten

<small>[源码]() | [API]()</small>

获取占位猫咪图片，图片来自：https://placekitten.com/

获取占位猫咪图片，图片来自：https://placekitten.com/

#### 💡 randomString

<small>[源码]() | [API]()</small>

生成一个随机字符串。

#### 💡 range

<small>[源码]() | [API]()</small>

创建一个包含从 `start` 到 `end`，但不包含 `end` 本身范围数字的数组。

#### 💡 repeat

<small>[源码]() | [API]()</small>

重复 `n` 次给定字符串。

#### 💡 round

<small>[源码]() | [API]()</small>

对传入的数字按给定的精度四舍五入后返回。

#### 💡 roundDown

<small>[源码]() | [API]()</small>

对传入的数字按给定的精度向下取值后返回。

#### 💡 roundUp

<small>[源码]() | [API]()</small>

对传入的数字按给定的精度向上取值后返回。

#### 💡 sample

<small>[源码]() | [API]()</small>

从数组中随机获取一个元素。

从对象中随机获取一个可枚举属性的值。

#### 💡 sequential

<small>[源码]() | [API]()</small>

顺序执行任务，`同步任务`、`异步任务` 皆可。

#### 💡 shuffle

<small>[源码]() | [API]()</small>

打乱一个数组。

#### 💡 startsWith

<small>[源码]() | [API]()</small>

检查 `str` 是否以 `needle` 开头。

#### 💡 sum

<small>[源码]() | [API]()</small>

计算传入值的总和。

#### 💡 sumBy

<small>[源码]() | [API]()</small>

根据 `iteratee` 返回的结果计算传入值的总和。

#### 💡 times

<small>[源码]() | [API]()</small>

调用函数 `n` 次，将每次的调用结果存进数组并返回。

#### 💡 values

<small>[源码]() | [API]()</small>

返回 `obj` 自身可枚举属性值组成的数组。

#### 💡 wait

<small>[源码]() | [API]()</small>

等待一段时间。
<!-- 工具函数i -->

### 📦 工具类

<!-- 工具类! -->
#### 💡 Disposer

<small>[源码]() | [API]()</small>

资源释放器。

```js
const disposer = new Disposer()
const timer = setInterval(
  () => console.log('ok'),
  1000,
)
disposer.add(() => clearInterval(timer))
document.querySelector('#stop').onclick = () => {
  disposer.dispose()
}
```

#### 💡 EasyStorage

<small>[源码]() | [API]()</small>

#### 💡 EasyStorageAdapter

<small>[源码]() | [API]()</small>

#### 💡 EasyStorageAdapterBrowser

<small>[源码]() | [API]()</small>

#### 💡 EasyStorageAdapterMemory

<small>[源码]() | [API]()</small>

#### 💡 EasyStorageAdapterWeapp

<small>[源码]() | [API]()</small>

微信小程序 `Storage` 适配器。

由于微信小程序的 `wx.getStorageSync` 方法对于不存在的项目会返回 `空字符串`，导致无法判断项目是否存在，因此，该适配器对存储的内容做了一层封装，以保证相关操作的结果可确定。

#### 💡 EasyStorageDriverBrowserLocalStorage

<small>[源码]() | [API]()</small>

#### 💡 EasyStorageDriverBrowserSessionStorage

<small>[源码]() | [API]()</small>

#### 💡 EasyValidator

<small>[源码]() | [API]()</small>

数据对象验证器。

#### 💡 EventBus

<small>[源码]() | [API]()</small>

事件巴士，管理事件的发布与订阅。

#### 💡 Wechat

<small>[源码]() | [API]()</small>

对微信 JSSDK 的封装。
<!-- 工具类i -->

### 📦 工具类型

<!-- 工具类型! -->
#### 💡 AnyFunction

<small>[源码]() | [API]()</small>

#### 💡 AnyObject

<small>[源码]() | [API]()</small>

#### 💡 AsyncOrSync

<small>[源码]() | [API]()</small>

#### 💡 Brand

<small>[源码]() | [API]()</small>

#### 💡 Defined

<small>[源码]() | [API]()</small>

从 `T` 中排除 `undefined` 类型。

```ts
interface User {
  gender?: 'male' | 'female',
}
// before
type UserGender = Exclude<User['gender'], undefined>
// after
type UserGender = Defined<User['gender']>
```

#### 💡 If

<small>[源码]() | [API]()</small>

#### 💡 IsNever

<small>[源码]() | [API]()</small>

#### 💡 LiteralUnion

<small>[源码]() | [API]()</small>

#### 💡 Merge

<small>[源码]() | [API]()</small>

#### 💡 Omit

<small>[源码]() | [API]()</small>

#### 💡 OmitByValue

<small>[源码]() | [API]()</small>

#### 💡 OmitByValueExact

<small>[源码]() | [API]()</small>

#### 💡 OneOrMore

<small>[源码]() | [API]()</small>

#### 💡 OptionalKeys

<small>[源码]() | [API]()</small>

#### 💡 PickByValue

<small>[源码]() | [API]()</small>

#### 💡 PickByValueExact

<small>[源码]() | [API]()</small>

#### 💡 RequiredKeys

<small>[源码]() | [API]()</small>

#### 💡 ValueOf

<small>[源码]() | [API]()</small>
<!-- 工具类型i -->

## 许可

MIT ©️ Jay Fong


