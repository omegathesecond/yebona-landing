// Admin dashboard landing page — aggregate platform health at a glance (GMV,
// active providers, completed deals) plus the three operational backlogs the
// other admin pages exist to work through (pending verifications, open
// disputes, owed payouts). Shown BEFORE the Providers list so an operator
// sees the big picture first instead of landing straight in one queue.
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Landmark, Users, CheckCircle2, UserCheck, Scale, Wallet } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, PageHeader } from '../../components/admin/States'
import { formatMoney } from '../../lib/format'

function StatCard({ icon, iconClass, label, value, to, hint }) {
  const Icon = icon
  const card = (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 transition-colors hover:border-slate-300">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${iconClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500">{label}</p>
        <p className="truncate text-xl font-bold text-slate-900">{value}</p>
        {hint && <p className="mt-0.5 truncate text-xs text-slate-400">{hint}</p>}
      </div>
    </div>
  )
  return to ? <Link to={to}>{card}</Link> : card
}

export default function Overview() {
  const toast = useToast()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.getOverview()
      setStats(res.data)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load dashboard overview: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  const escrowByCurrency = stats?.escrowProtectedByCurrency || []
  const owedTotals = stats?.owedPayouts?.totalsByCurrency || []

  return (
    <div>
      <PageHeader
        title="Overview"
        subtitle="Platform health at a glance."
        onRefresh={load}
        refreshing={loading}
      />

      {loading ? (
        <Loading label="Loading overview…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              icon={Landmark}
              iconClass="bg-emerald-50 text-emerald-600"
              label="GMV"
              value={formatMoney(stats.escrowProtected, stats.escrowProtectedCurrency)}
              hint={
                escrowByCurrency.length > 1
                  ? `+${escrowByCurrency.length - 1} more currenc${escrowByCurrency.length - 1 === 1 ? 'y' : 'ies'}`
                  : 'Value moved through escrow'
              }
            />
            <StatCard
              icon={Users}
              iconClass="bg-blue-50 text-blue-600"
              label="Active providers"
              value={stats.activeProviders.toLocaleString()}
            />
            <StatCard
              icon={CheckCircle2}
              iconClass="bg-blue-50 text-blue-600"
              label="Completed deals"
              value={stats.completedDeals.toLocaleString()}
            />
            <StatCard
              icon={UserCheck}
              iconClass={
                stats.pendingVerifications > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
              }
              label="Pending verifications"
              value={stats.pendingVerifications.toLocaleString()}
              to="/admin/providers"
              hint="Providers awaiting review"
            />
            <StatCard
              icon={Scale}
              iconClass={stats.openDisputes > 0 ? 'bg-red-50 text-red-600' : 'bg-slate-100 text-slate-500'}
              label="Open disputes"
              value={stats.openDisputes.toLocaleString()}
              to="/admin/disputes"
              hint="Frozen escrow awaiting a decision"
            />
            <StatCard
              icon={Wallet}
              iconClass={
                stats.owedPayouts.count > 0 ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
              }
              label="Owed payouts"
              value={stats.owedPayouts.count.toLocaleString()}
              to="/admin/payouts"
              hint={
                owedTotals.length > 0
                  ? owedTotals.map((t) => formatMoney(t.amount, t.currency)).join(' · ')
                  : 'Nothing owed'
              }
            />
          </div>

          {escrowByCurrency.length > 1 && (
            <div className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700">
                GMV by currency
              </div>
              <div className="divide-y divide-slate-100">
                {escrowByCurrency.map((row) => (
                  <div key={row.currency} className="flex items-center justify-between px-4 py-2.5 text-sm">
                    <span className="font-medium text-slate-800">{row.currency}</span>
                    <span className="font-semibold text-slate-900">{formatMoney(row.amount, row.currency)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
