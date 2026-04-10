## 概述

**BaseMdEditor** 面向「段落级 AI 辅助修改」场景：将 `content`（Markdown）渲染为 HTML，用户点击某一 **段落 `<p>`** 后可输入修改要求，通过 `submit-change` 交给父组件（例如调用大模型）；父组件更新全文 `content` 后，子组件会重新渲染并结束加载态。

## 从 base-on-ui 引入

确保 `package.json` 中已安装包含 **BaseMdEditor** 导出的 `base-on-ui` 版本（具体版本以 npm 发布说明为准）。

```bash
npm install base-on-ui
```

```js
import { BaseMdEditor } from 'base-on-ui'
import 'base-on-ui/style.css'
```

全局注册时，随 `app.use(BaseOnUI)` 一并注册；或仅按需使用上述命名导出即可。

## 依赖

- **markdown-it**（由 `base-on-ui` 内部使用）：Markdown → HTML。
- **@element-plus/icons-vue**（由组件内使用）：发送等按钮图标。

## 主要功能

- 使用 **markdown-it** 将 `content` 渲染为正文（`v-html`）。
- 为每个段落 `<p>` 注入 **`data-line`**（源码起始行号，**从 1 开始**），便于按行定位。
- 点击段落：选中 / 再次点击取消；选中时在下方展示 **修改要求** 输入区，回车或点击发送提交。
- 提交后该段进入 **加载态**（「AI 修改中…」），并触发 **`submit-change`**。
- **`content` 变化**时清空加载态与内部选中状态（与父组件回写配合）。

## Props

| 属性 | 类型 | 说明 |
| :--- | :--- | :--- |
| `content` | `String` | Markdown 源码；空则按空字符串处理。 |

## 事件

| 事件名 | 载荷 | 说明 |
| :--- | :--- | :--- |
| `submit-change` | `{ demand: string, line: number }` | `demand` 为用户输入的修改要求；`line` 为该段落在 **Markdown 源码中的起始行号（1-based）**，与 DOM 上 `data-line` 一致。 |

## 重要：`line` 与 `content.split('\n')`

- 事件里的 **`line` 从 1 开始**，表示「第几行」。
- `const lines = content.split('\n')` 得到的是 **0-based 下标** 的数组，访问「第 `line` 行」应使用：

```js
const idx = line - 1
if (idx < 0 || idx >= lines.length) return
const targetRawText = lines[idx]
```

- **`line` 是段落起始行**。若某段落在源码里跨多行，只改 `lines[idx]` 一行往往不够，需要由 AI 返回**整篇 Markdown**、或返回替换片段后自行拼回；业务上也可只把「当前段落原文 + demand」交给模型，再整体替换 `content`。

## 与 AI 协作的典型流程

1. 监听 `submit-change`，拿到 `{ demand, line }`。
2. 用 `lines = content.split('\n')`、`idx = line - 1` 取当前行（或根据段落范围截取多行）作为上下文。
3. 调用大模型接口，传入 `demand`、节选原文、全文等（按产品约定）。
4. 用接口返回的字符串 **整体赋值** `content.value = newMarkdown`（或按行拼接后再 `join('\n')`）。
5. 子组件随 `content` 更新而重绘，**加载态结束**。


## 与父组件协作

1. 用户在某段提交后，该段进入加载展示。
2. **父组件在接口返回后更新 `content`**，子组件随新 Markdown 重渲染并清理加载。
3. 失败重试、取消加载等由父组件控制 `content` 或与业务状态配合。


## 注意事项

- 正文经 `v-html` 输出，请确保 **`content` 来源可信**，防范 XSS。
- 段落级交互仅针对渲染结果中的 **`<p>`**；标题、列表项等不走与正文段落相同的编辑面板逻辑（以实际实现为准）。
