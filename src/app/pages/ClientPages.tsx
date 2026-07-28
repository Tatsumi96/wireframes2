import React from 'react';
import { Link } from 'react-router-dom';
import { PortalSidebar, ImgPlaceholder, SectionLabel, Divider, Field } from '../components/Layout';
import { PROPERTY_IMAGES, REVIEWER_AVATARS } from '../data/images';

// ─── Client Portal ─────────────────────────────────────────────────────────────

const clientLinks = [
  { label: 'Dashboard', to: '/client' },
  { label: 'Mes réservations', to: '/client/booking' },
  { label: 'Paiements', to: '/client/payments' },
  { label: 'Paramètres', to: '/client/settings' },
];

const StatCard: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="equal-card" style={{ padding: '20px 24px', background: 'var(--color-ivory)', height: '100%' }}>
    <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 500, color: 'var(--color-taupe)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>{label}</p>
    <p style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{value}</p>
  </div>
);

const BookingRow: React.FC<{ property: typeof PROPERTY_IMAGES[0]; refCode: string; dates: string; past?: boolean }> = ({ property, refCode, dates, past }) => (
  <div className="equal-card" style={{ flexDirection: 'row', alignItems: 'center', padding: '16px', gap: '16px' }}>
    <div className="card-img-wrapper" style={{ width: '100px', height: '70px', flexShrink: 0, borderRadius: '2px' }}>
      <ImgPlaceholder src={property.src} alt={property.title} />
    </div>
    <div style={{ flex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
        <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-anthracite)' }}>{property.title}</p>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', padding: '3px 8px', border: '1px solid ' + (past ? 'var(--color-border)' : 'var(--color-terracotta)'), color: past ? 'var(--color-taupe)' : 'var(--color-terracotta)' }}>
          {past ? 'Terminé' : 'Confirmée'}
        </span>
      </div>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{dates} · {property.price} · Réf. #{refCode}</p>
    </div>
    <Link to="/client/booking" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-taupe)', textDecoration: 'underline', flexShrink: 0 }}>Détails</Link>
  </div>
);

export function ClientDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }} className="fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div style={{ flex: 1, background: 'var(--color-beige)', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--color-border)', flexShrink: 0 }}>
            <ImgPlaceholder src={REVIEWER_AVATARS.jean} alt="Avatar Jean Dupont" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 500, color: 'var(--color-anthracite)' }}>Bonjour, Jean !</p>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>Membre Privilège depuis 2022</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px', alignItems: 'stretch' }}>
          <StatCard label="Réservations" value="8" />
          <StatCard label="Nuits réservées" value="47" />
          <StatCard label="Dépenses totales" value="6 240 €" />
        </div>
        <SectionLabel text="Réservations en cours" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
          <BookingRow property={PROPERTY_IMAGES[0]} refCode="AB1234" dates="14/08 → 21/08 (7 nuits)" />
          <BookingRow property={PROPERTY_IMAGES[1]} refCode="CD5678" dates="10/09 → 15/09 (5 nuits)" />
        </div>
        <SectionLabel text="Séjours passés" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <BookingRow property={PROPERTY_IMAGES[2]} refCode="EF9012" dates="12/02 → 19/02/2024" past />
          <BookingRow property={PROPERTY_IMAGES[3]} refCode="GH3456" dates="05/11 → 08/11/2023" past />
          <BookingRow property={PROPERTY_IMAGES[4]} refCode="IJ7890" dates="20/07 → 27/07/2023" past />
        </div>
      </div>
    </div>
  );
}

export function ClientBooking() {
  const property = PROPERTY_IMAGES[0];
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }} className="fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div style={{ flex: 1, background: 'var(--color-beige)', padding: '40px' }}>
        <Link to="/client" style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', textDecoration: 'underline', display: 'block', marginBottom: '24px' }}>← Mes réservations</Link>
        <h2 style={{ marginBottom: '28px' }}>Réservation #AB1234</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Propriété" />
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ width: '140px', height: '90px', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--color-border)' }}>
                  <ImgPlaceholder src={property.src} alt={property.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--color-anthracite)', marginBottom: '6px' }}>{property.title}</p>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '8px' }}>Luberon · Villa · ★ {property.rating}</p>
                  <Link to="/property" style={{ fontSize: '13px', color: 'var(--color-terracotta)', textDecoration: 'underline' }}>Voir l'annonce →</Link>
                </div>
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Détails du séjour" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                {['Arrivée : 14/08/2024', 'Départ : 21/08/2024', 'Voyageurs : 4 adultes', 'Durée : 7 nuits'].map(d => (
                  <div key={d} style={{ padding: '10px 14px', background: 'var(--color-beige)', fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)' }}>{d}</div>
                ))}
              </div>
            </div>
            <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
              <SectionLabel text="Instructions d'accès" />
              <div style={{ background: 'var(--color-beige)', border: '1px solid var(--color-border)', padding: '16px', fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--color-taupe)', lineHeight: '1.6' }}>
                🔑 Code digicode : 4821 · Boîte à clés sécurisée située à gauche du porche d'entrée principal.
              </div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--color-border)', padding: '24px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Statut" />
            <div style={{ padding: '10px 14px', background: 'var(--color-anthracite)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '12px', textAlign: 'center', marginBottom: '14px' }}>CONFIRMÉE</div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '6px' }}>Réf. : #AB1234</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--color-taupe)', marginBottom: '20px' }}>Réservé le : 02/07/2024</p>
            <Divider />
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '18px', fontWeight: 600, color: 'var(--color-terracotta)', marginBottom: '4px' }}>2 665 €</p>
            <p style={{ fontSize: '13px', color: 'var(--color-taupe)' }}>Payé par Carte Bancaire (•••• 8892)</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ClientPayments() {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }} className="fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div style={{ flex: 1, background: 'var(--color-beige)', padding: '40px' }}>
        <h2 style={{ marginBottom: '28px' }}>Historique des paiements</h2>
        <div style={{ border: '1px solid var(--color-border)', overflow: 'hidden', background: 'var(--color-ivory)' }}>
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
  );
}

export function ClientSettings() {
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 72px)' }} className="fade-in">
      <PortalSidebar title="Portail Client" links={clientLinks} />
      <div style={{ flex: 1, background: 'var(--color-beige)', padding: '40px' }}>
        <h2 style={{ marginBottom: '28px' }}>Paramètres du compte</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ border: '1px solid var(--color-border)', padding: '28px', background: 'var(--color-ivory)' }}>
            <SectionLabel text="Photo de profil" />
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
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
