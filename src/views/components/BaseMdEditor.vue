<template>
  <div class="component-doc">
    <article class="component-doc__article">
      <div class="doc-content" v-html="docHtml" />

      <h2 id="demo-live">在线示例</h2>
      <p>
        以下为按需引入 <code>base-on-ui</code> 的 <strong>BaseMdEditor</strong> 演示：点击段落、输入修改要求、<code>submit-change</code> 与源码起始行号
        <code>line</code>（1-based）。
      </p>

      <div class="component-doc__demo">
        <UiBaseMdEditor :content="content" @submit-change="onSubmitChange" />
        <p class="component-doc__hint">
          最近一次提交：<strong>{{ lastEvent }}</strong>
        </p>
      </div>

      <h3 id="demo-code">示例代码</h3>
      <pre class="hljs doc-pre"><code>{{ demoSource }}</code></pre>
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

<script setup name="BaseMdEditorDoc">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { Reading } from '@element-plus/icons-vue'
import 'base-on-ui/style.css'
import { BaseMdEditor as UiBaseMdEditor } from 'base-on-ui'
import { renderDocMarkdown } from '@/utils/markdown'
import docSource from '@/ReadMe/base-md-editor.md?raw'
import demoSource from '@/views/components/snippets/base-md-editor-demo-source.txt?raw'

const route = useRoute()

const docHtml = ref('')
const toc = ref([])
const content = ref(`
# 金陵承韵，风华千秋

枕长江之涛，沐六朝之风，南京这座浸润着千年墨香与烟火暖意的古城，以不疾不徐的姿态，诉说着岁月沉淀的温柔与厚重。它既有帝王州的大气磅礴，亦有江南城的婉约灵动，每一寸土地都藏着故事，每一缕风都带着诗意，让人一见倾心，再念难忘。

南京的美，藏在千年文脉的肌理之中。作为有着近2500年建城史、450多年建都史的古都，十代王朝的兴衰在这里留下了深深印记。明城墙蜿蜒起伏，青砖黛瓦间镌刻着朱元璋筑城的传奇，斑驳砖缝里藏着岁月的絮语，登高远眺，墙外湖光山色与墙内人间烟火交相辉映，尽览古今交融之妙。中山陵依山而筑，392级台阶承载着家国情怀，“自由钟”造型的建筑庄重肃穆，登顶俯瞰，整座城市的轮廓在绿意中舒展，让人读懂信仰与坚守的重量。秦淮河畔，桨声灯影里流淌着六朝金粉的余韵，乌衣巷的青石板路蜿蜒，印证着“旧时王谢堂前燕，飞入寻常百姓家”的沧桑，江南贡院的飞檐翘角，见证着无数文人墨客的家国理想。

南京的美，融在山水相依的灵秀之中。紫金山如翠屏环抱，聚王气、灵气于一体，山间林木葱郁，中山陵、明孝陵错落其间，春有梅花缀岭，秋有银杏铺径，四季皆成画卷。玄武湖碧波荡漾，长堤凝翠，画舫轻摇，菱洲秀色藏于浩淼水色之中，岸边绿树蓊郁，风吹柳动，尽显江南水乡的温婉。莫愁湖畔，杨柳依依，传说悠悠，湖水承载着千年的柔情，漫步湖畔，仿佛能听见岁月的轻吟，感受那份不慌不忙的从容。

南京的美，暖在烟火人间的温情之中。街头巷尾，鸭血粉丝汤的鲜香、桂花糖芋苗的绵甜、咸水鸭的醇厚，交织成最动人的市井乐章。老门东的青石板路上，白墙黑瓦间藏着老字号的烟火，灯笼亮起时，古风与烟火气交融，让人沉醉其中。南京人爽直热忱，一句亲切的问候，一碗温热的小吃，都透着这座城的包容与温柔，让每一位来客都能感受到家的暖意。

岁月流转，金陵依旧。南京没有张扬的锋芒，却以千年积淀的风华，在古今交织中绽放独特魅力。它既有历史的厚重，又有自然的灵秀，更有烟火的温情，如一杯陈酿，越品越香，如一幅水墨，越赏越韵。这座城，藏着江南的婉约，载着历史的沧桑，更装着人间的温情，值得我们用一生去品读、去赞美。

> （注：文档部分内容可能由 AI 生成）

`)
const lastEvent = ref('（尚未提交）')

async function onSubmitChange({ demand, line }) {
  lastEvent.value = JSON.stringify({ demand, line })
  const lines = content.value.split('\n')
  const idx = line - 1
  if (idx < 0 || idx >= lines.length) return
  await new Promise((r) => setTimeout(r, 500))
  lines[idx] = `> 已按「${demand}」处理（起始行 ${line}）`
  content.value = lines.join('\n')
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
    { id: 'demo-code', text: '示例代码', level: 3 },
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

.component-doc__demo {
  margin: 16px 0 24px;
  padding: 20px;
  border: 1px solid #ebeef5;
  border-radius: 12px;
  background: #fafafa;
}

.component-doc__hint {
  margin: 14px 0 0;
  font-size: 13px;
  color: #606266;

  strong {
    font-weight: 500;
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

  :deep(:not(pre) > code) {
    padding: 2px 6px;
    border-radius: 4px;
    background: #f0f2f5;
    font-size: 0.9em;
    font-family: ui-monospace, Menlo, monospace;
  }
}

.component-doc__article > h2,
.component-doc__article > h3,
.component-doc__article > p {
  scroll-margin-top: 72px;
}

.component-doc__article > h2 {
  margin: 28px 0 14px;
  font-size: 20px;
  font-weight: 700;
  color: #303133;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.component-doc__article > h3 {
  margin: 20px 0 10px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
}

.component-doc__article > p {
  font-size: 15px;
  line-height: 1.75;
  color: #303133;
  margin: 0 0 12px;
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
  white-space: pre-wrap;
  word-break: break-word;
}

.doc-pre code {
  font-family: ui-monospace, 'SF Mono', Menlo, Monaco, monospace;
  background: transparent !important;
  padding: 0 !important;
}
</style>
