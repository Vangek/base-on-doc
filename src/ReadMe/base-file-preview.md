## 概述

**BaseFilePreview** 基于 `@vue-office/docx`、`@vue-office/excel`、`@vue-office/pdf` 封装，用于在页面内预览 **Word（doc/docx）**、**Excel（xls/xlsx）**、**PDF**。支持远程 URL 与本地二进制（`File` / `Blob` / `ArrayBuffer`），并可通过 `suffix`、`mimeType` 辅助识别类型。

> **说明**：`base-on-ui` **≥ 0.0.6** 已在入口导出 `BaseFilePreview`，并与上述 `@vue-office/*` 依赖一并提供。

## 安装与引入

```js
import { BaseFilePreview } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 说明 |
| :--- | :--- | :--- |
| `src` | `String` \| `ArrayBuffer` \| `Blob` | 远程地址字符串，或二进制内容（与 `file` 二选一或按实现优先级）。 |
| `file` | `File` \| `Blob` \| `ArrayBuffer` | 原始文件；通常优先级高于 `src`。 |
| `suffix` | `String` | 后缀名，如 `pdf`、`.docx`、`xlsx`，用于类型识别。 |
| `mimeType` | `String` | MIME 类型；在后缀不足时辅助识别。 |
| `docxOptions` | `Object` | Word 预览选项（透传 vue-office docx）。 |
| `excelOptions` | `Object` | Excel 预览选项。 |
| `pdfOptions` | `Object` | PDF 预览选项。 |
| `requestOptions` | `Object` | 拉取远程文件时的请求配置（如鉴权 `headers`）。 |
| `staticFileUrl` | `String` | `@vue-office/pdf` 所需静态资源路径等配置（以实际封装为准）。 |

## 事件

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `rendered` | — | 文档渲染完成。 |
| `error` | `err` | 渲染失败，返回错误对象。 |

完整用法见页面 **在线示例**，可复制代码见文末 **远程 URL 示例**、**本地二进制示例** 两个代码块。

## 使用注意

- 跨域远程地址需服务端允许 CORS；需要鉴权时配置 `requestOptions`。
- PDF 场景若需 worker 静态资源，按组件库说明配置 `staticFileUrl` 等字段。
