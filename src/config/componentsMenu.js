/**
 * 侧栏菜单数据：与 src/ReadMe/components.md 中 `- **组件名**` 条目保持一致。
 * 路由 path 为 `/components/` + PascalCase 转 kebab-case。
 */
import raw from '@/ReadMe/components.md?raw'

function pascalToKebab(name) {
  return name
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '')
}

function parseComponentNames(md) {
  const items = []
  const re = /^-\s+\*\*([^*]+)\*\*\s*$/gm
  let m
  while ((m = re.exec(md)) !== null) {
    const name = m[1].trim()
    if (name) {
      items.push({
        name,
        path: `/components/${pascalToKebab(name)}`,
      })
    }
  }
  return items
}

export const componentMenuList = parseComponentNames(raw)
