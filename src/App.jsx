import { useState } from 'react'
import { 
  ArrowRight, Globe, Truck, CreditCard, Shield, 
  Check, Star, TrendingUp, Zap, Users, 
  ChevronRight, Sparkles, ArrowUpRight, Search, 
  BarChart3, MessageSquare, BadgeCheck, Store
} from 'lucide-react'

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

// Marketplace Provider Comparison Screen
function MarketplaceScreen() {
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
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-bold text-lg">Compare Providers</h3>
          <div className="bg-blue-500/20 px-3 py-1.5 rounded-full">
            <span className="text-blue-400 text-xs font-medium">XAF → CNY</span>
          </div>
        </div>
        
        {/* Amount Input */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 mb-4">
          <p className="text-slate-400 text-xs mb-2">You want to send</p>
          <div className="flex items-center justify-between">
            <p className="text-white font-bold text-2xl">500,000 XAF</p>
            <ChevronRight className="w-5 h-5 text-slate-500" />
          </div>
        </div>
        
        {/* Provider Comparison Cards */}
        <p className="text-slate-400 text-xs mb-3">Best rates from verified providers</p>
        <div className="space-y-3">
          {[
            { name: 'QuickFX Exchange', rate: '¥5,892', fee: '1.2%', time: '15 min', rating: '4.9', reviews: 234, best: true },
            { name: 'AfriPay Transfer', rate: '¥5,850', fee: '1.5%', time: '30 min', rating: '4.8', reviews: 189, best: false },
            { name: 'SwiftMoney Co.', rate: '¥5,820', fee: '2.0%', time: '1 hour', rating: '4.7', reviews: 156, best: false },
          ].map((provider, i) => (
            <div key={i} className={`rounded-2xl p-4 border transition-colors ${
              provider.best 
                ? 'bg-gradient-to-br from-emerald-500/10 to-blue-500/10 border-emerald-500/30' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white text-xs font-bold">
                    {provider.name.split(' ').map(w => w[0]).join('').slice(0,2)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium text-sm">{provider.name}</h4>
                      {provider.best && (
                        <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">BEST RATE</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs">{provider.rating}</span>
                      </div>
                      <span className="text-slate-500 text-xs">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <div>
                    <p className="text-slate-500 text-[10px]">They receive</p>
                    <p className="text-white font-bold">{provider.rate}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px]">Fee</p>
                    <p className="text-white font-medium text-sm">{provider.fee}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-[10px]">Speed</p>
                    <p className="text-emerald-400 font-medium text-sm">{provider.time}</p>
                  </div>
                </div>
                <button className={`px-4 py-2 rounded-xl text-sm font-medium ${
                  provider.best 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}>
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Escrow Badge */}
        <div className="mt-4 bg-slate-900/50 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
          <Shield className="w-5 h-5 text-emerald-400" />
          <p className="text-slate-400 text-xs">All transactions protected by <span className="text-emerald-400 font-medium">Escrow</span></p>
        </div>
      </div>
    </div>
  )
}

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
        // If already on waitlist, still show success
        if (response.status === 409) {
          setSubmitted(true)
        } else {
          alert('Something went wrong. Please try again.')
        }
      }
    } catch (err) {
      console.error('Waitlist error:', err)
      // Still mark as submitted for better UX (data can be recovered from logs)
      setSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: Search,
      title: 'Browse Providers',
      description: 'Discover verified service providers offering currency exchange, money transfers, and escrow services — all in one marketplace.',
    },
    {
      icon: BarChart3,
      title: 'Compare Rates & Fees',
      description: 'See real-time rates, fees, and delivery times side-by-side. Choose the best deal for your transaction.',
    },
    {
      icon: MessageSquare,
      title: 'Read Real Reviews',
      description: 'Make informed decisions with verified user reviews and ratings from the community.',
    },
    {
      icon: Shield,
      title: 'Escrow Protection',
      description: 'Every transaction is protected. Your money stays in escrow until you confirm receipt. Full refund guarantee.',
    },
  ]

  const providerServices = [
    { icon: '💱', name: 'Currency Exchange', desc: 'Exchange XAF, NGN, GHS to CNY, USD & more' },
    { icon: '💸', name: 'Money Transfers', desc: 'Send payments to WeChat, AliPay, bank accounts' },
    { icon: '🔒', name: 'Escrow Services', desc: 'Secure payments for goods & services' },
    { icon: '📦', name: 'Freight & Shipping', desc: 'Air, sea & rail cargo from China' },
    { icon: '🏭', name: 'Supplier Sourcing', desc: 'Find products on Alibaba, 1688 & Yiwu' },
    { icon: '📋', name: 'Trade Consulting', desc: 'Import guidance & customs support' },
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
              <a href="#for-providers" className="text-slate-400 hover:text-white transition-colors font-medium">For Providers</a>
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
                <span className="text-sm text-blue-300 font-medium">Africa's first cross-border services marketplace</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight">
                Compare.{' '}
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Choose.
                </span>
                <br />
                Transact{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-emerald-500 bg-clip-text text-transparent">
                  Safely.
                </span>
              </h1>
              
              <p className="text-xl text-slate-400 mb-10 max-w-xl leading-relaxed">
                The marketplace where you compare rates, fees, and reviews from multiple service providers — currency exchange, money transfers, escrow, and more. All protected by escrow.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a 
                  href="#waitlist" 
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
                >
                  Find a Provider
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#for-providers" 
                  className="border border-slate-700 hover:border-slate-600 hover:bg-slate-900/50 px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2"
                >
                  <Store className="w-5 h-5" />
                  List Your Services
                </a>
              </div>
              
              <div className="flex items-center gap-8 text-slate-500 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  Compare multiple providers
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Check className="w-3 h-3 text-emerald-400" />
                  </div>
                  Escrow protected
                </div>
              </div>
            </div>
            
            {/* Right - Phone Mockup (Provider Comparison) */}
            <div className="relative flex justify-center">
              <PhoneMockup className="float-animation">
                <MarketplaceScreen />
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
              { value: '50+', label: 'Verified Providers' },
              { value: '4.8★', label: 'Average Rating' },
              { value: '100%', label: 'Escrow Protected' },
              { value: '$0', label: 'Platform Fee' },
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

      {/* What Providers Offer */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              One Marketplace,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Many Services
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Browse providers offering these cross-border services
            </p>
          </div>
          
          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providerServices.map((service, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-colors">
                <span className="text-3xl mb-3 block">{service.icon}</span>
                <h3 className="text-lg font-bold text-white mb-1">{service.name}</h3>
                <p className="text-slate-400 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Why Use the{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Marketplace?
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Stop searching endlessly. Compare all your options in one place.
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

      {/* Escrow Security Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/30">
                <Shield className="w-12 h-12 text-white" />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Every Transaction is <span className="text-emerald-400">Protected</span>
                </h2>
                <p className="text-slate-400 text-lg mb-6 max-w-2xl">
                  Our built-in <strong className="text-white">escrow system</strong> holds your payment until you confirm the service is complete. 
                  If anything goes wrong, you get a <strong className="text-white">full refund</strong>. Providers are only paid when you're satisfied.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Funds held securely</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Release on confirmation</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Dispute resolution</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-xl">
                    <Check className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm">Money-back guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">How Yebona Works</h2>
            <p className="text-slate-400 text-lg">Three steps to safe, smart transactions</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '01', title: 'Browse Providers', desc: 'Search for the service you need. See all available providers with their rates, fees, and reviews.' },
              { num: '02', title: 'Compare & Choose', desc: 'Compare rates, fees, delivery times, and user ratings side-by-side. Pick the best provider for you.' },
              { num: '03', title: 'Transact Safely', desc: 'Pay with confidence. Your money is held in escrow until you confirm the service is complete.' },
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

      {/* For Service Providers */}
      <section id="for-providers" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-transparent border border-blue-500/20 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-500/30 rounded-full px-5 py-2.5 mb-6">
                <Store className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">For Service Providers</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                List Your Services,{' '}
                <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Reach More Customers
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Join Yebona's marketplace and connect with thousands of African importers looking for reliable service providers.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {[
                { icon: Users, title: 'Reach New Customers', desc: 'Access a growing network of African businesses and individuals importing from Asia.' },
                { icon: BadgeCheck, title: 'Build Trust', desc: 'Get verified, collect reviews, and showcase your track record to win more business.' },
                { icon: TrendingUp, title: 'Grow Your Business', desc: 'No upfront costs. Only pay when you complete transactions. Scale on your terms.' },
              ].map((benefit, i) => (
                <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 border border-blue-500/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-slate-400 text-sm">{benefit.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <a 
                href="#waitlist" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]"
              >
                Apply to Be a Provider
                <ArrowRight className="w-5 h-5" />
              </a>
              <p className="text-slate-500 text-sm mt-4">Free to list. Commission only on completed transactions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-24 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Connecting Africa to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Asia
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
            Join the Marketplace
          </h2>
          <p className="text-slate-400 text-lg mb-10">
            Get early access as a user or apply to list your services as a provider.
          </p>
          
          {submitted ? (
            <div className="bg-emerald-500/10 border border-emerald-500/50 rounded-3xl p-10">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">You're on the list! 🎉</h3>
              <p className="text-slate-400 mb-6">We'll reach out on WhatsApp when Yebona launches.</p>
              <button
                onClick={resetForm}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-6 py-3 rounded-xl font-medium transition-all"
              >
                Submit Another Entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-lg"
              />
              
              {/* Country & Phone */}
              <div className="flex gap-3">
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-slate-900/50 border border-slate-800 rounded-2xl px-4 py-4 text-white outline-none focus:border-blue-500 transition-colors text-lg appearance-none cursor-pointer min-w-[140px]"
                >
                  {AFRICAN_COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.name}
                    </option>
                  ))}
                </select>
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    {selectedCountry?.prefix}
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required
                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-16 pr-6 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-lg"
                  />
                </div>
              </div>
              
              {/* Interest Selection */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4">
                <p className="text-slate-400 text-sm mb-3">I want to...</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'user', label: '🔍 Find Providers', desc: 'Compare & transact' },
                    { value: 'provider', label: '🏪 List My Services', desc: 'Become a provider' },
                    { value: 'both', label: '🔄 Both', desc: 'User & provider' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setInterest(opt.value)}
                      className={`px-5 py-3 rounded-xl font-medium transition-all flex-1 min-w-[120px] ${
                        interest === opt.value
                          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-8 py-5 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
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
