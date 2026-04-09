<template>
  <nav class="component-menu" aria-label="组件列表">
    <div class="component-menu__link" v-for="item in menuList" :key="item.path">
      <router-link :to="item.path">
        {{ item.name }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { componentMenuList } from '@/config/componentsMenu.js'

const menuList = componentMenuList
</script>

<style scoped lang="scss">

.component-menu {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
  width: 400px;
  height: 100%;
  padding: 16px 12px;
  overflow: auto;
  border-right: 1px solid #ebeef5;
}

.component-menu__link {
  width: 30%;
  padding: 10px 0;
  font-size: 14px;
  color: #606266;
  text-align: left;
  text-decoration: none;
  transition: color 0.15s;

  &:hover {
    color: #409eff;
  }

  &.component-menu__link--active {
    color: #409eff;
    font-weight: 600;
  }
}
</style>