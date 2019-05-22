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
import { inBrowser, isChinesePhoneNumber, shuffle } from 'vtils'

if (inBrowser()) {
  alert('您在浏览器中...')
}

alert(isChinesePhoneNumber('15974872222'))

alert(shuffle([1, 2, 3, 4]))
```

## 许可

MIT ©️ Jay Fong


