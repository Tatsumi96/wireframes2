import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, ArrowUpDown } from 'lucide-react';
import { Btn, ImgPlaceholder, Pill, HeartToggle } from '../components/Layout';
import { DestinationSelect, DatePicker, GuestsInput } from '../components/SearchFields';
import { useSearch } from '../context/SearchContext';
import MapView from '../components/MapView';
import { PROPERTY_IMAGES } from '../data/images';

const ResultCard: React.FC<{ property: typeof PROPERTY_IMAGES[0] }> = ({ property }) => (
  <Link to="/property" style={{ display: 'block', textDecoration: 'none' }}>
    <div className="equal-card result-card-horizontal">
      <div className="card-img-wrapper result-card-img">
        <HeartToggle propertyId={property.id} />
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

type SortKey = 'recommandé' | 'prix-croissant' | 'prix-décroissant' | 'note';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'recommandé', label: 'Recommandé' },
  { key: 'prix-croissant', label: 'Prix ↑' },
  { key: 'prix-décroissant', label: 'Prix ↓' },
  { key: 'note', label: 'Note' },
];

function sortProperties(props: typeof PROPERTY_IMAGES, key: SortKey) {
  const sorted = [...props];
  switch (key) {
    case 'prix-croissant': return sorted.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    case 'prix-décroissant': return sorted.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    case 'note': return sorted.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    default: return sorted;
  }
}

export default function SearchPage() {
  const navigate = useNavigate();
  const { destination, arrivee, depart, guests, setDestination, setArrivee, setDepart, setGuests } = useSearch();
  const [sortKey, setSortKey] = useState<SortKey>('recommandé');
  const [sortOpen, setSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) setSortOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const sorted = sortProperties(PROPERTY_IMAGES, sortKey);

  const mapMarkers = PROPERTY_IMAGES.map(p => ({
    lat: p.coords.lat,
    lng: p.coords.lng,
    title: p.title,
    price: p.price,
    onClick: () => navigate('/property'),
  }));

  const onSearch = () => {
    const initial = `Demander: Rechercher ${destination || 'un logement'} pour ${guests || '1'} voyageur(s) entre ${arrivee || '...'} et ${depart || '...'}`;
    window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { initialUser: initial } }));
  };

  return (
    <div className="fade-in">
      {/* Search bar */}
      <div style={{ borderBottom: '1px solid var(--color-border-light)', background: 'var(--color-surface)', padding: '20px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div className="search-form-grid" style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px' }}>
            <DestinationSelect value={destination} onChange={setDestination} />
            <DatePicker label="Arrivée" value={arrivee} onChange={setArrivee} />
            <DatePicker label="Départ" value={depart} onChange={setDepart} />
            <GuestsInput value={guests} onChange={setGuests} />
          </div>
          <Btn label="Rechercher" onClick={onSearch} />
        </div>
      </div>

      {/* Filters + Sort row */}
      <div style={{ borderBottom: '1px solid var(--color-border-light)', background: 'var(--color-bg)', padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, color: 'var(--color-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Filtres :</span>
          {['Prix', 'Type de bien', 'Chambres', 'Équipements', 'Disponibilité'].map(f => (
            <button key={f} className="pill" style={{ cursor: 'pointer' }}>
              {f} ▾
            </button>
          ))}
          <button className="pill" style={{ cursor: 'pointer', background: 'transparent' }}>
            Réinitialiser
          </button>
          <div style={{ flex: 1 }} />
          {/* Sort */}
          <div ref={sortRef} style={{ position: 'relative' }}>
            <button className="pill" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }} onClick={() => setSortOpen(v => !v)}>
              <ArrowUpDown size={12} /> Trier : {SORT_OPTIONS.find(o => o.key === sortKey)?.label}
            </button>
            {sortOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, zIndex: 200, background: 'var(--color-surface)', border: 'var(--border-width) solid var(--color-border)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-md)', marginTop: '4px', minWidth: '160px', overflow: 'hidden' }}>
                {SORT_OPTIONS.map(opt => (
                  <button key={opt.key} type="button" onClick={() => { setSortKey(opt.key); setSortOpen(false); }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px', background: sortKey === opt.key ? 'var(--color-surface-2)' : 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-dark)' }}
                    onMouseOver={e => { e.currentTarget.style.background = 'var(--color-surface-2)'; }}
                    onMouseOut={e => { if (sortKey !== opt.key) e.currentTarget.style.background = 'none'; }}
                  >
                    {sortKey === opt.key ? '✓ ' : ''}{opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results + map */}
      <div className="container" style={{ paddingTop: '36px', paddingBottom: '80px' }}>
        <div className="search-results-grid">
          {/* Results list */}
          <div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, color: 'var(--color-muted)', marginBottom: '20px' }}>
              {sorted.length} propriété{sorted.length > 1 ? 's' : ''} trouvée{sorted.length > 1 ? 's' : ''}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {sorted.map((prop, i) => (
                <div key={prop.id} className={`fade-in-up delay-${(i % 4) + 1}`}>
                  <ResultCard property={prop} />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky map */}
          <div className="equal-card search-map-container" style={{ position: 'sticky', top: '88px', height: '640px', overflow: 'hidden', borderRadius: 'var(--radius-card)' }}>
            <MapView markers={mapMarkers} center={[43.7, 6.0]} zoom={7} />
          </div>
        </div>
      </div>
    </div>
  );
}
