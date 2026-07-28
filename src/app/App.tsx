import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, MobileBottomNav } from './components/Layout';
import Chatbot from './components/Chatbot';

// Public pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import { BookingStep1, BookingStep2, BookingStep3 } from './pages/BookingPages';
import { ContactPage, AboutPage, LegalPage } from './pages/InfoPages';

// Client portal
import { ClientDashboard, ClientBooking, ClientPayments, ClientSettings } from './pages/ClientPages';

// ─── Layouts ─────────────────────────────────────────────────────────────────

function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main style={{ paddingBottom: '70px' }}>{children}</main>
      <Footer />
      <MobileBottomNav />
      <Chatbot />
    </>
  );
}

function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main style={{ paddingBottom: '70px' }}>{children}</main>
      <MobileBottomNav />
    </>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const location = useLocation();
  const isPortal = location.pathname.startsWith('/client') || location.pathname.startsWith('/owner') || location.pathname.startsWith('/admin');

  return isPortal ? (
    <>
      <Header />
      <PortalLayout>
        <Routes>
          <Route path="/client" element={<ClientDashboard />} />
          <Route path="/client/booking" element={<ClientBooking />} />
          <Route path="/client/payments" element={<ClientPayments />} />
          <Route path="/client/settings" element={<ClientSettings />} />
        </Routes>
      </PortalLayout>
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
        <Route path="*" element={<HomePage />} />
      </Routes>
    </SiteLayout>
  );
}
