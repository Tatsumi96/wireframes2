import React from 'react';
import { Link } from 'react-router-dom';
import { Key, Star, AlertCircle, Clock, CheckCircle, XCircle, RotateCcw, HelpCircle, Heart } from 'lucide-react';
import { PortalSidebar, ImgPlaceholder, SectionLabel, Divider, Field, HeartToggle } from '../components/Layout';
import { useFavorites } from '../context/FavoriteContext';
import { PROPERTY_IMAGES, REVIEWER_AVATARS } from '../data/images';

type BookingStatus = 'en-attente' | 'confirmée' | 'en-cours' | 'terminée' | 'annulée' | 'remboursée' | 'litige';

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: React.ReactNode; actions: string[] }> = {
  'en-attente': { label: 'En attente', color: '#d97706', bg: '#fffbeb', icon: <Clock size={14} />, actions: ['Détails', 'Annuler'] },
  'confirmée':  { label: 'Confirmée', color: '#b8654a', bg: '#fff5f0', icon: <CheckCircle size={14} />, actions: ['Détails', 'Contacter'] },
  'en-cours':   { label: 'En cours', color: '#059669', bg: '#ecfdf5', icon: <AlertCircle size={14} />, actions: ['Détails', 'Contacter le propriétaire'] },
  'terminée':   { label: 'Terminée', color: '#6b7280', bg: '#f3f4f6', icon: <CheckCircle size={14} />, actions: ['Détails', 'Laisser un avis', 'Relouer'] },
  'annulée':    { label: 'Annulée', color: '#dc2626', bg: '#fef2f2', icon: <XCircle size={14} />, actions: ['Détails', 'Réclamer'] },
  'remboursée': { label: 'Remboursée', color: '#7c3aed', bg: '#f5f3ff', icon: <RotateCcw size={14} />, actions: ['Détails'] },
  'litige':     { label: 'Litige', color: '#dc2626', bg: '#fef2f2', icon: <HelpCircle size={14} />, actions: ['Détails', 'Contacter le support'] },
};

// ─── Client Portal ─────────────────────────────────────────────────────────────

const clientLinks = [
  { label: 'Dashboard', to: '/client' },
  { label: 'Mes réservations', to: '/client/booking' },
  { label: 'Paiements', to: '/client/payments' },
  { label: 'Mes favoris', to: '/client/favorites' },
  { label: 'Paramètres', to: '/client/settings' },
];

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="equal-card" style={{ padding: '20px 24px', background: 'var(--color-ivory)', height: '100%' }}>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{label}</p>
    <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{value}</p>
  </div>
);

const BookingRow: React.FC<{ property: typeof PROPERTY_IMAGES[0]; refCode: string; dates: string; status: BookingStatus; price: string }> = ({ property, refCode, dates, status, price }) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <div className="equal-card" style={{ flexDirection: 'row', alignItems: 'center', padding: '16px', gap: '16px' }}>
      <div className="card-img-wrapper" style={{ width: '100px', height: '70px', flexShrink: 0, borderRadius: '2px' }}>
        <ImgPlaceholder src={property.src} alt={property.title} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
          <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-anthracite)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', minWidth: 0 }}>{property.title}</p>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 10px', background: cfg.bg, color: cfg.color, border: `1px solid ${cfg.color}20`, borderRadius: 'var(--radius-sm)', flexShrink: 0, marginLeft: '8px', fontWeight: 600 }}>
            {cfg.icon} {cfg.label}
          </span>
        </div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{dates} · {price} · Réf. #{refCode}</p>
        <div style={{ display: 'flex', gap: '12px', marginTop: '6px' }}>
          {cfg.actions.map(action => (
            <Link key={action} to={action === 'Détails' ? '/client/booking' : '#'} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-taupe)', textDecoration: 'underline', flexShrink: 0 }}>{action}</Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export function ClientDashboard() {
  return (
    <div className="portal-layout-container fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div className="portal-content-area">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
            <ImgPlaceholder src={REVIEWER_AVATARS.jean} alt="Avatar Jean Dupont" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--color-anthracite)' }}>Bonjour, Jean !</p>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>Membre Privilège depuis 2022</p>
          </div>
        </div>
        <div className="client-stats-grid">
          <StatCard label="Réservations" value="8" />
          <StatCard label="Nuits réservées" value="47" />
          <StatCard label="Dépenses totales" value="6 240 €" />
        </div>
        <SectionLabel text="Réservations" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          <BookingRow property={PROPERTY_IMAGES[0]} refCode="AB1234" dates="14/08 → 21/08 (7 nuits)" price="2 665 €" status="confirmée" />
          <BookingRow property={PROPERTY_IMAGES[1]} refCode="CD5678" dates="10/09 → 15/09 (5 nuits)" price="1 890 €" status="en-attente" />
          <BookingRow property={PROPERTY_IMAGES[2]} refCode="EF9012" dates="12/02 → 19/02/2024" price="2 450 €" status="terminée" />
          <BookingRow property={PROPERTY_IMAGES[3]} refCode="GH3456" dates="05/11 → 08/11/2023" price="1 200 €" status="remboursée" />
          <BookingRow property={PROPERTY_IMAGES[4]} refCode="IJ7890" dates="20/07 → 27/07/2023" price="3 100 €" status="annulée" />
        </div>
      </div>
    </div>
  );
}

