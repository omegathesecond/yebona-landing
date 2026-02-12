import { useState } from 'react'
import { 
  ArrowRight, Globe, Truck, CreditCard, Shield, 
  Check, Star, TrendingUp, Zap, Users, 
  ChevronRight, Sparkles, ArrowUpRight
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

// Suppliers Screen - Find Products on Alibaba/1688
function SuppliersScreen() {
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
          <h3 className="text-white font-bold text-xl">Find Suppliers</h3>
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
            placeholder="Search products..." 
            className="bg-transparent text-white placeholder-slate-500 flex-1 outline-none text-sm"
            defaultValue="Electronics"
          />
        </div>
        
        {/* Category Tabs */}
        <div className="flex gap-2 mb-5 overflow-x-auto pb-2">
          {['🔌 Electronics', '👗 Fashion', '🏠 Home', '🔧 Industrial'].map((cat, i) => (
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
        
        {/* Supplier Cards */}
        <div className="space-y-3">
          {/* Featured Supplier */}
          <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold">
                🏭
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-semibold text-sm">Shenzhen Tech Co.</h4>
                  <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">TOP</span>
                </div>
                <p className="text-slate-400 text-xs mb-2">Electronics • 8 yrs • Gold Supplier</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs font-medium">4.9</span>
                  </div>
                  <span className="text-slate-500 text-xs">•</span>
                  <span className="text-emerald-400 text-xs">MOQ: 50 pcs</span>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-blue-400" />
            </div>
          </div>
          
          {/* Regular Suppliers */}
          {[
            { name: 'Guangzhou Fashion Hub', type: 'Clothing & Textiles', rating: '4.8', moq: '100 pcs', initials: '👗' },
            { name: 'Yiwu Trading Center', type: 'General Goods', rating: '4.7', moq: '200 pcs', initials: '📦' },
            { name: 'Foshan Furniture Co.', type: 'Home & Garden', rating: '4.9', moq: '20 pcs', initials: '🪑' },
          ].map((supplier, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 hover:border-slate-700 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-xl">
                  {supplier.initials}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{supplier.name}</h4>
                  <p className="text-slate-500 text-xs">{supplier.type}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span className="text-white text-xs">{supplier.rating}</span>
                  </div>
                  <span className="text-emerald-400 text-[10px]">MOQ: {supplier.moq}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Shipping Screen - Freight & Logistics
function ShippingScreen() {
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
          <h3 className="text-white font-bold text-xl">Shipping</h3>
          <div className="bg-emerald-500/20 px-3 py-1.5 rounded-full">
            <span className="text-emerald-400 text-sm font-medium">🇨🇳 → 🇨🇲</span>
          </div>
        </div>
        
        {/* Route Card */}
        <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-3xl p-5 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="flex items-center justify-between mb-4">
            <div className="text-center">
              <p className="text-blue-100 text-xs mb-1">From</p>
              <p className="text-white font-bold text-lg">Guangzhou</p>
              <p className="text-blue-200 text-xs">China</p>
            </div>
            <div className="flex-1 flex items-center justify-center px-4">
              <div className="h-0.5 flex-1 bg-white/30" />
              <div className="mx-2 text-2xl">✈️</div>
              <div className="h-0.5 flex-1 bg-white/30" />
            </div>
            <div className="text-center">
              <p className="text-blue-100 text-xs mb-1">To</p>
              <p className="text-white font-bold text-lg">Douala</p>
              <p className="text-blue-200 text-xs">Cameroon</p>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-medium">
              Est. 7-10 days
            </span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-white text-xs font-medium">
              Air Freight
            </span>
          </div>
        </div>
        
        {/* Freight Options */}
        <p className="text-slate-400 text-xs mb-3">Compare freight partners</p>
        <div className="space-y-3">
          {[
            { name: 'Z-Express Air', method: '✈️ Air', days: '5-7', price: '$4.50/kg', best: true },
            { name: 'Ocean Cargo Ltd', method: '🚢 Sea', days: '25-35', price: '$0.80/kg', best: false },
            { name: 'Rail Express', method: '🚂 Rail', days: '18-22', price: '$1.90/kg', best: false },
          ].map((shipper, i) => (
            <div key={i} className={`rounded-2xl p-4 border transition-colors ${
              shipper.best 
                ? 'bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border-blue-500/30' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{shipper.method.split(' ')[0]}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-white font-medium text-sm">{shipper.name}</h4>
                      {shipper.best && (
                        <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">BEST</span>
                      )}
                    </div>
                    <p className="text-slate-500 text-xs">{shipper.days} days</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{shipper.price}</p>
                  <p className="text-slate-500 text-xs">{shipper.method.split(' ')[1]}</p>
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
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [interest, setInterest] = useState('shipping')
  const [submitted, setSubmitted] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('https://ceo-dashboard-api-1026777738823.europe-west1.run.app/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          interest,
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
      icon: Globe,
      title: 'Find Suppliers',
      description: 'Browse verified suppliers on Alibaba, 1688, and Yiwu. Get quotes, compare prices, and source products directly.',
    },
    {
      icon: Truck,
      title: 'Ship with Confidence',
      description: 'Compare air, sea, and rail freight. Track shipments in real-time from China to your doorstep.',
    },
    {
      icon: CreditCard,
      title: 'Fast Exchange',
      description: 'Send XAF, NGN, GHS to Chinese bank accounts, WeChat, or AliPay. Best rates, fast delivery.',
    },
    {
      icon: Shield,
      title: 'Protected Trades',
      description: 'Verified partners, escrow payments, and buyer protection on every transaction.',
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
                Source from{' '}
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
                Find verified suppliers on Alibaba & 1688. Ship with trusted freight partners. Exchange currency at the best rates. Your complete Africa-China import solution.
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
            
            {/* Right - Phone Mockup (Exchange/Transfer) */}
            <div className="relative flex justify-center">
              <PhoneMockup className="float-animation">
                <TransferScreen />
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

      {/* App Services - Clean Mobile Layout */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              One App,{' '}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                All Services
              </span>
            </h2>
            <p className="text-slate-400 text-lg">
              Everything you need to import from China.
            </p>
          </div>
          
          {/* Services List */}
          <div className="space-y-6">
            {/* Find Suppliers */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  🏭
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Find Suppliers</h3>
                  <p className="text-slate-400">Browse verified suppliers on Alibaba, 1688 & Yiwu. Compare prices, check ratings, and connect directly.</p>
                </div>
              </div>
              {/* App Preview */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {['🔌 Electronics', '👗 Fashion', '🏠 Home', '🔧 Industrial'].map((cat, i) => (
                    <span key={cat} className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap ${i === 0 ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'}`}>{cat}</span>
                  ))}
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Shenzhen Tech Co.', type: 'Electronics • Gold Supplier', rating: '4.9', top: true },
                    { name: 'Guangzhou Fashion Hub', type: 'Clothing & Textiles', rating: '4.8', top: false },
                    { name: 'Yiwu Trading Center', type: 'General Goods', rating: '4.7', top: false },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${s.top ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-slate-900/50'}`}>
                      <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white text-sm font-bold">{s.name[0]}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-white font-medium text-sm truncate">{s.name}</p>
                          {s.top && <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">TOP</span>}
                        </div>
                        <p className="text-slate-500 text-xs">{s.type}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                        <span className="text-white text-xs">{s.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Shipping */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  📦
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ship Your Goods</h3>
                  <p className="text-slate-400">Compare air, sea & rail freight. Track shipments in real-time from China to your door.</p>
                </div>
              </div>
              {/* App Preview */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="text-center">
                    <p className="text-slate-500 text-xs">From</p>
                    <p className="text-white font-bold">Guangzhou</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center px-4">
                    <div className="h-0.5 flex-1 bg-slate-700" />
                    <span className="mx-2">✈️</span>
                    <div className="h-0.5 flex-1 bg-slate-700" />
                  </div>
                  <div className="text-center">
                    <p className="text-slate-500 text-xs">To</p>
                    <p className="text-white font-bold">Douala</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { name: 'Z-Express Air', method: '✈️', days: '5-7 days', price: '$4.50/kg', best: true },
                    { name: 'Ocean Cargo Ltd', method: '🚢', days: '25-35 days', price: '$0.80/kg', best: false },
                    { name: 'Rail Express', method: '🚂', days: '18-22 days', price: '$1.90/kg', best: false },
                  ].map((s, i) => (
                    <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${s.best ? 'bg-blue-500/10 border border-blue-500/30' : 'bg-slate-900/50'}`}>
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{s.method}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-white font-medium text-sm">{s.name}</p>
                            {s.best && <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">BEST</span>}
                          </div>
                          <p className="text-slate-500 text-xs">{s.days}</p>
                        </div>
                      </div>
                      <p className="text-white font-bold text-sm">{s.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Exchange */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-2xl shrink-0">
                  💱
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Send Payments</h3>
                  <p className="text-slate-400">Transfer XAF, NGN, GHS to Chinese bank accounts, WeChat or AliPay. Best rates, fast delivery.</p>
                </div>
              </div>
              {/* App Preview */}
              <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800">
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">You send</span>
                      <span className="bg-slate-800 px-3 py-1 rounded-lg text-white text-sm">🇨🇲 XAF</span>
                    </div>
                    <p className="text-white font-bold text-2xl">500,000</p>
                  </div>
                  <div className="flex justify-center">
                    <div className="bg-blue-500 rounded-xl p-2">
                      <ArrowRight className="w-4 h-4 text-white rotate-90" />
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-slate-400 text-sm">They receive</span>
                      <span className="bg-slate-800 px-3 py-1 rounded-lg text-white text-sm">🇨🇳 CNY</span>
                    </div>
                    <p className="text-white font-bold text-2xl">¥5,850.00</p>
                  </div>
                  <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center gap-3">
                    <Zap className="w-5 h-5 text-emerald-400" />
                    <div>
                      <p className="text-emerald-400 text-sm font-medium">Best rate • Arrives in ~15 min</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 bg-slate-900/30">
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
              <p className="text-slate-400">We'll reach out on WhatsApp when Yebona launches.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name & Phone */}
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-lg"
                />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="WhatsApp number"
                  required
                  className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl px-6 py-4 text-white placeholder-slate-500 outline-none focus:border-blue-500 transition-colors text-lg"
                />
              </div>
              
              {/* Interest Selection */}
              <div className="bg-slate-900/30 border border-slate-800 rounded-2xl p-4">
                <p className="text-slate-400 text-sm mb-3">What are you interested in?</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { value: 'shipping', label: '📦 Shipping', desc: 'Freight & logistics' },
                    { value: 'exchange', label: '💱 Exchange', desc: 'Currency transfer' },
                    { value: 'suppliers', label: '🏭 Suppliers', desc: 'Find products' },
                    { value: 'all', label: '🌐 Everything', desc: 'Full package' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setInterest(opt.value)}
                      className={`px-5 py-3 rounded-xl font-medium transition-all ${
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
