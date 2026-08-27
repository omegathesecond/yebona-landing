import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Globe, Menu, X } from 'lucide-react'

// Secondary links that sit beside the CTA. Declared once so the desktop row and
// the mobile dropdown can never drift apart.
const NAV_LINKS = [
  { to: '/pricing', label: 'Pricing' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Shared fixed top nav for every page (landing page + blog/legal pages).
 *
 * The bar has to stay a single ~73px row at ALL widths: pages clear the fixed
 * nav with a hardcoded `pt-28` (112px), so a taller bar silently covers page
 * content. Three items in one flat row didn't fit on a phone — the CTA shrank
 * below its content width and wrapped onto three lines, pushing the bar to
 * 121px and overlapping the page by 9px. So below `sm` the secondary links
 * collapse into a dropdown and the CTA is `whitespace-nowrap`.
 *
 * @param {string} waitlistHref - `#waitlist` on the landing page (same-page
 *   scroll), or `/#waitlist` elsewhere (route back to the landing page first).
 */
export default function SiteNav({ waitlistHref }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname } = useLocation()
  const [navigatedFrom, setNavigatedFrom] = useState(pathname)

  // Close the dropdown on ANY navigation (link tap, back/forward, programmatic)
  // so it can't sit open over the page the visitor just asked for. Written as a
  // render-time adjustment rather than an effect on purpose: React treats
  // "reset state when something changes" as a render concern, and doing it in
  // an effect would cost an extra render pass (and trips react-hooks lint).
  if (pathname !== navigatedFrom) {
    setNavigatedFrom(pathname)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  // A bare `#waitlist` must stay a plain <a> so the browser scrolls to the
  // section; a router <Link> would treat it as a route change instead.
  const isSamePageAnchor = waitlistHref.startsWith('#')
  const Cta = isSamePageAnchor ? 'a' : Link
  const ctaProps = isSamePageAnchor ? { href: waitlistHref } : { to: waitlistHref }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">Yebona</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-6">
            <div className="hidden sm:flex items-center gap-6">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="text-slate-300 hover:text-white font-medium transition-colors whitespace-nowrap"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Cta
              {...ctaProps}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-4 sm:px-5 py-2 rounded-xl text-sm sm:text-base font-semibold transition-all shadow-lg shadow-blue-500/25 whitespace-nowrap shrink-0"
            >
              Get the App
            </Cta>

            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="site-nav-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="sm:hidden -mr-2 p-2 text-slate-300 hover:text-white transition-colors shrink-0"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div
            id="site-nav-menu"
            className="sm:hidden flex flex-col mt-4 pt-4 border-t border-white/5"
          >
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-slate-300 hover:text-white font-medium transition-colors py-2"
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
