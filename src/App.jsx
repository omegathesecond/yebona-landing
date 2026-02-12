import { useState } from 'react'
import { 
  ArrowRight, Globe, Shield, Check, Star, 
  ChevronRight, Search, AlertTriangle, 
  BadgeCheck, DollarSign, Package, Factory, 
  Ship, BookOpen, Users, ArrowDown, Clock,
  Clipboard, UserCheck, BarChart3, Scale,
  CheckCircle2, Circle, ArrowDownCircle,
  MessageSquare, Zap, Award, TrendingUp
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

// Phone mockup: Compare Providers
function CompareProvidersMockup() {
  const providers = [
    {
      name: 'QuickFX',
      rate: '7.28',
      fee: '1.5%',
      time: '< 2 hrs',
      rating: 4.9,
      reviews: 234,
      badge: 'Best Rate',
      badgeColor: 'bg-emerald-500',
    },
    {
      name: 'AfriChange',
      rate: '7.25',
      fee: '2.0%',
      time: '< 1 hr',
      rating: 4.8,
      reviews: 412,
      badge: 'Most Trusted',
      badgeColor: 'bg-blue-500',
    },
  ]

  return (
    <div className="phone-mockup-static">
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
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Scale className="w-5 h-5 text-blue-400" />
              <span className="text-white font-bold text-sm">Compare Providers</span>
            </div>
            
            {/* Service Type */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg px-3 py-2 mb-4">
              <p className="text-blue-300 text-xs font-medium flex items-center gap-2">
                <DollarSign className="w-3 h-3" />
                Currency Exchange: USD → CNY
              </p>
            </div>
            
            {/* Comparison Cards */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {providers.map((provider, i) => (
                <div key={i} className={`rounded-xl p-3 border ${
                  i === 0 
                    ? 'bg-gradient-to-br from-emerald-500/15 to-blue-500/10 border-emerald-500/40' 
                    : 'bg-slate-900/60 border-slate-700/50'
                }`}>
                  {/* Badge */}
                  <div className={`${provider.badgeColor} text-white text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 mb-2`}>
                    {i === 0 ? <TrendingUp className="w-2.5 h-2.5" /> : <Award className="w-2.5 h-2.5" />}
                    {provider.badge}
                  </div>
                  
                  {/* Provider Name */}
                  <div className="flex items-center gap-1 mb-2">
                    <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center text-white text-[10px] font-bold">
                      {provider.name[0]}
                    </div>
                    <span className="text-white font-semibold text-xs">{provider.name}</span>
                    <BadgeCheck className="w-3 h-3 text-blue-400" />
                  </div>
                  
                  {/* Stats */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px]">Rate</span>
                      <span className="text-white text-xs font-bold">{provider.rate} CNY</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px]">Fee</span>
                      <span className="text-white text-xs">{provider.fee}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 text-[10px]">Time</span>
                      <span className="text-emerald-400 text-xs font-medium">{provider.time}</span>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span className="text-white text-xs font-medium">{provider.rating}</span>
                      <span className="text-slate-500 text-[10px]">({provider.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Select Button */}
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2">
              Select QuickFX
              <ArrowRight className="w-4 h-4" />
            </button>
            
            {/* Info */}
            <p className="text-slate-500 text-[10px] text-center mt-3">
              Prices update in real-time • All providers verified
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Phone mockup: Escrow Transaction
function EscrowTransactionMockup() {
  const steps = [
    { label: 'You Pay', status: 'complete', icon: DollarSign },
    { label: 'Funds Held', status: 'complete', icon: Shield },
    { label: 'Service Delivered', status: 'current', icon: Package },
    { label: 'Funds Released', status: 'pending', icon: CheckCircle2 },
  ]
  
  return (
    <div className="phone-mockup-static">
      <div className="relative bg-gradient-to-b from-slate-800 to-slate-900 rounded-[2.5rem] p-2.5 shadow-2xl shadow-emerald-500/20">
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
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              <Shield className="w-5 h-5 text-emerald-400" />
              <span className="text-white font-bold text-sm">Escrow Protection</span>
            </div>
            
            {/* Transaction Card */}
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs">Transaction #YB-2847</span>
                <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                  <Circle className="w-2 h-2 fill-emerald-400" />
                  In Progress
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  QF
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">QuickFX Exchange</p>
                  <p className="text-slate-400 text-xs">$500 USD → 3,640 CNY</p>
                </div>
              </div>
            </div>
            
            {/* Escrow Progress */}
            <div className="bg-gradient-to-br from-emerald-500/10 to-blue-500/5 border border-emerald-500/30 rounded-xl p-4 mb-4">
              <p className="text-emerald-300 text-xs font-semibold mb-4">Escrow Progress</p>
              
              <div className="relative">
                {/* Progress Line */}
                <div className="absolute left-[15px] top-6 bottom-6 w-0.5 bg-slate-700" />
                <div className="absolute left-[15px] top-6 h-[60%] w-0.5 bg-gradient-to-b from-emerald-400 to-emerald-400/50" />
                
                {/* Steps */}
                <div className="space-y-4">
                  {steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-3 relative">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                        step.status === 'complete' 
                          ? 'bg-emerald-500 text-white' 
                          : step.status === 'current'
                            ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400'
                            : 'bg-slate-800 border border-slate-600 text-slate-500'
                      }`}>
                        {step.status === 'complete' ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${
                          step.status === 'complete' || step.status === 'current'
                            ? 'text-white'
                            : 'text-slate-500'
                        }`}>{step.label}</p>
                        {step.status === 'current' && (
                          <p className="text-emerald-400 text-[10px]">Awaiting delivery confirmation</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-2">
              <button className="bg-slate-800 text-slate-300 text-xs font-medium py-2.5 rounded-xl flex items-center justify-center gap-1">
                <MessageSquare className="w-3 h-3" />
                Message
              </button>
              <button className="bg-emerald-500 text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1">
                <Check className="w-3 h-3" />
                Confirm Delivery
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Detailed Provider Card (for listing mockup)
function DetailedProviderCard({ provider, featured }) {
  return (
    <div className={`rounded-2xl p-4 border transition-all hover:scale-[1.02] ${
      featured 
        ? 'bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent border-blue-500/30' 
        : 'bg-slate-900/50 border-slate-700/50 hover:border-slate-600'
    }`}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-white text-lg font-bold shrink-0 ${
          provider.bgGradient || 'bg-gradient-to-br from-blue-500 to-indigo-600'
        }`}>
          {provider.initials}
        </div>
        
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-white font-bold text-base truncate">{provider.name}</h4>
                {provider.verified && (
                  <BadgeCheck className="w-4 h-4 text-blue-400 shrink-0" />
                )}
              </div>
              <p className="text-slate-400 text-sm">{provider.service}</p>
            </div>
            {featured && (
              <span className="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shrink-0">
                TOP RATED
              </span>
            )}
          </div>
          
          {/* Stats Row */}
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span className="text-white text-sm font-semibold">{provider.rating}</span>
              <span className="text-slate-500 text-sm">({provider.reviews} reviews)</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <Clock className="w-3.5 h-3.5" />
              <span>{provider.responseTime}</span>
            </div>
            {provider.completedJobs && (
              <div className="flex items-center gap-1 text-emerald-400 text-sm">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{provider.completedJobs} completed</span>
              </div>
            )}
          </div>
          
          {/* Services Tags */}
          {provider.tags && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {provider.tags.map((tag, i) => (
                <span key={i} className="bg-slate-800 text-slate-300 text-xs px-2 py-1 rounded-md">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Visual Step Flow Component (Desktop)
function StepFlowSection() {
  const steps = [
    {
      num: 1,
      title: 'Tell us what you need',
      desc: 'Select the service type and describe your requirements',
      icon: Clipboard,
      color: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500/20',
    },
    {
      num: 2,
      title: 'Get matched with verified providers',
      desc: 'We show you pre-vetted providers that match your needs',
      icon: UserCheck,
      color: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-500/20',
    },
    {
      num: 3,
      title: 'Compare quotes & reviews',
      desc: 'See rates, fees, ratings side-by-side and choose the best fit',
      icon: BarChart3,
      color: 'from-amber-500 to-orange-600',
      iconBg: 'bg-amber-500/20',
    },
    {
      num: 4,
      title: 'Transact with escrow protection',
      desc: 'Your payment is held safely until you confirm satisfaction',
      icon: Shield,
      color: 'from-emerald-500 to-emerald-600',
      iconBg: 'bg-emerald-500/20',
    },
  ]

  return (
    <div className="relative">
      {/* Desktop/Tablet Flow */}
      <div className="hidden md:block">
        <div className="grid md:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              {/* Connector Arrow */}
              {i < steps.length - 1 && (
                <div className="hidden md:flex absolute top-12 -right-2 z-10 items-center justify-center">
                  <div className="w-4 h-4 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                </div>
              )}
              
              {/* Step Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 h-full hover:border-slate-700 transition-all group">
                {/* Icon */}
                <div className={`w-14 h-14 ${step.iconBg} border border-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <step.icon className={`w-7 h-7 bg-gradient-to-br ${step.color} bg-clip-text text-transparent`} style={{ color: step.color.includes('blue') ? '#3b82f6' : step.color.includes('purple') ? '#a855f7' : step.color.includes('amber') ? '#f59e0b' : '#10b981' }} />
                </div>
                
                {/* Step Number */}
                <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-br ${step.color} text-white text-xs font-bold mb-3`}>
                  {step.num}
                </div>
                
                {/* Content */}
                <h3 className="text-white font-bold text-base mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Flow */}
      <div className="md:hidden space-y-4">
        {steps.map((step, i) => (
          <div key={i} className="relative">
            {/* Connector Line */}
            {i < steps.length - 1 && (
              <div className="absolute left-7 top-[72px] w-0.5 h-8 bg-gradient-to-b from-slate-700 to-transparent" />
            )}
            
            <div className="flex gap-4 items-start">
              {/* Icon */}
              <div className={`w-14 h-14 ${step.iconBg} border border-white/10 rounded-2xl flex items-center justify-center shrink-0`}>
                <step.icon className="w-6 h-6" style={{ color: step.color.includes('blue') ? '#3b82f6' : step.color.includes('purple') ? '#a855f7' : step.color.includes('amber') ? '#f59e0b' : '#10b981' }} />
              </div>
              
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-gradient-to-br ${step.color} text-white text-[10px] font-bold`}>
                    {step.num}
                  </span>
                  <h3 className="text-white font-bold text-sm">{step.title}</h3>
                </div>
                <p className="text-slate-400 text-sm">{step.desc}</p>
              </div>
            </div>
          </div>
        ))}
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
              Get Early Access
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
                A marketplace where <strong className="text-white">service providers list their services</strong> — currency exchange, sourcing, freight, and more. You compare, choose, and transact safely with escrow protection.
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
                  <Star className="w-5 h-5 text-amber-400" />
                  <span>Reviews (coming soon)</span>
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
              A platform where{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                providers list their services
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Service providers list what they offer. You browse, compare, and choose — all with verification and escrow protection.
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
                title: 'Reviews & ratings (coming soon)',
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

      {/* How It Works - Visual Step Flow */}
      <section id="how-it-works" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-300 font-medium">Simple 4-Step Process</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">How it works</h2>
            <p className="text-slate-400 text-lg">Four simple steps to safe, successful imports</p>
          </div>
          
          <StepFlowSection />
        </div>
      </section>

      {/* Compare Providers Mockup Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/30 rounded-full px-4 py-2 mb-6">
                <Scale className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-purple-300 font-medium">Smart Comparison</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Compare providers{' '}
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  side-by-side
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                No more guessing. See exchange rates, fees, delivery times, and ratings all in one place. Make informed decisions with full transparency.
              </p>
              <ul className="space-y-3">
                {[
                  { icon: TrendingUp, text: 'Real-time rates and pricing' },
                  { icon: Star, text: 'Verified reviews from real users' },
                  { icon: Clock, text: 'Delivery time estimates' },
                  { icon: Award, text: '"Best Rate" & "Most Trusted" badges' },
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-300">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-purple-400" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Right - Phone Mockup */}
            <div className="order-1 lg:order-2 flex justify-center">
              <CompareProvidersMockup />
            </div>
          </div>
        </div>
      </section>

      {/* Escrow Transaction Mockup Section */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Phone Mockup */}
            <div className="flex justify-center">
              <EscrowTransactionMockup />
            </div>
            
            {/* Right - Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-2 mb-6">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-emerald-300 font-medium">Escrow Protection</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
                Track your transaction{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  every step
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                Your money is protected throughout the entire process. Watch as it moves from your payment to secure escrow, then released only when you're satisfied.
              </p>
              
              {/* Escrow Steps */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 space-y-4">
                {[
                  { step: 1, title: 'You Pay', desc: 'Funds sent to secure escrow', color: 'text-blue-400' },
                  { step: 2, title: 'Funds Held', desc: 'Money safely locked until delivery', color: 'text-purple-400' },
                  { step: 3, title: 'Service Delivered', desc: 'Provider completes the service', color: 'text-amber-400' },
                  { step: 4, title: 'Funds Released', desc: 'You confirm, provider gets paid', color: 'text-emerald-400' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-sm font-bold ${item.color}`}>
                      {item.step}
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">{item.title}</p>
                      <p className="text-slate-500 text-xs">{item.desc}</p>
                    </div>
                    {i < 3 && (
                      <ArrowRight className="w-4 h-4 text-slate-600 ml-auto" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Provider Cards Section */}
      <section className="py-16 px-6 bg-slate-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-2 mb-6">
              <Users className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300 font-medium">Provider Marketplace</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              What provider listings{' '}
              <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                look like
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Detailed profiles with ratings, reviews, services, and response times. Everything you need to make the right choice.
            </p>
          </div>
          
          {/* Provider Cards Grid */}
          <div className="space-y-4">
            <DetailedProviderCard 
              provider={{
                name: 'QuickFX Exchange',
                initials: 'QF',
                service: 'Currency Exchange • Guangzhou, China',
                rating: 4.9,
                reviews: 234,
                responseTime: 'Responds in < 1 hour',
                completedJobs: 1847,
                verified: true,
                tags: ['USD → CNY', 'EUR → CNY', 'ZAR → CNY', 'Same-day transfer'],
                bgGradient: 'bg-gradient-to-br from-emerald-500 to-teal-600',
              }}
              featured={true}
            />
            <DetailedProviderCard 
              provider={{
                name: 'Zhang Trading Company',
                initials: 'ZT',
                service: 'Sourcing Agent • Yiwu Market Specialist',
                rating: 4.8,
                reviews: 189,
                responseTime: 'Responds in < 2 hours',
                completedJobs: 923,
                verified: true,
                tags: ['Product sourcing', 'Price negotiation', 'Quality inspection', 'Factory visits'],
                bgGradient: 'bg-gradient-to-br from-blue-500 to-indigo-600',
              }}
              featured={false}
            />
            <DetailedProviderCard 
              provider={{
                name: 'African Star Freight',
                initials: 'AS',
                service: 'Shipping & Logistics • Sea, Air, Rail',
                rating: 4.7,
                reviews: 156,
                responseTime: 'Responds in < 3 hours',
                completedJobs: 2341,
                verified: true,
                tags: ['Sea freight', 'Air cargo', 'Door-to-door', 'Customs clearance'],
                bgGradient: 'bg-gradient-to-br from-orange-500 to-red-600',
              }}
              featured={false}
            />
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
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-full px-4 py-2 mb-6">
            <span className="text-sm text-blue-300 font-medium">🚀 Launching Soon</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Get Early Access
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Be first in line when we launch. Whether you want to find providers or list your services.
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
              
              <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4">
                <p className="text-slate-400 text-sm mb-3">I want early access to...</p>
                <div className="flex gap-2">
                  {[
                    { value: 'user', label: '🔍 Find providers', desc: 'Browse & compare' },
                    { value: 'provider', label: '🏪 List my services', desc: 'Reach customers' },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setInterest(opt.value)}
                      className={`px-4 py-3 rounded-xl font-medium transition-all flex-1 text-left ${
                        interest === opt.value
                          ? 'bg-blue-500 text-white'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      <span className="block text-sm font-semibold">{opt.label}</span>
                      <span className={`block text-xs mt-0.5 ${interest === opt.value ? 'text-blue-100' : 'text-slate-500'}`}>{opt.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50"
              >
                {isSubmitting ? 'Joining...' : 'Get Early Access'}
                {!isSubmitting && <ArrowRight className="w-5 h-5" />}
              </button>
              <p className="text-slate-500 text-sm">We'll notify you on WhatsApp when we launch.</p>
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
