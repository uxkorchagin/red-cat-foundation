/**
 * Checks all internal links in .md files.
 * Reports broken links — links pointing to files that don't exist.
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'fs'
import { join, dirname, resolve, extname } from 'path'

const DOCS_DIR = resolve('docs')
let errors = 0

function getAllMarkdownFiles(dir) {
  const files = []
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) {
      if (!entry.startsWith('.') && entry !== 'node_modules' && entry !== 'public') {
        files.push(...getAllMarkdownFiles(full))
      }
    } else if (extname(entry) === '.md') {
      files.push(full)
    }
  }
  return files
}

function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8')
  const dir = dirname(filePath)

  // Match [text](link) — only relative links (not http/https/#)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  let match

  while ((match = linkRegex.exec(content)) !== null) {
    const link = match[2]

    // Skip external and anchor links
    if (link.startsWith('http') || link.startsWith('#') || link.startsWith('mailto:')) {
      continue
    }

    // Strip anchor from link
    const [path] = link.split('#')
    if (!path) continue

    // Resolve to absolute path
    const resolved = resolve(dir, path)

    // Try as-is, then with .md extension, then as index.md
    const candidates = [
      resolved,
      resolved + '.md',
      join(resolved, 'index.md'),
    ]

    const exists = candidates.some(c => existsSync(c))

    if (!exists) {
      const rel = filePath.replace(DOCS_DIR + '/', '')
      console.error(`❌ Broken link in ${rel}: [${match[1]}](${link})`)
      errors++
    }
  }
}

console.log('🔗 Checking internal links...\n')

const files = getAllMarkdownFiles(DOCS_DIR)
for (const file of files) {
  checkFile(file)
}

if (errors === 0) {
  console.log(`✅ All links are valid (checked ${files.length} files)`)
} else {
  console.error(`\n❌ Found ${errors} broken link(s) in ${files.length} files`)
  process.exit(1)
}
