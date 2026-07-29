import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Btn, ImgPlaceholder, Pill, SectionLabel, Divider, HeartToggle } from '../components/Layout';
import { DestinationSelect, DatePicker, GuestsInput } from '../components/SearchFields';
import { useSearch } from '../context/SearchContext';
import { PROPERTY_IMAGES, HERO_HOME_IMAGE, HOST_OWNER_IMAGE } from '../data/images';

// ─── Property Card ────────────────────────────────────────────────────────────
const PropertyCard: React.FC<{ property: typeof PROPERTY_IMAGES[0] }> = ({ property }) => (
  <Link to="/property" style={{ display: 'block', textDecoration: 'none', height: '100%' }}>
    <div className="equal-card">
      <div className="card-img-wrapper">
        <HeartToggle propertyId={property.id} />
        <ImgPlaceholder src={property.src} alt={property.title} />
        {/* Rating badge */}
        <div style={{
          position: 'absolute', top: '14px', right: '14px',
          background: 'rgba(255,255,255,0.95)',
          borderRadius: 'var(--radius-badge)',
          padding: '5px 12px',
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 700,
          color: 'var(--color-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          <Star size={12} fill="currentColor" /> {property.rating}
        </div>
      </div>
      <div className="card-body">
        <div className="card-content-top">
          <h3 className="card-title">{property.title}</h3>
          <p className="card-subtitle">{property.location} · {property.specs}</p>
        </div>
        <div className="card-footer">
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
            {property.price} <span style={{ color: 'var(--color-muted)', fontWeight: 400, fontSize: '13px' }}>/ nuit</span>
          </span>
          <span className="btn-ghost" style={{ fontSize: '13px', padding: '6px 0' }}>Voir →</span>
        </div>
      </div>
    </div>
  </Link>
);

// ─── Hero Search Bar ──────────────────────────────────────────────────────────
const SearchBar: React.FC = () => {
  const { destination, arrivee, depart, guests, setDestination, setArrivee, setDepart, setGuests } = useSearch();

  return (
    <>
      {/* Desktop Search Bar */}
      <div className="hero-search-bar desktop-search-bar">
        <div className="search-field-item" style={{ borderRight: 'var(--border-width) solid var(--color-border-light)' }}>
          <DestinationSelect value={destination} onChange={setDestination} />
        </div>
        <div className="search-field-item" style={{ borderRight: 'var(--border-width) solid var(--color-border-light)' }}>
          <DatePicker label="Arrivée" value={arrivee} onChange={setArrivee} />
        </div>
        <div className="search-field-item" style={{ borderRight: 'var(--border-width) solid var(--color-border-light)' }}>
          <DatePicker label="Départ" value={depart} onChange={setDepart} />
        </div>
        <div className="search-field-item">
          <GuestsInput value={guests} onChange={setGuests} />
        </div>
        <div className="search-btn-wrapper">
          <Link to="/search" className="search-submit-btn">
            Rechercher
          </Link>
        </div>
      </div>

      {/* Mobile Search Pill (Airbnb style) */}
      <Link to="/search" className="mobile-search-pill">
        <div className="mobile-search-icon">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'none', height: '16px', width: '16px', stroke: 'currentcolor', strokeWidth: '4', overflow: 'visible' }}><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
        </div>
        <div className="mobile-search-text">
          <div className="mobile-search-title">{destination || "N'importe où"}</div>
          <div className="mobile-search-subtitle">{guests || 'Ajouter des voyageurs'}</div>
        </div>
      </Link>
    </>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="hero-section" style={{ borderRadius: 0, minHeight: '600px' }}>
        <ImgPlaceholder
          src={HERO_HOME_IMAGE}
          alt="Propriété de luxe avec piscine et vue panoramique"
          style={{ position: 'absolute', inset: 0, height: '100%', width: '100%', border: 'none', objectFit: 'cover' }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(26,23,64,0.20), rgba(26,23,64,0.70))' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '68px' }}>
          <div className="fade-in-up">
            {/* Label */}
            <h1 style={{ color: '#fff', marginBottom: '12px', maxWidth: '580px' }}>
              Des séjours d'exception
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '18px', marginBottom: '36px', maxWidth: '450px' }}>
              Propriétés soigneusement sélectionnées pour des expériences mémorables.
            </p>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="container featured-properties-section" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px' }}>
          <div>
            <SectionLabel text="Sélection du moment" />
            <h2>Propriétés en vedette</h2>
          </div>
          <Link to="/search" className="btn-ghost">Voir tout →</Link>
        </div>
        <div className="card-grid">
          {PROPERTY_IMAGES.map((prop, i) => (
            <div key={prop.id} className={`fade-in-up delay-${(i % 4) + 1}`} style={{ height: '100%' }}>
              <PropertyCard property={prop} />
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Categories */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <SectionLabel text="Catégories" />
        <h2 style={{ marginBottom: '28px' }}>Trouvez par type de bien</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['Villas', 'Appartements', 'Maisons', 'Chalets', 'Bord de mer', 'Montagne', 'Campagne', 'Lofts'].map((c, i) => (
            <Pill key={c} label={c} accent={i === 0} />
          ))}
        </div>
      </section>

      {/* Inspiration Gallery */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <SectionLabel text="Inspirations" />
        <h2 style={{ marginBottom: '40px' }}>Explorez nos plus beaux intérieurs</h2>
        <div className="inspiration-gallery">
          {PROPERTY_IMAGES.slice(0, 5).map((prop, i) => (
            <div key={prop.id} className={`gallery-item item-${i + 1} fade-in-up delay-${i + 1}`}>
              <ImgPlaceholder src={prop.gallery ? prop.gallery[1] || prop.src : prop.src} alt={`Inspiration ${i + 1}`} />
              <div className="gallery-overlay">
                <span className="gallery-caption">{prop.location.split(' · ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* Values */}
      <section className="container" style={{ paddingBottom: '80px' }}>
        <SectionLabel text="Pourquoi Destino" />
        <h2 style={{ marginBottom: '40px' }}>L'excellence, à chaque étape</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
          {[
            { title: 'Sélection rigoureuse', desc: 'Chaque propriété est inspectée et validée par notre équipe.' },
            { title: 'Réservation sécurisée', desc: 'Paiement crypté et confirmation instantanée garantis.' },
            { title: 'Assistance 24h/24', desc: 'Notre équipe est disponible à toute heure pour vous aider.' },
          ].map((v, i) => (
            <div key={v.title} className={`equal-card fade-in-up delay-${i + 1}`} style={{ padding: '32px' }}>
              <h3 style={{ marginBottom: '10px', fontSize: '17px' }}>{v.title}</h3>
              <p style={{ fontSize: '14px', lineHeight: 1.6 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* CTA Owner */}
      <section className="container" style={{ paddingBottom: '100px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          <div className="fade-in-up">
            <SectionLabel text="Propriétaires" />
            <h2 style={{ marginBottom: '16px' }}>Vous avez un bien à louer ?</h2>
            <p style={{ marginBottom: '32px', maxWidth: '380px', lineHeight: 1.7 }}>
              Rejoignez notre sélection de propriétaires et donnez à votre bien la visibilité d'exception qu'il mérite.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Btn label="Déposer une annonce →" />
              <Btn label="En savoir plus" variant="secondary" />
            </div>
          </div>
          <div className="equal-card owner-cta-image" style={{ height: '340px', width: '100%', overflow: 'hidden' }}>
            <div className="card-img-wrapper" style={{ height: '100%' }}>
              <ImgPlaceholder src={HOST_OWNER_IMAGE} alt="Propriétaire devant sa villa" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
