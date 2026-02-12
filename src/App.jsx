import { useState } from 'react'
import { 
  ArrowRight, Globe, Shield, Check, Star, 
  ChevronRight, Search, AlertTriangle, 
  BadgeCheck, DollarSign, Package, Factory, 
  Ship, BookOpen, Users, ArrowDown
} from 'lucide-react'

// African countries for the picker
const AFRICAN_COUNTRIES = [
  { code: 'CM', name: 'Cameroon', flag: '🇨🇲', prefix: '+237' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', prefix: '+234' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', prefix: '+233' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', prefix: '+254' },
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', prefix: '+27' },
  { code: 'SZ', name: 'Eswatini', flag: '🇸🇿', prefix: '+268' },
  { code: 'TZ', name: 'Tanzania', flag: '🇹🇿', prefix: '+255' },
  { code: 'UG', name: 'Uganda', flag: '🇺🇬', prefix: '+256' },
  { code: 'RW', name: 'Rwanda', flag: '🇷🇼', prefix: '+250' },
  { code: 'ET', name: 'Ethiopia', flag: '🇪🇹', prefix: '+251' },
  { code: 'SN', name: 'Senegal', flag: '🇸🇳', prefix: '+221' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮', prefix: '+225' },
  { code: 'CD', name: 'DR Congo', flag: '🇨🇩', prefix: '+243' },
  { code: 'AO', name: 'Angola', flag: '🇦🇴', prefix: '+244' },
  { code: 'ZW', name: 'Zimbabwe', flag: '🇿🇼', prefix: '+263' },
  { code: 'ZM', name: 'Zambia', flag: '🇿🇲', prefix: '+260' },
  { code: 'MW', name: 'Malawi', flag: '🇲🇼', prefix: '+265' },
  { code: 'MZ', name: 'Mozambique', flag: '🇲🇿', prefix: '+258' },
  { code: 'BW', name: 'Botswana', flag: '🇧🇼', prefix: '+267' },
  { code: 'NA', name: 'Namibia', flag: '🇳🇦', prefix: '+264' },
  { code: 'OTHER', name: 'Other', flag: '🌍', prefix: '' },
]

// Provider card for the mockup
function ProviderCard({ name, service, rating, reviews, verified, highlight }) {
  return (
    <div className={`rounded-xl p-3 border transition-all ${
      highlight 
        ? 'bg-gradient-to-br from-emerald-500/15 to-blue-500/10 border-emerald-500/40' 
        : 'bg-slate-900/60 border-slate-700/50'
    }`}>
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold shrink-0">
          {name.split(' ').map(w => w[0]).join('').slice(0,2)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="text-white font-semibold text-sm truncate">{name}</h4>
            {verified && <BadgeCheck className="w-4 h-4 text-blue-400 shrink-0" />}
          </div>
          <p className="text-slate-400 text-xs">{service}</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-white text-xs font-medium">{rating}</span>
            </div>
            <span className="text-slate-500 text-xs">({reviews} reviews)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Phone mockup showing the marketplace
function PhoneMockup() {
  return (
    <div className="phone-mockup float-animation">
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-blue-500/20">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-10" />
        {/* Screen */}
        <div className="relative bg-slate-950 rounded-[2rem] overflow-hidden min-h-[480px]">
          {/* Status Bar */}
          <div className="flex justify-between items-center px-6 py-2 text-white/60 text-xs">
            <span className="font-medium">9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-5 h-2.5 bg-white/60 rounded-sm" />
            </div>
          </div>
          
          {/* App Content */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold">Yebona</span>
            </div>
            
            {/* Search */}
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl px-3 py-2.5 flex items-center gap-2 mb-4">
              <Search className="w-4 h-4 text-slate-500" />
              <span className="text-slate-500 text-sm">What do you need?</span>
            </div>
            
            {/* Category Pills */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
              {['Currency', 'Sourcing', 'Freight', 'Factory'].map((cat, i) => (
                <span key={i} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap ${
                  i === 0 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-300'
                }`}>{cat}</span>
              ))}
            </div>
            
            {/* Providers */}
            <p className="text-slate-400 text-xs mb-2 flex items-center gap-1">
              <BadgeCheck className="w-3 h-3 text-emerald-400" />
              Verified providers near you
            </p>
            <div className="space-y-2">
              <ProviderCard 
                name="QuickFX Exchange" 
                service="Currency Exchange • CNY, USD" 
                rating="4.9" 
                reviews={234} 
                verified={true}
                highlight={true}
              />
              <ProviderCard 
                name="Zhang Trading Co" 
                service="Sourcing Agent • Guangzhou" 
                rating="4.8" 
                reviews={189} 
                verified={true}
              />
              <ProviderCard 
                name="African Star Freight" 
                service="Sea & Air Shipping" 
                rating="4.7" 
                reviews={156} 
                verified={true}
              />
            </div>
            
            {/* Escrow Badge */}
            <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-2.5 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <p className="text-emerald-300 text-xs font-medium">All transactions protected by escrow</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Main App
export default function App() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('CM')
  const [interest, setInterest] = useState('user')
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedCountry = AFRICAN_COUNTRIES.find(c => c.code === country)

  const resetForm = () => {
    setName('')
    setPhone('')
    setCountry('CM')
    setInterest('user')
    setSubmitted(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://yebona-api-igsg3gipka-ew.a.run.app/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone: selectedCountry?.prefix ? `${selectedCountry.prefix}${phone.replace(/^0+/, '')}` : phone,
          interest,
          country: selectedCountry?.name || country,
          product: 'yebona',
          source: 'website'
        })
      })
      
      const data = await response.json()
      
      if (data.success || response.ok) {
        setSubmitted(true)
      } else {
        if (response.status === 409) {
          setSubmitted(true)
        } else {
          alert('Something went wrong. Please try again.')
        }
      }
    } catch (err) {
      console.error('Waitlist error:', err)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Service provider types
  const providerTypes = [
    { 
      icon: DollarSign, 
      name: 'Currency Exchange', 
      desc: 'Convert USD, ZAR, XAF to CNY. Pay your Chinese suppliers directly.',
      color: 'from-emerald-500 to-emerald-600'
    },
    { 
      icon: Search, 
      name: 'Sourcing Agents', 
      desc: 'Find products, negotiate prices, handle supplier communication.',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      icon: Factory, 
      name: 'Factory Verification', 
      desc: 'Inspect factories, check quality, verify legitimacy before you pay.',
      color: 'from-purple-500 to-purple-600'
    },
    { 
      icon: Ship, 
      name: 'Freight & Shipping', 
      desc: 'Air, sea, rail cargo. Get your goods delivered safely to Africa.',
      color: 'from-orange-500 to-orange-600'
    },
    { 
      icon: BookOpen, 
      name: 'Trade Consulting', 
      desc: 'Navigate customs, regulations, import duties. Expert guidance.',
      color: 'from-pink-500 to-pink-600'
    },
  ]

  // The problems
  const problems = [
    { icon: '💱', text: 'Pay suppliers in CNY — but you have USD, ZAR, or local currency' },
    { icon: '🔍', text: 'Find reliable products and verified factories you can trust' },
    { icon: '📦', text: 'Ship goods safely from China to Africa without losing them' },
    { icon: '🛡️', text: 'Avoid scams — know who you\'re dealing with before sending money' },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/8 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/8 rounded-full blur-[150px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">Yebona</span>
            </div>
            <a 
              href="#waitlist" 
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-5 py-2 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25"
            >
              Join Waitlist
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - Clear Value Prop */}
      <section className="relative pt-28 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300 font-medium">Every transaction protected by escrow</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] mb-6 tracking-tight">
                Importing from China?
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Find trusted help
                </span>{' '}
                for every step.
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-xl leading-relaxed">
                Verified <strong className="text-white">currency exchangers</strong>, <strong className="text-white">sourcing agents</strong>, <strong className="text-white">freight services</strong>, and more — all in one marketplace. Compare providers, read real reviews, and transact with escrow protection.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a 
                  href="#waitlist" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
                >
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              
              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 text-sm">
                <div className="flex items-center gap-2">
                  <BadgeCheck className="w-5 h-5 text-blue-400" />
                  <span>Verified providers only</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span>Real reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-emerald-400" />
                  <span>Escrow protected</span>
                </div>
              </div>
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8">
        <a href="#problem" className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors">
          <span className="text-sm">See how it works</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>

      {/* The Problem Section */}
      <section id="problem" className="py-20 px-6 bg-gradient-to-b from-slate-900/50 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-4 py-2 mb-6">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-300 font-medium">The China Import Problem</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Importing from China is{' '}
              <span className="text-red-400">complicated</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              You want to buy products from China. But to do that, you need to solve all these problems:
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {problems.map((problem, i) => (
              <div 
                key={i} 
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 flex items-start gap-4 hover:border-slate-700 transition-colors"
              >
                <span className="text-3xl">{problem.icon}</span>
                <p className="text-slate-300 text-lg leading-relaxed">{problem.text}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-slate-500 text-lg">
              Finding trustworthy help for each step? <span className="text-white">That's where Yebona comes in.</span>
            </p>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-sm text-emerald-300 font-medium">The Yebona Solution</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              A marketplace of{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                verified providers
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Find trusted service providers for every step of your import journey — all with real reviews and escrow protection.
            </p>
          </div>
          
          {/* Provider Types Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providerTypes.map((type, i) => (
              <div 
                key={i} 
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900/80 transition-all group"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <type.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{type.name}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
            
            {/* Coming Soon Card */}
            <div className="bg-slate-900/30 border border-dashed border-slate-700 rounded-2xl p-6 flex items-center justify-center">
              <div className="text-center">
                <p className="text-slate-500 text-sm mb-1">More services</p>
                <p className="text-slate-400 font-medium">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Why use{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Yebona?
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: BadgeCheck,
                iconBg: 'from-blue-500/20 to-blue-600/20',
                iconColor: 'text-blue-400',
                title: 'All providers are verified',
                desc: 'We check every provider before they can list. Background checks, document verification, real track records.'
              },
              {
                icon: Star,
                iconBg: 'from-amber-500/20 to-amber-600/20',
                iconColor: 'text-amber-400',
                title: 'Real reviews from real users',
                desc: 'Make informed decisions with verified reviews from people who actually used the service.'
              },
              {
                icon: Shield,
                iconBg: 'from-emerald-500/20 to-emerald-600/20',
                iconColor: 'text-emerald-400',
                title: 'Every transaction protected by escrow',
                desc: 'Your money is held securely until you confirm the service is complete. Not satisfied? Get a refund.'
              },
              {
                icon: Users,
                iconBg: 'from-purple-500/20 to-purple-600/20',
                iconColor: 'text-purple-400',
                title: 'Compare rates, fees & reviews',
                desc: 'See multiple providers side-by-side. Choose the best deal with full transparency.'
              },
            ].map((benefit, i) => (
              <div 
                key={i} 
                className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors"
              >
                <div className={`w-14 h-14 bg-gradient-to-br ${benefit.iconBg} border border-white/10 rounded-2xl flex items-center justify-center mb-4`}>
                  <benefit.icon className={`w-7 h-7 ${benefit.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-slate-400 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How it works</h2>
            <p className="text-slate-400 text-lg">Four simple steps to safe, successful imports</p>
          </div>
          
          <div className="space-y-6">
            {[
              { 
                num: '1', 
                title: 'Tell us what you need', 
                desc: 'Currency exchange? Sourcing agent? Freight? Select the service you\'re looking for.',
                icon: '📝'
              },
              { 
                num: '2', 
                title: 'Get matched with verified providers', 
                desc: 'We show you providers who offer exactly what you need, all pre-verified and reviewed.',
                icon: '🎯'
              },
              { 
                num: '3', 
                title: 'Compare quotes and reviews', 
                desc: 'See rates, fees, delivery times, and real user reviews side-by-side. Pick the best fit.',
                icon: '⚖️'
              },
              { 
                num: '4', 
                title: 'Transact safely with escrow', 
                desc: 'Your payment is held in escrow until you confirm the service is complete. Full protection.',
                icon: '🔒'
              },
            ].map((step, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center shrink-0">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold mb-2">
                    <span className="text-blue-400 mr-2">{step.num}.</span>
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Escrow Explainer */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-3xl p-8 md:p-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  Pay only when <span className="text-emerald-400">satisfied</span>
                </h2>
                <p className="text-slate-400 mb-4 max-w-2xl">
                  Our escrow system holds your payment securely. The provider only gets paid when you confirm the job is done right. If something goes wrong, you get your money back.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {['Funds held securely', 'Release on confirmation', 'Dispute resolution', 'Money-back guarantee'].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="max-w-xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Get early access
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join the waitlist. We'll notify you when Yebona launches.
          </p>
          
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">You're on the list! 🎉</h3>
              <p className="text-slate-400 mb-4">We'll reach out on WhatsApp when Yebona launches.</p>
              <button
                onClick={resetForm}
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Submit another entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-5 py-3.5 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
              />
              
              <div className="flex gap-2">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-slate-900/50 border border-slate-700 rounded-xl px-3 py-3.5 text-white outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer min-w-[130px]"
                >
                  {AFRICAN_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                    {selectedCountry?.prefix}
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                    required
                    className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-14 pr-4 py-3.5 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>
              
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-3">
                <p className="text-slate-500 text-xs mb-2">I want to...</p>
                <div className="flex gap-2">
                  {[
                    { value: 'user', label: '🔍 Find providers' },
                    { value: 'provider', label: '🏪 List my services' },
                    { value: 'both', label: '🔄 Both' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setInterest(opt.value)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all flex-1 text-sm ${
                        interest === opt.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
              <p className="text-slate-500 text-sm">We'll contact you on WhatsApp when we launch.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Yebona</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 Yebona. Part of{' '}
              <a href="https://omevision.com" className="text-blue-400 hover:underline">Omevision</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
