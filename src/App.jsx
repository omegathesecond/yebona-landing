import { useState } from 'react'
import { 
  ArrowRight, Globe, Truck, CreditCard, Shield, 
  Check, Star, TrendingUp, Zap, Users, 
  ChevronRight, Sparkles, ArrowUpRight
} from 'lucide-react'

// Premium Tab Component
function TabButton({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        relative px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300
        ${active 
          ? 'bg-white text-slate-900 shadow-xl shadow-blue-500/20' 
          : 'text-white/70 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {children}
      {active && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full" />
      )}
    </button>
  )
}

// Premium Phone Mockup
function PhoneMockup({ children, className = "" }) {
  return (
    <div className={`phone-mockup ${className}`}>
      {/* Phone Frame */}
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3rem] p-3 shadow-2xl shadow-blue-500/20">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-3xl z-10" />
        {/* Screen */}
        <div className="relative bg-slate-950 rounded-[2.5rem] overflow-hidden min-h-[520px]">
          {children}
        </div>
      </div>
    </div>
  )
}

// Exchange Transfer Screen
function TransferScreen() {
  return (
    <div className="h-full">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-8 py-3 text-white/60 text-xs">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-1 ${i < 4 ? 'h-2' : 'h-3'} bg-white/60 rounded-full`} />
            ))}
          </div>
          <div className="w-6 h-3 bg-white/60 rounded-sm ml-1" />
        </div>
      </div>
      
      {/* App Content */}
      <div className="px-5 pt-2 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl">Send Money</h3>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
            <span className="text-white text-sm font-bold">LG</span>
          </div>
        </div>
        
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-blue-100 text-sm mb-1">Available Balance</p>
          <p className="text-white font-bold text-3xl tracking-tight">XAF 2,450,000</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-medium">
              ≈ ¥28,665
            </span>
            <TrendingUp className="w-4 h-4 text-emerald-300" />
          </div>
        </div>
        
        {/* Transfer Form */}
        <div className="space-y-4">
          {/* You Send */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-sm">You send</span>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl">
                <span className="text-lg">🇨🇲</span>
                <span className="text-white font-medium text-sm">XAF</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <input 
              type="text" 
              value="500,000" 
              readOnly
              className="bg-transparent text-white font-bold text-2xl w-full outline-none"
            />
          </div>
          
          {/* Exchange Arrow */}
          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-blue-500 rounded-2xl p-3 shadow-lg shadow-blue-500/30 hover:scale-110 transition-transform cursor-pointer">
              <ArrowRight className="w-5 h-5 text-white rotate-90" />
            </div>
          </div>
          
          {/* They Receive */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-slate-400 text-sm">They receive</span>
              <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-xl">
                <span className="text-lg">🇨🇳</span>
                <span className="text-white font-medium text-sm">CNY</span>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
            <p className="text-white font-bold text-2xl">¥5,850.00</p>
          </div>
          
          {/* Rate Info */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3">
            <Zap className="w-5 h-5 text-emerald-400" />
            <div className="flex-1">
              <p className="text-emerald-400 text-sm font-medium">Best rate today</p>
              <p className="text-slate-400 text-xs">1 XAF = 0.0117 CNY • Arrives in ~15 min</p>
            </div>
          </div>
          
          {/* CTA Button */}
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]">
            Continue Transfer
          </button>
        </div>
      </div>
    </div>
  )
}

