// Pure display formatters shared across the admin pages. Kept out of any .jsx
// component file so React Fast Refresh stays happy (a module that fast-refreshes
// should only export components).

// Formats a numeric amount with its currency, e.g. formatMoney(1234.5, 'USD')
// → "USD 1,234.50". Tolerates string/undefined amounts (falls back to 0.00).
export function formatMoney(amount, currency = 'USD') {
  const n = Number(amount)
  const value = Number.isFinite(n)
    ? n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : '0.00'
  return `${currency} ${value}`
}

// Formats an ISO/Date value for display; returns an em dash for missing/invalid.
export function formatDate(value) {
  if (!value) return '—'
  const d = new Date(value)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
}
