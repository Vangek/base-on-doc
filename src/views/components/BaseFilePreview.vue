<template>
  <div class="component-doc">
    <article class="component-doc__article">
      <div class="doc-content" v-html="docHtml" />

      <h2 id="demo-live">在线示例</h2>
      <p class="component-doc__lead">
        上传一个文件，<strong>BaseFilePreview</strong> 会自动预览。
      </p>

      <div class="component-doc__demo component-doc__demo--preview">
        <section class="preview-section">
          <h3 class="preview-section__title">本地文件</h3>
          <input
            ref="fileInputRef"
            type="file"
            class="preview-section__file-input"
            accept=".pdf,.doc,.docx,.xls,.xlsx,application/pdf"
            @change="onLocalFile"
          />
          <el-button type="primary" plain @click="triggerPick">选择本地文件</el-button>
          <el-button v-if="localFile" text type="danger" @click="clearLocal">清除</el-button>
          <div v-if="localFile" class="preview-section__frame preview-section__frame--local">
            <UiBaseFilePreview
              :file="localFile"
              :suffix="localSuffix"
              @rendered="() => onPreviewEvent('local', 'rendered')"
              @error="(err) => onPreviewEvent('local', 'error', err)"
            />
          </div>
          <p v-else class="preview-section__placeholder">未选择文件时仅展示上方远程示例。</p>
        </section>

        <p class="component-doc__hint">
          事件日志：<code>{{ eventLog }}</code>
        </p>
      </div>

      <h2 id="snippet-remote">远程 URL 示例（可复制）</h2>
      <pre class="hljs doc-pre"><code>{{ demoRemote }}</code></pre>

      <h2 id="snippet-binary">本地二进制示例（可复制）</h2>
      <pre class="hljs doc-pre"><code>{{ demoBinary }}</code></pre>
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

<script setup name="BaseFilePreviewDoc">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'
import { BaseFilePreview as UiBaseFilePreview } from 'base-on-ui'
import 'base-on-ui/style.css'
import { renderDocMarkdown } from '@/utils/markdown'
import docSource from '@/ReadMe/base-file-preview.md?raw'
import demoRemote from '@/views/components/snippets/base-file-preview-demo-remote.txt?raw'
import demoBinary from '@/views/components/snippets/base-file-preview-demo-binary.txt?raw'

const route = useRoute()

const docHtml = ref('')
const toc = ref([])
const fileInputRef = ref(null)

/** W3C 提供的可公开访问的测试用 PDF，一般支持跨域拉取 */
const demoPdfUrl = 'https://raw.githubusercontent.com/h0077896/vue-office/main/examples/public/test.pdf'

const localFile = ref(null)
const localSuffix = computed(() => {
  const f = localFile.value
  if (!f || !f.name) return ''
  const parts = f.name.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
})

const eventLog = ref('（尚无事件）')

function onPreviewEvent(scope, type, err) {
  if (type === 'rendered') {
    eventLog.value = `[${scope}] rendered`
    return
  }
  eventLog.value = `[${scope}] error: ${err?.message ?? String(err)}`
}

function triggerPick() {
  fileInputRef.value?.click()
}

function onLocalFile(e) {
  const f = e.target?.files?.[0]
  localFile.value = f || null
  eventLog.value = f ? '已选择本地文件，等待渲染…' : '（已清除）'
}

function clearLocal() {
  localFile.value = null
  if (fileInputRef.value) fileInputRef.value.value = ''
  eventLog.value = '（已清除本地文件）'
}

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
    { id: 'snippet-remote', text: '远程 URL 示例（可复制）', level: 2 },
    { id: 'snippet-binary', text: '本地二进制示例（可复制）', level: 2 },
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

.component-doc__lead {
  font-size: 15px;
  line-height: 1.75;
  color: #606266;
  margin: 0 0 16px;
}

.component-doc__demo--preview {
  padding: 16px;
}

.preview-section {
  margin-bottom: 24px;

  &:last-of-type {
    margin-bottom: 12px;
  }
}

.preview-section__title {
  margin: 0 0 8px;
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.preview-section__meta {
  margin: 0 0 10px;
  font-size: 12px;
  word-break: break-all;
  color: #909399;
}

.preview-section__file-input {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  pointer-events: none;
}

.preview-section__frame {
  min-height: 360px;
  max-height: 560px;
  overflow: auto;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  background: #fff;
}

.preview-section__frame--local {
  margin-top: 12px;
}

.preview-section__placeholder {
  margin: 10px 0 0;
  font-size: 13px;
  color: #909399;
}

.component-doc__hint {
  margin: 8px 0 0;
  font-size: 13px;
  color: #606266;

  code {
    font-size: 12px;
    word-break: break-all;
  }
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

  :deep(blockquote) {
    margin: 16px 0;
    padding: 12px 16px;
    border-left: 4px solid #dcdfe6;
    background: #f5f7fa;
    color: #606266;
    border-radius: 0 8px 8px 0;
  }

  :deep(:not(pre) > code) {
    padding: 2px 6px;
    border-radius: 4px;
    background: #f0f2f5;
    font-size: 0.9em;
    font-family: ui-monospace, Menlo, monospace;
  }
}

.component-doc__article > h2 {
  scroll-margin-top: 72px;
  margin: 28px 0 14px;
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.component-doc__article > h3 {
  scroll-margin-top: 72px;
}

.doc-pre {
  margin: 16px 0 24px;
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

.component-doc__demo {
  margin: 16px 0 24px;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  background: #fafafa;
}
</style>
