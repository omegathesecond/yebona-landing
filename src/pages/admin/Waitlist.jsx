// Waitlist admin page — the operator's only view into who has joined the
// pre-launch waitlist short of curling the API with the dashboard key. Yebona
// is pre-launch: the landing page's #waitlist form (App.jsx) IS the entire
// top-of-funnel. Backed by GET/PATCH/DELETE /api/waitlist (db.waitlist.*).
import { useState, useEffect, useCallback } from 'react'
import { Loader2, Trash2, Users } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

// Status is a free-text column in the DB (no CHECK constraint, defaults to
// 'pending' on signup) — these are the triage states an operator moves an
// entry through, not a DB-enforced enum.
const STATUSES = [
  { value: '', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'invited', label: 'Invited' },
  { value: 'declined', label: 'Declined' },
]

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-800',
  contacted: 'bg-blue-100 text-blue-800',
  invited: 'bg-emerald-100 text-emerald-800',
  declined: 'bg-red-100 text-red-800',
}

const PAGE_SIZE = 20

export default function Waitlist() {
  const toast = useToast()
  const [status, setStatus] = useState('')
  const [product, setProduct] = useState('')
  const [interest, setInterest] = useState('')
  const [offset, setOffset] = useState(0)
  const [entries, setEntries] = useState([])
  const [total, setTotal] = useState(0)
  const [stats, setStats] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null) // `${id}:${action}` while in flight

  const load = useCallback(
    async (nextOffset = offset) => {
      setLoading(true)
      setError('')
      try {
        const res = await adminApi.listWaitlist({ product, status, interest, limit: PAGE_SIZE, offset: nextOffset })
        setEntries(res.entries || [])
        setTotal(typeof res.total === 'number' ? res.total : (res.entries || []).length)
        setStats(res.stats || {})
        setOffset(nextOffset)
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : String(err)
        setError(msg)
        toast.error(`Failed to load waitlist: ${msg}`)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [product, status, interest, toast]
  )

  // Refetch from the top whenever a filter changes; page nav calls load() directly.
  useEffect(() => {
    load(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, status, interest])

  const updateStatus = async (entry, newStatus) => {
    if (newStatus === entry.status) return
    setBusyId(`${entry.id}:status`)
    try {
      const res = await adminApi.updateWaitlistEntry(entry.id, { status: newStatus })
      setEntries((list) => list.map((e) => (e.id === entry.id ? { ...e, ...res.entry } : e)))
      toast.success(`Marked ${entry.name} as ${newStatus}.`)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Update failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const remove = async (entry) => {
    if (!window.confirm(`Permanently delete ${entry.name}'s waitlist entry? This cannot be undone.`)) return
    setBusyId(`${entry.id}:delete`)
    try {
      await adminApi.deleteWaitlistEntry(entry.id)
      toast.success(`Deleted ${entry.name}.`)
      setEntries((list) => list.filter((e) => e.id !== entry.id))
      setTotal((t) => Math.max(0, t - 1))
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Delete failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const productStats = Object.entries(stats)
  const page = Math.floor(offset / PAGE_SIZE) + 1
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div>
      <PageHeader
        title="Waitlist"
        subtitle="Pre-launch signups from the landing page's waitlist form."
        onRefresh={() => load(offset)}
        refreshing={loading}
      />

      {productStats.length > 0 && (
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {productStats.map(([prod, s]) => (
            <div
              key={prod}
              className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <Users className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs text-slate-500">{prod}</p>
                <p className="text-xl font-bold text-slate-900">{s.total.toLocaleString()}</p>
                <p className="mt-0.5 truncate text-xs text-slate-400">
                  {Object.entries(s.byInterest || {})
                    .map(([interest, count]) => `${interest}: ${count}`)
                    .join(' · ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          {STATUSES.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <input
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Filter by product…"
          aria-label="Filter by product"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          placeholder="Filter by interest…"
          aria-label="Filter by interest"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
      </div>

      {loading ? (
        <Loading label="Loading waitlist…" />
      ) : error ? (
        <ErrorState message={error} onRetry={() => load(offset)} />
      ) : entries.length === 0 ? (
        <Empty message="No waitlist signups match these filters." />
      ) : (
        <>
          <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Name</th>
                  <th className="px-4 py-2.5 font-semibold">Phone</th>
                  <th className="px-4 py-2.5 font-semibold">Interest</th>
                  <th className="px-4 py-2.5 font-semibold">Product</th>
                  <th className="px-4 py-2.5 font-semibold">Source</th>
                  <th className="px-4 py-2.5 font-semibold">Country</th>
                  <th className="px-4 py-2.5 font-semibold">Status</th>
                  <th className="px-4 py-2.5 font-semibold">Joined</th>
                  <th className="px-4 py-2.5 font-semibold" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entries.map((e) => {
                  const updatingStatus = busyId === `${e.id}:status`
                  const deleting = busyId === `${e.id}:delete`
                  const anyBusy = updatingStatus || deleting
                  return (
                    <tr key={e.id}>
                      <td className="px-4 py-3 font-medium text-slate-800">{e.name}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">{e.phone}</td>
                      <td className="max-w-[16rem] px-4 py-3 text-slate-600">{e.interest || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{e.product || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{e.source || '—'}</td>
                      <td className="px-4 py-3 text-slate-600">{e.country || '—'}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                              STATUS_BADGE[e.status] || 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {e.status}
                          </span>
                          {updatingStatus && <Loader2 className="h-3.5 w-3.5 animate-spin text-slate-400" />}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(e.createdAt)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={e.status}
                            onChange={(ev) => updateStatus(e, ev.target.value)}
                            disabled={anyBusy}
                            aria-label={`Change status for ${e.name}`}
                            className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs text-slate-700 disabled:opacity-60"
                          >
                            {STATUSES.filter((s) => s.value).map((s) => (
                              <option key={s.value} value={s.value}>
                                {s.label}
                              </option>
                            ))}
                          </select>
                          <button
                            onClick={() => remove(e)}
                            disabled={anyBusy}
                            aria-label={`Delete ${e.name}`}
                            className="flex items-center justify-center rounded-lg border border-red-300 bg-white p-1.5 text-red-700 hover:bg-red-50 disabled:opacity-60"
                          >
                            {deleting ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Trash2 className="h-4 w-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>
              {total} {total === 1 ? 'signup' : 'signups'} · page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => load(Math.max(0, offset - PAGE_SIZE))}
                disabled={offset === 0 || loading}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                Prev
              </button>
              <button
                onClick={() => load(offset + PAGE_SIZE)}
                disabled={offset + PAGE_SIZE >= total || loading}
                className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
