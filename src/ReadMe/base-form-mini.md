## 概述

**BaseFormMini** 是基于配置驱动的通用表单引擎：通过 `config.formItems` 描述每一项，由组件按 `component` 类型渲染对应控件，并与 `modelValue` 双向同步（`update:modelValue`）。支持只读查看、分组锚点导航、嵌套结构（`list` / `object`）及动态显隐（`hideHandle`）。

## 安装与引入

```js
import { BaseFormMini } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `modelValue` | `Object` | `{}` | 表单数据，支持 `v-model`（`update:modelValue`）。 |
| `config` | `Object` | `{}` | 表单配置，至少包含 `formItems`；可含 `labelWidth`、`labelPosition`、`size` 等。 |
| `loading` | `Boolean` | `false` | 是否显示加载状态。 |
| `isView` | `Boolean` | `false` | 是否为只读查看模式（禁用编辑、只读展示）。 |
| `showMenu` | `Boolean` | `false` | 是否显示顶部分组锚点；锚点项来自 `component === 'divider'` 的表单项的 `label`。 |

### `config` 常用字段

| 字段 | 说明 |
| :--- | :--- |
| `formItems` | 表单项数组，每一项须包含 `name`（字段名）、`component`、`label` 等。 |
| `labelWidth` | 标签宽度，如 `'100px'`。 |
| `labelPosition` | `left` / `right` / `top`。 |
| `size` | 表单尺寸，如 `default`（会传给 `el-form`）。 |

### 表单项（`formItems` 每一项）常用字段

| 字段 | 说明 |
| :--- | :--- |
| `span` | 栅格占位 1–24。 |
| `component` | 控件类型，见下文「支持的 `component`」。未内置的类型名将作为**具名插槽**名由父组件自定义。 |
| `name` | 字段名；支持点号扁平字段（如 `a.b`），内部会解析为嵌套对象。 |
| `label` | 标签文案。 |
| `message` | 辅助说明文案（展示在表单项下方等，视具体控件而定）。 |
| `value` | 默认值（初始化合并进表单）。 |
| `options` | 各类型专属配置：`placeholder`、`disabled`、`maxlength`、`items`（选项列表）等。 |
| `rules` | Element Plus 表单校验规则。 |
| `hideHandle` | 动态隐藏：为 `Boolean` 时直接作为是否隐藏；为**字符串**时按表达式计算（将字符串中的 `$` 替换为 `form` 后求值，例如 `` `$.type === '2'` `` 等价于判断 `form.type === '2'`）；表达式为真时**隐藏**该项。 |

## 支持的 `component` 类型（节选）

内置包括但不限于：`input`（多行可在 `options.type` 为 `textarea`）、`number`、`select`、`radio`、`checkbox` / `checkboxGroup`、`switch`、`color`、`rate`、`slider`、`tags`、`date`、`cascader`、`treeSelect`、`upload`、`divider`（分组标题，常与 `showMenu` 配合）、`list`、`object` 等。

未出现在内置列表中的 `component` 字符串会作为**具名插槽**名称，插槽作用域通常包含 `itemCur`（当前项配置）、`formCur`（当前表单数据对象）。

## 事件

| 事件名 | 说明 |
| :--- | :--- |
| `update:modelValue` | 表单值变化时触发，参数为合并、解析后的表单对象。 |
| `update:config` | 配置对象在内部处理过程中被更新时触发（深度监听 `config`）。 |
| `submit` | 点击内置「提交」按钮时触发，参数为当前 `form`；也可通过 `ref.submit()` 主动触发。 |

## 方法（`ref`）

| 方法 | 说明 |
| :--- | :--- |
| `validate(callback)` | 同 `el-form.validate`。 |
| `clearValidate()` | 清除校验状态。 |
| `resetFields()` | 重置表单字段。 |
| `scrollToField(prop)` | 滚动到指定字段。 |
| `submit()` | 触发 `submit` 事件并传入当前表单数据。 |

## 能力说明

- **初始化**：根据 `formItems` 与 `modelValue` 合并生成内部 `form` 并向外同步。
- **嵌套字段**：点号字段会展开为嵌套对象；`list`、`object` 类型用于更复杂的结构。
- **锚点导航**：`showMenu: true` 且存在 `divider` 项时，顶部出现锚点，点击平滑滚动；滚动区域内通过监听高亮当前分组。
- **动态隐藏**：见上表 `hideHandle`。
