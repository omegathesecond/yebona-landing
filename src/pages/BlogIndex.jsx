import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Calendar, BookOpen } from 'lucide-react'
import BlogLayout from '../components/BlogLayout'
import { fetchPosts, formatDate, isoDate } from '../lib/blog'

const PAGE_TITLE = 'Blog — Yebona | China–Africa Trade Insights'
const PAGE_DESC =
  'Guides and insights on importing from China to Africa — currency exchange, sourcing, factory verification, freight, and trading safely with escrow.'

function PostCard({ post }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="block bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
    >
      <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
        {post.category && (
          <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 font-medium">
            {post.category}
          </span>
        )}
        {post.publishedAt && (
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={isoDate(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
          </span>
        )}
      </div>
      <h2 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
        {post.title}
      </h2>
      {post.excerpt && (
        <p className="mt-2 text-slate-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
      )}
      <span className="mt-4 inline-flex items-center gap-1.5 text-blue-400 font-medium text-sm">
        Read more
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  )
}

export default function BlogIndex() {
  const [state, setState] = useState({ status: 'loading', posts: [], error: '' })

  useEffect(() => {
    let active = true
    fetchPosts({ page: 1, limit: 30 })
      .then(({ posts }) => {
        if (active) setState({ status: 'ready', posts, error: '' })
      })
      .catch((err) => {
        if (active) setState({ status: 'error', posts: [], error: err.message })
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <BlogLayout>
      {/* React 19 hoists these into <head> for SEO */}
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESC} />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESC} />
      <meta property="og:type" content="website" />
      <link rel="canonical" href="https://yebona.com/blog" />

      <header className="mb-10">
        <span className="inline-flex items-center gap-2 text-blue-400 font-semibold text-sm mb-3">
          <BookOpen className="w-4 h-4" />
          Yebona Blog
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Trade smarter between China &amp; Africa
        </h1>
        <p className="mt-3 text-slate-400 text-lg">
          Practical guides on currency, sourcing, freight, and importing without getting scammed.
        </p>
      </header>

      {state.status === 'loading' && (
        <div className="space-y-4" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="bg-slate-900/40 border border-slate-800 rounded-2xl p-6 animate-pulse">
              <div className="h-3 w-24 bg-slate-800 rounded mb-4" />
              <div className="h-5 w-2/3 bg-slate-800 rounded mb-3" />
              <div className="h-4 w-full bg-slate-800/70 rounded" />
            </div>
          ))}
        </div>
      )}

      {state.status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-200 font-semibold">We couldn’t load the blog</p>
            <p className="text-red-300/80 text-sm mt-1">{state.error}</p>
          </div>
        </div>
      )}

      {state.status === 'ready' && state.posts.length === 0 && (
        <div className="bg-slate-900/40 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
          <BookOpen className="w-8 h-8 text-slate-500 mx-auto mb-3" />
          <p className="text-slate-300 font-medium">No posts published yet</p>
          <p className="text-slate-500 text-sm mt-1">Check back soon — we’re writing.</p>
        </div>
      )}

      {state.status === 'ready' && state.posts.length > 0 && (
        <div className="space-y-5">
          {state.posts.map((post) => (
            <PostCard key={post.id || post.slug} post={post} />
          ))}
        </div>
      )}
    </BlogLayout>
  )
}
