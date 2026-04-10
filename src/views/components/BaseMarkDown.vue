<template>
  <div class="component-doc">
    <article class="component-doc__article">
      <div class="doc-content" v-html="docHtml" />

      <h2 id="demo-live">在线示例</h2>
      <p>
        以下为按需引入 <code>base-on-ui</code> 的 <strong>BaseMarkDown</strong> 演示：<code>#img</code> 覆盖图片、
        <code>x-md-slot</code> 与 <code>#chip</code> 内嵌组件位，以及粗体、删除线与行内公式。
      </p>

      <div class="component-doc__demo">
        <UiBaseMarkDown :content="demoMd" :allow-html="true">
          <template #chart="{ title, value }">
            <span class="demo-slot-chart">
              <el-tag>chart</el-tag>
              chart：{{ title }} — {{ value }}</span>
          </template>
          <template #note="{ text }">
            <span class="demo-slot-note">
              <el-tag >note</el-tag>
             note：{{ text }}</span>
          </template>
          <template #chip="{ label }">
            <span class="demo-slot-note">
              <el-tag >chip</el-tag>
             chip：{{ label }}</span>
          </template>
        </UiBaseMarkDown>
      </div>

      <h3 id="demo-code">示例代码</h3>
      <pre class="hljs doc-pre"><code>{{ demoSource }}</code></pre>
    </article>

    <aside class="component-doc__toc" aria-label="页面目录">
      <div class="component-doc__toc-head">
        <el-icon><Reading /></el-icon>
        <span>目录</span>
      </div>
      <nav class="component-doc__toc-nav">
        <a
          v-for="(item, idx) in toc"
          :key="item.id + '-' + idx"
          href="#"
          :class="['component-doc__toc-link', 'component-doc__toc-link--h' + item.level]"
          @click.prevent="scrollToSlug(item.id)"
        >
          {{ item.text }}
        </a>
      </nav>
    </aside>
  </div>
</template>

<script setup name="BaseMarkDownDoc">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'
import { BaseMarkDown as UiBaseMarkDown } from 'base-on-ui'
import 'base-on-ui/style.css'
import { renderDocMarkdown } from '@/utils/markdown'
import docSource from '@/ReadMe/base-markdown.md?raw'
import demoSource from '@/views/components/snippets/base-markdown-demo-source.txt?raw'

const route = useRoute()

const docHtml = ref('')
const toc = ref([])

const demoMd = ref(`
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题

---

## 文本格式
**粗体文本**
*斜体文本*
***粗斜体文本***
~~删除线~~
<u>下划线</u>
==高亮文本==
^上标^
~下标~

---

## 列表
### 无序列表
- 项目 1
- 项目 2
  - 子项目 2-1
  - 子项目 2-2

### 有序列表
1. 第一项
2. 第二项
3. 第三项
   1. 子项 3-1
   2. 子项 3-2

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务

---

## 引用
> 一级引用
>> 二级嵌套引用
>>> 三级嵌套引用

---

## 代码
### 行内代码
这是 \`行内代码\` 示例

### 代码块
\`\`\`python
def hello():
    print("Hello Markdown")
\`\`\`

\`\`\`javascript
console.log('Hello World')
\`\`\`

---

## 链接与图片
[链接文字](https://www.example.com "标题")

![图片描述](https://picsum.photos/200/100 "图片标题")

---

## 表格
| 左对齐 | 居中对齐 | 右对齐 |
|:-------|:--------:|-------:|
| 内容1   | 内容2    | 内容3  |
| 长文本测试 | 测试居中 | 测试右 |

---

## 分割线
---
***
___

---

## 数学公式
### 行内公式
$E=mc^2$

### 块级公式
$$
\\int_{-\\infty}^{+\\infty} e^{-x^2} dx = \\sqrt{\\pi}
$$

---

## 注释（隐藏内容）
<!-- 这是注释，不会显示 -->

---

## 脚注
文本内容带有脚注[^1]

[^1]: 这是脚注内容

---

## 自定义插槽（占位写法）
在正文中使用固定标签 **x-md-slot**，通过 **name**、**data-props** 与父组件具名插槽对应：

<x-md-slot name="chart" data-props='{"title":"销售额","value":"100"}' />

<x-md-slot name="note" data-props='{"text":"这是第二处插槽"}' />

<x-md-slot name="chip" data-props='{"label":"chip"}' />

---

## 目录
[TOC]

`)

