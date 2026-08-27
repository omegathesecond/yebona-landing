import { Link } from 'react-router-dom'
import { Percent, ShieldCheck, Search, ArrowRight, Check } from 'lucide-react'
import BlogLayout from '../components/BlogLayout'

// Fee-transparency page for prospective buyers and providers. The only fee
// Yebona charges today is the flat 5% platform fee deducted from a provider's
// payout on completed transactions (src/services/database.ts `transactions.create`,
// `fee = amount * 0.05`) — buyers only ever pay the price agreed with the
// provider. Keep the numbers here in sync with that source of truth.
export default function Pricing() {
  return (
    <BlogLayout>
      <title>Pricing & Fees — Yebona</title>
      <meta
        name="description"
        content="How Yebona's fees work: browsing and listing are free, buyers pay only the agreed price, and providers pay a single 5% platform fee on completed, escrow-protected transactions."
      />

      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Pricing &amp; Fees</h1>
        <p className="mt-4 text-slate-400 text-lg max-w-xl mx-auto">
          No subscriptions, no listing fees, no surprise charges. Here's exactly
          what it costs to buy or sell services on Yebona.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Search className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">For buyers</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Browsing providers, requesting quotes, and comparing rates is
            always free. You pay only the price the provider quotes you —
            Yebona does not add any buyer-side fee on top.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              Free to browse & request quotes
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              No hidden markup on the price you agree
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              Your payment is held in escrow until you confirm delivery
            </li>
          </ul>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
            <Percent className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-2">For providers</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            Listing your services and getting discovered by buyers is free.
            Yebona charges a single <strong className="text-white">5% platform fee</strong>{' '}
            on completed transactions — you keep 95% of every payout.
          </p>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              Free to list services — no subscription or setup cost
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              5% fee applies only when funds are released to you
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              Nothing owed on quotes that don't turn into a job
            </li>
          </ul>
        </div>
      </div>

      <section className="mt-10 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-2xl p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white mb-2">The fee covers escrow, verification & dispute resolution</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              The 5% platform fee is what pays for provider verification,
              holding funds in escrow, and running dispute resolution if a
              transaction goes wrong. It's deducted automatically when a
              transaction completes — nothing to invoice or track yourself.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-white">Frequently asked questions</h2>

        <div className="space-y-3">
          <h3 className="text-white font-medium">When exactly is the fee charged?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Only when a transaction completes and escrowed funds are released
            to the provider. The 5% is deducted from that payout — there's no
            fee for quotes, messages, or transactions that never go ahead.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-medium">Are there any other fees — listing, subscription, or withdrawal?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            No. Creating an account, listing services, and browsing the
            marketplace are all free. The 5% platform fee on completed
            transactions is the only fee Yebona charges today.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-medium">What if a transaction is disputed or refunded?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            If a dispute is resolved in your favor as a buyer, your escrowed
            payment is refunded rather than released to the provider. See our{' '}
            <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>{' '}
            for how disputes and escrow releases are handled.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-white font-medium">Can I avoid the fee by paying a provider directly?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            No — transactions have to go through Yebona's escrow to stay
            protected. Moving payment off-platform to avoid the fee isn't
            permitted under our{' '}
            <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>{' '}
            and forfeits escrow protection for both sides.
          </p>
        </div>
      </section>

      <div className="mt-12 text-center">
        <Link
          to="/#waitlist"
          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
        >
          Get the App Early
          <ArrowRight className="w-4 h-4" />
        </Link>
        <p className="mt-4 text-slate-500 text-sm">
          Questions about pricing? <Link to="/contact" className="text-blue-400 hover:underline">Contact us</Link>.
        </p>
      </div>
    </BlogLayout>
  )
}
