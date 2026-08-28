// Admin audit trail — read-only view of every privileged admin mutation
// (provider verify/suspend, dispute resolve, payout retry). Backed by
// GET /api/admin/audit-log; this is the ops/dispute-defense/compliance view
// answering "who did what, to which target, and why."
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

const ACTIONS = [
  'provider.verify',
  'provider.suspend',
  'dispute.resolve.release',
  'dispute.resolve.refund',
  'transaction.payout.retry',
  'transaction.payout.retry.failed',
  'transaction.payout.manual_settle',
]

const TARGET_TYPES = ['provider', 'transaction']

const PAGE_SIZE = 50

// Colors the action pill by severity: failed attempts read as a warning,
// everything else as neutral — this is a read log, not a status board.
function actionClass(action) {
  if (action.endsWith('.failed')) return 'bg-amber-50 text-amber-700'
  if (action.startsWith('dispute.')) return 'bg-blue-50 text-blue-700'
  if (action.startsWith('provider.')) return 'bg-slate-100 text-slate-700'
  return 'bg-emerald-50 text-emerald-700'
}

export default function AuditLog() {
  const toast = useToast()
  const [entries, setEntries] = useState([])
  const [total, setTotal] = useState(0)
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({ targetType: '', action: '', actor: '', targetId: '' })

  const load = useCallback(
    async (nextOffset = offset) => {
      setLoading(true)
      setError('')
      try {
        const res = await adminApi.listAuditLog({ ...filters, limit: PAGE_SIZE, offset: nextOffset })
        setEntries(res.data || [])
        setTotal(res.total || 0)
        setOffset(nextOffset)
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : String(err)
        setError(msg)
        toast.error(`Failed to load audit log: ${msg}`)
      } finally {
        setLoading(false)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters, toast]
  )

  // Refetch from the top whenever filters change; page nav calls load() directly.
  useEffect(() => {
    load(0)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters])

  const setFilter = (key) => (e) => setFilters((f) => ({ ...f, [key]: e.target.value }))

  const page = Math.floor(offset / PAGE_SIZE) + 1
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))

  return (
    <div>
      <PageHeader
        title="Audit log"
        subtitle="Every privileged admin action — who did what, to which target, and why."
        onRefresh={() => load(offset)}
        refreshing={loading}
      />

      <div className="mb-4 flex flex-wrap gap-2">
        <select
          value={filters.targetType}
          onChange={setFilter('targetType')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
        >
          <option value="">All target types</option>
          {TARGET_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          value={filters.action}
          onChange={setFilter('action')}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700"
        >
          <option value="">All actions</option>
          {ACTIONS.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
        <input
          value={filters.targetId}
          onChange={setFilter('targetId')}
          placeholder="Target ID"
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400"
        />
        <input
          value={filters.actor}
          onChange={setFilter('actor')}
          placeholder="Actor"
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400"
        />
      </div>

      {loading ? (
        <Loading label="Loading audit log…" />
      ) : error ? (
        <ErrorState message={error} onRetry={() => load(offset)} />
      ) : entries.length === 0 ? (
        <Empty message="No audit entries match these filters." />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">When</th>
                  <th className="px-4 py-2.5 font-semibold">Actor</th>
                  <th className="px-4 py-2.5 font-semibold">Action</th>
                  <th className="px-4 py-2.5 font-semibold">Target</th>
                  <th className="px-4 py-2.5 font-semibold">Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {entries.map((e) => (
                  <tr key={e.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-500">{formatDate(e.createdAt)}</td>
                    <td className="px-4 py-3 font-medium text-slate-800">{e.actor}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${actionClass(e.action)}`}>
                        {e.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-slate-700">{e.targetType}</div>
                      <div className="font-mono text-xs text-slate-400">{e.targetId}</div>
                    </td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{e.reason || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
            <span>
              {total} {total === 1 ? 'entry' : 'entries'} · page {page} of {pageCount}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => load(Math.max(0, offset - PAGE_SIZE))}
                disabled={offset === 0 || loading}
                className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </button>
              <button
                onClick={() => load(offset + PAGE_SIZE)}
                disabled={offset + PAGE_SIZE >= total || loading}
                className="flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-40"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
