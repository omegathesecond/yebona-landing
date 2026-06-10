// Disputes queue. Lists open disputes (frozen escrow) and lets an operator
// settle each one to RELEASE the escrow to the provider or REFUND it to the
// buyer — the only way a frozen escrow reaches a terminal state.
import { useState, useEffect, useCallback } from 'react'
import { ArrowRightCircle, Undo2, Loader2, User, Store } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatMoney, formatDate } from '../../lib/format'

export default function Disputes() {
  const toast = useToast()
  const [disputes, setDisputes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(null) // `${id}:${outcome}` while in flight

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.listDisputes()
      setDisputes(res.data?.items || [])
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load disputes: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const resolve = async (dispute, outcome) => {
    const verb = outcome === 'release' ? 'RELEASE escrow to the provider' : 'REFUND escrow to the buyer'
    if (!window.confirm(`Resolve dispute on ${dispute.requestTitle || dispute.transactionId} — ${verb}?`)) {
      return
    }
    const note = window.prompt('Optional resolution note (recorded on the transaction):') || ''
    setBusy(`${dispute.transactionId}:${outcome}`)
    try {
      const res = await adminApi.resolveDispute(dispute.transactionId, outcome, note.trim())
      // res.message distinguishes a real settlement from "pending settlement"
      // when the payout/refund rail is down — surface it verbatim, loudly.
      toast.success(res.message || 'Dispute resolved.')
      setDisputes((list) => list.filter((d) => d.transactionId !== dispute.transactionId))
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Resolution failed: ${msg}`)
    } finally {
      setBusy(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Disputes"
        subtitle="Settle frozen escrow — release to the provider or refund the buyer."
        onRefresh={load}
        refreshing={loading}
      />

      {loading ? (
        <Loading label="Loading disputes…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : disputes.length === 0 ? (
        <Empty message="No open disputes. 🎉" />
      ) : (
        <div className="space-y-3">
          {disputes.map((d) => {
            const releasing = busy === `${d.transactionId}:release`
            const refunding = busy === `${d.transactionId}:refund`
            const anyBusy = releasing || refunding
            return (
              <div key={d.transactionId} className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-slate-900">
                      {d.requestTitle || 'Untitled request'}
                    </h3>
                    <p className="mt-0.5 font-mono text-xs text-slate-400">txn {d.transactionId}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900">{formatMoney(d.amount, d.currency)}</p>
                    <p className="text-xs text-slate-500">
                      provider payout {formatMoney(d.providerPayout, d.currency)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-500">Buyer</span>
                    <span className="font-medium text-slate-800">{d.buyerName || d.buyerId}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                    <Store className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-500">Provider</span>
                    <span className="font-medium text-slate-800">
                      {d.providerBusinessName || d.providerId}
                    </span>
                  </div>
                </div>

                {d.disputeReason && (
                  <p className="mt-2 rounded-lg border-l-2 border-amber-400 bg-amber-50 px-3 py-2 text-sm text-amber-900">
                    <span className="font-semibold">Reason:</span> {d.disputeReason}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  Opened {formatDate(d.openedAt)}
                  {d.openedBy ? ` · by ${d.openedBy}` : ''}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => resolve(d, 'release')}
                    disabled={anyBusy}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {releasing ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRightCircle className="h-4 w-4" />}
                    Release to provider
                  </button>
                  <button
                    onClick={() => resolve(d, 'refund')}
                    disabled={anyBusy}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    {refunding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Undo2 className="h-4 w-4" />}
                    Refund buyer
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
