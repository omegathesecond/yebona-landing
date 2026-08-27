// Disputes queue. Lists open disputes (frozen escrow) and lets an operator
// settle each one to RELEASE the escrow to the provider or REFUND it to the
// buyer — the only way a frozen escrow reaches a terminal state.
import { useState, useEffect, useCallback } from 'react'
import {
  ArrowRightCircle,
  Undo2,
  Loader2,
  User,
  Store,
  ChevronDown,
  ChevronUp,
  MessagesSquare,
  FileText,
} from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatMoney, formatDate } from '../../lib/format'

// Only http(s) urls are safe to render as a link — a proof/evidence url is
// operator-and-buyer-supplied, so a hostile `javascript:`/`data:` value must
// never be turned into a clickable href in the admin's session (stored XSS).
// Mirrors the same guard Providers.jsx uses for KYC document links.
const isSafeUrl = (url) => {
  try {
    const u = new URL(url, window.location.origin)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

function SafeLink({ url, children }) {
  if (!url) return null
  if (!isSafeUrl(url)) {
    return <span className="text-red-500">{children} (unsafe link)</span>
  }
  return (
    <a href={url} target="_blank" rel="noreferrer" className="text-blue-600 underline hover:text-blue-700">
      {children}
    </a>
  )
}

// The request/quote thread behind one dispute — the request itself, every
// competing quote (so an operator can see who else was in the running and at
// what price), and every transaction the request spawned with its dispute
// state + evidence embedded. This is the "how did we get here" view a
// dispute's transactionId/requestTitle alone can't answer.
function ThreadPanel({ thread }) {
  const { request, quotes, transactions } = thread

  return (
    <div className="mt-3 space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Request</p>
        <p className="mt-1 font-medium text-slate-800">{request.title}</p>
        <p className="mt-0.5 whitespace-pre-wrap text-slate-600">{request.description}</p>
        <p className="mt-1 text-xs text-slate-500">
          {request.category} · status {request.status} · budget{' '}
          {request.budget.min || request.budget.max
            ? `${formatMoney(request.budget.min, request.budget.currency)}–${formatMoney(
                request.budget.max,
                request.budget.currency,
              )}`
            : '—'}{' '}
          · created {formatDate(request.createdAt)}
        </p>
        {request.buyer && (
          <p className="mt-1 text-xs text-slate-500">
            Buyer: {request.buyer.name || request.buyer.id}
            {request.buyer.phoneNumber ? ` · ${request.buyer.phoneNumber}` : ''}
          </p>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Quotes ({quotes.length})
        </p>
        {quotes.length === 0 ? (
          <p className="mt-1 text-slate-400">No quotes were submitted on this request.</p>
        ) : (
          <div className="mt-1 space-y-1.5">
            {quotes.map((q) => (
              <div key={q.id} className="rounded-md border border-slate-200 bg-white px-2.5 py-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-slate-800">
                    {q.provider?.businessName || q.providerId}
                  </span>
                  <span className="font-mono text-xs text-slate-500">
                    {formatMoney(q.amount, q.currency)} · {q.status}
                  </span>
                </div>
                {q.description && <p className="mt-0.5 text-xs text-slate-500">{q.description}</p>}
                <p className="mt-0.5 text-xs text-slate-400">
                  {q.timeline ? `${q.timeline} · ` : ''}submitted {formatDate(q.createdAt)}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          Transactions ({transactions.length})
        </p>
        {transactions.length === 0 ? (
          <p className="mt-1 text-slate-400">No transaction was created for this request.</p>
        ) : (
          <div className="mt-1 space-y-2">
            {transactions.map((t) => (
              <div key={t.id} className="rounded-md border border-slate-200 bg-white px-2.5 py-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-mono text-xs text-slate-500">txn {t.id}</span>
                  <span className="text-xs font-semibold text-slate-700">{t.status}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">
                  {formatMoney(t.amount, t.currency)} (fee {formatMoney(t.fee, t.currency)}, payout{' '}
                  {formatMoney(t.providerPayout, t.currency)})
                </p>
                {(t.paymentProofUrl || t.completionProofUrl) && (
                  <p className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <FileText className="h-3.5 w-3.5 text-slate-400" />
                    {t.paymentProofUrl && <SafeLink url={t.paymentProofUrl}>Payment proof</SafeLink>}
                    {t.completionProofUrl && <SafeLink url={t.completionProofUrl}>Completion proof</SafeLink>}
                  </p>
                )}
                {t.dispute && (
                  <div className="mt-1.5 rounded border-l-2 border-amber-400 bg-amber-50 px-2 py-1.5">
                    <p className="text-xs font-semibold text-amber-900">
                      Dispute {t.dispute.status}
                      {t.dispute.openedAt ? ` · opened ${formatDate(t.dispute.openedAt)}` : ''}
                    </p>
                    {t.dispute.reason && (
                      <p className="mt-0.5 text-xs text-amber-800">{t.dispute.reason}</p>
                    )}
                    {t.dispute.evidence.length > 0 && (
                      <div className="mt-1.5 space-y-1">
                        {t.dispute.evidence.map((e) => (
                          <div key={e.id} className="text-xs text-amber-900">
                            <span className="font-medium">{e.authorRole}</span>
                            {e.note ? `: ${e.note}` : ''}
                            {e.fileUrl && (
                              <>
                                {' '}
                                · <SafeLink url={e.fileUrl}>attachment</SafeLink>
                              </>
                            )}
                            <span className="text-amber-600"> ({formatDate(e.createdAt)})</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Disputes() {
  const toast = useToast()
  const [disputes, setDisputes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(null) // `${id}:${outcome}` while in flight

  // Request/quote thread, expanded per-dispute on demand. Keyed by
  // transactionId; cached once fetched so re-collapsing/re-expanding the same
  // dispute doesn't refetch.
  const [expandedId, setExpandedId] = useState(null)
  const [threads, setThreads] = useState({}) // transactionId -> thread data
  const [threadLoading, setThreadLoading] = useState(null) // transactionId in flight
  const [threadError, setThreadError] = useState({}) // transactionId -> message

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

  const loadThread = async (id) => {
    setThreadLoading(id)
    setThreadError((prev) => ({ ...prev, [id]: '' }))
    try {
      const res = await adminApi.getRequestThreadByTransaction(id)
      setThreads((prev) => ({ ...prev, [id]: res.data }))
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setThreadError((prev) => ({ ...prev, [id]: msg }))
      toast.error(`Failed to load thread: ${msg}`)
    } finally {
      setThreadLoading(null)
    }
  }

  const toggleThread = (dispute) => {
    const id = dispute.transactionId
    if (expandedId === id) {
      setExpandedId(null)
      return
    }
    setExpandedId(id)
    if (!threads[id]) loadThread(id) // already cached otherwise
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

                <button
                  onClick={() => toggleThread(d)}
                  className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  <MessagesSquare className="h-4 w-4" />
                  {expandedId === d.transactionId ? 'Hide' : 'View'} request/quote thread
                  {expandedId === d.transactionId ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {expandedId === d.transactionId && (
                  threadLoading === d.transactionId ? (
                    <Loading label="Loading thread…" />
                  ) : threadError[d.transactionId] ? (
                    <ErrorState message={threadError[d.transactionId]} onRetry={() => loadThread(d.transactionId)} />
                  ) : threads[d.transactionId] ? (
                    <ThreadPanel thread={threads[d.transactionId]} />
                  ) : null
                )}

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
