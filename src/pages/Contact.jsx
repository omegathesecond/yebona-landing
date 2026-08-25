import { Mail, MessageCircle, ShieldCheck } from 'lucide-react'
import BlogLayout from '../components/BlogLayout'

// Standalone contact/support page. No backend form exists yet, so this routes
// visitors to the right mailbox directly (support@ for general/product
// questions, privacy@ for data/privacy requests) — same addresses already
// used in Terms.jsx and Privacy.jsx, just made discoverable outside the legal text.
export default function Contact() {
  return (
    <BlogLayout>
      <title>Contact Us — Yebona</title>
      <meta
        name="description"
        content="Get in touch with the Yebona team for support, product questions, or privacy requests."
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Contact Us</h1>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          Have a question about Yebona, need help, or want to report an issue? We'd love to hear from you.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <a
          href="mailto:support@yebona.com"
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">General support</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Questions about the app, providers, transactions, or anything else.
          </p>
          <span className="text-blue-400 font-medium text-sm inline-flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            support@yebona.com
          </span>
        </a>

        <a
          href="mailto:privacy@yebona.com"
          className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
        >
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">Privacy &amp; data requests</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-3">
            Questions about your data, or requests covered by our Privacy Policy.
          </p>
          <span className="text-blue-400 font-medium text-sm inline-flex items-center gap-1.5">
            <Mail className="w-4 h-4" />
            privacy@yebona.com
          </span>
        </a>
      </div>

      <p className="mt-10 text-center text-slate-500 text-sm">
        Yebona is operated by Omevision, Mbabane, Eswatini. See also our{' '}
        <a href="/terms" className="text-blue-400 hover:underline">Terms of Service</a>{' '}
        and{' '}
        <a href="/privacy" className="text-blue-400 hover:underline">Privacy Policy</a>.
      </p>
    </BlogLayout>
  )
}
