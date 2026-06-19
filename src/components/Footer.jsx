import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

// Shared site footer used by the landing page and the blog/legal pages.
// Keeps the brand row, copyright, and the legal/utility links in one place so
// they stay consistent (and so legal links can't silently go missing on one
// page but not another).
export default function Footer() {
  return (
    <footer className="py-10 px-6 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold">Yebona</span>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
            <Link to="/blog" className="text-slate-400 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/privacy" className="text-slate-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-slate-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </nav>

          <p className="text-slate-500 text-sm">
            © 2025 Yebona. Part of{' '}
            <a href="https://omevision.com" className="text-blue-400 hover:underline">Omevision</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
