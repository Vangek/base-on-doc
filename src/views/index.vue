<template>
  <div class="landing">
    <div class="landing__glow landing__glow--1" aria-hidden="true" />
    <div class="landing__glow landing__glow--2" aria-hidden="true" />

    <header class="nav">
      <div class="nav__inner">
        <router-link to="/" class="nav__brand">
          <span class="nav__logo btn-gradient--primary">B</span>
          <span class="nav__name">base-on-ui</span>
        </router-link>

        <!-- <div class="nav__search" role="presentation">
          <span class="nav__search-placeholder">搜索文档…</span>
          <kbd class="nav__kbd">⌘ K</kbd>
        </div> -->

        <nav class="nav__links">
          <router-link to="/guide" class="nav__link">指南</router-link>
          <router-link to="/components" class="nav__link">组件</router-link>
          <a href="#changelog" class="nav__link">更新日志</a>
        </nav>
      </div>
    </header>

    <main class="hero">
      <div class="hero__grid">
        <section id="intro" class="hero__content">
          <h1 class="hero__title">base-on-ui</h1>
          <p class="hero__subtitle">Vue 3 企业级组件库</p>
          <p class="hero__desc">
            开箱即用的表单、表格与业务组件，统一设计语言与交互规范，帮助你快速搭建中后台与数据类产品界面。
          </p>

          <div class="hero__actions">
            <router-link v-slot="{ navigate }" to="/guide" custom>
              <el-button type="primary" class="btn-gradient btn-gradient--primary" round @click="navigate">
                <el-icon class="btn-icon"><MagicStick /></el-icon>
                快速开始
              </el-button>
            </router-link>
            <router-link to="/components">
              <el-button class="btn-ghost" round>
              <el-icon class="btn-icon"><View /></el-icon>
                组件预览
              </el-button>
            </router-link>
            <el-button class="btn-github" round tag="a" href="https://github.com/Vangek/base-on-ui" target="_blank" rel="noopener noreferrer">
              <el-icon class="btn-icon"><Link /></el-icon>
              GitHub
            </el-button>
          </div>

          <div id="install" class="install-block">
            <code class="install-block__cmd">{{ installCmd }}</code>
            <el-button
              class="install-block__copy"
              :icon="DocumentCopy"
              circle
              size="small"
              aria-label="复制安装命令"
              @click="copyInstall"
            />
          </div>
        </section>

        <div class="hero__visual" aria-hidden="true">
          <div class="hero__orb" />
          <div class="hero__mark">
            <span class="hero__mark-bar hero__mark-bar--a" />
            <span class="hero__mark-bar hero__mark-bar--b" />
          </div>
        </div>
      </div>

      <footer id="changelog" class="landing__foot">
        <span>base-on-ui · 基于 Vue 3 + Element Plus 构建</span>
      </footer>
    </main>
  </div>
</template>

<script setup name="Index">
import { ElMessage } from 'element-plus'
import { DocumentCopy, Link, MagicStick, View } from '@element-plus/icons-vue'

const installCmd = '$ npm install base-on-ui'

async function copyInstall() {
  const text = 'npm install base-on-ui'
  try {
    await navigator.clipboard.writeText(text)
    ElMessage.success('已复制到剪贴板')
  } catch {
    ElMessage.warning('复制失败，请手动复制')
  }
}
</script>

<style scoped lang="scss">
.landing {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
}

.landing__glow {
  position: fixed;
  pointer-events: none;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.45;
  z-index: 0;
}

.landing__glow--1 {
  width: min(60vw, 520px);
  height: min(60vw, 520px);
  top: -10%;
  left: -5%;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, transparent 70%);
}

.landing__glow--2 {
  width: min(50vw, 420px);
  height: min(50vw, 420px);
  bottom: 10%;
  right: -5%;
  background: radial-gradient(circle, rgba(125, 211, 252, 0.5) 0%, transparent 70%);
}

.nav {
  position: sticky;
  top: 0;
  z-index: 10;
  padding: 16px 24px;
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.85);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.8) inset;
}

.nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.nav__logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 800;
  line-height: 1;
  color: #fff;
  /* 与 Element Plus 主题主色一致（随 settings 中的 theme / handleThemeStyle 变化） */

  box-shadow: 0 4px 14px color-mix(in srgb, var(--el-color-primary) 32%, transparent);
}

.nav__name {
  font-weight: 700;
  font-size: 17px;
  letter-spacing: -0.02em;
  color: #1f2937;
}

