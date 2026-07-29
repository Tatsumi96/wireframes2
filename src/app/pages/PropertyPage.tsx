import React from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, CheckCircle } from 'lucide-react';
import { ImgPlaceholder, Pill, SectionLabel, Divider, HeartToggle } from '../components/Layout';
import MapView from '../components/MapView';
import { PROPERTY_IMAGES, CALENDAR_PREVIEW_IMAGE, REVIEWER_AVATARS } from '../data/images';

const property = PROPERTY_IMAGES[0];

const reviewsData = [
  {
    name: 'Sophie M.',
    date: 'Juillet 2024',
    rating: 5,
    avatar: REVIEWER_AVATARS.sophie,
    comment: "Séjour parfait, la propriété correspond exactement aux photos. L'accueil du propriétaire était chaleureux et professionnel.",
  },
  {
    name: 'Thomas L.',
    date: 'Juin 2024',
    rating: 5,
    avatar: REVIEWER_AVATARS.thomas,
    comment: "Le cadre est tout simplement enchanteur. La piscine chauffée et la terrasse couverte ont rendu notre semaine inoubliable.",
  },
  {
    name: 'Claire D.',
    date: 'Mai 2024',
    rating: 5,
    avatar: REVIEWER_AVATARS.claire,
    comment: "Maison d'une propreté exemplaire, parfaitement équipée pour 8 personnes. Nous reviendrons sans hésiter !",
  },
];

const ReviewCard: React.FC<{ review: typeof reviewsData[0] }> = ({ review }) => (
  <div style={{ padding: '22px 0', borderBottom: '1px solid var(--color-border-light)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
      <div style={{ width: '46px', height: '46px', borderRadius: '50%', overflow: 'hidden', border: 'var(--border-width) solid var(--color-border)', flexShrink: 0 }}>
        <ImgPlaceholder src={review.avatar} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div>
        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '2px' }}>{review.name}</p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ display: 'flex', gap: '2px' }}>
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} size={14} fill="currentColor" />
            ))}
          </span>
          · <span style={{ color: 'var(--color-muted)', fontWeight: 400 }}>{review.date}</span>
        </p>
      </div>
    </div>
    <p style={{ fontSize: '14px', color: 'var(--color-body)', lineHeight: 1.7 }}>{review.comment}</p>
  </div>
);

