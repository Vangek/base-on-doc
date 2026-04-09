## 概述

**BaseSearch** 是面向列表页的**配置化搜索条**：通过 `searchList` 描述每一项的控件类型、标签与字段名，内部维护查询对象；点击「搜索」时**过滤空值**后通过 `handleSearch` 抛出；「重置」会清空内部查询并向外传递 `null`。

## 安装与引入

```js
import { BaseSearch } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `form` | `Object` | `{}` | 初始查询参数，会**合并**进内部 `queryParams`（深度监听）。 |
| `labelWidth` | `String` | `'105px'` | 表单项标签宽度（传给 `el-form`）。 |
| `searchList` | `Array` | `[]` | 搜索项配置列表，见下表。 |

### `searchList` 每一项

| 字段 | 说明 |
| :--- | :--- |
| `type` | 控件类型：内置 `input`、`select`、`rangeDate`、`rangeDateTime`、`treeSelect`；其它字符串可作为**具名插槽**名自定义（插槽参数：`row` 为当前项配置，`formCur` 为传入的 `form`）。 |
| `label` | 标签文案。 |
| `prop` | 对应查询对象中的字段名。 |
| `options` | `type === 'select'` 时传给内部 `el-select` 的选项相关配置（以当前 `base-on-ui` 版本实现为准）。 |
| `data` / `props` / `checkStrictly` | `type === 'treeSelect'` 时分别对应树数据、`el-tree-select` 的 `props`、是否严格可选中等。 |

### 内置类型行为摘要

- **input**：单行输入，占位「请输入」，可清空。  
- **select**：下拉选择（具体 `options` 结构以组件实现为准）。  
- **rangeDate**：日期范围，`value-format` 为 `YYYY-MM-DD`。  
- **rangeDateTime**：日期时间范围，`value-format` 为 `YYYY-MM-DD HH:mm:ss`。  
- **treeSelect**：树形选择，需配置 `data` 与 `props` 等。

## 展开 / 收起

当 `searchList.length > 4` 时，默认只展示**前 4 项**，可通过「展开 / 收起」切换是否展示全部。

## 事件

| 事件名 | 说明 |
| :--- | :--- |
| `handleSearch` | 点击「搜索」时触发，参数为**过滤后**的查询对象：去掉 `''`、`null`、`undefined`；数组类型需长度大于 0 且首元素非空。点击「重置」时参数为 **`null`**，表示清空条件。 |
