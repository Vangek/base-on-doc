<template>
  <div class="install-tabs">
    <el-tabs v-model="active" class="install-tabs__el">
      <el-tab-pane v-for="tab in tabs" :key="tab.name" :label="tab.label" :name="tab.name">
        <div class="install-tabs__code-wrap">
          <span class="install-tabs__lang">sh</span>
          <pre class="install-tabs__pre"><code ref="codeRefs" class="language-bash">{{ tab.code }}</code></pre>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import hljs from 'highlight.js'

const active = ref('npm')
const tabs = [
  { name: 'npm', label: 'npm', code: 'npm install base-on-ui --save' },
  { name: 'pnpm', label: 'pnpm', code: 'pnpm add base-on-ui' },
  { name: 'yarn', label: 'yarn', code: 'yarn add base-on-ui' }
]

function highlightAll() {
  nextTick(() => {
    document.querySelectorAll('.install-tabs__pre code').forEach((el) => {
      const text = el.textContent || ''
      el.innerHTML = hljs.highlight(text, { language: 'bash', ignoreIllegals: true }).value
    })
  })
}

onMounted(highlightAll)
watch(active, highlightAll)
</script>

<style scoped lang="scss">
.install-tabs {
  margin: 0 0 20px;
}

.install-tabs__el {
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }

  :deep(.el-tabs__nav-wrap::after) {
    height: 1px;
    background-color: #e4e7ed;
  }

  :deep(.el-tabs__active-bar) {
    background-color: #409eff;
    height: 2px;
  }

  :deep(.el-tabs__item) {
    font-weight: 500;
    color: #606266;
    padding: 0 20px;

    &.is-active {
      color: #409eff;
    }
  }

  :deep(.el-tabs__content) {
    padding: 0;
  }
}

.install-tabs__code-wrap {
  position: relative;
}

.install-tabs__pre {
  margin: 0;
  padding: 16px 18px 16px;
  border-radius: 0 0 10px 10px;
  border: 1px solid #ebeef5;
  border-top: none;
  background: #f6f8fa;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.65;
}

.install-tabs__pre code {
  font-family: ui-monospace, 'SF Mono', Menlo, Monaco, monospace;
  background: transparent !important;
  display: block;
}

.install-tabs__lang {
  position: absolute;
  top: 10px;
  right: 14px;
  font-size: 11px;
  color: #909399;
  z-index: 1;
}
</style>
