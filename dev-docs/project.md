### 项目结构梳理

#### 根目录结构
- **package.json**: 根项目配置，定义了工作区脚本（`dev` 启动文档网站，`build` 构建组件库）
- **pnpm-workspace.yaml**: 声明工作区，包含 `site` 和 `component` 两个子包
- **pnpm-lock.yaml**: pnpm 依赖锁定文件

#### component 目录（组件库）
- **技术栈**: TypeScript + React + SWR
- **主要文件**: 
  - `package.json`: 组件库配置，声明了 `@yixiaojiu/kasumi` 包
  - `tsconfig.*.json`: 多格式编译配置（CJS/ESM）
  - `src/components/`: 组件实现目录（如 `demo/index.tsx`）
  - `src/index.ts`: 组件库入口文件
- **功能**: 提供可复用的 React 组件（如 Demo 组件）

#### site 目录（文档网站）
- **技术栈**: Docusaurus + React
- **主要文件**: 
  - `docusaurus.config.ts`: Docusaurus 配置文件
  - `package.json`: 网站依赖配置
  - `docs/`: 文档内容目录（含教程和指南）
  - `src/pages/index.tsx`: 网站首页组件
  - `src/components/`: 页面组件目录
- **功能**: 展示组件库文档，通过 `@yixiaojiu/kasumi` 引用 component 包中的组件

#### 工作流关系
1. component 作为独立组件库开发
2. site 作为文档网站，依赖并演示 component 中的组件
3. 通过 pnpm workspace 管理跨包依赖