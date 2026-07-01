import { readdirSync, readFileSync, statSync, existsSync } from 'fs'
import { join, relative, basename, extname } from 'path'
import matter from 'gray-matter'

const ROOT = process.cwd()

const EXCLUDED = [
  '.vitepress', '.git', '.github', '.claude',
  'node_modules', 'dist', 'preview', 'scripts',
  'skills', 'assets', 'releases',
]

const INDEX_FILES = ['index.md', 'README.md']

interface Meta {
  title?: string
  order?: number
  collapsed?: boolean
}

interface SidebarItem {
  text: string
  link?: string
  items?: SidebarItem[]
  collapsed?: boolean
  order?: number
}

function readMeta(dir: string): Meta {
  const metaPath = join(dir, '_meta.json')
  if (!existsSync(metaPath)) return {}
  try { return JSON.parse(readFileSync(metaPath, 'utf-8')) } catch { return {} }
}

function getFileMeta(filePath: string): { title: string; order: number } {
  try {
    const raw = readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)
    let title = data.title
    if (!title) {
      const h1 = content.match(/^#\s+(.+)$/m)
      title = h1 ? h1[1].trim() : basename(filePath, extname(filePath))
    }
    return { title, order: typeof data.order === 'number' ? data.order : 999 }
  } catch {
    return { title: basename(filePath, extname(filePath)), order: 999 }
  }
}

function buildItems(dir: string): SidebarItem[] {
  const entries = readdirSync(dir)
  const items: SidebarItem[] = []

  for (const entry of entries) {
    if (entry.startsWith('.') || entry.startsWith('_') || EXCLUDED.includes(entry)) continue

    const fullPath = join(dir, entry)
    const stat = statSync(fullPath)

    if (stat.isDirectory()) {
      const meta = readMeta(fullPath)
      const children = buildItems(fullPath)
      if (children.length === 0) continue

      const indexFile = INDEX_FILES.map(f => join(fullPath, f)).find(f => existsSync(f))
      const rawLink = indexFile
        ? '/' + relative(ROOT, indexFile).replace(/\.(md|MD)$/, '').replace(/\/(index|README)$/, '')
        : undefined
      const link = rawLink === '' ? '/' : rawLink

      items.push({
        text: meta.title ?? entry.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
        link: link || undefined,
        items: children,
        collapsed: meta.collapsed ?? false,
        order: meta.order ?? 999,
      })
    } else if (extname(entry) === '.md') {
      if (INDEX_FILES.includes(entry)) continue
      const { title, order } = getFileMeta(fullPath)
      const link = '/' + relative(ROOT, fullPath).replace(/\.(md|MD)$/, '')
      items.push({ text: title, link, order })
    }
  }

  return items.sort((a, b) => {
    const d = (a.order ?? 999) - (b.order ?? 999)
    return d !== 0 ? d : a.text.localeCompare(b.text, 'ru')
  })
}

export function generateSidebar(): Record<string, SidebarItem[]> {
  const topLevel = readdirSync(ROOT).filter(entry => {
    if (EXCLUDED.includes(entry) || entry.startsWith('.') || entry.startsWith('_')) return false
    return statSync(join(ROOT, entry)).isDirectory()
  })

  const sidebar: Record<string, SidebarItem[]> = {}

  for (const section of topLevel) {
    const sectionDir = join(ROOT, section)
    const meta = readMeta(sectionDir)
    const items = buildItems(sectionDir)
    if (items.length === 0) continue

    sidebar[`/${section}/`] = [{
      text: meta.title ?? section.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
      items,
      collapsed: false,
    }]
  }

  return sidebar
}
