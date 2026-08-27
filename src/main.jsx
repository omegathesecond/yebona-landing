import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './App.jsx'
import BlogIndex from './pages/BlogIndex.jsx'
import BlogPost from './pages/BlogPost.jsx'
import Privacy from './pages/Privacy.jsx'
import Terms from './pages/Terms.jsx'
import Contact from './pages/Contact.jsx'
import Pricing from './pages/Pricing.jsx'
import AdminLayout from './components/admin/AdminLayout.jsx'
import Providers from './pages/admin/Providers.jsx'
import Disputes from './pages/admin/Disputes.jsx'
import Payouts from './pages/admin/Payouts.jsx'
import Reports from './pages/admin/Reports.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        {/* Admin operations dashboard — gated client-side by the dashboard API key. */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Providers />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
