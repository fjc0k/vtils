<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/@vtils/date"><img src="https://badge.fury.io/js/%40vtils%2Fdate.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/bundlephobia/min/@vtils/date" alt="Size"> <img src="https://badgen.net/bundlephobia/minzip/@vtils/date" alt="Gzip Size"> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center">在 <a href="https://github.com/iamkun/dayjs">dayjs</a> 基础上封装的常用日期操作类库。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/date">https://fjc0k.github.io/vtils/date</a>
</p>

## 安装

```bash
# yarn
yarn add @vtils/date

# or, npm
npm i @vtils/date --save
```

你也可通过 CDN 安装，然后使用全局变量 `vd` 访问相关工具：

```html
<script src="https://cdn.jsdelivr.net/npm/@vtils/date@2.54.0/lib/index.umd.min.js" crossorigin="anonymous"></script>
```

<!-- TYPEDOC -->

## 目录
<!-- Main!目录 -->
👇 | 👇 | 👇 | 👇
--- | --- | --- | ---
[formatDate](#formatdate) | [numeralDayToChineseDay](#numeraldaytochineseday) | [toDayjs](#todayjs) | 
<!-- Maini目录 -->

## 列表
<!-- Main!内容 -->
#### formatDate

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/date/src/formatDate.ts#L15) | [API](https://fjc0k.github.io/vtils/date/globals.html#formatdate) | [回目录](#目录)</small>

格式化日期。

```ts
formatDate('2019-9-1', 'YYYY年M月D日') // => 2019年9月1日
```

#### numeralDayToChineseDay

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/date/src/numeralDayToChineseDay.ts#L25) | [API](https://fjc0k.github.io/vtils/date/globals.html#numeraldaytochineseday) | [回目录](#目录)</small>

数字星期转中文星期。`0` 和 `7` 都视为星期日。

```ts
numeralDayToChineseDay(0) // => 日
numeralDayToChineseDay(1) // => 一
numeralDayToChineseDay(5) // => 五
numeralDayToChineseDay(7) // => 日
```

#### toDayjs

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/date/src/toDayjs.ts#L21) | [API](https://fjc0k.github.io/vtils/date/globals.html#todayjs) | [回目录](#目录)</small>

转换输入的日期为 `Dayjs` 实例。

```ts
// 字符串
toDayjs('2019-9-1')
// Date 实例
toDayjs(new Date(2019, 8, 1))
// unix 时间戳
toDayjs(1569643555)
// Dayjs 实例
toDayjs(dayjs())
```
<!-- Maini内容 -->

## 许可

MIT ©️ Jay Fong
