import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CalendarDays, Users, Percent, ArrowUpRight, ArrowDownRight,
  Clock, CheckCircle, XCircle, RotateCcw, HelpCircle, AlertCircle,
  Euro, Star, Mail, ShieldAlert, Search, LayoutDashboard, Building2,
  LogOut, ShieldCheck,
} from 'lucide-react';
import { ImgPlaceholder, SectionLabel, Divider } from '../components/Layout';
import { PROPERTY_IMAGES, REVIEWER_AVATARS } from '../data/images';
import {
  ADMIN_STATS, MONTHLY_REVENUE, BOOKING_DISTRIBUTION, ADMIN_BOOKINGS,
  ADMIN_PROPERTIES, ADMIN_USERS, ADMIN_MESSAGES,
  type AdminBookingStatus, type AdminProperty, type AdminUser, type AdminMessage,
} from '../data/admin';

// ─── Admin Portal ─────────────────────────────────────────────────────────────

const adminLinks = [
  { label: 'Vue d\'ensemble', to: '/admin', icon: LayoutDashboard },
  { label: 'Réservations', to: '/admin/bookings', icon: CalendarDays },
  { label: 'Propriétés', to: '/admin/properties', icon: Building2 },
  { label: 'Utilisateurs', to: '/admin/users', icon: Users },
  { label: 'Messages', to: '/admin/messages', icon: Mail },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const unread = ADMIN_MESSAGES.filter(m => m.status === 'nouveau').length;

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar-brand">
        <div className="admin-sidebar-logo">
          <ShieldCheck size={20} />
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Destino</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Administration</p>
        </div>
      </div>
      <p className="admin-sidebar-label">Navigation</p>
      <nav className="admin-sidebar-nav">
        {adminLinks.map(link => {
          const active = location.pathname === link.to;
          return (
            <Link key={link.to} to={link.to} className={`admin-sidebar-link${active ? ' active' : ''}`}>
              <link.icon size={16} strokeWidth={active ? 2.4 : 2} />
              <span>{link.label}</span>
              {link.label === 'Messages' && unread > 0 && <span className="admin-sidebar-badge">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="admin-sidebar-footer">
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
          <ImgPlaceholder src={REVIEWER_AVATARS.jean} alt="Marc Antoine" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Marc Antoine</p>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-terracotta)' }}>Super Admin</p>
        </div>
        <Link to="/" aria-label="Déconnexion" title="Déconnexion" style={{ display: 'inline-flex', width: 32, height: 32, borderRadius: '8px', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s ease' }} onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }} onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.background = 'transparent'; }}>
          <LogOut size={15} />
        </Link>
      </div>
    </aside>
  );
};

const STATUS_CONFIG: Record<AdminBookingStatus, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  'en-attente': { label: 'En attente', color: '#d97706', bg: '#fffbeb', icon: <Clock size={13} /> },
  'confirmée':  { label: 'Confirmée', color: '#b8654a', bg: '#fff5f0', icon: <CheckCircle size={13} /> },
  'en-cours':   { label: 'En cours', color: '#059669', bg: '#ecfdf5', icon: <AlertCircle size={13} /> },
  'terminée':   { label: 'Terminée', color: '#6b7280', bg: '#f3f4f6', icon: <CheckCircle size={13} /> },
  'annulée':    { label: 'Annulée', color: '#dc2626', bg: '#fef2f2', icon: <XCircle size={13} /> },
  'remboursée': { label: 'Remboursée', color: '#7c3aed', bg: '#f5f3ff', icon: <RotateCcw size={13} /> },
  'litige':     { label: 'Litige', color: '#dc2626', bg: '#fef2f2', icon: <HelpCircle size={13} /> },
};

const StatusBadge: React.FC<{ status: AdminBookingStatus }> = ({ status }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}20`, borderRadius: 'var(--radius-sm)', fontWeight: 600, whiteSpace: 'nowrap' }}>
      {cfg.icon} {cfg.label}
    </span>
  );
};

const StatCard: React.FC<{ label: string; value: string; delta: string; up: boolean; icon: React.ReactNode }> = ({ label, value, delta, up, icon }) => (
  <div className="equal-card" style={{ padding: '20px 24px', background: 'var(--color-ivory)', height: '100%' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</p>
      <span style={{ display: 'inline-flex', width: 34, height: 34, borderRadius: '50%', background: 'var(--color-surface)', border: '1px solid var(--color-border-light)', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)' }}>{icon}</span>
    </div>
    <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: 'var(--color-anthracite)', marginBottom: '6px' }}>{value}</p>
    <p style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: up ? '#059669' : '#dc2626', fontWeight: 600 }}>
      {up ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {delta} <span style={{ color: 'var(--color-taupe)', fontWeight: 400 }}>vs mois dernier</span>
    </p>
  </div>
);

// ─── SVG Charts ───────────────────────────────────────────────────────────────

const BarChart: React.FC<{ data: { month: string; value: number }[] }> = ({ data }) => {
  const max = Math.max(...data.map(d => d.value));
  const width = 560;
  const height = 200;
  const pad = 6;
  const barW = (width - pad * (data.length + 1)) / data.length;
  const last = data[data.length - 1];

  return (
    <svg viewBox={`0 0 ${width} ${height + 28}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      {[0.25, 0.5, 0.75, 1].map(t => (
        <line key={t} x1={0} x2={width} y1={height - height * t} y2={height - height * t} stroke="var(--color-border-light)" strokeWidth="1" />
      ))}
      {data.map((d, i) => {
        const h = (d.value / max) * height;
        const x = pad + i * (barW + pad);
        const isLast = d === last;
        return (
          <rect key={d.month} x={x} y={height - h} width={barW} height={h} rx={3}
            fill={isLast ? 'var(--color-terracotta)' : 'var(--color-primary)'}
            opacity={isLast ? 1 : 0.18} />
        );
      })}
      {data.map((d, i) => (
        <text key={d.month} x={pad + i * (barW + pad) + barW / 2} y={height + 16} textAnchor="middle"
          fontFamily="var(--font-mono)" fontSize="10" fill="var(--color-taupe)">{d.month}</text>
      ))}
    </svg>
  );
};

const DonutChart: React.FC<{ data: { label: string; value: number; color: string }[] }> = ({ data }) => {
  const total = data.reduce((s, d) => s + d.value, 0);
  const radius = 56;
  const stroke = 16;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <svg viewBox="0 0 160 160" style={{ width: 160, height: 160, flexShrink: 0 }}>
      <circle cx={80} cy={80} r={radius} fill="none" stroke="var(--color-surface-2)" strokeWidth={stroke} />
      {data.map(d => {
        const len = (d.value / total) * circumference;
        const seg = (
          <circle key={d.label} cx={80} cy={80} r={radius} fill="none" stroke={d.color}
            strokeWidth={stroke} strokeDasharray={`${len} ${circumference - len}`}
            strokeDashoffset={-offset} transform="rotate(-90 80 80)" />
        );
        offset += len;
        return seg;
      })}
      <text x={80} y={76} textAnchor="middle" fontFamily="var(--font-display)" fontSize="22" fontWeight={600} fill="var(--color-anthracite)">{total}</text>
      <text x={80} y={94} textAnchor="middle" fontFamily="var(--font-body)" fontSize="10" fill="var(--color-taupe)">réservations</text>
    </svg>
  );
};

// ─── Shared table atoms ───────────────────────────────────────────────────────

const Table: React.FC<{ headers: string[]; children: React.ReactNode }> = ({ headers, children }) => (
  <div style={{ border: '1px solid var(--color-border)', overflowX: 'auto', background: 'var(--color-ivory)' }}>
    <div style={{ minWidth: '760px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${headers.length}, 1fr)`, gap: '16px', padding: '12px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-beige)' }}>
        {headers.map(h => (
          <p key={h} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
        ))}
      </div>
      {children}
    </div>
  </div>
);

const TableRow: React.FC<{ cells: React.ReactNode[]; to?: string }> = ({ cells, to }) => {
  const inner = cells.map((c, i) => <div key={i} style={{ minWidth: 0 }}>{c}</div>);
  return to ? (
    <Link to={to} style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: '16px', padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--color-border-light)', textDecoration: 'none', transition: 'background 0.15s ease' }} onMouseOver={e => (e.currentTarget.style.background = 'var(--color-surface)')} onMouseOut={e => (e.currentTarget.style.background = 'transparent')}>
      {inner}
    </Link>
  ) : (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cells.length}, 1fr)`, gap: '16px', padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--color-border-light)' }}>
      {inner}
    </div>
  );
};

const GuestCell: React.FC<{ name: string; avatar: string; sub?: string }> = ({ name, avatar, sub }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
    <div style={{ width: '32px', height: '32px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
      <ImgPlaceholder src={avatar} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
    <div style={{ minWidth: 0 }}>
      <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-anthracite)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{name}</p>
      {sub && <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-taupe)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{sub}</p>}
    </div>
  </div>
);

const Thumb: React.FC<{ src: string; title: string }> = ({ src, title }) => (
  <div style={{ width: '52px', height: '36px', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
    <ImgPlaceholder src={src} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
  </div>
);

const Toolbar: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '220px', background: 'var(--color-ivory)', border: '1px solid var(--color-border)', padding: '9px 14px' }}>
      <Search size={15} style={{ color: 'var(--color-taupe)', flexShrink: 0 }} />
      <input placeholder={placeholder} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-anthracite)' }} />
    </div>
    <button className="btn-anim" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-body)', padding: '9px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', cursor: 'pointer' }}>Tous les statuts ▾</button>
    <button className="btn-anim" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', color: 'var(--color-body)', padding: '9px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', cursor: 'pointer' }}>Exporter CSV</button>
  </div>
);

// ─── Dashboard ────────────────────────────────────────────────────────────────

export function AdminDashboard() {
  const recent = ADMIN_BOOKINGS.slice(0, 6);
  return (
    <div className="portal-layout-container fade-in">
      <AdminSidebar />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '8px' }}>Vue d'ensemble</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-taupe)', marginBottom: '28px' }}>Activité de la plateforme · Juillet 2024</p>
        <div className="admin-stats-grid">
          <StatCard label="Revenus" value="82 450 €" delta={ADMIN_STATS.revenueDelta} up icon={<Euro size={16} />} />
          <StatCard label="Réservations" value={String(ADMIN_STATS.bookings)} delta={ADMIN_STATS.bookingsDelta} up icon={<CalendarDays size={16} />} />
          <StatCard label="Utilisateurs" value={ADMIN_STATS.users.toLocaleString('fr-FR')} delta={ADMIN_STATS.usersDelta} up icon={<Users size={16} />} />
          <StatCard label="Taux d'occupation" value={`${ADMIN_STATS.occupancy}%`} delta={ADMIN_STATS.occupancyDelta} up icon={<Percent size={16} />} />
        </div>
        <div className="admin-charts-grid">
          <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '8px' }}>
              <SectionLabel text="Revenus mensuels" />
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>2024 · barre terracotta = dernier mois</p>
            </div>
            <BarChart data={MONTHLY_REVENUE} />
          </div>
          <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Répartition des réservations" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '28px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <DonutChart data={BOOKING_DISTRIBUTION} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '160px' }}>
                {BOOKING_DISTRIBUTION.map(d => (
                  <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '2px', background: d.color, flexShrink: 0 }} />
                    <p style={{ fontSize: '12px', color: 'var(--color-body)', flex: 1 }}>{d.label}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <SectionLabel text="Réservations récentes" />
          <Link to="/admin/bookings" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>Tout voir →</Link>
        </div>
        <Table headers={['Voyageur', 'Propriété', 'Dates', 'Montant', 'Statut']}>
          {recent.map(b => {
            const prop = PROPERTY_IMAGES.find(p => p.id === b.propertyId) ?? PROPERTY_IMAGES[0];
            return (
              <TableRow key={b.ref} to="/admin/bookings" cells={[
                <GuestCell key="g" name={b.guest} avatar={b.avatar} sub={`Réf. #${b.ref}`} />,
                <div key="p" style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <Thumb src={prop.src} title={prop.title} />
                  <p style={{ fontSize: '13px', color: 'var(--color-anthracite)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.title}</p>
                </div>,
                <p key="d" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{b.checkIn} → {b.checkOut}<br /><span style={{ fontSize: '11px' }}>{b.nights} nuits · {b.guests} pers.</span></p>,
                <p key="a" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-terracotta)', fontWeight: 600 }}>{b.amount.toLocaleString('fr-FR')} €</p>,
                <div key="s"><StatusBadge status={b.status} /></div>,
              ]} />
            );
          })}
        </Table>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <SectionLabel text="Top biens du mois" />
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>classés par revenus</p>
        </div>
        <div className="admin-props-grid">
          {[...ADMIN_PROPERTIES].sort((a, b) => b.revenue - a.revenue).slice(0, 4).map(p => {
            const prop = PROPERTY_IMAGES.find(x => x.id === p.id) ?? PROPERTY_IMAGES[0];
            return (
              <div key={p.id} className="equal-card" style={{ flexDirection: 'row', alignItems: 'center', padding: '14px', gap: '12px', background: 'var(--color-ivory)' }}>
                <div className="card-img-wrapper" style={{ width: '72px', height: '52px', flexShrink: 0, borderRadius: '2px' }}>
                  <ImgPlaceholder src={prop.src} alt={p.title} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-anthracite)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-taupe)' }}>{p.occupancy}% occup. · {p.views.toLocaleString('fr-FR')} vues</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-terracotta)', fontWeight: 600, marginTop: '2px' }}>{p.revenue.toLocaleString('fr-FR')} €</p>
                </div>
                <Star size={13} fill="currentColor" style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Bookings ─────────────────────────────────────────────────────────────────

