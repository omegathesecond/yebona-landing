// Admin operations dashboard API client.
//
// Talks to the SAME canonical Yebona API origin as the rest of the site
// (lib/api.js → https://api.yebona.com, never a *.run.app revision URL). Every
// /api/admin/* route is gated by the dashboard API key, sent as the X-API-Key
// header. The key is entered by the operator at sign-in and kept ONLY in the
// browser (localStorage) — it is never hardcoded in source or committed.
//
// No silent fallbacks: request() throws ApiError on any network failure, non-2xx
// response, or { success:false } body. Callers surface that loudly (toast +
// error state) — we never fabricate a successful-looking result.
import { API_BASE } from './api'

const KEY_STORAGE = 'yebona_admin_api_key'

export function getApiKey() {
  return localStorage.getItem(KEY_STORAGE) || ''
}
export function setApiKey(key) {
  localStorage.setItem(KEY_STORAGE, key)
}
export function clearApiKey() {
  localStorage.removeItem(KEY_STORAGE)
}

export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

async function request(path, { method = 'GET', body } = {}) {
  const key = getApiKey()
  if (!key) throw new ApiError('Not signed in — enter the dashboard API key.', 401)

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'X-API-Key': key,
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (networkErr) {
    // DNS/offline/CORS — surface it, don't swallow it.
    throw new ApiError(`Network error reaching the API: ${networkErr.message}`, 0)
  }

  let json = null
  try {
    json = await res.json()
  } catch {
    // Non-JSON response (e.g. an HTML 502 page) — fall through to the error below.
  }

  if (!res.ok || (json && json.success === false)) {
    const msg = (json && (json.error || json.message)) || `Request failed (HTTP ${res.status})`
    throw new ApiError(msg, res.status)
  }

  return json
}

// ── Provider verification queue ──────────────────────────────────
export const adminApi = {
  // Validate a candidate key by making a real authenticated call. Returns on
  // success; throws ApiError (401 → invalid key) otherwise. Used by the sign-in
  // gate so a wrong key is rejected immediately rather than stored and failing
  // on every page later.
  verifyKey: () => request('/api/admin/providers?status=pending&limit=1'),

  // Paginated, searchable provider list. `search` matches business name / bio /
  // location and the linked user's name / email / phone (server-side). The
  // response carries { data, total, limit, offset } so the caller can drive
  // Prev/Next without guessing the total.
  listProviders: (status = 'pending', { search = '', limit = 20, offset = 0 } = {}) => {
    const params = new URLSearchParams({
      status,
      limit: String(limit),
      offset: String(offset),
    })
    if (search.trim()) params.set('search', search.trim())
    return request(`/api/admin/providers?${params.toString()}`)
  },
  verifyProvider: (id) => request(`/api/admin/providers/${id}/verify`, { method: 'POST' }),
  suspendProvider: (id, reason) =>
    request(`/api/admin/providers/${id}/suspend`, {
      method: 'POST',
      body: reason ? { reason } : undefined,
    }),

  // ── Disputes ───────────────────────────────────────────────────
  listDisputes: () => request('/api/admin/transactions/disputes'),
  resolveDispute: (id, outcome, note) =>
    request(`/api/admin/transactions/${id}/resolve`, {
      method: 'POST',
      body: note ? { outcome, note } : { outcome },
    }),
  // The request/quote thread behind a disputed transaction — the request, every
  // competing quote, and every transaction the request spawned (dispute state +
  // evidence embedded) — so an operator can see how the dispute came to be.
  getRequestThreadByTransaction: (transactionId) =>
    request(`/api/admin/transactions/${transactionId}/thread`),

  // ── Owed payouts (reconciliation) ──────────────────────────────
  listOwedPayouts: () => request('/api/admin/transactions/owed-payouts'),
  retryPayout: (id) =>
    request(`/api/admin/transactions/${id}/retry-payout`, { method: 'POST' }),
}
