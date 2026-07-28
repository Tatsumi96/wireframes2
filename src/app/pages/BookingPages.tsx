import React from 'react';
import { Link } from 'react-router-dom';
import { Field, ImgPlaceholder, SectionLabel, Divider, StepBar } from '../components/Layout';
import { PROPERTY_IMAGES, CALENDAR_PREVIEW_IMAGE, STRIPE_BADGE_IMAGE } from '../data/images';

const property = PROPERTY_IMAGES[0];

const SummaryWidget: React.FC = () => (
  <div>
    <div className="equal-card" style={{ overflow: 'hidden', marginBottom: '16px' }}>
      <div style={{ height: '140px', overflow: 'hidden' }}>
        <ImgPlaceholder src={property.src} alt={property.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
      </div>
      <div style={{ padding: '16px' }}>
        <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '4px' }}>{property.title}</p>
        <span className="badge-rating" style={{ fontSize: '12px' }}>★ {property.rating} · Luberon</span>
      </div>
    </div>
    <div className="equal-card" style={{ padding: '18px' }}>
      <p className="field-label" style={{ marginBottom: '6px' }}>Tarif estimé</p>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '22px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '4px' }}>2 450 €</p>
      <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>350 € × 7 nuits</p>
    </div>
  </div>
);

// ─── Step 1 ──────────────────────────────────────────────────────────────────

export function BookingStep1() {
  return (
    <div className="container" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <StepBar steps={['1. Dates & voyageurs', '2. Récapitulatif', '3. Paiement']} current={0} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }}>
        <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)', borderRadius: 'var(--radius-card)', padding: '36px' }}>
          <SectionLabel text="Sélection des dates" />
          <div style={{ height: '280px', overflow: 'hidden', borderRadius: 'var(--radius-card)', border: '1.5px solid var(--color-border-light)', marginBottom: '28px' }}>
            <ImgPlaceholder src={CALENDAR_PREVIEW_IMAGE} alt="Sélection de dates" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
          </div>
          <Divider />
          <SectionLabel text="Voyageurs" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {['Adultes', 'Enfants'].map(l => (
              <div key={l}>
                <p className="field-label" style={{ marginBottom: '10px' }}>{l}</p>
                <div style={{ border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-input)', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: 'var(--color-surface-2)' }}>
                  <button style={{ background: 'none', border: 'none', color: 'var(--color-muted)', cursor: 'pointer', fontSize: '20px', fontWeight: 700 }}>−</button>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)' }}>2</span>
                  <button style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: '20px', fontWeight: 700 }}>+</button>
                </div>
              </div>
            ))}
          </div>
          <Link to="/booking/2" className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }}>
            Continuer →
          </Link>
        </div>
        <SummaryWidget />
      </div>
    </div>
  );
}

// ─── Step 2 ──────────────────────────────────────────────────────────────────

export function BookingStep2() {
  return (
    <div className="container" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <StepBar steps={['1. Dates & voyageurs', '2. Récapitulatif', '3. Paiement']} current={1} />
      <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)', borderRadius: 'var(--radius-card)', padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <SectionLabel text="Récapitulatif de la réservation" />
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '28px', marginBottom: '28px' }}>
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', height: '150px' }}>
            <ImgPlaceholder src={property.src} alt={property.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)' }}>{property.title}</p>
            {['Arrivée : 14/08/2024', 'Départ : 21/08/2024', 'Voyageurs : 4 adultes', 'Durée : 7 nuits'].map(d => (
              <div key={d} style={{ padding: '10px 14px', background: 'var(--color-surface-2)', borderRadius: 'var(--radius-badge)', fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 500, color: 'var(--color-body)' }}>{d}</div>
            ))}
          </div>
        </div>
        <Divider />
        <SectionLabel text="Détail du prix" />
        {[['350 € × 7 nuits', '2 450 €'], ['Frais de ménage', '120 €'], ['Frais de service', '95 €'], ['Taxes de séjour', '0 €']].map(([l, v]) => (
          <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '14px', color: 'var(--color-body)' }}>{l}</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark)' }}>{v}</span>
          </div>
        ))}
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '28px' }}>
          <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)' }}>Total TTC</span>
          <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)' }}>2 665 €</span>
        </div>
        <Divider />
        <SectionLabel text="Politique d'annulation" />
        <div style={{ background: 'var(--color-surface-2)', borderRadius: 'var(--radius-input)', padding: '16px 20px', marginBottom: '28px', fontSize: '14px', color: 'var(--color-body)', lineHeight: 1.7 }}>
          Annulation gratuite jusqu'à 7 jours avant l'arrivée. Après cette date, les frais de la première nuit sont retenus.
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '320px' }}>
          <Link to="/booking/3" className="btn-primary" style={{ textAlign: 'center', justifyContent: 'center' }}>
            Confirmer et payer →
          </Link>
          <Link to="/booking/1" className="btn-ghost" style={{ textAlign: 'center', justifyContent: 'center' }}>
            ← Modifier la sélection
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Step 3 ──────────────────────────────────────────────────────────────────

