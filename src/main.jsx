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
import Overview from './pages/admin/Overview.jsx'
import Users from './pages/admin/Users.jsx'
import UserDetail from './pages/admin/UserDetail.jsx'
import Providers from './pages/admin/Providers.jsx'
import Disputes from './pages/admin/Disputes.jsx'
import Payouts from './pages/admin/Payouts.jsx'
import Reports from './pages/admin/Reports.jsx'
import Waitlist from './pages/admin/Waitlist.jsx'
import AuditLog from './pages/admin/AuditLog.jsx'
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
          <Route index element={<Overview />} />
          <Route path="users" element={<Users />} />
          <Route path="users/:id" element={<UserDetail />} />
          <Route path="providers" element={<Providers />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="payouts" element={<Payouts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="audit-log" element={<AuditLog />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
