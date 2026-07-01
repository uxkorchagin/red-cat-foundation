/**
 * Validates documentation structure:
 * - Each section directory has _meta.json
 * - Each section has an index.md
 * - Frontmatter has required fields
 * - No duplicate order values within a section
 */

import { readdirSync, readFileSync, statSync, existsSync } from 'fs'
import { join, extname } from 'path'
import matter from 'gray-matter'

const DOCS_DIR = resolve('docs')
const EXCLUDED = ['.vitepress', 'public', 'node_modules']

import { resolve } from 'path'

let warnings = 0

function checkDirectory(dir, depth = 0) {
  const entries = readdirSync(dir)
  const isRoot = depth === 0

  const subdirs = entries.filter(e => {
    if (EXCLUDED.includes(e) || e.startsWith('.') || e.startsWith('_')) return false
    return statSync(join(dir, e)).isDirectory()
  })

  const mdFiles = entries.filter(e => extname(e) === '.md' && !e.startsWith('_'))

  // Check each top-level section
  if (!isRoot) {
    const rel = dir.replace(DOCS_DIR, '').replace(/^\//, '')

    // Warn if no _meta.json
    if (!existsSync(join(dir, '_meta.json'))) {
      console.warn(`⚠️  Missing _meta.json in: ${rel}/`)
      warnings++
    }

    // Warn if no index.md
    const hasIndex = entries.some(e => e === 'index.md' || e === 'README.md')
    if (!hasIndex && mdFiles.length > 0) {
      console.warn(`⚠️  No index.md in: ${rel}/`)
      warnings++
    }
  }

  // Check frontmatter in each .md file
  const orders = []
  for (const file of mdFiles) {
    if (file === 'index.md') continue
    const filePath = join(dir, file)
    const rel = filePath.replace(DOCS_DIR, '').replace(/^\//, '')

    try {
      const raw = readFileSync(filePath, 'utf-8')
      const { data } = matter(raw)

      if (!data.title) {
        console.warn(`⚠️  Missing frontmatter "title" in: ${rel}`)
        warnings++
      }

      if (typeof data.order === 'number') {
        if (orders.includes(data.order)) {
          console.warn(`⚠️  Duplicate order ${data.order} in: ${dir.replace(DOCS_DIR, '')}`)
          warnings++
        }
        orders.push(data.order)
      }
    } catch (e) {
      console.warn(`⚠️  Could not parse: ${rel} — ${e.message}`)
      warnings++
    }
  }

  // Recurse
  for (const subdir of subdirs) {
    checkDirectory(join(dir, subdir), depth + 1)
  }
}

console.log('🏗️  Checking documentation structure...\n')

checkDirectory(DOCS_DIR)

if (warnings === 0) {
  console.log('✅ Structure looks good')
} else {
  console.warn(`\n⚠️  Found ${warnings} structure warning(s)`)
  // Warnings don't fail the build — only log
}
