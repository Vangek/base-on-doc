<template>
  <div class="doc-app">
    <header class="doc-navbar">
      <div class="doc-navbar__inner">
        <router-link to="/" class="doc-sidenav-brand">
          <span class="doc-sidenav-brand__mark">B</span>
          <span class="doc-sidenav-brand__text">base-on-ui</span>
        </router-link>
        <nav class="doc-navbar__links" aria-label="站点导航">
          <span class="doc-navbar__link doc-navbar__link--muted">交流邀请</span>
          <router-link to="/guide" class="doc-navbar__link" :class="{ 'is-active': isGuide }">
            <el-icon><Compass /></el-icon>
            指南
          </router-link>
          <router-link to="/components" class="doc-navbar__link" :class="{ 'is-active': isComponents }">
            <el-icon><Box /></el-icon>
            组件
          </router-link>
        </nav>

        <div class="doc-navbar__tools">
          <a
            class="doc-navbar__tool"
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <el-icon><Link /></el-icon>
          </a>
        </div>
      </div>
    </header>

    <router-view />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Box, Compass, Link } from '@element-plus/icons-vue'

defineProps({
  githubUrl: {
    type: String,
    default: 'https://github.com/Vangek/base-on-ui'
  }
})

const route = useRoute()
const isGuide = computed(() => route.name === 'Guide')
const isComponents = computed(() => route.name === 'Components')
</script>

<style scoped lang="scss">
.doc-app {
  min-height: 100vh;
  background: #f5f7fa;
  color: #303133;
}

.doc-navbar {
  position: sticky;
  top: 0;
  z-index: 200;
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.doc-navbar__inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  gap: 20px;
}

.doc-navbar__links {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  min-width: 0;
}

.doc-navbar__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 14px;
  color: #606266;
  text-decoration: none;
  transition: color 0.15s, background 0.15s;
  border: none;
  background: transparent;
  cursor: pointer;

  .el-icon {
    font-size: 16px;
  }

  &:hover {
    color: #409eff;
    background: rgba(64, 158, 255, 0.08);
  }

  &.is-active {
    color: #409eff;
    font-weight: 600;
  }
}

.doc-navbar__link--muted {
  cursor: default;
  opacity: 0.65;

  &:hover {
    color: #606266;
    background: transparent;
  }
}

.doc-navbar__tools {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.doc-navbar__tool {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  padding: 0;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: #606266;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;

  &:hover {
    background: #f5f7fa;
    color: #409eff;
  }
}

.doc-sidenav-brand {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  flex-shrink: 0;
  gap: 10px;
  margin: 0;
  padding: 0;
  text-decoration: none;
  color: #303133;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;

  &:hover {
    color: #409eff;
  }
}

.doc-sidenav-brand__mark {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  line-height: 1;
  color: #fff;
  background: linear-gradient(
    135deg,
    var(--el-color-primary) 0%,
    var(--el-color-primary-dark-2) 100%
  );
  box-shadow: 0 4px 12px color-mix(in srgb, var(--el-color-primary) 28%, transparent);
}

.doc-sidenav-brand__text {
  display: inline-flex;
  align-items: center;
  line-height: 1;
  font-weight: 700;
  font-size: 16px;
}

@media (max-width: 1100px) {
  .doc-navbar__links {
    display: none;
  }
}
</style>
