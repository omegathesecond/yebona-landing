import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, AlertTriangle, Calendar, User } from 'lucide-react'
import DOMPurify from 'dompurify'
import BlogLayout from '../components/BlogLayout'
import { fetchPostBySlug, formatDate, isoDate } from '../lib/blog'

function BackToBlog() {
  return (
    <Link
      to="/blog"
      className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm font-medium transition-colors mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      All posts
    </Link>
  )
}

export default function BlogPost() {
  const { slug } = useParams()
  const [state, setState] = useState({ status: 'loading', post: null, error: '', slug })

  // Reset to the loading state when the slug changes. Done during render (the
  // pattern React recommends over a setState inside an effect) so navigating
  // post -> post doesn't flash the previous article.
  if (state.slug !== slug) {
    setState({ status: 'loading', post: null, error: '', slug })
  }

  useEffect(() => {
    let active = true
    fetchPostBySlug(slug)
      .then((post) => {
        if (!active) return
        if (!post) setState({ status: 'notfound', post: null, error: '', slug })
        else setState({ status: 'ready', post, error: '', slug })
      })
      .catch((err) => {
        if (active) setState({ status: 'error', post: null, error: err.message, slug })
      })
    return () => {
      active = false
    }
  }, [slug])

  const { status, post, error } = state

  // Truncated, tag-free description for SEO.
  const metaDesc = post
    ? (post.excerpt || post.content.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim().slice(0, 160)
    : ''
  const pageTitle = post ? `${post.title} — Yebona Blog` : 'Yebona Blog'

  return (
    <BlogLayout>
      {/* SEO metadata — React 19 hoists these to <head>. Per-post title/description. */}
      <title>{pageTitle}</title>
      {post && <meta name="description" content={metaDesc} />}
      {post && <meta property="og:title" content={post.title} />}
      {post && <meta property="og:description" content={metaDesc} />}
      <meta property="og:type" content="article" />
      {post && <link rel="canonical" href={`https://yebona.com/blog/${post.slug}`} />}
      {post?.image && <meta property="og:image" content={post.image} />}
      {post?.publishedAt && (
        <meta property="article:published_time" content={isoDate(post.publishedAt)} />
      )}

      <BackToBlog />

      {status === 'loading' && (
        <div className="animate-pulse" aria-busy="true">
          <div className="h-3 w-28 bg-slate-800 rounded mb-5" />
          <div className="h-9 w-3/4 bg-slate-800 rounded mb-4" />
          <div className="h-4 w-full bg-slate-800/70 rounded mb-2" />
          <div className="h-4 w-5/6 bg-slate-800/70 rounded" />
        </div>
      )}

      {status === 'error' && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-red-200 font-semibold">We couldn’t load this post</p>
            <p className="text-red-300/80 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {status === 'notfound' && (
        <div className="bg-slate-900/40 border border-dashed border-slate-700 rounded-2xl p-10 text-center">
          <p className="text-slate-300 font-medium">Post not found</p>
          <p className="text-slate-500 text-sm mt-1">
            This article may have moved.{' '}
            <Link to="/blog" className="text-blue-400 hover:underline">
              Browse all posts
            </Link>
            .
          </p>
        </div>
      )}

      {status === 'ready' && post && (
        <article>
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mb-4">
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
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" />
                  {post.author}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-4 text-lg text-slate-400 leading-relaxed">{post.excerpt}</p>
            )}
          </header>

          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-2xl border border-slate-800 mb-8"
              loading="lazy"
            />
          )}

          {/* Content is first-party (Yebona's autoblogger via the API-key-protected
              POST endpoint), but sanitized with DOMPurify as defense-in-depth
              before being rendered as HTML. */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
          />

          <div className="mt-12 pt-8 border-t border-slate-800/60">
            <BackToBlog />
          </div>
        </article>
      )}
    </BlogLayout>
  )
}
