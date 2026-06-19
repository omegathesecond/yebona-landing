import BlogLayout from './BlogLayout'

// Shared shell for the legal pages (Privacy Policy, Terms of Service). Renders
// the standard page chrome via BlogLayout, hoists SEO metadata (React 19 lifts
// <title>/<meta> into <head>), and provides consistent legal typography so both
// documents read identically.
export default function LegalDocument({ title, description, lastUpdated, children }) {
  const pageTitle = `${title} — Yebona`
  return (
    <BlogLayout>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      <article>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{title}</h1>
        <p className="mt-3 text-sm text-slate-500">Last updated: {lastUpdated}</p>
        <div className="mt-8 space-y-8 text-slate-300 leading-relaxed">{children}</div>
      </article>
    </BlogLayout>
  )
}

// A titled section within a legal document. Keeps heading spacing/colour
// uniform across both pages.
export function Section({ title, children }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {children}
    </section>
  )
}
