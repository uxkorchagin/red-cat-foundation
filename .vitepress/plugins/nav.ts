import { readdirSync, statSync, existsSync, readFileSync } from 'fs'
import { join } from 'path'

const ROOT = process.cwd()

const EXCLUDED = [
  '.vitepress', '.git', '.github', '.claude',
  'node_modules', 'dist', 'preview', 'scripts',
  'skills', 'assets', 'releases', 'templates', 'checklists',
]

interface NavItem {
  text: string
  link?: string
  activeMatch?: string
  order?: number
}

export function generateNav(): NavItem[] {
  const entries = readdirSync(ROOT)
  const items: NavItem[] = []

  for (const entry of entries) {
    if (EXCLUDED.includes(entry) || entry.startsWith('.') || entry.startsWith('_')) continue
    const fullPath = join(ROOT, entry)
    if (!statSync(fullPath).isDirectory()) continue

    const metaPath = join(fullPath, '_meta.json')
    let meta: { title?: string; nav?: boolean; order?: number } = {}
    if (existsSync(metaPath)) {
      try { meta = JSON.parse(readFileSync(metaPath, 'utf-8')) } catch {}
    }
    if (meta.nav === false) continue

    items.push({
      text: meta.title ?? entry.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()),
      link: `/${entry}/`,
      activeMatch: `^/${entry}/`,
      order: meta.order ?? 999,
    })
  }

  return items.sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
}
