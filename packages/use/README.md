<p align="center"><img width="200" src="https://raw.githubusercontent.com/fjc0k/vtils/master/logo.png" alt="logo"></p>

<p align="center"><a href="https://www.npmjs.com/package/@vtils/use"><img src="https://badge.fury.io/js/%40vtils%2Fuse.svg" alt="NPM Version"></a> <a href="https://travis-ci.org/fjc0k/vtils"><img src="https://travis-ci.org/fjc0k/vtils.svg?branch=master" alt="Build Status"></a> <a href="https://codecov.io/gh/fjc0k/vtils"><img src="https://codecov.io/gh/fjc0k/vtils/branch/master/graph/badge.svg" alt="Coverage Status"></a> <img src="https://badgen.net/bundlephobia/min/@vtils/use" alt="Size"> <img src="https://badgen.net/bundlephobia/minzip/@vtils/use" alt="Gzip Size"> <img src="https://badgen.net/github/license/fjc0k/vtils" alt="License"></p>

<h2 align="center"><a href="https://github.com/fjc0k/vtils/tree/master/packages/vtils">vtils</a> 的 React Hooks 封装。</h2>

<p align="center">
  <a href="https://fjc0k.github.io/vtils/">https://fjc0k.github.io/vtils/use</a>
</p>

## 安装

```bash
# yarn
yarn add @vtils/use

# or, npm
npm i @vtils/use --save
```

你也可通过 CDN 安装，然后使用全局变量 `vhooks` 访问相关工具：

```html
<script src="https://cdn.jsdelivr.net/npm/@vtils/use@2.29.1/lib/index.umd.min.js" crossorigin="anonymous"></script>
```

<!-- TYPEDOC -->

## 目录
<!-- Hooks!目录 -->
👇 | 👇 | 👇 | 👇
--- | --- | --- | ---
[useEasyValidator](#useeasyvalidator) | [useLiveEasyValidator](#useliveeasyvalidator) |  | 
<!-- Hooksi目录 -->

## 列表

<!-- Hooks!内容 -->
#### useEasyValidator

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/use/src/useEasyValidator.ts#L50) | [API](https://fjc0k.github.io/vtils/use/globals.html#useeasyvalidator) | [回目录](#目录)</small>

数据校验器。

```ts
const [name, setName] = useState('')
const [pass, setPass] = useState('')
const ev = useEasyValidator({ name, pass }, [
  {
    key: 'name',
    required: true,
    message: '姓名不能为空',
  },
  {
    key: 'pass',
    test: data => data.pass.length >= 6,
    message: '密码至少应为6位',
  },
])
const handleRegisterClick = useCallback(() => {
  ev.validate().then(res => {
    if (res.valid) {
      console.log(res.data)
    } else {
      console.log(res.unvalidRules[0].message)
    }
  })
}, [])
```

#### useLiveEasyValidator

<small>[源码](https://github.com/fjc0k/vtils/blob/master/packages/use/src/useLiveEasyValidator.ts#L34) | [API](https://fjc0k.github.io/vtils/use/globals.html#useliveeasyvalidator) | [回目录](#目录)</small>

实时数据校验器。

```ts
const [name, setName] = useState('')
const [pass, setPass] = useState('')
const evResult = useLiveEasyValidator({ name, pass }, [
  {
    key: 'name',
    required: true,
    message: '姓名不能为空',
  },
  {
    key: 'pass',
    test: data => data.pass.length >= 6,
    message: '密码至少应为6位',
  },
])
const button = (
  <Button disabled={!evResult.valid}>
    提交
  </Button>
)
```
<!-- Hooksi内容 -->

## 许可

MIT ©️ Jay Fong
