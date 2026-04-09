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
  flex: 1;
  max-width: calc(100vw - 400px);
  margin: 0 auto;
  height: 100%;
  background: #fff;
}
</style>