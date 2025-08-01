# 开始

## 介绍

Kasumi 是一个基于 React 的组件库，提供了一些展示组件，如游戏数据。

由于组件内部引入了 css 文件，使用这些组件需要你的项目的构建工具有处理 css 的能力。另外一些组件需要依赖接口数据，在每个组件的文档中会有说明。

## 安装

```bash
npm install @yixiaojiu/kasumi
# or
yarn add @yixiaojiu/kasumi
# pnpm
pnpm add @yixiaojiu/kasumi
```

也可以直接 copy 代码，展示组件大部分都是样式，没有复杂的交互逻辑，代码复杂度不高。

代码位置 [https://github.com/yixiaojiu/kasumi/tree/main/component/src/components](https://github.com/yixiaojiu/kasumi/tree/main/component/src/components)

### 后端

仓库：[yixiaojiu/Mahoutsukai](https://github.com/yixiaojiu/Mahoutsukai)，使用 Next.js 提供的能力，建议部署在 vercel 上。

## 使用

例如：

```ts
import { BangDream } from '@yixiaojiu/kasumi';

const App = () => {
  return <BangDream api="https://api.yixiaojiu.top/api/edge/bangdream/data" />;
};
```
