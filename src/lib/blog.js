// Blog data layer for the Yebona marketing site.
// Single source of truth for the blog API base, request handling, and the
// snake_case -> view-model mapping. The /api/blog endpoints return RAW DB rows
// (featured_image, published_at, content) — NOT the camelCase the rest of the
// Yebona API emits — so normalize here once and let the pages consume a clean VM.

const API_BASE = 'https://api.yebona.com'

// Map a raw blog row (snake_case) to a stable view-model the UI renders.
function toPostVM(row) {
  if (!row) return null
  return {
    id: row.id,
    title: row.title || 'Untitled',
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '', // only present on the single-post endpoint
    category: row.category || null,
    tags: Array.isArray(row.tags) ? row.tags : [],
    author: row.author || 'Yebona',
    image: row.featured_image || null,
    publishedAt: row.published_at || row.created_at || null,
  }
}

// Shared fetch wrapper. Throws loudly on any non-OK response or transport error
// so callers can surface a real error state — never a silent fake-success.
async function getJson(path) {
  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new Error("We couldn't reach the Yebona blog. Check your connection and try again.")
  }
  if (!res.ok) {
    throw new Error(`The blog service responded with an error (${res.status}).`)
  }
  const body = await res.json()
  if (!body || body.success === false) {
    throw new Error(body?.error || 'The blog service returned an unexpected response.')
  }
  return body
}

// List published posts. Returns { posts, pagination }.
export async function fetchPosts({ page = 1, limit = 20 } = {}) {
  const body = await getJson(`/api/blog/posts?page=${page}&limit=${limit}`)
  const posts = Array.isArray(body.data) ? body.data.map(toPostVM).filter(Boolean) : []
  return { posts, pagination: body.pagination || null }
}

// Fetch a single post by slug. Returns the VM, or null when the API 404s
// (genuinely missing post) — any other failure throws.
export async function fetchPostBySlug(slug) {
  let res
  try {
    res = await fetch(`${API_BASE}/api/blog/posts/${encodeURIComponent(slug)}`, {
      headers: { Accept: 'application/json' },
    })
  } catch {
    throw new Error("We couldn't reach the Yebona blog. Check your connection and try again.")
  }
  if (res.status === 404) return null
  if (!res.ok) {
    throw new Error(`The blog service responded with an error (${res.status}).`)
  }
  const body = await res.json()
  if (!body || body.success === false) {
    throw new Error(body?.error || 'The blog service returned an unexpected response.')
  }
  return toPostVM(body.data)
}

// Human-readable date, defensively handling a missing/invalid value.
export function formatDate(value) {
  if (!value) return ''
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

// ISO date for <time dateTime> / SEO, or undefined when unavailable.
export function isoDate(value) {
  if (!value) return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d.toISOString()
}
