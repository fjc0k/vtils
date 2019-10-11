<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/vtils"><img src="https://badge.fury.io/js/vtils.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/bundlephobia/min/vtils" alt="Size"> <img src="https://badgen.net/bundlephobia/minzip/vtils" alt="Gzip Size"> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center">小巧实用的 JavaScript 工具类库。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/">https://fjc0k.github.io/vtils/vtils</a>
</p>

## 特性

- 源于日常项目实践，更实用
- 使用 TypeScript 编写，类型友好
- 支持摇树优化(Tree Shaking)，只引入使用到的工具
- 浏览器、Node、小程序多端兼容

## 说明

`vtils` 自身并不包括一些已有成熟库的工具，如时间处理、网络请求等，在此做下推荐：

- 时间处理：[dayjs](https://github.com/iamkun/dayjs)
- 网络请求：[axios](https://github.com/axios/axios)、[taro-axios](https://github.com/fjc0k/taro-axios)

## 安装

```bash
# yarn
yarn add vtils

# or, npm
npm i vtils --save
```

你也可通过 CDN 安装，然后使用全局变量 `vtils` 访问相关工具：

```html
<script src="https://cdn.jsdelivr.net/npm/vtils@2.42.0/lib/index.umd.min.js" crossorigin="anonymous"></script>

<script>
  if (vtils.inBrowser()) {
    alert('您在浏览器中...')
  }
</script>
```

## 使用

在线体验：[https://stackblitz.com/edit/vtils](https://stackblitz.com/edit/vtils)

```js
import { inBrowser, shuffle } from 'vtils'

if (inBrowser()) {
  alert('您在浏览器中...')
}

alert(shuffle([1, 2, 3, 4, 5]))
```