export default function PropertyPage() {
  return (
    <div className="fade-in" style={{ position: 'relative' }}>
      {/* Gallery grid */}
      <div className="container" style={{ paddingTop: '32px' }}>
        <div className="property-gallery-grid">
          <ImgPlaceholder src={property.gallery![0]} alt="Bastide provençale façade et terrasse" style={{ height: '100%', border: 'none', objectFit: 'cover', borderRadius: '0' }} />
          <ImgPlaceholder src={property.gallery![1]} alt="Salon d'architecte spacieux" style={{ height: '100%', border: 'none', objectFit: 'cover', borderRadius: '0' }} />
          <ImgPlaceholder src={property.gallery![2]} alt="Cuisine équipée contemporaine" style={{ height: '100%', border: 'none', objectFit: 'cover', borderRadius: '0' }} />
          <ImgPlaceholder src={property.gallery![3]} alt="Chambre principale lumineuse" style={{ height: '100%', border: 'none', objectFit: 'cover', borderRadius: '0' }} />
          <div style={{ position: 'relative', height: '100%' }}>
            <ImgPlaceholder src={property.gallery![4]} alt="Piscine privée et jardin" style={{ height: '100%', width: '100%', border: 'none', objectFit: 'cover', borderRadius: '0' }} />
            <button style={{
              position: 'absolute', bottom: '14px', right: '14px',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 'var(--radius-btn)',
              border: '1px solid var(--color-border)',
              padding: '6px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--color-dark)',
              cursor: 'pointer',
            }}>+ 12 photos</button>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '48px', paddingBottom: '120px' }}>
        <div className="property-main-layout">

          {/* Left: details */}
          <div className="fade-in-up">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
              <h1 style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>{property.title}</h1>
              <HeartToggle propertyId={property.id} style={{ position: 'static', width: 40, height: 40, background: 'var(--color-surface-2)', flexShrink: 0 }} />
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '32px' }}>
              {['Luberon', 'Villa', '8 pers.', '4 chambres'].map(t => <Pill key={t} label={t} />)}
              <span className="pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Star size={12} fill="currentColor" /> 4.9 (48 avis)
              </span>
            </div>

            <Divider />
            <SectionLabel text="Description" />
            <div style={{
              background: 'var(--color-surface)',
              border: 'var(--border-width) solid var(--color-border-light)',
              borderRadius: 'var(--radius-card)',
              padding: '28px',
              marginBottom: '32px',
              color: 'var(--color-body)',
              lineHeight: 1.8,
            }}>
              <p style={{ marginBottom: '14px' }}>
                Niché au cœur du Luberon, ce domaine d'exception allie le charme authentique de la pierre provençale au confort contemporain le plus exigeant.
              </p>
              <p>
                D'une superficie de 280 m², la bastide propose de grands espaces de vie baignés de lumière, 4 suites avec salles de bain privatives, une cuisine haut de gamme et un jardin paysager de 5 000 m² bordé de cyprès et d'oliviers séculaires.
              </p>
            </div>

            <SectionLabel text="Équipements" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {['Piscine chauffée', 'Jardin paysager', 'Wifi haut débit', 'Cuisine équipée', 'Parking privé', 'Climatisation', 'Lave-linge', 'Barbecue'].map(e => (
                <div key={e} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--color-body)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-primary)', flexShrink: 0 }} />
                  {e}
                </div>
              ))}
            </div>

            <Divider />
            <SectionLabel text="Calendrier de disponibilité" />
            <div style={{
              height: '260px',
              overflow: 'hidden',
              borderRadius: 'var(--radius-card)',
              border: 'var(--border-width) solid var(--color-border-light)',
              marginBottom: '32px',
              position: 'relative',
            }}>
              <ImgPlaceholder src={CALENDAR_PREVIEW_IMAGE} alt="Calendrier interactif" style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(247,246,255,0.80)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                  background: 'var(--color-surface)',
                  borderRadius: 'var(--radius-card)',
                  border: 'var(--border-width) solid var(--color-border)',
                  padding: '20px 28px',
                  textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)', marginBottom: '6px' }}>Calendrier de sélection</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-muted)' }}>Vérifiez les disponibilités instantanément</p>
                </div>
              </div>
            </div>

            <Divider />
            <SectionLabel text="Localisation" />
            <div style={{
              height: '240px',
              overflow: 'hidden',
              borderRadius: 'var(--radius-card)',
              border: 'var(--border-width) solid var(--color-border-light)',
              marginBottom: '32px',
              position: 'relative',
            }}>
              <MapView
                markers={[{ lat: property.coords.lat, lng: property.coords.lng, title: property.title, price: property.price }]}
                center={[property.coords.lat, property.coords.lng]}
                zoom={13}
                interactive={false}
              />
              <div style={{
                position: 'absolute', bottom: '16px', left: '16px', right: '16px',
                background: 'rgba(255,255,255,0.95)',
                borderRadius: 'var(--radius-input)',
                padding: '10px 16px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--color-dark)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                zIndex: 1000,
              }}>
                <MapPin size={16} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                <span>Luberon · Adresse exacte transmise après réservation</span>
              </div>
            </div>

            <Divider />
            <SectionLabel text="Avis clients (48)" />
            {reviewsData.map(r => <ReviewCard key={r.name} review={r} />)}
          </div>

          {/* Right: booking widget */}
          <div className="property-booking-widget fade-in-up delay-2">
            <div style={{ padding: '28px' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '26px', fontWeight: 800, color: 'var(--color-primary)', marginBottom: '4px' }}>
                350 € <span style={{ fontSize: '15px', color: 'var(--color-muted)', fontWeight: 400 }}>/ nuit</span>
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '20px' }}>
                <Star size={14} fill="currentColor" style={{ color: 'var(--color-primary)' }} />
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>4.9</span>
                <span style={{ fontSize: '13px', color: 'var(--color-muted)' }}>· 48 avis</span>
              </div>
              <Divider />
              <div style={{ border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius-input)', marginBottom: '16px', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: 'var(--border-width) solid var(--color-border)' }}>
                  {[['ARRIVÉE', '14 / 08 / 2024'], ['DÉPART', '21 / 08 / 2024']].map(([l, p]) => (
                    <div key={l} style={{ padding: '14px 16px', borderRight: l === 'ARRIVÉE' ? 'var(--border-width) solid var(--color-border)' : 'none' }}>
                      <p className="field-label" style={{ marginBottom: '4px' }}>{l}</p>
                      <input defaultValue={p} style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '14px', width: '100%', color: 'var(--color-dark)', fontWeight: 600 }} />
                    </div>
                  ))}
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <p className="field-label" style={{ marginBottom: '4px' }}>VOYAGEURS</p>
                  <input defaultValue="4 adultes" style={{ background: 'none', border: 'none', outline: 'none', fontFamily: 'var(--font-body)', fontSize: '14px', width: '100%', color: 'var(--color-dark)', fontWeight: 600 }} />
                </div>
              </div>
              <Link to="/booking/1" className="btn-primary" style={{ display: 'flex', marginBottom: '20px', textAlign: 'center', justifyContent: 'center' }}>
                Réserver maintenant →
              </Link>
              <Divider />
              {[['350 € × 7 nuits', '2 450 €'], ['Frais de ménage', '120 €'], ['Frais de service', '95 €']].map(([l, v]) => (
                <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--color-body)' }}>{l}</span>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-dark)' }}>{v}</span>
                </div>
              ))}
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-dark)' }}>Total TTC</span>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--color-primary)' }}>2 665 €</span>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', textAlign: 'center', marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <CheckCircle size={14} style={{ color: 'var(--color-primary)' }} />
                Aucune somme prélevée avant validation
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="mobile-bottom-booking-bar">
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '18px', fontWeight: 800, color: 'var(--color-primary)' }}>
            350 € <span style={{ fontSize: '13px', color: 'var(--color-muted)', fontWeight: 400 }}>/ nuit</span>
          </p>
          <p style={{ fontSize: '13px', color: 'var(--color-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={12} fill="currentColor" style={{ color: 'var(--color-primary)' }} /> 4.9 · 14-21 Août
          </p>
        </div>
        <Link to="/booking/1" className="btn-primary" style={{ padding: '12px 24px', fontSize: '14px' }}>
          Réserver →
        </Link>
      </div>
    </div>
  );
}
