// Abuse-report moderation queue. Lists reports filed by users against a
// provider profile, a review, or a conversation/message, and lets an operator
// triage each one — dismiss it, mark it reviewed, or (review reports only)
// remove the flagged review outright.
import { useState, useEffect, useCallback } from 'react'
import { Flag, Loader2, ShieldOff, Check, X, Star, Store } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

const STATUSES = [
  { value: 'open', label: 'Open' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'dismissed', label: 'Dismissed' },
]

const CONTEXT_TYPES = [
  { value: '', label: 'All types' },
  { value: 'provider', label: 'Provider' },
  { value: 'review', label: 'Review' },
  { value: 'conversation', label: 'Conversation' },
  { value: 'message', label: 'Message' },
]

const CONTEXT_BADGE = {
  provider: 'bg-blue-100 text-blue-800',
  review: 'bg-purple-100 text-purple-800',
  conversation: 'bg-amber-100 text-amber-800',
  message: 'bg-amber-100 text-amber-800',
}

const PAGE_SIZE = 20

// The flagged content itself, when the API was able to enrich it — a review's
// rating + text, or the provider profile the report was filed against.
function FlaggedContent({ report }) {
  const { contextType, context } = report
  if (!context) return null

  if (context.deleted) {
    return <p className="mt-2 text-xs italic text-slate-400">The flagged content no longer exists.</p>
  }

  if (contextType === 'review') {
    return (
      <div className="mt-2 rounded-lg border-l-2 border-purple-300 bg-purple-50 px-3 py-2">
        <p className="flex items-center gap-1 text-xs font-semibold text-purple-800">
          <Star className="h-3.5 w-3.5" />
          {Number(context.rating || 0).toFixed(1)} rating
        </p>
        <p className="mt-1 whitespace-pre-wrap text-sm text-purple-900">{context.text}</p>
      </div>
    )
  }

  if (contextType === 'provider') {
    return (
      <div className="mt-2 flex items-center gap-1.5 rounded-lg border-l-2 border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-900">
        <Store className="h-3.5 w-3.5" />
        {context.businessName || 'Unnamed provider'}
        <span className="text-xs text-blue-600">· {context.status}</span>
      </div>
    )
  }

  return null
}

export default function Reports() {
  const toast = useToast()
  const [status, setStatus] = useState('open')
  const [contextType, setContextType] = useState('')
  const [page, setPage] = useState(0)
  const [reports, setReports] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null) // `${id}:${action}` while in flight

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.listReports(status, {
        contextType,
        limit: PAGE_SIZE,
        offset: page * PAGE_SIZE,
      })
      setReports(res.data || [])
      setTotal(typeof res.total === 'number' ? res.total : (res.data || []).length)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load reports: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [status, contextType, page, toast])

  useEffect(() => {
    load()
  }, [load])

  const selectStatus = (value) => {
    setStatus(value)
    setPage(0)
  }

  const selectContextType = (value) => {
    setContextType(value)
    setPage(0)
  }

  // Drop a triaged report out of the current (open) view and shrink the total,
  // so the operator sees the queue actually shrink instead of a stale item.
  const dropFromView = (id) => {
    setReports((list) => list.filter((r) => r.id !== id))
    setTotal((t) => Math.max(0, t - 1))
  }

  const triage = async (report, newStatus) => {
    // A cancelled prompt returns null; only abort on an explicit Cancel, not on
    // an intentionally blank note (window.prompt returns '' — falsy but not
    // null — if the operator clears the field and hits OK). Do NOT coalesce the
    // null away before this check, or Cancel would silently action the report.
    const note = window.prompt(
      `Optional note for ${newStatus === 'dismissed' ? 'dismissing' : 'resolving'} this report:`
    )
    if (note === null) return

    setBusyId(`${report.id}:${newStatus}`)
    try {
      await adminApi.resolveReport(report.id, newStatus, note?.trim())
      toast.success(`Report marked ${newStatus}.`)
      dropFromView(report.id)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Action failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const removeReview = async (report) => {
    if (!window.confirm('Permanently delete this review? This cannot be undone.')) return
    setBusyId(`${report.id}:remove`)
    try {
      await adminApi.removeReportedContent(report.id)
      toast.success('Review removed.')
      dropFromView(report.id)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Removal failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const suspendReportedProvider = async (report) => {
    const reason = window.prompt(
      'Optional reason to send the provider (leave blank for a generic message):'
    )
    if (reason === null) return
    setBusyId(`${report.id}:suspend`)
    try {
      await adminApi.suspendProvider(report.contextId, reason.trim())
      toast.success('Provider suspended.')
      // Suspending doesn't itself resolve the report — do that too so it
      // leaves the open queue in one action.
      await adminApi.resolveReport(report.id, 'reviewed', 'Provider suspended.')
      dropFromView(report.id)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Action failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const offset = page * PAGE_SIZE
  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = offset + reports.length
  const hasPrev = page > 0
  const hasNext = rangeEnd < total

  return (
    <div>
      <PageHeader
        title="Abuse reports"
        subtitle="Triage reports filed against providers, reviews and conversations."
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

        <select
          value={contextType}
          onChange={(e) => selectContextType(e.target.value)}
          aria-label="Filter by content type"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
        >
          {CONTEXT_TYPES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <Loading label="Loading reports…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : reports.length === 0 ? (
        <Empty message={`No ${status} reports.`} />
      ) : (
        <div className="space-y-3">
          {reports.map((r) => {
            const dismissing = busyId === `${r.id}:dismissed`
            const resolving = busyId === `${r.id}:reviewed`
            const removing = busyId === `${r.id}:remove`
            const suspending = busyId === `${r.id}:suspend`
            const anyBusy = dismissing || resolving || removing || suspending

            return (
              <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                          CONTEXT_BADGE[r.contextType] || 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        <Flag className="h-3 w-3" />
                        {r.contextType}
                      </span>
                      <span className="text-xs text-slate-400">reported {formatDate(r.createdAt)}</span>
                    </div>
                    <p className="mt-1.5 text-sm text-slate-800">{r.reason}</p>
                  </div>
                </div>

                <FlaggedContent report={r} />

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Reporter</span>{' '}
                    {r.reporter?.name || r.reporter?.id || 'Unknown'}
                    {r.reporter?.phoneNumber ? ` · ${r.reporter.phoneNumber}` : ''}
                  </div>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-600">Reported</span>{' '}
                    {r.reportedUser?.name || r.reportedUser?.id || 'Unknown'}
                    {r.reportedUser?.phoneNumber ? ` · ${r.reportedUser.phoneNumber}` : ''}
                  </div>
                </div>

                {status === 'open' && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <button
                      onClick={() => triage(r, 'reviewed')}
                      disabled={anyBusy}
                      className="flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                    >
                      {resolving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                      Mark resolved
                    </button>
                    <button
                      onClick={() => triage(r, 'dismissed')}
                      disabled={anyBusy}
                      className="flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                    >
                      {dismissing ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
                      Dismiss
                    </button>
                    {r.contextType === 'review' && r.contextId && !r.context?.deleted && (
                      <button
                        onClick={() => removeReview(r)}
                        disabled={anyBusy}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        {removing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldOff className="h-4 w-4" />}
                        Remove review
                      </button>
                    )}
                    {r.contextType === 'provider' && r.contextId && r.context?.status !== 'suspended' && (
                      <button
                        onClick={() => suspendReportedProvider(r)}
                        disabled={anyBusy}
                        className="flex items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                      >
                        {suspending ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldOff className="h-4 w-4" />}
                        Suspend provider
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
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
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
