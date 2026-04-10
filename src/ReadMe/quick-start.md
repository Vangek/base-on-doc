
## 一、环境要求

| 工具 | 版本要求 | 说明 |
| :--- | :--- | :--- |
| Node.js | ≥ 18.x | 建议使用 LTS 版本 |
| Vue | ≥ 3.3.x | 组合式 API |
| npm / pnpm / yarn | 近期稳定版 | 任选其一 |

## 二、安装

<!--DOC_INSTALL_TABS-->

## 三、验证安装

1. 检查项目根目录 `package.json` 的 `dependencies` 是否包含 `base-on-ui`：

```json
{
  "dependencies": {
    "base-on-ui": "^0.0.1"
  }
}
```

---

## 安装与使用

> 注意：以下为 npm 包使用方式，本仓库本身是 `base-on-ui` 的源码，你可以将它作为依赖使用，也可以 fork 后在此基础上二次开发。

### 安装命令说明

除上方「二、安装」中的包管理器命令外，也可参考下文「全局注册」完成接入。

### 全局注册

在你的 Vue 3 项目入口（例如 `main.js`）中：

```js
import { createApp } from 'vue'
import App from './App.vue'

import BaseOnUI from 'base-on-ui'
import 'base-on-ui/style.css'

const app = createApp(App)

app.use(BaseOnUI)

app.mount('#app')
```

`src/index.js` 中导出了一个 `install` 方法，会：

- 批量注册所有组件（`BaseCronSelect`、`BaseDialog`、`BaseFormJson`、`BaseFormMini`、`BaseFilePreview`、`BaseIconSelect`、`BaseMdEditor`、`BasePagination`、`BaseSearch`、`BaseTable`、`BaseUpload`）
- 注册全局指令 `v-copy`

你也可以按需导入单个组件使用：

```js
import { BaseTable, BaseSearch, BaseMdEditor } from 'base-on-ui'
```

### BaseMdEditor 示例（段落级 AI 修改 Markdown）

适用于「点击某一段落 → 输入修改要求 → 父组件调大模型 → 回写全文 `content`」场景。事件 **`submit-change`** 载荷为 `{ demand, line }`，其中 **`line` 为源码行号且从 1 开始**；若用 `content.split('\n')` 得到数组，访问目标行请使用 **`lines[line - 1]`**。

```vue
<template>
  <BaseMdEditor :content="md" @submit-change="onSubmitChange" />
</template>

<script setup>
import { ref } from 'vue'
import { BaseMdEditor } from 'base-on-ui'
import 'base-on-ui/style.css'

const md = ref('# 标题\n\n第一段。\n\n第二段。')

async function onSubmitChange({ demand, line }) {
  const rows = md.value.split('\n')
  const i = line - 1
  if (i < 0 || i >= rows.length) return
  // const next = await fetchRevisedMarkdown(demand, line, rows[i])
  rows[i] = '> 已处理：' + demand
  md.value = rows.join('\n')
}
</script>
```

更完整的说明见文档站 **组件 → BaseMdEditor** 页面。

### BaseFilePreview 示例

```vue
<template>
  <BaseFilePreview
    src="https://example.com/files/demo.docx"
    suffix=".docx"
  />
</template>
```

若使用本地文件二进制，可传入 `file`（`File` / `Blob` / `ArrayBuffer`）并配合 `suffix`；组件会将二进制转为 `ArrayBuffer` 后交给 `@vue-office/*` 渲染。

---

## 典型使用示例（列表页）

下面是一个组合使用 `BaseSearch` + `BaseTable` + `BasePagination` 的典型列表页逻辑思路（仅作说明，非完整代码）：

```vue
<template>
  <BaseSearch
    :form="searchForm"
    :search-list="searchList"
    @handleSearch="handleSearch"
  />

  <BaseTable
    :table-header="tableHeader"
    :data-list="tableData"
    :pagination="pagination"
    :total="total"
    :loading="loading"
    :is-selection="true"
    :show-toolbar="true"
    @handleSelection="handleSelection"
    @handlePagination="handlePagination"
  />
</template>
```

---

## 项目结构简要说明

- **`src/index.js`**：组件库入口文件，导出 `install` 方法和各个组件的命名导出。
- **`src/components`**：所有业务组件的源码目录。
- **`src/directives/copy.js`**：全局复制指令实现。
- **`package.json`**
  - `name: "base-on-ui"`：npm 包名称。
  - `main / module / exports`：打包后 UMD / ES 模块入口以及样式导出。
  - `peerDependencies`：依赖的外部环境（如 `vue`、`element-plus` 等），在使用时需要由宿主项目自行安装。
  - `scripts`：`dev` 用于本地开发调试，`build` 使用 Vite 进行组件库打包。

---

## 开发指南

### 开发与构建

如果你克隆了本源码仓库，想要本地调试或修改：

```bash
# 安装依赖
npm install

# 本地开发（基于 Vite）
npm run dev

# 构建组件库
npm run build
```

构建后的产物会输出到 `dist` 目录，并通过 `package.json` 中的 `files` 字段（如 `dist` 和 `components`）对外发布到 npm。

---
