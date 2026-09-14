// User lookup. Support/ops fielding "where is my money" / "I can't reach my
// provider" previously had no way to find an account without a DB console —
// the only per-record admin lookups (Disputes' request/quote thread) require
// already knowing the exact request/transaction id. This is the entry point:
// search by phone number or name, then drill into a user's own requests and
// transactions from the detail view (UserDetail.jsx).
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

const USER_TYPES = [
  { value: '', label: 'All' },
  { value: 'user', label: 'Buyers' },
  { value: 'provider', label: 'Providers' },
  { value: 'both', label: 'Both' },
]

// Server-side page size for search results.
const PAGE_SIZE = 20

// How long to wait after the operator stops typing before firing a search, so
// we don't hit the API on every keystroke (same pattern as Providers.jsx).
const SEARCH_DEBOUNCE_MS = 300

const USER_TYPE_LABEL = {
  user: 'Buyer',
  provider: 'Provider',
  both: 'Both',
}

export default function Users() {
  const toast = useToast()
  // Raw input value vs the debounced term we actually query with — typing
  // updates `searchInput` immediately but only fires a request once it settles.
  const [searchInput, setSearchInput] = useState('')
  const [q, setQ] = useState('')
  const [userType, setUserType] = useState('')
  const [page, setPage] = useState(0)
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const id = setTimeout(() => {
      setQ(searchInput.trim())
      setPage(0)
    }, SEARCH_DEBOUNCE_MS)
    return () => clearTimeout(id)
  }, [searchInput])

  const load = useCallback(async () => {
    if (!q) {
      setUsers([])
      setTotal(0)
      setError('')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.searchUsers(q, { userType, limit: PAGE_SIZE, offset: page * PAGE_SIZE })
      setUsers(res.data || [])
      setTotal(typeof res.total === 'number' ? res.total : (res.data || []).length)
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Search failed: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [q, userType, page, toast])

  useEffect(() => {
    load()
  }, [load])

  const selectType = (value) => {
    setUserType(value)
    setPage(0)
  }

  const clearSearch = () => {
    setSearchInput('')
    setQ('')
    setPage(0)
  }

  const offset = page * PAGE_SIZE
  const rangeStart = total === 0 ? 0 : offset + 1
  const rangeEnd = offset + users.length
  const hasPrev = page > 0
  const hasNext = rangeEnd < total

  return (
    <div>
      <PageHeader
        title="Users"
        subtitle="Find a user by phone number or name, then look up their requests and transactions."
      />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-0 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            autoFocus
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by phone number or name…"
            aria-label="Search users"
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-9 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
          {searchInput && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-1">
          {USER_TYPES.map((t) => (
            <button
              key={t.value || 'all'}
              onClick={() => selectType(t.value)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                userType === t.value ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {!q ? (
        <Empty message="Type a phone number or name to search." />
      ) : loading ? (
        <Loading label="Searching…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : users.length === 0 ? (
        <Empty message={`No users match “${q}”.`} />
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2.5 font-semibold">Name</th>
                <th className="px-4 py-2.5 font-semibold">Phone</th>
                <th className="px-4 py-2.5 font-semibold">Type</th>
                <th className="px-4 py-2.5 font-semibold">Verification</th>
                <th className="px-4 py-2.5 font-semibold">Created</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link to={`/admin/users/${u.id}`} className="font-medium text-blue-600 hover:text-blue-700">
                      {u.name || 'Unnamed user'}
                    </Link>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-600">{u.phoneNumber}</td>
                  <td className="px-4 py-3 text-slate-600">{USER_TYPE_LABEL[u.userType] || u.userType}</td>
                  <td className="px-4 py-3 text-slate-600">{u.verificationLevel}</td>
                  <td className="px-4 py-3 text-slate-500">{formatDate(u.createdAt)}</td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      to={`/admin/users/${u.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && q && total > 0 && (
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
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((p) => p + 1)}
              disabled={!hasNext}
              className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
