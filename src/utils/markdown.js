import MarkdownIt from 'markdown-it'
import anchor from 'markdown-it-anchor'
import hljs from 'highlight.js'

/**
 * 渲染文档 Markdown，生成 HTML 与 h2/h3 目录（与 markdown-it-anchor slug 一致）
 */
export function renderDocMarkdown(source) {
  const toc = []

  const md = new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  })

  md.set({
    highlight(str, lang) {
      let l = lang
      if (l === 'vue') l = 'xml'
      if (l && hljs.getLanguage(l)) {
        try {
          return (
            '<pre class="hljs doc-pre"><code>' +
            hljs.highlight(str, { language: l, ignoreIllegals: true }).value +
            '</code></pre>'
          )
        } catch {
          /* fall through */
        }
      }
      return '<pre class="hljs doc-pre"><code>' + md.utils.escapeHtml(str) + '</code></pre>'
    }
  })

  md.use(anchor, {
    level: [2, 3],
    permalink: false,
    callback(token, info) {
      toc.push({
        id: info.slug,
        text: info.title,
        level: Number(token.tag.slice(1))
      })
    }
  })

  const html = md.render(source)
  return { html, toc }
}