function scrollToSlug(id) {
  if (!id) return
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (history.replaceState) {
    history.replaceState(null, '', `#${id}`)
  }
}

onMounted(() => {
  const r = renderDocMarkdown(docSource)
  docHtml.value = r.html
  toc.value = [
    ...r.toc,
    { id: 'demo-live', text: '在线示例', level: 2 },
    { id: 'demo-code', text: '示例代码', level: 3 },
  ]
  if (route.hash) {
    const id = decodeURIComponent(route.hash.slice(1))
    requestAnimationFrame(() => scrollToSlug(id))
  }
})
</script>

<style scoped lang="scss">
.component-doc {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 28px;
  align-items: start;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 960px) {
  .component-doc {
    grid-template-columns: 1fr;
  }

  .component-doc__toc {
    order: 2;
    position: static !important;
  }
}

.component-doc__article {
  min-width: 0;
}

.component-doc__demo {
  margin: 16px 0 24px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  background: #fafafa;
}

.base-markdown-doc__img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.component-doc__toc {
  position: sticky;
  top: 72px;
}

.component-doc__toc-head {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #909399;
  margin-bottom: 12px;

  .el-icon {
    font-size: 16px;
  }
}

.component-doc__toc-nav {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.component-doc__toc-link {
  font-size: 13px;
  line-height: 1.5;
  color: #606266;
  text-decoration: none;
  padding-left: 10px;
  border-left: 2px solid transparent;
  margin-left: -2px;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: #409eff;
  }

  &--h2 {
    font-weight: 500;
  }

  &--h3 {
    padding-left: 18px;
    font-size: 12px;
    color: #909399;
  }
}
</style>

<style scoped lang="scss">
.doc-content {
  font-size: 15px;
  line-height: 1.75;
  color: #303133;

  :deep(h2),
  :deep(h3) {
    scroll-margin-top: 72px;
    font-weight: 700;
    color: #303133;
  }

  :deep(h2) {
    margin: 36px 0 16px;
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;

    &:first-child {
      margin-top: 0;
    }
  }

  :deep(h3) {
    margin: 24px 0 12px;
    font-size: 16px;
  }

  :deep(p) {
    margin: 0 0 14px;
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;
  }

  :deep(th),
  :deep(td) {
    border: 1px solid #ebeef5;
    padding: 10px 14px;
    text-align: left;
  }

  :deep(th) {
    background: #f5f7fa;
    font-weight: 600;
    color: #606266;
  }

  :deep(ul),
  :deep(ol) {
    margin: 0 0 14px;
    padding-left: 1.4em;
  }

  :deep(li) {
    margin-bottom: 6px;
  }

  :deep(:not(pre) > code) {
    padding: 2px 6px;
    border-radius: 4px;
    background: #f0f2f5;
    font-size: 0.9em;
    font-family: ui-monospace, Menlo, monospace;
  }
}

.component-doc__article > h2,
.component-doc__article > h3,
.component-doc__article > p {
  scroll-margin-top: 72px;
}

.component-doc__article > h2 {
  margin: 28px 0 14px;
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.component-doc__article > h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.component-doc__article > p {
  font-size: 15px;
  line-height: 1.75;
  color: #303133;
  margin: 0 0 12px;
}

.doc-pre {
  margin: 16px 0;
  padding: 16px 18px;
  border-radius: 10px;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  border: 1px solid #ebeef5;
  background: #f6f8fa;
  white-space: pre-wrap;
  word-break: break-word;
}

.doc-pre code {
  font-family: ui-monospace, 'SF Mono', Menlo, Monaco, monospace;
  background: transparent !important;
  padding: 0 !important;
}
</style>
