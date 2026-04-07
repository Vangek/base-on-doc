<template>
  <div class="doc-shell">
      <aside class="doc-sidenav">
        <nav class="doc-sidenav__nav">
          <router-link
            to="/guide"
            class="doc-sidenav__item"
            :class="{ 'is-active': isGuide }"
          >
            📦 安装指南
          </router-link>
          <a href="#" class="doc-sidenav__item" @click.prevent="scrollToSlug(devGuideSlug)">
            🔑 开发指南
          </a>
        </nav>
      </aside>

      <main class="doc-main">
        <article class="doc-article">
          <div v-if="htmlBefore" class="doc-content" v-html="htmlBefore" />
          <InstallTabs />
          <div v-if="htmlAfter" class="doc-content" v-html="htmlAfter" />
        </article>
      </main>

      <aside class="doc-toc-wrap">
        <div class="doc-toc-head">
          <el-icon><Reading /></el-icon>
          <span>目录</span>
        </div>
        <nav class="doc-toc" aria-label="页面目录">
          <a
            v-for="(item, idx) in toc"
            :key="item.id + '-' + idx"
            href="#"
            class="doc-toc__link"
            :class="'doc-toc__link--h' + item.level"
            @click.prevent="scrollToSlug(item.id)"
          >
            {{ item.text }}
          </a>
        </nav>
      </aside>
    </div>
</template>

<script setup name="QuickStart">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'
import { renderDocMarkdown } from '@/utils/markdown'
import docSource from '@/ReadMe/quick-start.md?raw'
import InstallTabs from '@/components/doc/InstallTabs.vue'
import 'highlight.js/styles/github.min.css'

const DOC_SPLIT = '<!--DOC_INSTALL_TABS-->'

const route = useRoute()
const isGuide = computed(() => route.name === 'Guide')

const htmlBefore = ref('')
const htmlAfter = ref('')
const toc = ref([])

const devGuideSlug = computed(() => {
  const hit = toc.value.find(
    (t) => t.level === 2 && (t.text.includes('开发指南') || t.text.trim() === '开发指南')
  )
  return hit?.id ?? ''
})

function scrollToSlug(id) {
  if (!id) return
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  if (history.replaceState) {
    history.replaceState(null, '', `#${id}`)
  }
}

function buildDoc() {
  const parts = docSource.split(DOC_SPLIT)
  const r1 = renderDocMarkdown((parts[0] || '').trim())
  const r2 = renderDocMarkdown((parts[1] || '').trim())
  htmlBefore.value = r1.html
  htmlAfter.value = r2.html
  toc.value = [...r1.toc, ...r2.toc]
}

onMounted(() => {
  buildDoc()
  if (route.hash) {
    const id = decodeURIComponent(route.hash.slice(1))
    requestAnimationFrame(() => scrollToSlug(id))
  }
})
</script>

<style scoped lang="scss">
.doc-shell {
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px 20px 56px;
  display: grid;
  grid-template-columns: 240px minmax(0, 1fr) 200px;
  gap: 32px 28px;
  align-items: start;
  box-sizing: border-box;
}

@media (max-width: 1100px) {
  .doc-shell {
    grid-template-columns: 1fr;
  }

  .doc-toc-wrap {
    order: 3;
    position: static !important;
  }

  .doc-sidenav {
    position: static !important;
  }
}

.doc-sidenav {
  position: sticky;
  top: 72px;
}

.doc-sidenav__nav {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.doc-sidenav__item {
  display: block;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 14px;
  color: #606266;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #409eff;
  }

  &.is-active {
    color: #409eff;
    font-weight: 600;
  }
}

.doc-main {
  min-width: 0;
}

.doc-article {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #ebeef5;
  padding: 36px 44px 48px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.doc-toc-wrap {
  position: sticky;
  top: 72px;
}

.doc-toc-head {
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

.doc-toc {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.doc-toc__link {
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

<style lang="scss">
/* 正文 Markdown（两处 v-html 共用） */
.doc-content {
  font-size: 15px;
  line-height: 1.75;
  color: #303133;

  h2,
  h3 {
    scroll-margin-top: 88px;
    font-weight: 700;
    color: #303133;
  }

  h2 {
    margin: 36px 0 16px;
    font-size: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;

    &:first-child {
      margin-top: 0;
    }
  }

  h3 {
    margin: 24px 0 12px;
    font-size: 16px;
  }

  p {
    margin: 0 0 14px;
  }

  a {
    color: #409eff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    margin: 16px 0;
    padding: 12px 16px;
    border-left: 4px solid #dcdfe6;
    background: #f5f7fa;
    color: #606266;
    border-radius: 0 8px 8px 0;
  }

  hr {
    margin: 28px 0;
    border: none;
    border-top: 1px solid #ebeef5;
  }

  ul,
  ol {
    margin: 0 0 14px;
    padding-left: 1.4em;
  }

  li {
    margin-bottom: 6px;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0;
    font-size: 14px;
  }

  th,
  td {
    border: 1px solid #ebeef5;
    padding: 10px 14px;
    text-align: left;
  }

  th {
    background: #f5f7fa;
    font-weight: 600;
    color: #606266;
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
  }

  .doc-pre code {
    font-family: ui-monospace, 'SF Mono', Menlo, Monaco, monospace;
    background: transparent !important;
    padding: 0 !important;
  }

  :not(pre) > code {
    padding: 2px 6px;
    border-radius: 4px;
    background: #f0f2f5;
    font-size: 0.9em;
    font-family: ui-monospace, Menlo, monospace;
  }
}
</style>
