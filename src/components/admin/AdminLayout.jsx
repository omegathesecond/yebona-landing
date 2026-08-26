// Admin operations dashboard shell: sign-in gate + nav + page outlet.
//
// The gate stores the dashboard API key (browser-only) and validates it with a
// real authenticated call before letting the operator in, so a wrong key is
// rejected up front instead of failing silently on every page.
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { ShieldCheck, BadgeCheck, Users, Scale, Wallet, LogOut, KeyRound, Loader2 } from 'lucide-react'
import { adminApi, getApiKey, setApiKey, clearApiKey, ApiError } from '../../lib/adminApi'
import { ToastProvider } from './Toast'

function SignIn({ onSignedIn }) {
  const [key, setKey] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    const trimmed = key.trim()
    if (!trimmed) {
      setError('Enter the dashboard API key.')
      return
    }
    setBusy(true)
    setError('')
    // Store first (the client reads the key from storage), then verify with a
    // real call. If verification fails, clear it back out — never keep a bad key.
    setApiKey(trimmed)
    try {
      await adminApi.verifyKey()
      onSignedIn()
    } catch (err) {
      clearApiKey()
      setError(
        err instanceof ApiError && err.status === 401
          ? 'That API key was rejected. Check it and try again.'
          : err.message || 'Could not verify the API key.'
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Yebona Admin Ops</h1>
            <p className="text-sm text-slate-500">Providers · users · disputes · payouts</p>
          </div>
        </div>

        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Dashboard API key
        </label>
        <div className="relative">
          <KeyRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="password"
            autoFocus
            value={key}
            onChange={(e) => setKey(e.target.value)}
            placeholder="Paste the dashboard key"
            className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 focus:border-blue-500"
          />
        </div>

        {error && (
          <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {busy ? 'Verifying…' : 'Sign in'}
        </button>

        <p className="mt-4 text-center text-xs text-slate-400">
          The key is stored only in this browser and sent as the X-API-Key header.
        </p>
      </form>
    </div>
  )
}

const NAV = [
  { to: '/admin', end: true, label: 'Providers', icon: BadgeCheck },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/disputes', label: 'Disputes', icon: Scale },
  { to: '/admin/payouts', label: 'Owed payouts', icon: Wallet },
]

export default function AdminLayout() {
  // A key in storage means a prior successful sign-in (we only ever store
  // verified keys). Re-render on sign-in/out by bumping this flag.
  const [authed, setAuthed] = useState(() => Boolean(getApiKey()))
  const navigate = useNavigate()

  if (!authed) return <SignIn onSignedIn={() => setAuthed(true)} />

  const signOut = () => {
    clearApiKey()
    setAuthed(false)
    navigate('/admin')
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <span className="font-bold">Yebona Admin Ops</span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </div>
          <nav className="mx-auto flex max-w-6xl gap-1 px-2">
            {NAV.map((item) => {
              const Icon = item.icon
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? 'border-blue-600 text-blue-700'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6">
          <Outlet />
        </main>
      </div>
    </ToastProvider>
  )
}
