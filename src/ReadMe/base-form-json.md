## 概述

**BaseFormJson** 是一套基于 **JSON 配置** 的表单 / 配置编辑方案，入口组件在源码中通常对应 `index.vue`，与 **JsonItem**（按项渲染控件）、**TreeItem**（树形配置）、**StatsConfig**（选中项的属性编辑区）等子模块配合，适合 **配置面板、可视化表单设计器、复杂 JSON 编辑界面** 等场景。

npm 包对外导出 **`BaseFormJson`** 单组件；子模块随包内实现打包，具体文件划分以仓库源码为准（如 `menuList.js` 一类静态分组数据多在库内部维护）。

## 安装与引入

```js
import { BaseFormJson } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## 布局与能力

- **左侧**：组件/模块列表（可折叠分组），支持将条目 **拖拽** 到中间画布以扩展表单（内部会为克隆项生成唯一 `name` 等）。
- **中间**：根据 `config.formItems` 渲染 **`JsonItem`** 表单区域，与 `modelValue` 同步。
- **右侧**：选中画布中的表单项时，**`StatsConfig`** 展示该项的详细属性编辑（可通过 `hideConfig` 关闭）。

整体适合与后端约定 **JSON 协议**，实现「配置即页面」或可视化搭建。

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `modelValue` | `Object` | `{}` | 表单数据，支持 `v-model`（`update:modelValue`）。 |
| `config` | `Object` | `{}` | 表单配置，需包含 `formItems`；可含 `labelWidth`、`labelPosition` 等。 |
| `maxHeight` | `String` | `calc(100vh - 137px)` | 根容器最大高度。 |
| `custom` | `Array` | `[]` | 追加到左侧物料区的自定义组件列表；标题由 `customTitle` 指定。 |
| `customTitle` | `String` | `自定义组件` | 自定义分组在左侧折叠面板中的标题。 |
| `loading` | `Boolean` | `false` | 是否显示加载状态。 |
| `hideTool` | `Boolean` | `true` | 预留/内部用途（以具体版本为准）。 |
| `hideModule` | `Boolean` | `false` | 为 `true` 时**隐藏左侧**组件库区域。 |
| `hideConfig` | `Boolean` | `false` | 为 `true` 时**隐藏右侧**属性配置面板。 |
| `isView` | `Boolean` | `false` | 是否为只读查看模式。 |
| `hideBorder` | `Boolean` | `false` | 是否隐藏表单项边框类样式（传给 `JsonItem`）。 |
| `hideDefault` | `Boolean` | `false` | 为 `true` 时左侧**不展示**内置默认物料，仅保留 `custom` 自定义分组。 |

## `config` 与表单项

`config.formItems` 与 **BaseFormMini** 类似：每项需有 `name`、`component`、`label` 等；支持 `list` / `object` 等嵌套结构；`options` 内为各控件专属参数。组件类型未内置时，可通过 **`custom`** 与 **具名插槽**（插槽名为 `component` 字符串）扩展。

## 事件

| 事件名 | 说明 |
| :--- | :--- |
| `update:modelValue` | 表单数据变更时同步最新值。 |
| `update:config` | 监听 `config` 深度变化时向外同步（设计器场景下配置会被持续改写）。 |

## 方法（`ref`）

与 **BaseFormMini** 类似，常见能力包括：`validate`、`clearValidate`、`resetFields`、`scrollToField`（委托内部 `el-form`）。

## 宿主环境说明

实现中依赖 **`this.$i18n.locale`** 决定标签位置（英文环境强制 `top`）、**`this.$store.state.curIndex`**（点击画布逻辑）、**`this.$tool.getUUID`**（拖拽克隆生成字段名等）。业务工程需自行接入 **vue-i18n**、**Vuex/Pinia 兼容层** 与工具方法；**本文档站点在入口对以上能力做了最小占位注入，仅保证演示可运行**，正式项目请按自身架构接入。
