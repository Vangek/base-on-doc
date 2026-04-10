<template>
  <div ref="rootRef" class="base-md-editor">
    <div class="base-md-editor__body-wrap">
      <div class="base-md-editor__body" v-html="html" @click="onBodyClick" />
      <div v-if="loadingLine != null" class="base-md-editor__mask" aria-live="polite">
        <span class="base-md-editor__mask-text">AI 修改中…</span>
      </div>
    </div>
    <div v-if="selectedLine != null" class="base-md-editor__panel">
      <div class="base-md-editor__panel-row">
        <span class="base-md-editor__panel-label">修改要求（第 {{ selectedLine }} 行起）</span>
      </div>
      <div class="base-md-editor__panel-row">
        <el-input
          v-model="demand"
          type="textarea"
          :rows="2"
          placeholder="描述希望如何修改本段，回车或点击发送"
          resize="none"
          @keydown.enter.exact.prevent="submit"
        />
      </div>
      <div class="base-md-editor__panel-actions">
        <el-button type="primary" :icon="Promotion" :disabled="!demand.trim()" @click="submit">
          发送
        </el-button>
        <el-button text @click="clearSelection">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
import { nextTick, ref, watch } from 'vue'
import { Promotion } from '@element-plus/icons-vue'

const props = defineProps({
  content: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['submit-change'])

const rootRef = ref(null)
const html = ref('')
const selectedLine = ref(null)
const demand = ref('')
const loadingLine = ref(null)

const md = new MarkdownIt()

const defaultParagraphOpen =
  md.renderer.rules.paragraph_open ||
  function renderParagraphOpen(tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
  const token = tokens[idx]
  if (token.map && token.map.length >= 1) {
    const line = token.map[0] + 1
    token.attrSet('data-line', String(line))
  }
  return defaultParagraphOpen(tokens, idx, options, env, self)
}

function renderMarkdown(src) {
  html.value = md.render(src || '')
}

function syncParagraphActive() {
  nextTick(() => {
    const body = rootRef.value?.querySelector('.base-md-editor__body')
    if (!body) return
    const line = selectedLine.value
    body.querySelectorAll('p[data-line]').forEach((el) => {
      const n = Number(el.getAttribute('data-line'))
      el.classList.toggle('base-md-editor__p--active', line != null && n === line)
    })
  })
}

watch(
  () => props.content,
  (v) => {
    renderMarkdown(v)
    selectedLine.value = null
    demand.value = ''
    loadingLine.value = null
    syncParagraphActive()
  },
  { immediate: true }
)

watch(html, () => syncParagraphActive())
watch(selectedLine, () => syncParagraphActive())

function onBodyClick(e) {
  const p = e.target.closest('p[data-line]')
  const body = rootRef.value?.querySelector('.base-md-editor__body')
  if (!p || !body?.contains(p)) return
  const line = Number(p.getAttribute('data-line'))
  if (!Number.isFinite(line)) return
  if (selectedLine.value === line) {
    clearSelection()
  } else {
    selectedLine.value = line
    demand.value = ''
  }
}

function clearSelection() {
  selectedLine.value = null
  demand.value = ''
}

async function submit() {
  const text = demand.value.trim()
  if (!text || selectedLine.value == null) return
  const line = selectedLine.value
  loadingLine.value = line
  emit('submit-change', { demand: text, line })
}
</script>

<style scoped lang="scss">
.base-md-editor {
  position: relative;
  font-size: 15px;
  line-height: 1.75;
  color: #303133;
}

.base-md-editor__body-wrap {
  position: relative;
  min-height: 120px;
}

.base-md-editor__body {
  :deep(p) {
    margin: 0 0 12px;
    padding: 8px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.15s;

    &:last-child {
      margin-bottom: 0;
    }
  }

  :deep(p[data-line]:hover) {
    background: rgba(64, 158, 255, 0.06);
  }

  :deep(p.base-md-editor__p--active) {
    background: rgba(64, 158, 255, 0.12);
    box-shadow: inset 0 0 0 1px rgba(64, 158, 255, 0.35);
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4) {
    margin: 16px 0 10px;
    font-weight: 600;
  }

  :deep(ul),
  :deep(ol) {
    margin: 0 0 12px;
    padding-left: 1.4em;
  }

  :deep(blockquote) {
    margin: 0 0 12px;
    padding: 8px 12px;
    border-left: 4px solid #dcdfe6;
    color: #606266;
    background: #f5f7fa;
    border-radius: 0 6px 6px 0;
  }

  :deep(:not(pre) > code) {
    padding: 2px 6px;
    border-radius: 4px;
    background: #f0f2f5;
    font-size: 0.9em;
  }
}

.base-md-editor__mask {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.65);
  border-radius: 8px;
  z-index: 2;
}

.base-md-editor__mask-text {
  font-size: 14px;
  color: #409eff;
  font-weight: 500;
}

.base-md-editor__panel {
  margin-top: 16px;
  padding: 14px 16px;
  border: 1px solid #ebeef5;
  border-radius: 10px;
  background: #fff;
}

.base-md-editor__panel-row {
  margin-bottom: 10px;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.base-md-editor__panel-label {
  font-size: 13px;
  color: #606266;
}

.base-md-editor__panel-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}
</style>
