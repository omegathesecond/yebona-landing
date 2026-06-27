// Revenue / billing. Surfaces what Yebona's 5% escrow fee has actually earned:
// fees collected, gross escrow volume and completed-deal counts, broken down by
// currency over an optional date window.
//
// Revenue is recognised at RELEASE — only escrow that's been released to the
// provider counts (a refunded escrow returns the whole amount, fee included).
// Amounts in different currencies never sum, so there's no single revenue total:
// the per-currency table is the primary view, and only the completed-deal count
// is currency-agnostic.
import { useState, useEffect, useCallback } from 'react'
import { Coins, TrendingUp, CheckCircle2 } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatMoney } from '../../lib/format'

export default function Revenue() {
  const toast = useToast()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Draft inputs (what's typed) vs the applied range (what was last fetched), so
  // editing the dates doesn't refetch until "Apply" is pressed.
  const [fromDraft, setFromDraft] = useState('')
  const [toDraft, setToDraft] = useState('')
  const [range, setRange] = useState({ from: '', to: '' })

  const load = useCallback(
    async (r) => {
      setLoading(true)
      setError('')
      try {
        const res = await adminApi.getRevenue({ from: r.from || undefined, to: r.to || undefined })
        setData(res.data)
      } catch (err) {
        const msg = err instanceof ApiError ? err.message : String(err)
        setError(msg)
        toast.error(`Failed to load revenue: ${msg}`)
      } finally {
        setLoading(false)
      }
    },
    [toast]
  )

  useEffect(() => {
    load(range)
  }, [load, range])

  const applyRange = (e) => {
    e.preventDefault()
    if (fromDraft && toDraft && fromDraft > toDraft) {
      toast.error('“From” must be on or before “To”.')
      return
    }
    // Updating `range` re-runs the effect, which fetches.
    setRange({ from: fromDraft, to: toDraft })
  }

  const clearRange = () => {
    setFromDraft('')
    setToDraft('')
    setRange({ from: '', to: '' })
  }

  const byCurrency = data?.byCurrency || []
  const completedDeals = data?.completedDeals ?? 0
  const hasRange = Boolean(range.from || range.to)

  return (
    <div>
      <PageHeader
        title="Revenue & billing"
        subtitle="Realized platform fee revenue from released escrow."
        onRefresh={() => load(range)}
        refreshing={loading}
      />

      {/* Date-range filter */}
      <form
        onSubmit={applyRange}
        className="mb-5 flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">From</label>
          <input
            type="date"
            value={fromDraft}
            max={toDraft || undefined}
            onChange={(e) => setFromDraft(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold text-slate-600">To</label>
          <input
            type="date"
            value={toDraft}
            min={fromDraft || undefined}
            onChange={(e) => setToDraft(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Apply
        </button>
        {hasRange && (
          <button
            type="button"
            onClick={clearRange}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Clear
          </button>
        )}
        <span className="ml-auto text-xs text-slate-400">
          {hasRange
            ? `Showing ${range.from || '…'} → ${range.to || '…'}`
            : 'Showing all time'}
        </span>
      </form>

      {loading ? (
        <Loading label="Loading revenue…" />
      ) : error ? (
        <ErrorState message={error} onRetry={() => load(range)} />
      ) : byCurrency.length === 0 ? (
        <Empty message="No released escrow in this period — nothing earned yet." />
      ) : (
        <div className="space-y-5">
          {/* Summary cards: completed deals (currency-agnostic) + fees collected per currency */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Completed deals</p>
                <p className="text-lg font-bold text-slate-900">{completedDeals}</p>
              </div>
            </div>
            {byCurrency.map((row) => (
              <div
                key={row.currency}
                className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <Coins className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Fees collected ({row.currency})</p>
                  <p className="text-lg font-bold text-slate-900">
                    {formatMoney(row.feesCollected, row.currency)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Per-currency breakdown table */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5 text-sm font-semibold text-slate-700">
              <TrendingUp className="h-4 w-4 text-slate-400" />
              By currency
            </div>
            <table className="w-full text-sm">
              <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
                <tr>
                  <th className="px-4 py-2.5 font-semibold">Currency</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Completed deals</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Gross volume</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Provider payouts</th>
                  <th className="px-4 py-2.5 text-right font-semibold">Fees collected</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {byCurrency.map((row) => (
                  <tr key={row.currency}>
                    <td className="px-4 py-3 font-semibold text-slate-800">{row.currency}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{row.completedDeals}</td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {formatMoney(row.grossVolume, row.currency)}
                    </td>
                    <td className="px-4 py-3 text-right text-slate-600">
                      {formatMoney(row.providerPayouts, row.currency)}
                    </td>
                    <td className="px-4 py-3 text-right font-bold text-emerald-700">
                      {formatMoney(row.feesCollected, row.currency)}
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
