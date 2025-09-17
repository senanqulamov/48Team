// Minimal markdown renderer for internal blog content (no external deps)
// Supports: headings (#..######), bold **text**, inline code `code`,
// fenced code blocks ```...```, blockquotes >, unordered/ordered lists, paragraphs, links [text](url).

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

export function renderMarkdown(md: string): string {
  if (!md) return ""

  // Normalize newlines, strip BOM/NBSP, normalize tabs
  const input = md
    .replace(/\uFEFF/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\t/g, "  ")
    .replace(/\r\n?/g, "\n")
    .trim()

  // 1) Extract fenced code blocks first and replace with placeholders
  const codeBlocks: string[] = []
  let tmp = input.replace(/```([\s\S]*?)```/g, (_m, p1) => {
    const html = `<pre class=\"not-prose overflow-auto rounded-lg bg-gray-900 border border-gray-800 p-4\"><code>${escapeHtml(
      String(p1).trim()
    )}</code></pre>`
    codeBlocks.push(html)
    return `%%%CODE_BLOCK_${codeBlocks.length - 1}%%%`
  })

  // 2) Escape remaining HTML
  tmp = escapeHtml(tmp)

  // 3) Inline formatting
  // Inline code
  tmp = tmp.replace(/`([^`]+)`/g, (_m, p1) => `<code class=\"bg-gray-800 rounded px-1 py-0.5\">${p1}</code>`)
  // Links [text](url)
  tmp = tmp.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_m, text, href) =>
    `<a href=\"${href}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-emerald-400 hover:text-emerald-300 underline underline-offset-2\">${text}</a>`
  )
  // Bold
  tmp = tmp.replace(/\*\*([^*]+)\*\*/g, (_m, p1) => `<strong>${p1}</strong>`)

  // 4) Block-level transforms on the whole string
  // Headings (allow up to 3 leading spaces)
  tmp = tmp.replace(/^\s{0,3}(#{1,6})\s+(.+?)\s*$/gm, (_m, hashes, text) => {
    const level = Math.min(6, String(hashes).length)
    const sizeMap: Record<number, string> = {
      1: "text-3xl md:text-4xl",
      2: "text-2xl md:text-3xl",
      3: "text-xl md:text-2xl",
      4: "text-lg md:text-xl",
      5: "text-base md:text-lg",
      6: "text-sm md:text-base",
    }
    const cls = `mt-8 mb-4 font-bold text-white ${sizeMap[level]}`
    return `<h${level} class=\"${cls}\">${text}</h${level}>`
  })

  // Blockquotes (allow up to 3 leading spaces)
  tmp = tmp.replace(/^\s{0,3}>\s?(.+)$/gm, (_m, p1) => `<blockquote class=\"border-l-2 border-emerald-500/40 pl-4 text-gray-300 italic\">${p1}</blockquote>`)

  // 5) Build HTML with lists and paragraphs
  const lines = tmp.split(/\n/)
  const out: string[] = []
  let inUl = false
  let inOl = false
  let para: string[] = []

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${para.join(" ")}</p>`)
      para = []
    }
  }
  const closeLists = () => {
    if (inUl) { out.push('</ul>'); inUl = false }
    if (inOl) { out.push('</ol>'); inOl = false }
  }

  for (const raw of lines) {
    const line = raw.trim()
    if (!line) {
      flushPara()
      closeLists()
      continue
    }

    const isHeading = /^<h[1-6]\b/.test(line)
    const isQuote = /^<blockquote\b/.test(line)
    const isCodePh = /%%%CODE_BLOCK_\d+%%%/.test(line)

    // Ordered list item
    const olMatch = line.match(/^(\d+)\.\s+(.+)/)
    // Unordered list item (-, *, +)
    const ulMatch = line.match(/^[-*+]\s+(.+)/)

    if (isHeading || isQuote || isCodePh) {
      flushPara()
      closeLists()
      out.push(line)
      continue
    }

    if (olMatch) {
      flushPara()
      if (!inOl) { closeLists(); out.push('<ol class="list-decimal pl-6 space-y-1">'); inOl = true }
      out.push(`<li>${olMatch[2]}</li>`)
      continue
    }

    if (ulMatch) {
      flushPara()
      if (!inUl) { closeLists(); out.push('<ul class="list-disc pl-6 space-y-1">'); inUl = true }
      out.push(`<li>${ulMatch[1]}</li>`)
      continue
    }

    // Paragraph text (accumulate)
    para.push(line)
  }

  flushPara()
  closeLists()

  // 6) Restore code blocks
  let html = out.join("\n")
  html = html.replace(/%%%CODE_BLOCK_(\d+)%%%/g, (_m, idx) => codeBlocks[Number(idx)] || "")

  return html
}
