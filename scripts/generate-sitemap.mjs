// Generates public/sitemap.xml at build time so every published blog post is
// included automatically — no second source of truth for blog slugs to keep
// in sync by hand. Runs as the package.json "prebuild" step, before Vite
// copies public/ into the build output.
import { writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const SITE_ORIGIN = 'https://yebona.com'
const API_BASE = process.env.VITE_API_BASE || 'https://api.yebona.com'
const OUT_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'sitemap.xml',
)

const STATIC_PAGES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'daily', priority: '0.8' },
  { path: '/pricing', changefreq: 'monthly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.2' },
  { path: '/terms', changefreq: 'yearly', priority: '0.2' },
]

// Fetches every page of published posts. Throws on any failure — a broken
// fetch must fail the build loudly, never silently ship a stale/partial sitemap.
async function fetchAllPosts() {
  const posts = []
  let page = 1
  while (true) {
    const res = await fetch(`${API_BASE}/api/blog/posts?page=${page}&limit=50`, {
      headers: { Accept: 'application/json' },
    })
    if (!res.ok) {
      throw new Error(`Blog API responded with ${res.status} while building the sitemap (page ${page})`)
    }
    const body = await res.json()
    if (!body || body.success === false || !Array.isArray(body.data)) {
      throw new Error(`Blog API returned an unexpected response while building the sitemap (page ${page})`)
    }
    posts.push(...body.data)
    if (!body.pagination?.hasNext) break
    page += 1
  }
  return posts
}

function xmlEscape(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;',
  }[c]))
}

function toUrlEntry({ path: urlPath, lastmod, changefreq, priority }) {
  const parts = [`    <loc>${xmlEscape(SITE_ORIGIN + urlPath)}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`)
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`)
  if (priority) parts.push(`    <priority>${priority}</priority>`)
  return `  <url>\n${parts.join('\n')}\n  </url>`
}

async function main() {
  const posts = await fetchAllPosts()

  const entries = [
    ...STATIC_PAGES.map(toUrlEntry),
    ...posts
      .filter((post) => post?.slug)
      .map((post) =>
        toUrlEntry({
          path: `/blog/${post.slug}`,
          lastmod: (post.published_at || post.created_at || '').slice(0, 10) || undefined,
          changefreq: 'monthly',
          priority: '0.6',
        }),
      ),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`

  await writeFile(OUT_PATH, xml, 'utf8')
  console.log(`Generated ${OUT_PATH} with ${STATIC_PAGES.length} static pages and ${posts.length} blog posts.`)
}

main().catch((err) => {
  console.error('Failed to generate sitemap.xml:', err.message)
  process.exit(1)
})
