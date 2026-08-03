import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, MobileBottomNav } from './components/Layout';
import Chatbot from './components/Chatbot';
import { SearchProvider } from './context/SearchContext';
import { FavoriteProvider } from './context/FavoriteContext';

// Public pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import { BookingStep1, BookingStep2, BookingStep3 } from './pages/BookingPages';
import { ContactPage, AboutPage, LegalPage } from './pages/InfoPages';
import { LoginPage, RegisterPage } from './pages/AuthPages';
import { NotFoundPage } from './pages/NotFoundPage';

// Client portal
import { ClientDashboard, ClientBooking, ClientPayments, ClientSettings, ClientFavorites } from './pages/ClientPages';

// Admin portal
import { AdminDashboard, AdminBookings, AdminProperties, AdminUsers, AdminMessages } from './pages/AdminPages';

// ─── Layouts ─────────────────────────────────────────────────────────────────

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingBottom: 'calc(var(--mobile-nav-height) + env(safe-area-inset-bottom, 0px))' }}>{children}</main>
      <Footer />
      <MobileBottomNav />
      <Chatbot />
    </>
  );
}

function PortalLayout({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`portal-layout-container ${className}`}>{children}</main>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/client') || location.pathname.startsWith('/owner') || location.pathname.startsWith('/admin');
  const isAdmin = location.pathname.startsWith('/admin');
  const isAuth = location.pathname === '/login' || location.pathname === '/register';

  return (
    <SearchProvider>
      <FavoriteProvider>
      {isAuth ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      ) : isPortal ? (
        <>
          {!isAdmin && <Header />}
          <PortalLayout className={isAdmin ? 'admin-portal' : ''}>
            <Routes>
              <Route path="/client" element={<ClientDashboard />} />
              <Route path="/client/booking" element={<ClientBooking />} />
              <Route path="/client/payments" element={<ClientPayments />} />
              <Route path="/client/favorites" element={<ClientFavorites />} />
          <Route path="/client/settings" element={<ClientSettings />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/properties" element={<AdminProperties />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/messages" element={<AdminMessages />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </PortalLayout>
          {!isAdmin && <MobileBottomNav />}
        </>
      ) : (
        <SiteLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/property" element={<PropertyPage />} />
            <Route path="/booking/1" element={<BookingStep1 />} />
            <Route path="/booking/2" element={<BookingStep2 />} />
            <Route path="/booking/3" element={<BookingStep3 />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/legal" element={<LegalPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </SiteLayout>
      )}
      </FavoriteProvider>
    </SearchProvider>
  );
}
