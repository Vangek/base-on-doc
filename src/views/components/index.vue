<template>
  <div class="components-page">
    <header class="components-intro__head">
      <h1 class="components-intro__title">组件</h1>
      <p class="components-intro__lead">
        base-on-ui 基于 Vue 3 与 Element Plus，封装常用业务组件。以下为组件分类与使用说明入口，可按需扩展文档与示例。
      </p>
    </header>

    <section class="components-intro__section">
      <h2>安装与引入</h2>
      <p>
        在项目入口注册组件库后，即可在任意 SFC 中按需使用。详见仓库 README 与各组件文档。
      </p>
    </section>

    <section class="components-intro__section">
      <h2>组件分类（规划中）</h2>
      <ul class="components-intro__list">
        <li>表单与输入</li>
        <li>数据展示与表格</li>
        <li>反馈与导航</li>
      </ul>
    </section>
  </div>
</template>

<script setup name="ComponentsIntro">
</script>

<style scoped lang="scss">
.components-page {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 24px 48px;
}

.components-intro__head {
  margin-bottom: 32px;
}

.components-intro__title {
  margin: 0 0 12px;
  font-size: 28px;
  font-weight: 700;
  color: #303133;
}

.components-intro__lead {
  margin: 0;
  font-size: 15px;
  line-height: 1.75;
  color: #606266;
}

.components-intro__section {
  margin-bottom: 28px;

  h2 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 600;
    color: #303133;
  }

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.75;
    color: #606266;
  }
}

.components-intro__list {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}
</style>
