// The request/quote/transaction thread shared by every admin view that needs
// to answer "how did we get here" for a request: the request itself, every
// competing quote (so an operator can see who else was in the running and at
// what price), and every transaction the request spawned with its dispute
// state + evidence embedded. Originally lived only in Disputes.jsx; pulled out
// here so Users.jsx's per-user request/transaction lists can render the exact
// same detail view instead of re-implementing it.
import { FileText } from 'lucide-react'
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

export function SafeLink({ url, children }) {
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

export function ThreadPanel({ thread }) {
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
