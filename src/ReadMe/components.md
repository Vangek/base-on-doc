
- **BaseTable**
  - 基于 `el-table` 的二次封装，支持：
  - 可配置列信息（`tableHeader`），支持对齐方式、宽度、formatter、自定义插槽等
  - 可选多选列（`isSelection`）
  - 与 `BasePagination` 组合使用，内置分页事件回调
  - 可选右侧列显隐工具栏（`RightToolbar`，通过 `showToolbar` 控制）

- **BaseSearch**
  - 配置化搜索表单组件，支持：
  - 通过 `searchList` 配置每一项的 `type`、`label`、`prop` 等
  - 内置 `input / select / rangeDate / rangeDateTime / treeSelect` 等常用类型
  - 超过 4 项时支持「展开/收起」
  - 点击「搜索」时会过滤空值，只将有意义的查询条件通过 `handleSearch` 事件回传
  - 支持「重置」功能

- **BaseFormMini**
  - 通过 `config.formItems` 配置项驱动的「迷你表单引擎」，支持：
  - 各种常见组件类型：`input / textarea / select / cascader / date / number / radio / checkbox / switch / color / rate / slider / tags / divider / upload / list / object` 等
  - 支持查看模式（`isView`）、编辑模式切换
  - 支持「分组锚点导航」（`showMenu`），自动高亮当前分组
  - 支持复杂嵌套结构（`list`、`object`），并提供字段打平 + 还原能力
  - 对 `checkbox / upload` 等特殊类型做了单独的值解析处理

- **BaseFormJson**
  - 基于 JSON 配置渲染表单 / 配置界面的组件集合：
  - `JsonItem`、`TreeItem`、`StatsConfig` 等子组件
  - 可用于构建可视化表单配置器或复杂 JSON 配置编辑界面

- **BasePagination**
  - 基于 Element Plus 分页器的封装：
  - 通过 `pagination`（如 `pageNum`、`pageSize`）与 `total` 控制分页
  - 通过 `handlePagination` 事件向外抛出分页变化

- **BaseFilePreview**
  - 基于 `@vue-office/docx`、`@vue-office/excel`、`@vue-office/pdf` 的文件预览组件
  - 支持 **Word（doc/docx）**、**Excel（xls/xlsx）**、**PDF**，可传入远程 `url` 或本地二进制（`File` / `Blob` / `ArrayBuffer`），并通过 `suffix` 或 `mimeType` 指定类型
  - 依赖已随 `base-on-ui` 一起打包，业务项目 **无需再单独安装 vue-office**


- **BaseCronSelect**
  - Cron 表达式选择组件：
  - 适用于定时任务、调度策略等场景