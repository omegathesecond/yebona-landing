// Single source of truth for the Yebona API origin.
// The whole marketing site (blog reads, waitlist writes) talks to the stable
// canonical domain — NOT a transient Cloud Run revision URL, which silently
// breaks on redeploy/remap and loses real leads. Override at build time with
// VITE_API_BASE (e.g. for staging); defaults to production.
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://api.yebona.com'
