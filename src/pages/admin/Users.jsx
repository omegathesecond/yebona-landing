// End-user (demand-side) account console. Lists buyers with the abuse signals
// against them, and lets an operator suspend or reinstate an account — the
// counterpart to the provider queue, which only covers the supply side.
//
// Suspending is enforced server-side at login, at token refresh, and on every
// authenticated request, so it takes effect immediately rather than whenever
// the user's current access token happens to expire.
import { useState, useEffect, useCallback } from 'react'
import {
  Ban,
  UserCheck,
  MapPin,
  Loader2,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  Flag,
  Store,
  ShieldOff,
  Mail,
  Phone,
} from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

const STATUSES = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
]

const PAGE_SIZE = 20
const SEARCH_DEBOUNCE_MS = 300

// Mirrors MAX_REASON_LENGTH in the API's adminUserController — enforced here
// too so the operator sees the limit while typing instead of eating a 400.
const MAX_REASON_LENGTH = 500

const STATUS_BADGE = {
  active: 'bg-emerald-100 text-emerald-800',
  suspended: 'bg-red-100 text-red-800',
}

// Confirmation dialog for the two account actions. Suspending cuts someone off
// from the platform entirely, so it gets a real modal naming the account rather
// than the bare window.prompt used on the lower-stakes provider queue — and the
// reason is length-checked here so the limit is visible before submitting.
function ActionDialog({ user, action, busy, onCancel, onConfirm }) {
  const [reason, setReason] = useState('')
  const suspending = action === 'suspend'
  const tooLong = reason.length > MAX_REASON_LENGTH
  const label = user.name || user.phoneNumber || user.id

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="action-dialog-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <h2 id="action-dialog-title" className="text-lg font-bold text-slate-900">
          {suspending ? 'Suspend account' : 'Reinstate account'}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {suspending ? (
            <>
              <span className="font-semibold text-slate-900">{label}</span> will be signed out of
              every device and blocked from signing in again.
              {user.provider && user.provider.status !== 'suspended' && (
                <> Their provider profile will be suspended out of public search too.</>
              )}
            </>
          ) : (
            <>
              <span className="font-semibold text-slate-900">{label}</span> will be able to sign in
              again.
              {user.provider && user.provider.status === 'suspended' && (
                <>
                  {' '}
                  Their provider profile stays suspended — verify it separately from the Providers
                  tab if it should return to public search.
                </>
              )}
            </>
          )}
        </p>

        <label
          htmlFor="action-reason"
          className="mt-4 mb-1.5 block text-sm font-semibold text-slate-700"
        >
          Reason <span className="font-normal text-slate-400">(optional)</span>
        </label>
        <textarea
          id="action-reason"
          autoFocus
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder={
            suspending ? 'e.g. repeated payment fraud' : 'e.g. appeal upheld — reports dismissed'
          }
          className={`w-full resize-none rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 ${
            tooLong
              ? 'border-red-400 focus:border-red-500 focus:ring-red-400'
              : 'border-slate-300 focus:border-blue-500 focus:ring-blue-400'
          }`}
        />
        <p className={`mt-1 text-xs ${tooLong ? 'font-medium text-red-600' : 'text-slate-400'}`}>
          {reason.length}/{MAX_REASON_LENGTH}
          {suspending && ' · sent to the user and recorded in the audit log'}
          {!suspending && ' · recorded in the audit log'}
        </p>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="flex-1 rounded-lg border border-slate-300 bg-white py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onConfirm(reason.trim())}
            disabled={busy || tooLong}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-sm font-semibold text-white disabled:opacity-60 ${
              suspending ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'
            }`}
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {suspending ? 'Suspend account' : 'Reinstate account'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Users() {
  const toast = useToast()
  const [status, setStatus] = useState('all')
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialog, setDialog] = useState(null) // { user, action }
  const [busy, setBusy] = useState(false)

  // Debounce the search box so we don't hit the API on every keystroke, and
  // reset to the first page since the old offset is meaningless for a new query.
  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(searchInput)
      setPage(0)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [searchInput])

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.listUsers(status, {
        search,
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      })
      setUsers(res.data || [])
      setTotal(typeof res.total === 'number' ? res.total : (res.data || []).length)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load users: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [status, search, page, toast])

  useEffect(() => {
    load()
  }, [load])

  const selectStatus = (value) => {
    setStatus(value)
    setPage(0)
  }

  const clearSearch = () => {
    setSearchInput('')
    setSearch('')
    setPage(0)
  }

  const offset = page * PAGE_SIZE
  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = offset + users.length
  const hasPrev = page > 0
  const hasNext = rangeEnd < total

  const confirmAction = async (reason) => {
    const { user, action } = dialog
    setBusy(true)
    try {
      const res =
        action === 'suspend'
          ? await adminApi.suspendUser(user.id, reason)
          : await adminApi.reinstateUser(user.id, reason)

      const label = user.name || user.phoneNumber || user.id
      toast.success(action === 'suspend' ? `Suspended ${label}.` : `Reinstated ${label}.`)
      setDialog(null)

      // Patch the row in place from the server's response, so the card reflects
      // what actually happened (including the provider cascade) without a full
      // reload. On the filtered tabs the row no longer belongs, so drop it.
      const updated = res.data
      if (status === 'all') {
        setUsers((rows) =>
          rows.map((r) =>
            r.id === user.id
              ? // Keep the report counters from the list — the mutation
                // response deliberately returns them as null (not loaded).
                { ...r, ...updated, reportCount: r.reportCount, openReportCount: r.openReportCount }
              : r
          )
        )
      } else {
        const remaining = users.filter((r) => r.id !== user.id)
        setUsers(remaining)
        setTotal((t) => Math.max(0, t - 1))
        if (remaining.length === 0 && page > 0) setPage((p) => Math.max(0, p - 1))
      }
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Action failed: ${msg}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <PageHeader
        title="User accounts"
        subtitle="Search buyers, review reports against them, and suspend or reinstate an account."
        onRefresh={load}
        refreshing={loading}
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
          {STATUSES.map((s) => (
            <button
              key={s.value}
              onClick={() => selectStatus(s.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                status === s.value ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div className="relative min-w-0 flex-1 sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search name, email, phone, user id…"
            aria-label="Search users"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <Loading label="Loading users…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : users.length === 0 ? (
        <Empty
          message={
            search.trim()
              ? `No ${status === 'all' ? '' : status + ' '}users match “${search.trim()}”.`
              : `No ${status === 'all' ? '' : status + ' '}users.`
          }
        />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {users.map((u) => (
            <div key={u.id} className="flex flex-col rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">
                      {u.name || (u.isDeleted ? 'Deleted account' : 'Unnamed user')}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        STATUS_BADGE[u.status] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {u.status}
                    </span>
                    {u.isDeleted && (
                      <span className="shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-500">
                        self-deleted
                      </span>
                    )}
                    {u.openReportCount > 0 && (
                      <span
                        title={`${u.openReportCount} open of ${u.reportCount} total report(s)`}
                        className="flex shrink-0 items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800"
                      >
                        <Flag className="h-3 w-3" />
                        {u.openReportCount} open
                      </span>
                    )}
                  </div>

                  <div className="mt-1 space-y-0.5 text-sm text-slate-500">
                    {/* A self-deleted account's phone is a `deleted_<id>`
                        placeholder, not a real number — don't present it as one. */}
                    {!u.isDeleted && u.phoneNumber && (
                      <p className="flex items-center gap-1.5 truncate">
                        <Phone className="h-3.5 w-3.5 shrink-0" />
                        {u.phoneNumber}
                      </p>
                    )}
                    {u.email && (
                      <p className="flex items-center gap-1.5 truncate">
                        <Mail className="h-3.5 w-3.5 shrink-0" />
                        {u.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                {u.country && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {u.country}
                  </span>
                )}
                {u.provider && (
                  <span
                    className="flex items-center gap-1"
                    title="This account also runs a provider profile"
                  >
                    <Store className="h-3.5 w-3.5" />
                    {u.provider.businessName || 'Provider'} ({u.provider.status})
                  </span>
                )}
                {u.reportCount > 0 && (
                  <span className="flex items-center gap-1">
                    <Flag className="h-3.5 w-3.5" />
                    {u.reportCount} report{u.reportCount === 1 ? '' : 's'} total
                  </span>
                )}
                <span>Joined {formatDate(u.createdAt)}</span>
              </div>

              <p className="mt-1.5 truncate font-mono text-[11px] text-slate-400" title={u.id}>
                {u.id}
              </p>

              {u.status === 'suspended' && (
                <div className="mt-3 rounded-lg border border-red-200 bg-red-50 p-2.5 text-xs">
                  <p className="flex items-center gap-1.5 font-semibold text-red-800">
                    <ShieldOff className="h-3.5 w-3.5" />
                    Suspended {formatDate(u.suspendedAt)}
                  </p>
                  {u.suspensionReason && (
                    <p className="mt-1 whitespace-pre-wrap break-words text-red-700">
                      {u.suspensionReason}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-4 flex gap-2">
                {u.status === 'suspended' ? (
                  <button
                    onClick={() => setDialog({ user: u, action: 'reinstate' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  >
                    <UserCheck className="h-4 w-4" />
                    Reinstate
                  </button>
                ) : (
                  <button
                    onClick={() => setDialog({ user: u, action: 'suspend' })}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
                  >
                    <Ban className="h-4 w-4" />
                    Suspend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && total > 0 && (
        <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-600">
          <span>
            Showing <span className="font-medium text-slate-900">{rangeStart}</span>–
            <span className="font-medium text-slate-900">{rangeEnd}</span> of{' '}
            <span className="font-medium text-slate-900">{total}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={!hasPrev}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {dialog && (
        <ActionDialog
          // Remount on target change so the reason box never carries a previous
          // account's text into a new decision.
          key={`${dialog.user.id}-${dialog.action}`}
          user={dialog.user}
          action={dialog.action}
          busy={busy}
          onCancel={() => !busy && setDialog(null)}
          onConfirm={confirmAction}
        />
      )}
    </div>
  )
}
