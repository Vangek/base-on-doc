<template>
  <div class="component-layout">
    <ComponentMenu />
    <div class="component-layout-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import ComponentMenu from './components/ComponentMenu.vue'
</script>

<style scoped lang="scss">
.component-layout {
  display: flex;
  height: calc(100vh - 60px);
}
.component-layout-content {
  box-sizing: border-box;
  padding: 20px;
  flex: 1;
  max-width: calc(100vw - 400px);
  margin: 0 auto;
  height: 100%;
  background: #fff;
  overflow: auto;
}

/* 侧栏当前路由高亮：不改 ComponentMenu，沿用 router-link 默认类名 */
:deep(.component-menu a.router-link-exact-active) {
  color: #409eff;
  font-weight: 600;
}
</style>