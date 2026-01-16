// Minimal markdown renderer for internal blog content (no external deps)
// Supports: headings (#..######), bold **text**, inline code `code`,
// fenced code blocks ```...```, blockquotes >, unordered/ordered lists, paragraphs, links [text](url).

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")

export function renderMarkdown(md: string, options?: { baseLevel?: number }): string {
  const baseLevel = Math.min(Math.max(options?.baseLevel || 1, 1), 6)

  if (!md) return ""

  // Normalize newlines, strip BOM/NBSP, normalize tabs
  const input = md
    .replace(/\uFEFF/g, "")
    .replace(/\u00A0/g, " ")
    .replace(/\t/g, "  ")
    .replace(/\r\n?/g, "\n")
    .trim()

  // 1) Extract fenced code blocks first and replace with placeholders - ENHANCED STYLING
  const codeBlocks: string[] = []
  let tmp = input.replace(/```([\s\S]*?)```/g, (_m, p1) => {
    const html = `<pre class="not-prose my-8 overflow-auto rounded-xl bg-zinc-900 border border-emerald-500/20 p-6 shadow-2xl shadow-emerald-500/5"><code class="text-sm md:text-base text-emerald-100">${escapeHtml(
      String(p1).trim()
    )}</code></pre>`
    codeBlocks.push(html)
    return `%%%CODE_BLOCK_${codeBlocks.length - 1}%%%`
  })

  // 2) Escape remaining HTML
  tmp = escapeHtml(tmp)

  // 3) Inline formatting - ENHANCED
  // Inline code
  tmp = tmp.replace(/`([^`]+)`/g, (_m, p1) => `<code class="bg-emerald-500/10 text-emerald-400 rounded px-2 py-1 text-base font-mono">${p1}</code>`)
  // Links [text](url)
  tmp = tmp.replace(/\[([^\]]+)\]\(([^\s)]+)\)/g, (_m, text, href) =>
    `<a href=\"${href}\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"text-emerald-400 hover:text-emerald-300 font-semibold border-b border-emerald-500/30 hover:border-emerald-400 transition-colors\">${text}</a>`
  )
  // Bold - ENHANCED
  tmp = tmp.replace(/\*\*([^*]+)\*\*/g, (_m, p1) => `<strong class="text-emerald-200 font-bold">${p1}</strong>`)

  // 4) Block-level transforms on the whole string
  // Headings (allow up to 3 leading spaces) - CINEMATIC STYLING
  tmp = tmp.replace(/^\s{0,3}(#{1,6})\s+(.+?)\s*$/gm, (_m, hashes, text) => {
    const rawLevel = Math.min(6, String(hashes).length)
    const level = Math.min(6, rawLevel - 1 + baseLevel)

    // Cinematic heading styles with proper hierarchy
    const headingStyles: Record<number, { wrapper: string; text: string; decorator: string }> = {
      1: {
        wrapper: "mt-20 mb-12 pt-12 border-t border-emerald-500/20",
        text: "text-4xl md:text-5xl lg:text-6xl font-black leading-tight bg-gradient-to-r from-emerald-300 via-green-400 to-emerald-400 bg-clip-text text-transparent",
        decorator: "■" // Scene marker
      },
      2: {
        wrapper: "mt-16 mb-8",
        text: "text-3xl md:text-4xl lg:text-5xl font-black leading-tight bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent",
        decorator: "▸" // Chapter marker
      },
      3: {
        wrapper: "mt-12 mb-6",
        text: "text-2xl md:text-3xl lg:text-4xl font-bold text-white/90",
        decorator: ""
      },
      4: {
        wrapper: "mt-8 mb-4",
        text: "text-xl md:text-2xl font-bold text-emerald-300",
        decorator: ""
      },
      5: {
        wrapper: "mt-6 mb-3",
        text: "text-lg md:text-xl font-semibold text-white/80",
        decorator: ""
      },
      6: {
        wrapper: "mt-4 mb-2",
        text: "text-base md:text-lg font-semibold text-white/70",
        decorator: ""
      }
    }

    const style = headingStyles[level]
    const decorator = style.decorator ? `<span class="text-emerald-500 mr-3 md:mr-4">${style.decorator}</span>` : ""

    return `<h${level} class="${style.wrapper}"><span class="${style.text}">${decorator}${text}</span></h${level}>`
  })

  // Blockquotes (allow up to 3 leading spaces) - CINEMATIC STYLING
  tmp = tmp.replace(/^\s{0,3}>\s?(.+)$/gm, (_m, p1) => {
    return `<blockquote class="my-8 border-l-4 border-emerald-500 bg-gradient-to-r from-emerald-500/10 to-transparent py-6 px-8 rounded-r-xl text-white/90 italic text-xl shadow-lg shadow-emerald-500/5">${p1}</blockquote>`
  })

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
      if (!inOl) { closeLists(); out.push('<ol class="list-decimal pl-6 md:pl-8 space-y-2 text-white/75 text-lg md:text-xl leading-relaxed marker:text-emerald-400 marker:font-bold">'); inOl = true }
      out.push(`<li>${olMatch[2]}</li>`)
      continue
    }

    if (ulMatch) {
      flushPara()
      if (!inUl) { closeLists(); out.push('<ul class="list-disc pl-6 md:pl-8 space-y-2 text-white/75 text-lg md:text-xl leading-relaxed marker:text-emerald-400">'); inUl = true }
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