export function ClientBooking() {
  const property = PROPERTY_IMAGES[0];
  return (
    <div className="portal-layout-container fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div className="portal-content-area">
        <Link to="/client" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', textDecoration: 'underline', display: 'block', marginBottom: '24px' }}>← Mes réservations</Link>
        <h2 style={{ marginBottom: '28px' }}>Réservation #AB1234</h2>
        <div className="client-booking-grid">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Propriété" />
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ width: '140px', height: '90px', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                  <ImgPlaceholder src={property.src} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-anthracite)', marginBottom: '6px' }}>{property.title}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>Luberon · Villa · <Star size={12} fill="currentColor" style={{ color: 'var(--color-primary)' }} /> {property.rating}</p>
                  <Link to="/property" style={{ fontSize: '13px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>Voir l'annonce →</Link>
                </div>
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Détails du séjour" />
              <div className="client-details-grid">
                {['Arrivée : 14/08/2024', 'Départ : 21/08/2024', 'Voyageurs : 4 adultes', 'Durée : 7 nuits'].map(d => (
                  <div key={d} style={{ padding: '10px 14px', background: 'var(--color-beige)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{d}</div>
                ))}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Instructions d'accès" />
              <div style={{ background: 'var(--color-beige)', border: '1px solid var(--color-border)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-taupe)', lineHeight: '1.6', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={16} style={{ flexShrink: 0, color: 'var(--color-primary)' }} />
                <span>Code digicode : 4821 · Boîte à clés sécurisée située à gauche du porche d'entrée principal.</span>
              </div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Statut" />
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: STATUS_CONFIG['confirmée'].bg, color: STATUS_CONFIG['confirmée'].color, border: `1px solid ${STATUS_CONFIG['confirmée'].color}20`, borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700, marginBottom: '14px' }}>
              {STATUS_CONFIG['confirmée'].icon} CONFIRMÉE
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '6px' }}>Réf. : #AB1234</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '20px' }}>Réservé le : 02/07/2024</p>
            <Divider />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--color-terracotta)', marginBottom: '4px' }}>2 665 €</p>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>Payé par Carte Bancaire (•••• 8892)</p>
            <Divider />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['Contacter le propriétaire', 'Voir le contrat', 'Signaler un problème'].map(a => (
                <Link key={a} to="#" style={{ fontSize: '13px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>{a} →</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientPayments() {
  return (
    <div className="portal-layout-container fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '28px' }}>Historique des paiements</h2>
        <div style={{ border: '1px solid var(--color-border)', overflowX: 'auto', background: 'var(--color-ivory)' }}>
          <div style={{ minWidth: '500px' }}>
            {/* Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px', gap: '16px', padding: '12px 20px', borderBottom: '1px solid var(--color-border)', background: 'var(--color-beige)' }}>
              {['Propriété', 'Date', 'Montant', 'Statut'].map(h => (
                <p key={h} style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</p>
              ))}
            </div>
            {PROPERTY_IMAGES.slice(0, 5).map((prop, i) => (
              <div key={prop.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px 100px', gap: '16px', padding: '14px 20px', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '40px', height: '30px', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                    <ImgPlaceholder src={prop.src} alt={prop.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--color-anthracite)', fontWeight: 500 }}>{prop.title}</p>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-taupe)' }}>0{2 + i}/07/2024</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-terracotta)', fontWeight: 600 }}>{prop.price}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-taupe)' }}>Payé ✓</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientSettings() {
  return (
    <div className="portal-layout-container fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '28px' }}>Paramètres du compte</h2>
        <div className="client-settings-grid">
          <div style={{ border: '1px solid var(--color-border)', padding: '28px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Photo de profil" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
                <ImgPlaceholder src={REVIEWER_AVATARS.jean} alt="Jean Dupont" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div>
                <button className="btn-anim" style={{ background: 'var(--color-anthracite)', color: '#fff', padding: '8px 16px', fontFamily: 'var(--font-body)', fontSize: '13px', border: 'none', cursor: 'pointer', marginBottom: '6px' }}>Changer la photo</button>
                <p style={{ fontSize: '12px', color: 'var(--color-taupe)' }}>JPG or PNG. Max 2MB.</p>
              </div>
            </div>
            <Divider />
            <SectionLabel text="Informations personnelles" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <Field label="Prénom" placeholder="Jean" />
              <Field label="Nom" placeholder="Dupont" />
              <Field label="Email" placeholder="jean.dupont@exemple.fr" />
              <Field label="Téléphone" placeholder="+33 6 12 34 56 78" />
            </div>
            <button className="btn-anim" style={{ background: 'var(--color-anthracite)', color: '#fff', padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: '14px', border: 'none', cursor: 'pointer' }}>Sauvegarder</button>
          </div>
          <div style={{ border: '1px solid var(--color-border)', padding: '28px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Sécurité" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <Field label="Mot de passe actuel" placeholder="••••••••" type="password" />
              <Field label="Nouveau mot de passe" placeholder="••••••••" type="password" />
              <Field label="Confirmer" placeholder="••••••••" type="password" />
            </div>
            <button className="btn-anim" style={{ background: 'var(--color-anthracite)', color: '#fff', padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: '14px', border: 'none', cursor: 'pointer' }}>Modifier</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientFavorites() {
  const { favorites } = useFavorites();
  const favProperties = PROPERTY_IMAGES.filter(p => favorites.includes(p.id));

  return (
    <div className="portal-layout-container fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div className="portal-content-area">
        <h2 style={{ marginBottom: '28px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Heart size={20} style={{ color: '#e11d48' }} fill="#e11d48" /> Mes favoris
        </h2>
        {favProperties.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', border: '1px solid var(--color-border)', background: 'var(--color-ivory)' }}>
            <Heart size={40} style={{ color: 'var(--color-muted)', marginBottom: '16px' }} />
            <p style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-dark)', marginBottom: '8px' }}>Aucun favori pour le moment</p>
            <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '24px' }}>Explorez nos propriétés et ajoutez-les à vos favoris.</p>
            <Link to="/search" className="btn-primary" style={{ display: 'inline-flex', padding: '10px 24px' }}>Explorer les biens</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {favProperties.map(p => (
              <Link key={p.id} to="/property" style={{ textDecoration: 'none' }}>
                <div className="equal-card" style={{ flexDirection: 'row', alignItems: 'center', padding: '16px', gap: '16px' }}>
                  <div className="card-img-wrapper" style={{ width: '120px', height: '80px', flexShrink: 0, borderRadius: '2px' }}>
                    <ImgPlaceholder src={p.src} alt={p.title} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-anthracite)', marginBottom: '4px' }}>{p.title}</p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '4px' }}>{p.location} · {p.specs}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)' }}>{p.price} / nuit</p>
                  </div>
                  <HeartToggle propertyId={p.id} style={{ position: 'static', width: 36, height: 36, background: 'var(--color-surface-2)', flexShrink: 0 }} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
