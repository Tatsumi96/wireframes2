import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// ─── Header ──────────────────────────────────────────────────────────────────

export const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { to: '/search', label: 'Destinations' },
    { to: '/about', label: 'À propos' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header className="nav-wrapper">
      <div className="container nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/assets/logo.png"
            alt="Lumière Logo"
            className="nav-logo-img"
            style={{
              height: '64px',
              maxHeight: '64px',
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 12px rgba(26, 54, 93, 0.22))',
              transition: 'transform 0.2s ease',
            }}
          />
        </Link>

        {/* Desktop nav links */}
        <ul className="nav-links">
          {navLinks.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`nav-link${location.pathname === link.to ? ' active' : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop actions */}
        <div className="nav-actions">
          <Link to="/login" className="btn-secondary" style={{ padding: '9px 22px', fontSize: '14px' }}>
            Connexion
          </Link>
          <Link to="/register" className="btn-primary" style={{ padding: '9px 22px', fontSize: '14px' }}>
            S'inscrire
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="nav-mobile-btn"
          aria-label="Menu"
        >
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen
              ? <path d="M6 18L18 6M6 6l12 12" />
              : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border-light)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block',
                padding: '12px 16px',
                color: location.pathname === link.to ? 'var(--color-primary)' : 'var(--color-body)',
                background: location.pathname === link.to ? 'var(--color-surface-2)' : 'transparent',
                borderRadius: '14px',
                fontSize: '15px',
                fontWeight: 500,
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '12px' }}>
            <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-secondary" style={{ textAlign: 'center' }}>
              Connexion
            </Link>
            <Link to="/register" onClick={() => setMenuOpen(false)} className="btn-primary" style={{ textAlign: 'center' }}>
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

// ─── Footer ───────────────────────────────────────────────────────────────────

export const Footer: React.FC = () => (
  <footer className="footer-wrapper">
    <div className="container" style={{ padding: '64px 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', marginBottom: '48px' }}>
        <div>
          <Link to="/" className="nav-logo" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center' }}>
            <img
              src="/assets/logo.png"
              alt="Lumière Logo"
              style={{
                height: '60px',
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 4px 12px rgba(26, 54, 93, 0.22))',
              }}
            />
          </Link>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.7 }}>
            Location courte durée, sélectionnée avec soin.
          </p>
        </div>
        {[
          { title: 'Liens utiles', items: ['Accueil', 'Destinations', 'À propos'] },
          { title: 'Légal', items: ['CGU', 'Confidentialité', 'Mentions légales'] },
          { title: 'Support', items: ['Contact', 'FAQ', 'Aide'] },
        ].map(col => (
          <div key={col.title}>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>{col.title}</p>
            {col.items.map(item => (
              <a key={item} href="#" style={{ display: 'block', fontSize: '14px', color: 'var(--color-body)', marginBottom: '10px', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                onMouseOut={e => (e.currentTarget.style.color = 'var(--color-body)')}
              >{item}</a>
            ))}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid var(--color-border-light)', paddingTop: '24px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>
          © {new Date().getFullYear()} Lumière · Tous droits réservés
        </p>
      </div>
    </div>
  </footer>
);

// ─── Portal Sidebar ───────────────────────────────────────────────────────────

export const PortalSidebar: React.FC<{ title: string; links: { label: string; to: string }[] }> = ({ title, links }) => {
  const location = useLocation();
  return (
    <aside className="portal-sidebar">
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 16px 20px', borderBottom: '1px solid var(--color-border-light)', marginBottom: '16px' }}>{title}</p>
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`sidebar-link${location.pathname === link.to ? ' active' : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </aside>
  );
};

// ─── Step Bar ─────────────────────────────────────────────────────────────────

export const StepBar: React.FC<{ steps: string[]; current: number }> = ({ steps, current }) => (
  <div className="step-bar">
    {steps.map((s, i) => (
      <React.Fragment key={s}>
        <div className={`step-item${i === current ? ' current' : i < current ? ' done' : ''}`}>{s}</div>
        {i < steps.length - 1 && <span style={{ color: 'var(--color-muted)', fontSize: '14px' }}>→</span>}
      </React.Fragment>
    ))}
  </div>
);

// ─── Shared UI atoms ──────────────────────────────────────────────────────────

export const Pill: React.FC<{ label: string; accent?: boolean }> = ({ label, accent }) => (
  <span className={`pill${accent ? ' active' : ''}`}>{label}</span>
);

export const Btn: React.FC<{
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  onClick?: () => void;
  type?: 'button' | 'submit';
  fullWidth?: boolean;
}> = ({ label, variant = 'primary', onClick, type = 'button', fullWidth }) => (
  <button
    type={type}
    onClick={onClick}
    className={variant === 'primary' ? 'btn-primary' : variant === 'secondary' ? 'btn-secondary' : 'btn-ghost'}
    style={{ width: fullWidth ? '100%' : undefined }}
  >
    {label}
  </button>
);

export const Field: React.FC<{ label?: string; placeholder: string; type?: string }> = ({ label, placeholder, type = 'text' }) => (
  <div className="field-group">
    {label && <label className="field-label">{label}</label>}
    <input type={type} placeholder={placeholder} className="field-input" />
  </div>
);

export const ImgPlaceholder: React.FC<{ label?: string; style?: React.CSSProperties; src?: string; alt?: string; className?: string }> = ({ label = '[ IMAGE ]', style, src, alt, className }) => {
  const [error, setError] = React.useState(false);

  if (src && !error) {
    return (
      <img
        src={src}
        alt={alt || label}
        className={className}
        style={{ objectFit: 'cover', width: '100%', height: '100%', display: 'block', ...style }}
        onError={() => setError(true)}
      />
    );
  }

  return (
    <div
      style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-card)', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: '80px', ...style }}
      className={className}
    >
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', padding: '8px', textAlign: 'center' }}>{label}</span>
    </div>
  );
};

export const SectionLabel: React.FC<{ text: string }> = ({ text }) => (
  <p className="section-label">{text}</p>
);

export const Divider: React.FC = () => <hr className="divider" />;

export const Card: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)', borderRadius: 'var(--radius-card)', ...style }}>
    {children}
  </div>
);