export function AdminBookings() {
  return (
    <div className="portal-layout-container fade-in">
      <AdminSidebar />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '8px' }}>Réservations</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-taupe)', marginBottom: '24px' }}>{ADMIN_BOOKINGS.length} réservations affichées · {ADMIN_STATS.bookings} au total</p>
        <Toolbar placeholder="Rechercher une réservation, un voyageur..." />
        <Table headers={['Voyageur', 'Propriété', 'Dates', 'Montant', 'Statut', 'Réservé le']}>
          {ADMIN_BOOKINGS.map(b => {
            const prop = PROPERTY_IMAGES.find(p => p.id === b.propertyId) ?? PROPERTY_IMAGES[0];
            return (
              <TableRow key={b.ref} cells={[
                <GuestCell key="g" name={b.guest} avatar={b.avatar} sub={`Réf. #${b.ref}`} />,
                <div key="p" style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <Thumb src={prop.src} title={prop.title} />
                  <p style={{ fontSize: '13px', color: 'var(--color-anthracite)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prop.title}</p>
                </div>,
                <p key="d" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{b.checkIn} → {b.checkOut}<br /><span style={{ fontSize: '11px' }}>{b.nights} nuits · {b.guests} pers.</span></p>,
                <p key="a" style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-terracotta)', fontWeight: 600 }}>{b.amount.toLocaleString('fr-FR')} €</p>,
                <div key="s"><StatusBadge status={b.status} /></div>,
                <p key="r" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{b.bookedAt}</p>,
              ]} />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

// ─── Properties ───────────────────────────────────────────────────────────────

const PROP_STATUS_CONFIG: Record<AdminProperty['status'], { label: string; color: string; bg: string }> = {
  'publiée': { label: 'Publiée', color: '#059669', bg: '#ecfdf5' },
  'brouillon': { label: 'Brouillon', color: '#d97706', bg: '#fffbeb' },
  'archivée': { label: 'Archivée', color: '#6b7280', bg: '#f3f4f6' },
};

export function AdminProperties() {
  return (
    <div className="portal-layout-container fade-in">
      <AdminSidebar />
      <div className="portal-content-area">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ marginBottom: '8px' }}>Propriétés</h2>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>{ADMIN_PROPERTIES.length} biens dans le catalogue</p>
          </div>
          <button className="btn-anim" style={{ background: 'var(--color-primary)', color: '#fff', padding: '10px 20px', fontFamily: 'var(--font-body)', fontSize: '13px', border: 'none', cursor: 'pointer' }}>+ Nouveau bien</button>
        </div>
        <div className="admin-props-grid">
          {ADMIN_PROPERTIES.map(p => {
            const prop = PROPERTY_IMAGES.find(x => x.id === p.id) ?? PROPERTY_IMAGES[0];
            const cfg = PROP_STATUS_CONFIG[p.status];
            return (
              <div key={p.id} className="equal-card" style={{ padding: '16px', background: 'var(--color-ivory)' }}>
                <div className="card-img-wrapper" style={{ height: '140px', borderRadius: '2px', marginBottom: '14px' }}>
                  <ImgPlaceholder src={prop.src} alt={p.title} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
                  <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{p.title}</p>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 8px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}20`, borderRadius: 'var(--radius-sm)', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{cfg.label}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '12px' }}>{p.location} · ⭐ {p.rating}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', padding: '10px 0', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)', marginBottom: '12px' }}>
                  {[
                    { label: 'Occup.', value: `${p.occupancy}%` },
                    { label: 'Vues', value: p.views.toLocaleString('fr-FR') },
                    { label: 'Revenus', value: `${(p.revenue / 1000).toFixed(1)}k€` },
                  ].map(s => (
                    <div key={s.label} style={{ textAlign: 'center' }}>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{s.value}</p>
                      <p style={{ fontSize: '10px', color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.label}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '14px' }}>
                  {['Modifier', 'Calendrier', 'Supprimer'].map(a => (
                    <Link key={a} to="#" style={{ fontSize: '12px', color: a === 'Supprimer' ? '#dc2626' : 'var(--color-terracotta)', textDecoration: 'underline' }}>{a}</Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Users ────────────────────────────────────────────────────────────────────

const USER_ROLE_CONFIG: Record<AdminUser['role'], { label: string; color: string; bg: string }> = {
  'client': { label: 'Client', color: '#b8654a', bg: '#fff5f0' },
  'propriétaire': { label: 'Propriétaire', color: '#1A365D', bg: '#eef2f9' },
  'admin': { label: 'Admin', color: '#7c3aed', bg: '#f5f3ff' },
};

const USER_STATUS_CONFIG: Record<AdminUser['status'], { label: string; color: string; bg: string }> = {
  'actif': { label: 'Actif', color: '#059669', bg: '#ecfdf5' },
  'suspendu': { label: 'Suspendu', color: '#dc2626', bg: '#fef2f2' },
  'nouveau': { label: 'Nouveau', color: '#d97706', bg: '#fffbeb' },
};

export function AdminUsers() {
  return (
    <div className="portal-layout-container fade-in">
      <AdminSidebar />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '8px' }}>Utilisateurs</h2>
        <p style={{ fontSize: '13px', color: 'var(--color-taupe)', marginBottom: '24px' }}>{ADMIN_STATS.users.toLocaleString('fr-FR')} comptes inscrits · {ADMIN_USERS.length} affichés</p>
        <Toolbar placeholder="Rechercher par nom ou email..." />
        <Table headers={['Utilisateur', 'Rôle', 'Réservations', 'Membre depuis', 'Statut', '']}>
          {ADMIN_USERS.map(u => {
            const role = USER_ROLE_CONFIG[u.role];
            const st = USER_STATUS_CONFIG[u.status];
            return (
              <TableRow key={u.id} cells={[
                <GuestCell key="u" name={u.name} avatar={u.avatar} sub={u.email} />,
                <div key="r"><span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', background: role.bg, color: role.color, border: `1px solid ${role.color}20`, borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>{role.label}</span></div>,
                <p key="b" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{u.bookings}</p>,
                <p key="j" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{u.joinedAt}</p>,
                <div key="s"><span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', background: st.bg, color: st.color, border: `1px solid ${st.color}20`, borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>{st.label}</span></div>,
                <div key="act" style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  {u.status === 'suspendu'
                    ? <Link to="#" style={{ fontSize: '12px', color: '#059669', textDecoration: 'underline' }}>Réactiver</Link>
                    : <Link to="#" style={{ fontSize: '12px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>Gérer</Link>}
                </div>,
              ]} />
            );
          })}
        </Table>
      </div>
    </div>
  );
}

// ─── Messages ─────────────────────────────────────────────────────────────────

const MSG_STATUS_CONFIG: Record<AdminMessage['status'], { label: string; color: string; bg: string }> = {
  'nouveau': { label: 'Nouveau', color: '#b8654a', bg: '#fff5f0' },
  'en cours': { label: 'En cours', color: '#d97706', bg: '#fffbeb' },
  'résolu': { label: 'Résolu', color: '#059669', bg: '#ecfdf5' },
};

export function AdminMessages() {
  const unread = ADMIN_MESSAGES.filter(m => m.status === 'nouveau').length;
  return (
    <div className="portal-layout-container fade-in">
      <AdminSidebar />
      <div className="portal-content-area">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
          <div>
            <h2 style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Mail size={20} style={{ color: 'var(--color-primary)' }} /> Messages
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>{ADMIN_MESSAGES.length} messages · {unread} non lus</p>
          </div>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)', fontSize: '12px', padding: '6px 12px', background: '#fff5f0', color: '#b8654a', border: '1px solid #b8654a20', borderRadius: 'var(--radius-sm)', fontWeight: 600 }}>
            <ShieldAlert size={13} /> {unread} messages en attente
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {ADMIN_MESSAGES.map(m => {
            const cfg = MSG_STATUS_CONFIG[m.status];
            return (
              <div key={m.id} className="equal-card" style={{ flexDirection: 'row', alignItems: 'flex-start', padding: '16px', gap: '14px', background: m.status === 'nouveau' ? 'var(--color-ivory)' : 'var(--color-surface)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                  <ImgPlaceholder src={m.avatar} alt={m.from} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap', marginBottom: '2px' }}>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{m.from} <span style={{ fontWeight: 400, color: 'var(--color-taupe)', fontSize: '12px' }}>· {m.subject}</span></p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '3px 8px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}20`, borderRadius: 'var(--radius-sm)', fontWeight: 600, flexShrink: 0 }}>{cfg.label}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--color-taupe)', lineHeight: 1.5, marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{m.preview}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-taupe)' }}>{m.date}</p>
                    <Link to="#" style={{ fontSize: '12px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>Ouvrir la conversation →</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
