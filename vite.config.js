import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Canonical public origin for the marketing site. Sitemap URLs must be absolute
// and point at the stable domain (NOT a transient Pages preview URL).
const SITE_ORIGIN = 'https://yebona.com'

// Public, crawlable routes declared in src/main.jsx. Keep this list in sync with
// the <Route> table there. The /admin/* subtree is intentionally excluded — it's
// a private dashboard and is also Disallow-ed in public/robots.txt.
const STATIC_ROUTES = ['/', '/blog', '/privacy', '/terms']

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function renderUrl({ loc, lastmod }) {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`]
  if (lastmod) parts.push(`    <lastmod>${escapeXml(lastmod)}</lastmod>`)
  return `  <url>\n${parts.join('\n')}\n  </url>`
}

// Best-effort fetch of published blog slugs so individual posts are crawlable.
// Blog posts are NOT static (src/lib/blog.js reads them live from the API), so
// they can only be enumerated at build time. If the blog API is unreachable we
// do NOT fabricate posts or fail the deploy — we log a loud WARNING and emit a
// sitemap with the guaranteed static routes only. The warning surfaces the
// outage in the build logs instead of silently masking it.
async function fetchBlogUrls(apiBase) {
  const endpoint = `${apiBase}/api/blog/posts?page=1&limit=1000`
  let res
  try {
    res = await fetch(endpoint, { headers: { Accept: 'application/json' } })
  } catch (err) {
    console.warn(`[sitemap] WARNING: could not reach the blog API (${endpoint}); individual posts omitted. Reason: ${err.message}`)
    return []
  }
  if (!res.ok) {
    console.warn(`[sitemap] WARNING: blog API responded ${res.status}; individual posts omitted from sitemap.`)
    return []
  }
  let body
  try {
    body = await res.json()
  } catch {
    console.warn('[sitemap] WARNING: blog API returned a non-JSON body; individual posts omitted from sitemap.')
    return []
  }
  if (!body || body.success === false || !Array.isArray(body.data)) {
    console.warn(`[sitemap] WARNING: blog API returned an error (${body?.error || 'unexpected shape'}); individual posts omitted from sitemap.`)
    return []
  }
  const urls = body.data
    .filter((row) => row && typeof row.slug === 'string' && row.slug.length > 0)
    .map((row) => ({
      loc: `${SITE_ORIGIN}/blog/${encodeURIComponent(row.slug)}`,
      lastmod: row.updated_at || row.published_at || row.created_at || undefined,
    }))
  console.log(`[sitemap] included ${urls.length} blog post(s).`)
  return urls
}

// Generates dist/sitemap.xml during the production build. Runs only on `vite
// build` (not dev) and emits the file straight into the output dir so Cloudflare
// Pages serves it at /sitemap.xml.
function sitemapPlugin() {
  return {
    name: 'yebona-sitemap',
    apply: 'build',
    async generateBundle() {
      const apiBase = process.env.VITE_API_BASE || 'https://api.yebona.com'
      const urls = [
        ...STATIC_ROUTES.map((path) => ({ loc: `${SITE_ORIGIN}${path}` })),
        ...(await fetchBlogUrls(apiBase)),
      ]
      const xml = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
        ...urls.map(renderUrl),
        '</urlset>',
        '',
      ].join('\n')
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
