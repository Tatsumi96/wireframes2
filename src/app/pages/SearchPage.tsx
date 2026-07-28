import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Btn, Field, ImgPlaceholder, Pill } from '../components/Layout';
import { PROPERTY_IMAGES, MAP_PREVIEW_IMAGE } from '../data/images';

const ResultCard: React.FC<{ property: typeof PROPERTY_IMAGES[0] }> = ({ property }) => (
  <Link to="/property" style={{ display: 'block', textDecoration: 'none' }}>
    <div className="equal-card result-card-horizontal">
      <div className="card-img-wrapper result-card-img">
        <ImgPlaceholder src={property.src} alt={property.title} />
      </div>
      <div className="card-body" style={{ padding: '18px 22px' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
            <h3 className="card-title" style={{ fontSize: '16px' }}>{property.title}</h3>
            <span className="badge-rating" style={{ marginLeft: '8px', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Star size={12} fill="currentColor" /> {property.rating}
            </span>
          </div>
          <p className="card-subtitle" style={{ marginBottom: '12px' }}>{property.location} · {property.specs}</p>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['Piscine', 'Jardin', 'Wifi'].map(a => <Pill key={a} label={a} />)}
          </div>
        </div>
        <div className="card-footer" style={{ marginTop: '12px', paddingTop: '10px' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, color: 'var(--color-primary)' }}>
            {property.price} <span style={{ fontSize: '13px', color: 'var(--color-muted)', fontWeight: 400 }}>/ nuit</span>
          </span>
          <span className="btn-ghost" style={{ fontSize: '13px' }}>Voir →</span>
        </div>
      </div>
    </div>
  </Link>
);

export default function SearchPage() {
  const [destination, setDestination] = useState('');
  const [arrival, setArrival] = useState('');
  const [depart, setDepart] = useState('');
  const [guests, setGuests] = useState('');

  const onSearch = () => {
    // Dispatch event to open chatbot with a pre-filled 'Demander' question built from form values
    const initial = `Demander: Rechercher ${destination || 'un logement'} pour ${guests || '1'} voyageur(s) entre ${arrival || '...'} et ${depart || '...'}`;
    window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { initialUser: initial } }));
  };

  return (
    <div className="fade-in">
      {/* Search bar */}
      <div style={{ borderBottom: '1px solid var(--color-border-light)', background: 'var(--color-surface)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
            <Field placeholder="Destination" value={destination} onChange={(e) => setDestination(e.target.value)} />
            <Field placeholder="Arrivée" value={arrival} onChange={(e) => setArrival(e.target.value)} />
            <Field placeholder="Départ" value={depart} onChange={(e) => setDepart(e.target.value)} />
            <Field placeholder="Voyageurs" value={guests} onChange={(e) => setGuests(e.target.value)} />
          </div>
          <Btn label="Rechercher" onClick={onSearch} />
        </div>
      </div>

      {/* Filters row */}
      <div style={{ borderBottom: '1px solid var(--color-border-light)', background: 'var(--color-bg)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filtres :</span>
          {['Prix', 'Type de bien', 'Chambres', 'Équipements', 'Disponibilité'].map(f => (
            <button key={f} className="pill" style={{ cursor: 'pointer' }}>
              {f} ▾
            </button>
          ))}
          <button style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, marginLeft: '4px' }}>
            Réinitialiser
          </button>
        </div>
      </div>

      {/* Results + map */}
      <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px' }}>
        <div className="search-results-grid">
          {/* Results list */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '20px' }}>
              24 propriétés trouvées
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PROPERTY_IMAGES.map((prop, i) => (
                <div key={prop.id} className={`fade-in-up delay-${(i % 4) + 1}`}>
                  <ResultCard property={prop} />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky map */}
          <div className="equal-card search-map-container" style={{ position: 'sticky', top: '88px', height: '640px', overflow: 'hidden' }}>
            <div className="card-img-wrapper" style={{ height: '100%' }}>
              <ImgPlaceholder src={MAP_PREVIEW_IMAGE} alt="Carte interactive des propriétés" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
