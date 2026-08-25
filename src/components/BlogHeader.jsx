import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

// Shared top nav for the blog pages. Mirrors the landing nav's dark glass look
// (App.jsx) but uses router <Link>s so navigation stays a client-side SPA hop.
export default function BlogHeader() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Yebona</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link to="/blog" className="text-slate-300 hover:text-white font-medium transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-slate-300 hover:text-white font-medium transition-colors">
              Contact
            </Link>
            <Link
              to="/#waitlist"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
            >
              Get the App
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
