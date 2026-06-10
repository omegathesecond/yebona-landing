// Owed-payouts reconciliation. Lists escrow that's been released to providers on
// the ledger but whose payout never went out (the YeboPay payout rail 501s until
// it ships). Shows grand totals + a per-provider breakdown, and lets an operator
// retry each owed payout individually (safe — same idempotency key, no double-pay).
import { useState, useEffect, useCallback } from 'react'
import { RotateCw, Loader2, Wallet } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatMoney, formatDate } from '../../lib/format'

export default function Payouts() {
  const toast = useToast()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.listOwedPayouts()
      setData(res.data)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load owed payouts: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const retry = async (item) => {
    setBusyId(item.transactionId)
    try {
      const res = await adminApi.retryPayout(item.transactionId)
      toast.success(res.message || 'Provider payout sent.')
      // Paid now — drop it from the owed set and refresh totals.
      load()
    } catch (err) {
      // 501 = rail not live yet; the debt is still owed. Surface it, never fake.
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Retry failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  const totals = data?.totalsByCurrency || {}
  const breakdown = data?.providerBreakdown || []
  const items = data?.items || []

  return (
    <div>
      <PageHeader
        title="Owed payouts"
        subtitle="Released escrow whose provider payout hasn’t gone out yet."
        onRefresh={load}
        refreshing={loading}
      />

      {loading ? (
        <Loading label="Loading owed payouts…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : items.length === 0 ? (
        <Empty message="Nothing owed — every released payout has gone out. 🎉" />
      ) : (
        <div className="space-y-5">
          {/* Grand totals by currency */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(totals).map(([currency, amount]) => (
              <div
                key={currency}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Wallet className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Total owed</p>
                  <p className="text-lg font-bold text-slate-900">{formatMoney(amount, currency)}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div>
                <p className="text-xs text-slate-500">Transactions</p>
                <p className="text-lg font-bold text-slate-900">{data.count}</p>
              </div>
            </div>
          </div>

          {/* Per-provider breakdown */}
          {breakdown.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700">
                Per provider
              </div>
              <div className="divide-y divide-slate-100">
                {breakdown.map((b) => (
                  <div key={b.providerId} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="font-medium text-slate-800">
                      {b.providerBusinessName || b.providerId}
                    </span>
                    <span className="flex items-center gap-3 text-slate-600">
                      <span className="text-xs text-slate-400">{b.count} txn</span>
                      {Object.entries(b.totalsByCurrency || {}).map(([c, a]) => (
                        <span key={c} className="font-semibold">
                          {formatMoney(a, c)}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Per-transaction table with retry */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Provider</th>
                  <th className="px-4 py-2.5 font-semibold">Request</th>
                  <th className="px-4 py-2.5 font-semibold">Released</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Owed</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {items.map((item) => (
                  <tr key={item.transactionId}>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800">
                        {item.providerBusinessName || '—'}
                      </div>
                      <div className="font-mono text-xs text-slate-400">{item.transactionId}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.requestTitle || '—'}</td>
                    <td className="px-4 py-3 text-slate-500">{formatDate(item.releasedAt)}</td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-900">
                      {formatMoney(item.amountOwed, item.currency)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => retry(item)}
                        disabled={busyId === item.transactionId}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
                      >
                        {busyId === item.transactionId ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RotateCw className="h-4 w-4" />
                        )}
                        Retry
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
