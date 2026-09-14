// One user's profile: the summary counts an ops agent needs at a glance
// (open requests, transaction count, spend/earn), their provider record if
// they have one, and their full request/transaction lists — each row
// expandable into the same request/quote/transaction thread view Disputes.jsx
// uses, via ThreadPanel.
import { useState, useEffect, useCallback } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Phone,
  Mail,
  Calendar,
  ShieldCheck,
  ClipboardList,
  Receipt,
  Wallet,
  Coins,
  Store,
  ChevronDown,
  ChevronUp,
  MessagesSquare,
} from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty } from '../../components/admin/States'
import { ThreadPanel } from '../../components/admin/ThreadPanel'
import { formatMoney, formatDate } from '../../lib/format'

const USER_TYPE_LABEL = {
  user: 'Buyer',
  provider: 'Provider',
  both: 'Both',
}

function SummaryTile({ icon, label, value }) {
  const Icon = icon
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-xs text-slate-500">{label}</p>
        <p className="text-lg font-bold text-slate-900">{value}</p>
      </div>
    </div>
  )
}

// Yebona is multi-currency (China–Africa trade), so spend/earn totals come
// back as [{ currency, amount }] rather than one summed number — summing
// across currencies would be meaningless. Renders each currency on its own
// line; "—" when the user has none.
function CurrencyTotals({ items }) {
  if (!items || items.length === 0) return <>—</>
  return (
    <>
      {items.map((c) => (
        <span key={c.currency} className="block">
          {formatMoney(c.amount, c.currency)}
        </span>
      ))}
    </>
  )
}

// A request or transaction row with an inline, on-demand "View thread"
// disclosure — the same ThreadPanel Disputes.jsx uses, fetched by request id
// or (for transactions) by transaction id.
function ThreadRow({ fetchThread, children }) {
  const toast = useToast()
  const [expanded, setExpanded] = useState(false)
  const [thread, setThread] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetchThread()
      setThread(res.data)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load thread: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const toggle = () => {
    setExpanded((e) => !e)
    if (!thread) load()
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-3">
      {children}
      <button
        onClick={toggle}
        className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700"
      >
        <MessagesSquare className="h-3.5 w-3.5" />
        {expanded ? 'Hide' : 'View'} thread
        {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
      </button>
      {expanded &&
        (loading ? (
          <Loading label="Loading thread…" />
        ) : error ? (
          <ErrorState message={error} onRetry={load} />
        ) : thread ? (
          <ThreadPanel thread={thread} />
        ) : null)}
    </div>
  )
}

export default function UserDetail() {
  const { id } = useParams()
  const toast = useToast()

  const [user, setUser] = useState(null)
  const [requests, setRequests] = useState([])
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [userRes, requestsRes, transactionsRes] = await Promise.all([
        adminApi.getUser(id),
        adminApi.getUserRequests(id),
        adminApi.getUserTransactions(id),
      ])
      setUser(userRes.data)
      setRequests(requestsRes.data || [])
      setTransactions(transactionsRes.data || [])
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load user: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [id, toast])

  useEffect(() => {
    load()
  }, [load])

  return (
    <div>
      <Link
        to="/admin/users"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Link>

      {loading ? (
        <Loading label="Loading user…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : !user ? (
        <Empty message="User not found." />
      ) : (
        <div className="space-y-5">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h1 className="text-xl font-bold text-slate-900">{user.name || 'Unnamed user'}</h1>
                <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Phone className="h-3.5 w-3.5" />
                    {user.phoneNumber}
                  </span>
                  {user.email && (
                    <span className="flex items-center gap-1.5">
                      <Mail className="h-3.5 w-3.5" />
                      {user.email}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    {user.verificationLevel}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Joined {formatDate(user.createdAt)}
                  </span>
                </div>
              </div>
              <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                {USER_TYPE_LABEL[user.userType] || user.userType}
              </span>
            </div>

            {user.provider && (
              <div className="mt-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                <Store className="h-4 w-4 text-slate-400" />
                <span className="font-medium text-slate-800">
                  {user.provider.businessName || 'Unnamed provider'}
                </span>
                <span className="text-slate-500">
                  · {user.provider.status} · {Number(user.provider.rating || 0).toFixed(1)}★ (
                  {user.provider.reviewCount || 0})
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SummaryTile icon={ClipboardList} label="Open requests" value={user.openRequestsCount} />
            <SummaryTile icon={Receipt} label="Transactions" value={user.totalTransactionsCount} />
            <SummaryTile
              icon={Wallet}
              label="Total spent"
              value={<CurrencyTotals items={user.totalSpentByCurrency} />}
            />
            <SummaryTile
              icon={Coins}
              label="Total earned"
              value={<CurrencyTotals items={user.totalEarnedByCurrency} />}
            />
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Requests ({requests.length})
            </h2>
            {requests.length === 0 ? (
              <Empty message="No requests." />
            ) : (
              <div className="space-y-2">
                {requests.map((r) => (
                  <ThreadRow key={r.id} fetchThread={() => adminApi.getRequestThread(r.id)}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800">{r.title}</p>
                        <p className="text-xs text-slate-500">
                          {r.category} · {r.status} · {r.quotesCount} quote{r.quotesCount === 1 ? '' : 's'} ·
                          created {formatDate(r.createdAt)}
                        </p>
                      </div>
                      <span className="shrink-0 text-xs text-slate-400">
                        {r.budget?.min || r.budget?.max
                          ? `${formatMoney(r.budget.min, r.budget.currency)}–${formatMoney(
                              r.budget.max,
                              r.budget.currency,
                            )}`
                          : ''}
                      </span>
                    </div>
                  </ThreadRow>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Transactions ({transactions.length})
            </h2>
            {transactions.length === 0 ? (
              <Empty message="No transactions." />
            ) : (
              <div className="space-y-2">
                {transactions.map((t) => (
                  <ThreadRow key={t.id} fetchThread={() => adminApi.getRequestThreadByTransaction(t.id)}>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-medium text-slate-800">{t.request?.title || 'Untitled request'}</p>
                        <p className="font-mono text-xs text-slate-400">txn {t.id}</p>
                        <p className="text-xs text-slate-500">
                          {t.role === 'buyer' ? 'As buyer' : 'As provider'}
                          {t.provider?.businessName ? ` · ${t.provider.businessName}` : ''} · created{' '}
                          {formatDate(t.createdAt)}
                        </p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="font-semibold text-slate-900">{formatMoney(t.amount, t.currency)}</p>
                        <p className="text-xs text-slate-500">{t.status}</p>
                      </div>
                    </div>
                  </ThreadRow>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
