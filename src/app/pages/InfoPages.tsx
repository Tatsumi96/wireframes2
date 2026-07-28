import React from 'react';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Field, ImgPlaceholder, SectionLabel, Divider } from '../components/Layout';
import { ABOUT_HERO_IMAGE, CONTACT_MAP_IMAGE, TEAM_MEMBERS } from '../data/images';

// ─── Contact page ─────────────────────────────────────────────────────────────

export function ContactPage() {
  return (
    <div className="container fade-in" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
      <SectionLabel text="Contact" />
      <h1 style={{ marginBottom: '48px', maxWidth: '520px' }}>Une question ? Nous sommes là.</h1>
      <div className="info-grid-2col">
        {/* Form */}
        <div
          className="fade-in-up"
          style={{
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border-light)',
            borderRadius: 'var(--radius-card)',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <SectionLabel text="Formulaire de contact" />
          <Field label="Nom complet" placeholder="Jean Dupont" />
          <Field label="Email" placeholder="jean.dupont@exemple.fr" type="email" />
          <Field label="Sujet" placeholder="Demande d'information réservation" />
          <div className="field-group">
            <label className="field-label">Message</label>
            <textarea
              rows={5}
              placeholder="Décrivez votre demande en quelques détails…"
              className="field-input"
              style={{ resize: 'vertical', minHeight: '120px' }}
            />
          </div>
          <button className="btn-primary" style={{ justifyContent: 'center' }}>
            Envoyer le message
          </button>
        </div>

        {/* Coords & map */}
        <div className="fade-in-up delay-2">
          <SectionLabel text="Nos coordonnées" />
          <div style={{
            background: 'var(--color-surface)',
            border: '1.5px solid var(--color-border-light)',
            borderRadius: 'var(--radius-card)',
            padding: '24px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            {[
              { icon: <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />, text: '12 rue des Oliviers, 84000 Avignon' },
              { icon: <Mail size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />, text: 'contact@lumiere-exception.fr' },
              { icon: <Phone size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />, text: '+33 4 90 00 12 34' },
              { icon: <Clock size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />, text: 'Du Lundi au Vendredi, 9h – 18h' },
            ].map(({ icon, text }) => (
              <p key={text} style={{ fontSize: '14px', color: 'var(--color-body)', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '10px' }}>
                {icon} {text}
              </p>
            ))}
          </div>
          <div className="equal-card" style={{ height: '260px' }}>
            <div className="card-img-wrapper" style={{ height: '100%' }}>
              <ImgPlaceholder src={CONTACT_MAP_IMAGE} alt="Bureaux Lumière à Avignon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── About page ───────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="fade-in">
      {/* Hero image */}
      <div style={{ height: '380px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <ImgPlaceholder src={ABOUT_HERO_IMAGE} alt="Domaine Lumière" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(26,23,64,0.35)' }} />
        {/* Overlay headline */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '48px' }}>
          <h1 style={{ color: '#fff', maxWidth: '560px', fontSize: 'clamp(30px, 5vw, 52px)' }}>
            Nous croyons en l'authenticité des lieux.
          </h1>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '64px', paddingBottom: '80px' }}>
        <div className="fade-in-up">
          <SectionLabel text="Notre histoire" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '64px' }}>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.8, fontSize: '15px' }}>
              Fondée en 2018, Lumière sélectionne des propriétés d'exception pour des voyageurs qui cherchent plus qu'un simple hébergement. Nous privilégions l'authenticité, le caractère et la relation directe avec des propriétaires passionnés.
            </p>
            <p style={{ color: 'var(--color-body)', lineHeight: 1.8, fontSize: '15px' }}>
              Chaque bien est visité et évalué par notre équipe avant d'être référencé. Nous garantissons un niveau de qualité homogène et une expérience irréprochable, de la réservation au départ.
            </p>
          </div>
        </div>

        <Divider />

        {/* Team */}
        <SectionLabel text="Notre équipe" />
        <h2 style={{ marginBottom: '36px' }}>Les visages derrière Lumière</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '24px', marginBottom: '64px', alignItems: 'stretch' }}>
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={member.name} className={`equal-card fade-in-up delay-${idx + 1}`}>
              <div className="card-img-wrapper" style={{ height: '220px' }}>
                <ImgPlaceholder src={member.src} alt={member.name} />
              </div>
              <div style={{ padding: '18px' }}>
                <p style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '4px' }}>{member.name}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600 }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Values */}
        <SectionLabel text="Nos valeurs" />
        <h2 style={{ marginBottom: '36px' }}>Ce qui nous guide</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          {[
            ['Sélection rigoureuse', 'Chaque propriété est visitée et évaluée par notre équipe avant publication.'],
            ['Transparence totale', "Prix clairs, pas de frais cachés, politique d'annulation lisible."],
            ['Service humain', 'Une équipe disponible 7j/7 pour vous accompagner de la recherche au retour.'],
          ].map(([title, desc], idx) => (
            <div key={title} className={`equal-card fade-in-up delay-${idx + 1}`} style={{ padding: '32px' }}>
              <div style={{ width: '32px', height: '3px', background: 'var(--color-primary)', borderRadius: '3px', marginBottom: '18px' }} />
              <h3 style={{ marginBottom: '10px', fontSize: '18px' }}>{title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-body)', lineHeight: 1.65 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Legal page ───────────────────────────────────────────────────────────────

export function LegalPage() {
  const [tab, setTab] = React.useState('cgu');
  const tabs = [{ id: 'cgu', label: 'CGU' }, { id: 'privacy', label: 'Confidentialité' }, { id: 'legal', label: 'Mentions légales' }];
  return (
    <div className="container fade-in" style={{ paddingTop: '64px', paddingBottom: '80px', maxWidth: '860px' }}>
      <SectionLabel text="Documents légaux" />
      <h1 style={{ marginBottom: '36px' }}>Informations légales</h1>

      {/* Tab row */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '40px' }}>
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`pill${tab === t.id ? ' active' : ''}`}
            style={{ cursor: 'pointer' }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className={`fade-in-up delay-${(i % 4) + 1}`}>
            <h3 style={{ marginBottom: '12px' }}>Article {i} — Conditions relatives aux réservations</h3>
            <div style={{
              background: 'var(--color-surface)',
              border: '1.5px solid var(--color-border-light)',
              borderRadius: 'var(--radius-card)',
              padding: '22px',
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--color-body)',
              lineHeight: 1.8,
            }}>
              Les dispositions du présent article régissent l'accès, l'utilisation et la réservation de logements d'exception sur la plateforme Lumière. Toute réservation implique l'acceptation pleine et entière des conditions générales d'utilisation.
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
