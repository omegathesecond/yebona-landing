import { useState } from 'react'
import { 
  ArrowRight, Globe, Truck, CreditCard, Shield, 
  ChevronDown, Check, Star, MapPin, Clock,
  DollarSign, Package, Smartphone, Users
} from 'lucide-react'

// Phone Mockup Components
function TransferMockup() {
  return (
    <div className="phone-mockup w-[280px] float-animation">
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 py-2 text-white/60 text-xs">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
            <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
          </div>
        </div>
        
        {/* App Header */}
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Send Money</h3>
          <p className="text-white/50 text-sm">XAF → RMB Transfer</p>
        </div>
        
        {/* Balance */}
        <div className="px-4 py-4 bg-gradient-to-r from-orange-600 to-orange-500">
          <p className="text-white/70 text-xs mb-1">Available Balance</p>
          <p className="text-white font-bold text-2xl">XAF 2,450,000</p>
        </div>
        
        {/* Transfer Form */}
        <div className="p-4 space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/50 text-sm">You Send</span>
              <span className="text-orange-400 text-xs">🇨🇲 XAF</span>
            </div>
            <p className="text-white font-bold text-xl">500,000</p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-orange-500 rounded-full p-2">
              <ArrowRight className="w-4 h-4 text-white rotate-90" />
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-white/50 text-sm">They Receive</span>
              <span className="text-red-400 text-xs">🇨🇳 RMB</span>
            </div>
            <p className="text-white font-bold text-xl">¥5,850.00</p>
          </div>
          
          <div className="bg-white/5 rounded-lg p-3 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Rate</span>
              <span className="text-white">1 XAF = 0.0117 RMB</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Fee</span>
              <span className="text-white">XAF 1,500</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-white/50">Delivery</span>
              <span className="text-green-400">~15 minutes</span>
            </div>
          </div>
          
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors">
            Continue Transfer
          </button>
        </div>
      </div>
    </div>
  )
}

