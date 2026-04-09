## 概述

**BasePagination** 是对 Element Plus `el-pagination` 的轻量封装，通常与 **BaseTable** 搭配使用：由父组件维护 `pagination`（当前页、每页条数）与 `total`，分页器变更时通过 **`handlePagination`** 回传新的分页参数，便于统一列表页的分页逻辑与样式。

## 安装与引入

```js
import { BasePagination } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- | :--- |
| `total` | `Number` | — | **必填**。数据总条数。 |
| `pagination` | `Object` | `{ pageNum: 1, pageSize: 10 }` | 分页状态，至少包含 `pageNum`、`pageSize`（与内部 `el-pagination` 的 `current-page` / `page-size` 对应）。 |
| `pageSizes` | `Array` | `[10, 20, 30, 50]` | 每页条数可选列表。 |
| `pagerCount` | `Number` | 窄屏为 `5`，否则 `7` | 分页器页码按钮数量（与 Element Plus 一致）。 |
| `layout` | `String` | `total, sizes, prev, pager, next, jumper` | 分页器布局字符串。 |
| `background` | `Boolean` | `true` | 是否为分页按钮添加背景色。 |
| `autoScroll` | `Boolean` | `true` | 与封装版本相关；若当前构建的模板未使用该字段，可忽略。 |
| `hidden` | `Boolean` | `false` | 为 `true` 时根节点增加隐藏样式类（用于不占位隐藏分页）。 |

## 事件

| 事件名 | 参数 | 说明 |
| :--- | :--- | :--- |
| `handlePagination` | `{ pageNum, pageSize }` | 当前页变化或每页条数变化时触发；父组件应据此更新 `pagination` 并重新请求列表。 |

## 使用说明

- 父组件需使用 **`v-model` 式同步**或事件内 **`Object.assign(pagination, next)`** 更新 `pagination`，保证 UI 与数据一致。
- **BaseTable** 内置分页时，同样通过 `handlePagination` 向外抛出，语义与本组件一致。
