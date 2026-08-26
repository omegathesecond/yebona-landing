// Minimal toast system for the admin dashboard. A failure must always be VISIBLE
// (CLAUDE.md: no silent fallbacks) — every caught ApiError is pushed here as an
// error toast, every completed admin action as a success toast.
import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { CheckCircle2, AlertTriangle, X } from 'lucide-react'

const ToastContext = createContext(null)

// eslint-disable-next-line react-refresh/only-export-components -- context hook colocated with its provider
export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within <ToastProvider>')
  return ctx
}

let nextId = 1

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const push = useCallback(
    (type, message) => {
      const id = nextId++
      setToasts((t) => [...t, { id, type, message }])
      // Errors linger longer so they can't be missed.
      const ttl = type === 'error' ? 8000 : 4000
      setTimeout(() => dismiss(id), ttl)
    },
    [dismiss]
  )

  // MUST be memoized. Pages put `toast` in the dependency list of the
  // useCallback that loads their data, so a fresh object literal here would
  // give every provider re-render a new `toast` identity, a new `load`, and
  // therefore a re-run of the load effect. Two ways that bites:
  //   - a success toast after an admin action refetches the list and clobbers
  //     the in-place row update the action just applied;
  //   - an error toast refetches, fails, and toasts again — a self-sustaining
  //     loop that only stops when the API starts rate-limiting.
  // `push` is already stable (useCallback over a stable `dismiss`), so this
  // makes the context value stable for the life of the provider.
  const api = useMemo(
    () => ({
      success: (message) => push('success', message),
      error: (message) => push('error', message),
    }),
    [push]
  )

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex w-full max-w-sm flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            role={t.type === 'error' ? 'alert' : 'status'}
            className={`flex items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${
              t.type === 'error'
                ? 'border-red-200 bg-red-50 text-red-800'
                : 'border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            {t.type === 'error' ? (
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
            ) : (
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
            )}
            <p className="flex-1 text-sm font-medium leading-snug">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