function ShippingMockup() {
  return (
    <div className="phone-mockup w-[280px] float-animation-delayed">
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="flex justify-between items-center px-6 py-2 text-white/60 text-xs">
          <span>9:41</span>
          <div className="flex gap-1">
            <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
            <div className="w-4 h-2 bg-white/60 rounded-sm"></div>
          </div>
        </div>
        
        {/* App Header */}
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold text-lg">Logistics</h3>
          <p className="text-white/50 text-sm">China → Cameroon</p>
        </div>
        
        {/* Search */}
        <div className="p-4">
          <div className="bg-white/10 rounded-xl p-3 flex items-center gap-3">
            <Package className="w-5 h-5 text-white/50" />
            <input 
              type="text" 
              placeholder="Enter tracking ID..." 
              className="bg-transparent text-white placeholder-white/30 outline-none flex-1 text-sm"
              defaultValue="YBN-2024-88291"
            />
          </div>
        </div>
        
        {/* Freight Options */}
        <div className="px-4 mb-4">
          <p className="text-white/50 text-xs mb-2">Freight Methods</p>
          <div className="flex gap-2">
            <div className="bg-orange-500/20 border border-orange-500 rounded-lg px-3 py-2">
              <span className="text-orange-400 text-xs font-medium">✈️ Air</span>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-2">
              <span className="text-white/50 text-xs">🚢 Sea</span>
            </div>
            <div className="bg-white/5 rounded-lg px-3 py-2">
              <span className="text-white/50 text-xs">⚡ Express</span>
            </div>
          </div>
        </div>
        
        {/* Shipping Companies */}
        <div className="px-4 space-y-3">
          <p className="text-white/50 text-xs">Recommended Partners</p>
          
          <div className="bg-white/5 rounded-xl p-3 border border-white/10">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-medium text-sm">Z-Express Logistics</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white/70 text-xs">4.9 • Verified</span>
                </div>
              </div>
              <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full">Best</span>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <span className="text-white/50">5-7 days</span>
              <span className="text-white font-medium">$4.50/kg</span>
            </div>
          </div>
          
          <div className="bg-white/5 rounded-xl p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-white font-medium text-sm">Shenzhen Cargo</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-white/70 text-xs">4.7 • Top Rated</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs mt-3">
              <span className="text-white/50">6-9 days</span>
              <span className="text-white font-medium">$3.90/kg</span>
            </div>
          </div>
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

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would send to your backend
    console.log({ email, country })
    setSubmitted(true)
  }

  const features = [
    {
      icon: CreditCard,
      title: 'Fast Money Transfers',
      description: 'Send XAF, NGN, GHS to China in minutes. Competitive rates, low fees.',
      color: 'orange'
    },
    {
      icon: Truck,
      title: 'Logistics & Shipping',
      description: 'Track shipments from China. Compare freight options and prices.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'Licensed partners, encrypted transactions, buyer protection.',
      color: 'green'
    },
    {
      icon: Globe,
      title: 'Multi-Country Support',
      description: 'China, Vietnam, India, Thailand — all your Asian suppliers.',
      color: 'purple'
    }
  ]

  const stats = [
    { value: '15min', label: 'Average Transfer Time' },
    { value: '$3.50', label: 'Starting Shipping Rate/kg' },
    { value: '24/7', label: 'Customer Support' },
    { value: '100%', label: 'Secure Transactions' }
  ]

  return (
    <div className="min-h-screen bg-[#0a0a12] text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a12]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Yebona</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-white/70 hover:text-white transition-colors">Features</a>
              <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">How It Works</a>
              <a href="#waitlist" className="bg-orange-500 hover:bg-orange-600 px-5 py-2 rounded-lg font-medium transition-colors">
                Join Waitlist
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px]"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 mb-6">
                <span className="text-orange-400">🚀</span>
                <span className="text-sm text-white/70">Launching in Cameroon</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Import from <span className="text-orange-500">Asia</span>,<br />
                Simplified for <span className="text-orange-500">Africa</span>
              </h1>
              
              <p className="text-xl text-white/60 mb-8 max-w-lg">
                Send money to China. Track your shipments. Compare freight prices. 
                All in one app built for African importers.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a href="#waitlist" className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  Join the Waitlist
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="#how-it-works" className="border border-white/20 hover:bg-white/5 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2">
                  See How It Works
                </a>
              </div>
              
              <div className="flex items-center gap-6 text-white/50 text-sm">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  No fees to join
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-400" />
                  Early access perks
                </div>
              </div>
            </div>
            
            {/* Right - Phone Mockups */}
            <div className="relative flex justify-center items-center gap-4">
              <TransferMockup />
              <div className="hidden lg:block">
                <ShippingMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-orange-500 mb-2">{stat.value}</p>
                <p className="text-white/50 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Import</h2>
            <p className="text-white/50 text-lg max-w-2xl mx-auto">
              From payment to delivery, we've got every step of your import journey covered.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-colors">
                <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/20 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 text-${feature.color}-400`} />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-white/50 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Yebona Works</h2>
            <p className="text-white/50 text-lg">Three simple steps to import smarter</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-semibold mb-3">Find Your Supplier</h3>
              <p className="text-white/50">Browse verified suppliers on Alibaba, 1688, or your existing contacts in China.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-semibold mb-3">Pay with Yebona</h3>
              <p className="text-white/50">Send XAF directly to Chinese bank accounts or AliPay/WeChat. Fast, secure, low fees.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-semibold mb-3">Track & Receive</h3>
              <p className="text-white/50">Choose your freight partner, track in real-time, and receive your goods in Cameroon.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Source from All of Asia</h2>
          <p className="text-white/50 text-lg mb-12">Starting with China, expanding to more countries soon</p>
          
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { flag: '🇨🇳', name: 'China', status: 'Live' },
              { flag: '🇻🇳', name: 'Vietnam', status: 'Coming Soon' },
              { flag: '🇮🇳', name: 'India', status: 'Coming Soon' },
              { flag: '🇹🇭', name: 'Thailand', status: 'Coming Soon' },
              { flag: '🇮🇩', name: 'Indonesia', status: 'Coming Soon' },
            ].map((country, i) => (
              <div key={i} className={`px-6 py-4 rounded-xl border ${country.status === 'Live' ? 'bg-orange-500/10 border-orange-500' : 'bg-white/5 border-white/10'}`}>
                <span className="text-3xl mb-2 block">{country.flag}</span>
                <p className="font-medium">{country.name}</p>
                <p className={`text-xs ${country.status === 'Live' ? 'text-orange-400' : 'text-white/40'}`}>{country.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist */}
      <section id="waitlist" className="py-24 px-6 bg-gradient-to-b from-orange-500/10 to-transparent">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Be First in Line</h2>
          <p className="text-white/60 text-lg mb-8">
            Join the waitlist and get early access when we launch in your country. 
            Plus exclusive perks for early supporters.
          </p>
          
          {submitted ? (
            <div className="bg-green-500/20 border border-green-500 rounded-2xl p-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">You're on the list! 🎉</h3>
              <p className="text-white/60">We'll notify you as soon as Yebona launches in your country.</p>
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
                  className="flex-1 bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 outline-none focus:border-orange-500 transition-colors"
                />
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="cameroon">🇨🇲 Cameroon</option>
                  <option value="nigeria">🇳🇬 Nigeria</option>
                  <option value="ghana">🇬🇭 Ghana</option>
                  <option value="kenya">🇰🇪 Kenya</option>
                  <option value="senegal">🇸🇳 Senegal</option>
                  <option value="other">🌍 Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors flex items-center justify-center gap-2"
              >
                Join Waitlist
                <ArrowRight className="w-5 h-5" />
              </button>
              <p className="text-white/40 text-sm">No spam. We'll only email you when we launch.</p>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold">Yebona</span>
            </div>
            <p className="text-white/40 text-sm">
              © 2026 Yebona. Part of the <a href="https://omevision.com" className="text-orange-400 hover:underline">Omevision</a> family.
            </p>
            <div className="flex gap-6 text-white/40 text-sm">
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