.nav__search {
  flex: 1;
  max-width: 280px;
  display: none;
  align-items: center;
  justify-content: space-between;
  padding: 8px 14px;
  border-radius: 999px;
  background: #fff;
  border: 1px solid #e4e7ed;
  font-size: 13px;
  color: #909399;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

@media (min-width: 900px) {
  .nav__search {
    display: flex;
  }
}

.nav__kbd {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 6px;
  background: #f0f2f5;
  color: #606266;
  border: 1px solid #e4e7ed;
}

.nav__links {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav__link {
  padding: 6px 10px;
  font-size: 14px;
  color: #606266;
  text-decoration: none;
  border-radius: 8px;
  transition: color 0.2s, background 0.2s;

  &:hover {
    color: #409eff;
    background: rgba(64, 158, 255, 0.08);
  }
}

.nav__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: none;
  border-radius: 10px;
  background: transparent;
  color: #606266;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    color: #303133;
  }
}

.hero {
  position: relative;
  z-index: 1;
  padding: 48px 24px 32px;
}

.hero__grid {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr 1fr;
    gap: 64px;
    min-height: calc(100vh - 200px);
  }
}

.hero__title {
  margin: 0 0 12px;
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  background: linear-gradient(120deg, #fb7185 0%, #f472b6 35%, #f97316 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 2px 12px rgba(244, 114, 182, 0.15));
}

.hero__subtitle {
  margin: 0 0 20px;
  font-size: clamp(1.15rem, 2.5vw, 1.5rem);
  font-weight: 600;
  background: linear-gradient(120deg, #34d399 0%, #22d3ee 50%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero__desc {
  margin: 0 0 32px;
  max-width: 520px;
  font-size: 15px;
  line-height: 1.75;
  color: #606266;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}

.btn-icon {
  margin-right: 6px;
  vertical-align: middle;
}

:deep(.btn-gradient--primary) {
  border: none;
  background: linear-gradient(135deg, #7c3aed 0%, #6366f1 45%, #2563eb 100%);
  color: #fff;
  padding: 12px 22px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.28);

  &:hover {
    filter: brightness(1.05);
    background: linear-gradient(135deg, #7c3aed 0%, #6366f1 45%, #2563eb 100%);
  }
}

:deep(.btn-ghost) {
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #303133;
  padding: 12px 22px;
  font-weight: 600;

  &:hover {
    border-color: #c0c4cc;
    background: #f5f7fa;
    color: #409eff;
  }
}

:deep(.btn-github) {
  border: 1px solid #dcdfe6;
  background: #fff;
  color: #303133;
  padding: 12px 22px;
  font-weight: 600;
  text-decoration: none;

  &:hover {
    background: #f5f7fa;
    color: #1f2937;
    border-color: #c0c4cc;
  }
}

.install-block {
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 480px;
  padding: 14px 16px;
  border-radius: 14px;
  background: #fff;
  border: 1px solid #e4e7ed;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.install-block__cmd {
  flex: 1;
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 14px;
  color: #4f46e5;
  word-break: break-all;
}

:deep(.install-block__copy) {
  flex-shrink: 0;
  border: 1px solid #c7d2fe;
  background: #eef2ff;
  color: #4f46e5;

  &:hover {
    background: #e0e7ff;
    color: #4338ca;
  }
}

.hero__visual {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 280px;
}

.hero__orb {
  position: absolute;
  width: min(72vw, 380px);
  height: min(72vw, 380px);
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.12) 0%, transparent 65%);
  filter: blur(4px);
}

.hero__mark {
  position: relative;
  width: min(55vw, 280px);
  height: min(55vw, 280px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero__mark-bar {
  position: absolute;
  border-radius: 24px;
  box-shadow:
    0 0 40px rgba(52, 211, 153, 0.35),
    0 0 80px rgba(56, 189, 248, 0.2);
}

.hero__mark-bar--a {
  width: 28%;
  height: 72%;
  left: 22%;
  top: 8%;
  transform: rotate(-28deg);
  background: linear-gradient(180deg, #34d399 0%, #059669 100%);
}

.hero__mark-bar--b {
  width: 28%;
  height: 72%;
  right: 22%;
  top: 8%;
  transform: rotate(28deg);
  background: linear-gradient(180deg, #38bdf8 0%, #6366f1 100%);
  box-shadow:
    0 0 40px rgba(99, 102, 241, 0.45),
    0 0 80px rgba(56, 189, 248, 0.25);
}

.landing__foot {
  max-width: 1200px;
  margin: 56px auto 0;
  padding-top: 24px;
  border-top: 1px solid #ebeef5;
  font-size: 13px;
  color: #909399;
  text-align: center;
}
</style>
