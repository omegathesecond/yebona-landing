// Provider verification queue. Lists providers by lifecycle status and lets an
// operator approve (verify) or suspend each — the two actions that gate whether
// a provider is visible in public search and can quote on RFQs.
import { useState, useEffect, useCallback } from 'react'
import { BadgeCheck, Ban, MapPin, Star, Loader2, Globe, FileText, ShieldAlert } from 'lucide-react'
import { adminApi, ApiError } from '../../lib/adminApi'
import { useToast } from '../../components/admin/Toast'
import { Loading, ErrorState, Empty, PageHeader } from '../../components/admin/States'
import { formatDate } from '../../lib/format'

const STATUSES = [
  { value: 'pending', label: 'Pending review' },
  { value: 'active', label: 'Active' },
  { value: 'suspended', label: 'Suspended' },
]

const STATUS_BADGE = {
  pending: 'bg-amber-100 text-amber-800',
  active: 'bg-emerald-100 text-emerald-800',
  suspended: 'bg-red-100 text-red-800',
}

// Human labels for the KYC document types the app submits (mirrors the API's
// VERIFICATION_DOCUMENT_TYPES). Falls back to the raw value if unknown.
const DOC_TYPE_LABELS = {
  national_id: 'National ID',
  passport: 'Passport',
  business_license: 'Business License',
  tax_certificate: 'Tax Certificate',
  proof_of_address: 'Proof of Address',
  other: 'Other',
}

const isImageUrl = (url) => /\.(jpe?g|png|webp|gif|heic)(\?|$)/i.test(url || '')

// Only http(s) urls are safe to put in an href / img src. Document urls come
// from a provider-controlled API field, so a hostile value like
// `javascript:...` or a `data:` payload must never be rendered as a link in the
// admin's session (stored XSS). Anything else is treated as not-viewable.
const isSafeUrl = (url) => {
  try {
    const u = new URL(url, window.location.origin)
    return u.protocol === 'https:' || u.protocol === 'http:'
  } catch {
    return false
  }
}

