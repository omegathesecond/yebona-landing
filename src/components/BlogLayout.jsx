import SiteNav from './SiteNav'
import Footer from './Footer'

// Page shell shared by the blog index, blog posts, the legal pages
// (Privacy/Terms) and Contact: dark slate background, fixed nav, ambient glows
// (mirrors App.jsx), and the standard footer.
export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background effects — same treatment as the landing page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[150px]" />
      </div>

      <SiteNav waitlistHref="/#waitlist" />

      <main className="relative pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>

      <Footer />
    </div>
  )
}
