## 概述

**BaseTable** 是对 Element Plus `el-table` 的业务封装，用于快速搭建带分页、多选列和列显隐控制的通用数据表格。通常与 **BasePagination**（已内置组合）及业务侧的查询组件（如 **BaseSearch**）一起使用。

## 安装与引入

在已安装 `element-plus` 与 `base-on-ui` 的项目中，可全局注册或按需引入：

```js
import { BaseTable } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `tableHeader` | `Array` | `[]` | 表头配置数组，每一项描述一列，字段见下表「列配置项」。 |
| `dataList` | `Array` | `[]` | 表格行数据，与 `el-table` 的 `data` 一致。 |
| `pagination` | `Object` | — | 分页参数，常见字段：`pageNum`（当前页）、`pageSize`（每页条数）。变化通过 `handlePagination` 向父组件回传。 |
| `total` | `Number` | `0` | 数据总条数，用于底部分页展示。 |
| `loading` | `Boolean` | `false` | 是否显示加载状态。 |
| `isSelection` | `Boolean` | `false` | 是否展示左侧多选列；勾选变化触发 `handleSelection`。 |
| `showToolbar` | `Boolean` | `false` | 是否展示右侧 **RightToolbar**（列显示/隐藏等）。 |

## 列配置项（tableHeader）

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `prop` | `String` | 对应行数据字段名，与 Element Plus 表格列一致。 |
| `label` | `String` | 列标题文案。 |
| `align` | `String` | 对齐方式，如 `left` / `center` / `right`。 |
| `width` | `String` / `Number` | 列宽。 |
| `minWidth` | `String` / `Number` | 最小列宽（若所用 `base-on-ui` 版本在内部透传给 `el-table-column` 则生效）。 |
| `fixed` | `String` / `Boolean` | 固定列，如 `left`、`right`。 |
| `showOverflowTooltip` | `Boolean` | 是否对过长内容使用 `tooltip` 展示。 |
| `formatter` | `Function` | 单元格格式化函数，签名与 `el-table-column` 的 `formatter` 一致：`(row, column, cellValue, index) => string`。 |
| `slotName` | `String` | 自定义列插槽名；配置后父组件可通过同名具名插槽渲染单元格内容。 |

## 事件

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `handleSelection` | `selection: Array` | 多选列勾选变化时触发，返回当前已选中的行对象数组。 |
| `handlePagination` | `pagination: Object` | 分页变化时触发，返回新的分页对象（如含 `pageNum`、`pageSize`），由父组件更新请求参数并重新拉数。 |

## 插槽

当某一列在 `tableHeader` 中配置了 `slotName` 时，在 **BaseTable** 上使用 **`#slotName`** 传入自定义单元格内容（具体作用域参数以组件实现为准，常见为当前行 `row` 等）。

## 使用要点

- **分页**：父组件维护 `pagination`、`total` 与 `dataList`；用户翻页或改每页条数时在 `handlePagination` 里合并参数并请求列表接口。
- **多选**：仅当 `isSelection` 为 `true` 时展示多选列；列表操作（批量删除等）在 `handleSelection` 中处理 `selection`。
- **列显隐**：`showToolbar` 为 `true` 时可通过工具栏动态控制列显示，适合字段较多的列表。
