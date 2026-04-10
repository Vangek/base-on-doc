## 概述

**BaseMarkDown** 是纯展示用的 Markdown 渲染组件，通过 **`markdown` 或 `content`** 传入 Markdown 字符串即可输出 HTML（内部使用 `v-html`）。

### 能力概览

- **HTML 开关**：通过 **`allowHtml`** 控制是否解析源码中的 HTML（默认 `true`；不可信内容建议设为 `false`）。
- **CommonMark / 扩展 HTML**：在 `allowHtml` 为 `true` 时，支持如 `<u>` 等行内 HTML。
- **GFM 类**：表格（`markdown-it-multimd-table`）、`~~删除线~~`、任务列表 `- [ ]`、自动链接（`linkify`）。
- **脚注**：`[^1]` 与文末 `[^1]: 说明`（`markdown-it-footnote`）。
- **高亮 / 上下标 / 下划线**：`==高亮==`、`H~2~O`、`x^2^`、`++下划线++`（`markdown-it-mark` / `sub` / `sup` / `ins`）。
- **数学公式**：`$...$` 与 `$$...$$`（`markdown-it-texmath` + **KaTeX**），已引入 KaTeX 与 texmath 的样式。
- **目录**：支持将正文中的 **`[TOC]`**（不区分大小写、独占一行）自动替换为插件默认占位 **`[[toc]]`** 后生成目录（`markdown-it-toc-done-right`）。

### 自定义插槽（正文内嵌组件位）

Markdown **字符串里不能写 Vue 的 `:prop` 绑定**（不会参与编译）。若使用 **data-props 占位写法**，正文里请使用固定标签 **`x-md-slot`**：

```html
<x-md-slot name="chart" data-props='{"title":"标题","value":42}' />
```

或成对空标签：

```html
<x-md-slot name="chart" data-props='{"title":"标题"}'></x-md-slot>
```

- **`name`**：与父组件具名插槽 `#chart` 对应。
- **`data-props`**（或 **`props`**）：**JSON 字符串**（建议整体用单引号包属性，JSON 内用双引号）。

父组件写法示例：

```vue
<BaseMarkDown :content="md">
  <template #chart="{ title, value }">
    <span>{{ title }} — {{ value }}</span>
  </template>
</BaseMarkDown>
```

占位在 **`md.render` 之前**替换为 HTML 注释，**不依赖** `allowHtml` 才能识别标签（仍建议不可信内容关闭 HTML）。

**多个插槽**：同一篇正文里可写 **多个** `<x-md-slot ... />`，`name` 与父组件 `#name` 对应，顺序与正文一致。

### Props

| 属性 | 类型 | 默认 | 说明 |
| :--- | :--- | :--- | :--- |
| `markdown` | `String` | `''` | Markdown 源码；非空时优先于 `content` |
| `content` | `String` | `''` | Markdown 源码（与 `markdown` 二选一；二者都写时优先取非空的 `markdown`，否则用 `content`） |
| `allowHtml` | `Boolean` | `true` | 为 `true` 时按 HTML 渲染源码中的标签（与 `markdown-it` 的 `html` 一致）；为 `false` 时标签会被转义，更适合不可信内容 |

### 依赖说明

- **Markdown 渲染栈**（`markdown-it`、常用插件、KaTeX 等）已 **随 `base-on-ui` 构建进 `dist`**，业务项目 **无需再单独安装** 这些包。
- 本地开发本仓库请先执行 **`npm install`**（插件在 **devDependencies** 中，仅用于打包）。

### 使用示例

```vue
<template>
  <BaseMarkDown :content="md" />
</template>

<script setup>
import { ref } from 'vue'

const md = ref(`# 标题\n\n**粗体** 与 ~~删除线~~\n`)
</script>
```

### 安全

`content` 若来自用户输入，可设置 **`allow-html="false"`**（或 `:allow-html="false"`）避免内嵌 HTML 被执行；仍需注意链接、图片等带来的风险。