export function BookingStep3() {
  return (
    <div className="container" style={{ paddingTop: '48px', paddingBottom: '80px' }}>
      <StepBar steps={['1. Dates & voyageurs', '2. Récapitulatif', '3. Paiement']} current={2} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '40px', alignItems: 'start' }}>
        <div style={{ background: 'var(--color-surface)', border: '1.5px solid var(--color-border-light)', borderRadius: 'var(--radius-card)', padding: '36px' }}>
          <SectionLabel text="Paiement sécurisé" />
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{ height: '36px', width: '90px', borderRadius: 'var(--radius-badge)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <ImgPlaceholder src={STRIPE_BADGE_IMAGE} alt="Stripe" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>SSL / TLS · Chiffrement 256 bits</p>
          </div>
          <Divider />
          <SectionLabel text="Informations de paiement" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <Field label="Titulaire de la carte" placeholder="Jean Dupont" />
            <Field label="Numéro de carte" placeholder="4532 •••• •••• 8892" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Expiration" placeholder="08 / 27" />
              <Field label="CVV" placeholder="382" />
            </div>
          </div>
          <Divider />
          <SectionLabel text="Coordonnées du voyageur" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <Field label="Prénom" placeholder="Jean" />
              <Field label="Nom" placeholder="Dupont" />
            </div>
            <Field label="Email" placeholder="jean.dupont@exemple.fr" type="email" />
            <Field label="Téléphone" placeholder="+33 6 12 34 56 78" />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '28px' }}>
            <input type="checkbox" id="terms" defaultChecked style={{ marginTop: '3px', accentColor: 'var(--color-primary)', width: '16px', height: '16px' }} />
            <label htmlFor="terms" style={{ fontSize: '14px', color: 'var(--color-body)', cursor: 'pointer', lineHeight: 1.5 }}>
              J'accepte les CGU et la politique d'annulation
            </label>
          </div>
          <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '15px', padding: '16px' }}>
            Payer 2 665 € — Confirmer la réservation
          </button>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', textAlign: 'center', marginTop: '16px' }}>
            🔒 Paiement 100% sécurisé · Confirmation immédiate par email
          </p>
        </div>

        {/* Order summary sidebar */}
        <div>
          <div className="equal-card" style={{ overflow: 'hidden', marginBottom: '16px' }}>
            <div style={{ height: '140px', overflow: 'hidden' }}>
              <ImgPlaceholder src={property.src} alt={property.title} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '16px' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '4px' }}>{property.title}</p>
              <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>14/08 → 21/08 · 7 nuits</p>
            </div>
          </div>
          <div className="equal-card" style={{ padding: '18px' }}>
            {[['Sous-total', '2 450 €'], ['Frais annexes', '215 €']].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-body)' }}>{l}</span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-dark)' }}>{v}</span>
              </div>
            ))}
            <Divider />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)' }}>Total</span>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>2 665 €</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