// Renders a provider's submitted KYC documents as viewable links — image
// thumbnails for photos, a labelled file tile for PDFs/other — so the operator
// can actually inspect the identity/business proof before clicking Verify.
function VerificationDocuments({ documents }) {
  return (
    <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-600">
        <ShieldAlert className="h-3.5 w-3.5" />
        Verification documents ({documents.length})
      </div>
      <div className="flex flex-wrap gap-2">
        {documents.map((doc, i) => {
          const label = DOC_TYPE_LABELS[doc.type] || doc.type || 'Document'
          const safe = isSafeUrl(doc.url)

          // A non-http(s) url is hostile/unusable — render an inert, labelled
          // tile (no href, no img src) instead of a clickable XSS sink.
          if (!safe) {
            return (
              <div
                key={`${doc.url}-${i}`}
                title="This document has an unsupported or unsafe link and cannot be opened."
                className="flex w-24 flex-col items-center gap-1 rounded-md border border-red-200 bg-red-50 p-1.5 text-center"
              >
                <div className="flex h-16 w-full items-center justify-center rounded bg-red-100 text-red-400">
                  <ShieldAlert className="h-7 w-7" />
                </div>
                <span className="line-clamp-2 text-[11px] font-medium leading-tight text-red-600">
                  {label} (unsafe link)
                </span>
              </div>
            )
          }

          return (
            <a
              key={`${doc.url}-${i}`}
              href={doc.url}
              target="_blank"
              rel="noreferrer"
              title={`${label} — open in new tab`}
              className="group flex w-24 flex-col items-center gap-1 rounded-md border border-slate-200 bg-white p-1.5 text-center hover:border-blue-400 hover:shadow-sm"
            >
              {isImageUrl(doc.url) ? (
                <img
                  src={doc.url}
                  alt={label}
                  className="h-16 w-full rounded object-cover"
                />
              ) : (
                <div className="flex h-16 w-full items-center justify-center rounded bg-slate-100 text-slate-400 group-hover:text-blue-500">
                  <FileText className="h-7 w-7" />
                </div>
              )}
              <span className="line-clamp-2 text-[11px] font-medium leading-tight text-slate-600">
                {label}
              </span>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default function Providers() {
  const toast = useToast()
  const [status, setStatus] = useState('pending')
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const res = await adminApi.listProviders(status)
      setProviders(res.data || [])
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      setError(msg)
      toast.error(`Failed to load providers: ${msg}`)
    } finally {
      setLoading(false)
    }
  }, [status, toast])

  useEffect(() => {
    load()
  }, [load])

  const act = async (provider, action) => {
    setBusyId(provider.id)
    try {
      if (action === 'verify') {
        await adminApi.verifyProvider(provider.id)
        toast.success(`Verified ${provider.businessName || 'provider'}.`)
      } else {
        const reason = window.prompt(
          'Optional reason to send the provider (leave blank for a generic message):'
        )
        // prompt returns null only if the operator cancels — abort the action.
        if (reason === null) {
          setBusyId(null)
          return
        }
        await adminApi.suspendProvider(provider.id, reason.trim())
        toast.success(`Suspended ${provider.businessName || 'provider'}.`)
      }
      // The provider no longer belongs in the current filter — drop it.
      setProviders((list) => list.filter((p) => p.id !== provider.id))
    } catch (err) {
      const msg = err instanceof ApiError ? err.message : String(err)
      toast.error(`Action failed: ${msg}`)
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <PageHeader
        title="Provider verification"
        subtitle="Approve providers into public search, or suspend them out of it."
        onRefresh={load}
        refreshing={loading}
      />

      <div className="mb-4 inline-flex rounded-lg border border-slate-200 bg-white p-1">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            onClick={() => setStatus(s.value)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              status === s.value ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading label="Loading providers…" />
      ) : error ? (
        <ErrorState message={error} onRetry={load} />
      ) : providers.length === 0 ? (
        <Empty message={`No ${status} providers.`} />
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {providers.map((p) => (
            <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-semibold text-slate-900">
                      {p.businessName || p.user?.name || 'Unnamed provider'}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
                        STATUS_BADGE[p.status] || 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {p.status}
                    </span>
                  </div>
                  {p.user && (
                    <p className="mt-0.5 truncate text-sm text-slate-500">
                      {p.user.name}
                      {p.user.email ? ` · ${p.user.email}` : ''}
                      {p.user.phoneNumber ? ` · ${p.user.phoneNumber}` : ''}
                    </p>
                  )}
                </div>
              </div>

              {p.bio && <p className="mt-2 line-clamp-2 text-sm text-slate-600">{p.bio}</p>}

              <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500">
                {(p.city || p.country) && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {[p.city, p.country].filter(Boolean).join(', ')}
                  </span>
                )}
                {Array.isArray(p.languages) && p.languages.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Globe className="h-3.5 w-3.5" />
                    {p.languages.join(', ')}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5" />
                  {Number(p.rating || 0).toFixed(1)} ({p.reviewCount || 0})
                </span>
                <span>Joined {formatDate(p.createdAt)}</span>
              </div>

              {Array.isArray(p.services) && p.services.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.services.map((s) => (
                    <span
                      key={s.id}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                    >
                      {s.category}
                      {s.startingPrice ? ` · from ${s.currency || ''} ${s.startingPrice}` : ''}
                    </span>
                  ))}
                </div>
              )}

              {Array.isArray(p.verificationDocuments) && p.verificationDocuments.length > 0 ? (
                <VerificationDocuments documents={p.verificationDocuments} />
              ) : (
                <p className="mt-3 text-xs italic text-slate-400">
                  No verification documents submitted.
                </p>
              )}

              <div className="mt-4 flex gap-2">
                {p.status !== 'active' && (
                  <button
                    onClick={() => act(p, 'verify')}
                    disabled={busyId === p.id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
                  >
                    {busyId === p.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <BadgeCheck className="h-4 w-4" />
                    )}
                    Verify
                  </button>
                )}
                {p.status !== 'suspended' && (
                  <button
                    onClick={() => act(p, 'suspend')}
                    disabled={busyId === p.id}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-300 bg-white py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:opacity-60"
                  >
                    {busyId === p.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Ban className="h-4 w-4" />
                    )}
                    Suspend
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
