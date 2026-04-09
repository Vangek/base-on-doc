## 概述

**BaseCronSelect** 是 Cron 表达式可视化选择组件：在输入框旁通过「选择」打开弹层，按 **秒、分、时、日、月、周** 等维度配置（实现以源码为准），生成标准 **6 段** Cron 字符串（空格分隔），适合定时任务、调度、周期同步等场景。

## 安装与引入

```js
import { BaseCronSelect } from 'base-on-ui'
import 'base-on-ui/style.css'
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
| :--- | :--- | :--- |
| `modelValue` | `String` | `''` | 当前 Cron 表达式，支持 `v-model`（`update:modelValue`）。 |
| `disabled` | `Boolean` | `false` | 是否禁用。 |

## 事件

| 事件名 | 说明 |
| :--- | :--- |
| `update:modelValue` | 表达式变化时同步最新字符串。 |
| `change` | 用户确认或表达式变更时触发（与内部 `update:modelValue` 配套使用）。 |

## 使用说明

- 组件将 Cron 按空格拆分为 6 段进行编辑；弹层内可选择「每天 / 每月 / 每周」等模式，并配置具体时间、日期、星期等。
- 与后端定时框架对接时，请确认对方支持的 Cron 段数与字段含义（部分系统为 5 段）。