// Partners Directory Screen
function PartnersScreen() {
  return (
    <div className="h-full">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-8 py-3 text-white/60 text-xs">
        <span className="font-medium">9:41</span>
        <div className="flex items-center gap-1">
          <div className="flex gap-0.5">
            {[1,2,3,4].map(i => (
              <div key={i} className={`w-1 ${i < 4 ? 'h-2' : 'h-3'} bg-white/60 rounded-full`} />
            ))}
          </div>
          <div className="w-6 h-3 bg-white/60 rounded-sm ml-1" />
        </div>
      </div>
      
      {/* App Content */}
      <div className="px-5 pt-2 pb-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-white font-bold text-xl">Find Partners</h3>
          <div className="bg-blue-500/20 px-3 py-1.5 rounded-full">
            <span className="text-blue-400 text-sm font-medium">🇨🇳 China</span>
          </div>
        </div>
        
        {/* Search */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-5 flex items-center gap-3">
          <div className="text-slate-500">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Search suppliers, agents, shippers..." 
            className="bg-transparent text-white placeholder-slate-500 flex-1 outline-none text-sm"
          />
        </div>
        
        {/* Category Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {['All', 'Suppliers', 'Shippers', 'Agents', 'Exchange'].map((cat, i) => (
            <button 
              key={cat}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                i === 0 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        {/* Partner Cards */}
        <div className="space-y-3">
          {/* Featured Partner */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white font-bold">
                ZE
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold">Zheng Express</h4>
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">VERIFIED</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">Shipping • Guangzhou</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-medium">4.9</span>
                  </div>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-slate-400 text-xs">1,240+ shipments</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          
          {/* Regular Partners */}
          {[
            { name: 'Shenzhen Cargo', type: 'Freight', rating: '4.8', color: 'from-emerald-400 to-teal-500', initials: 'SC' },
            { name: 'Golden Bridge Trading', type: 'Supplier', rating: '4.7', color: 'from-amber-400 to-orange-500', initials: 'GB' },
            { name: 'FastFX Exchange', type: 'Currency', rating: '4.9', color: 'from-violet-400 to-purple-500', initials: 'FX' },
          ].map((partner, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${partner.color} rounded-xl flex items-center justify-center text-white font-bold text-sm`}>
                  {partner.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{partner.name}</h4>
                  <p className="text-slate-500 text-xs">{partner.type}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  <span className="text-white text-xs">{partner.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Main App
export default function App() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [country, setCountry] = useState('cameroon')
  const [activeTab, setActiveTab] = useState('transfer')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({ email, country })
    setSubmitted(true)
  }

  const features = [
    {
      icon: CreditCard,
      title: 'Lightning Transfers',
      description: 'Send XAF, NGN, GHS to Chinese bank accounts in minutes. Best rates, lowest fees.',
    },
    {
      icon: Users,
      title: 'Verified Partners',
      description: 'Connect with trusted suppliers, shipping agents, and exchange partners.',
    },
    {
      icon: Truck,
      title: 'Track Everything',
      description: 'Real-time shipment tracking from Guangzhou to your doorstep.',
    },
    {
      icon: Shield,
      title: 'Protected Trades',
      description: 'Escrow payments, verified partners, and buyer protection on every deal.',
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">Yebona</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-400 hover:text-white transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors font-medium">How It Works</a>
              <a href="#waitlist" className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left - Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-5 py-2.5 mb-8">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">Now accepting early access signups</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Trade with{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  China
                </span>
                ,<br />
                Built for{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Africa
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                Find suppliers. Send payments. Track shipments. Connect with verified trade partners across Asia — all from one powerful app.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a 
                  href="#waitlist" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
                >
                  Get Early Access
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#how-it-works" 
                  className="border border-slate-700 hover:border-slate-600 hover:bg-slate-900/50 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  See How It Works
                </a>
              </div>
              
              <div className="flex items-center gap-8 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  No fees to join
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  Early access perks
                </div>
              </div>
            </div>
            
            {/* Right - Phone Mockup with Tabs */}
            <div className="relative flex flex-col items-center">
              {/* Tab Switcher */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-2 mb-8 flex gap-2">
                <TabButton active={activeTab === 'transfer'} onClick={() => setActiveTab('transfer')}>
                  💸 Transfer
                </TabButton>
                <TabButton active={activeTab === 'partners'} onClick={() => setActiveTab('partners')}>
                  🤝 Partners
                </TabButton>
              </div>
              
              {/* Phone */}
              <PhoneMockup className="float-animation">
                {activeTab === 'transfer' ? <TransferScreen /> : <PartnersScreen />}
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-6 border-y border-slate-800/50 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '15min', label: 'Average Transfer Time' },
              { value: '$3.50', label: 'Starting Rate/kg' },
              { value: '500+', label: 'Verified Partners' },
              { value: '100%', label: 'Secure Transactions' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Import Smarter
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              From finding suppliers to receiving your goods, we've got every step covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="group bg-slate-900/50 border border-slate-800 rounded-3xl p-6 hover:bg-slate-800/50 hover:border-slate-700 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How Yebona Works</h2>
            <p className="text-slate-400 text-lg">Three steps to smarter importing</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Find Your Partner', desc: 'Browse verified suppliers, shipping agents, and exchange partners in China.' },
              { num: '02', title: 'Pay Securely', desc: 'Send XAF directly to Chinese accounts. WeChat, AliPay, bank transfer — we handle it.' },
              { num: '03', title: 'Track & Receive', desc: 'Monitor your shipment in real-time from warehouse to your door.' },
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-8xl font-black text-slate-800/50 absolute -top-4 -left-2">
                  {step.num}
                </div>
                <div className="relative pt-16 pl-4">
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Source from{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              All of Asia
            </span>
          </h2>
          <p className="text-slate-400 text-lg mb-12">Starting with China, expanding across the continent</p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { flag: '🇨🇳', name: 'China', status: 'Live' },
              { flag: '🇻🇳', name: 'Vietnam', status: 'Soon' },
              { flag: '🇮🇳', name: 'India', status: 'Soon' },
              { flag: '🇹🇭', name: 'Thailand', status: 'Soon' },
              { flag: '🇮🇩', name: 'Indonesia', status: 'Soon' },
            ].map((country, i) => (
              <div 
                key={i} 
                className={`px-8 py-5 rounded-2xl border transition-all ${
                  country.status === 'Live' 
                    ? 'bg-blue-500/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="text-4xl mb-3 block">{country.flag}</span>
                <p className="font-bold mb-1">{country.name}</p>
                <p className={`text-xs font-medium ${country.status === 'Live' ? 'text-blue-400' : 'text-slate-500'}`}>
                  {country.status === 'Live' ? '● Live' : 'Coming Soon'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-blue-500/10 to-transparent" />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Be First in Line
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Join the waitlist for early access and exclusive founding member perks.
          </p>
          
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-3xl p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">You're on the list! 🎉</h3>
              <p className="text-slate-400">We'll notify you as soon as Yebona launches in your country.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-lg"
                />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="cameroon">🇨🇲 Cameroon</option>
                  <option value="nigeria">🇳🇬 Nigeria</option>
                  <option value="ghana">🇬🇭 Ghana</option>
                  <option value="kenya">🇰🇪 Kenya</option>
                  <option value="senegal">🇸🇳 Senegal</option>
                  <option value="eswatini">🇸🇿 Eswatini</option>
                  <option value="other">🌍 Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-slate-500 text-sm">No spam. We'll only email you when we launch.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Yebona</span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2026 Yebona. Part of{' '}
              <a href="https://omevision.com" className="text-blue-400 hover:underline">Omevision</a>
            </p>
            <div className="flex gap-6 text-slate-500 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
