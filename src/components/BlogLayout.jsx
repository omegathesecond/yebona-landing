import { Globe } from 'lucide-react'
import BlogHeader from './BlogHeader'

// Page shell shared by the blog index and post pages: dark slate background,
// fixed nav, ambient glows (mirrors App.jsx), and the standard footer.
export default function BlogLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background effects — same treatment as the landing page */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[150px]" />
      </div>

      <BlogHeader />

      <main className="relative pt-28 pb-20 px-6">
        <div className="max-w-3xl mx-auto">{children}</div>
      </main>

      <footer className="py-10 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Yebona</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 Yebona. Part of{' '}
              <a href="https://omevision.com" className="text-blue-400 hover:underline">Omevision</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
