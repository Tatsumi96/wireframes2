import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ImgPlaceholder } from './Layout';

export const PhotoGallery: React.FC<{ images: string[]; onClose: () => void }> = ({ images, onClose }) => {
  const [index, setIndex] = useState<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (index !== null) setIndex(null);
        else onClose();
      }
      if (e.key === 'ArrowRight' && index !== null) setIndex(i => (i! + 1) % images.length);
      if (e.key === 'ArrowLeft' && index !== null) setIndex(i => (i! - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [index, images.length, onClose]);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 2000,
      background: 'rgba(10, 13, 25, 0.94)',
      display: 'flex', flexDirection: 'column',
      animation: 'fadeIn 0.25s ease',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 20px', color: '#fff', flexShrink: 0,
      }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em' }}>
          {index === null ? `${images.length} photos` : `${index! + 1} / ${images.length}`}
        </span>
        <button
          onClick={onClose}
          aria-label="Fermer la galerie"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 40, height: 40, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer',
            color: '#fff', transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.22)'; e.currentTarget.style.transform = 'rotate(90deg)'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'rotate(0deg)'; }}
        >
          <X size={20} />
        </button>
      </div>

      {index === null ? (
        /* ── Grid view ── */
        <div style={{
          flex: 1, overflowY: 'auto', padding: '4px 20px 32px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '10px',
            maxWidth: 1400, margin: '0 auto',
          }}>
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Voir la photo ${i + 1}`}
                style={{
                  position: 'relative', padding: 0, border: 'none', cursor: 'pointer',
                  aspectRatio: '4 / 3', borderRadius: 'var(--radius-md)',
                  overflow: 'hidden', background: 'rgba(255,255,255,0.08)',
                }}
              >
                <ImgPlaceholder src={src} alt={`Photo ${i + 1} de la propriété`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }} />
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* ── Fullscreen view ── */
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', minHeight: 0, padding: '0 20px',
        }}>
          <button
            onClick={() => setIndex(i => (i! - 1 + images.length) % images.length)}
            aria-label="Photo précédente"
            style={{
              position: 'absolute', left: '16px', zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', color: '#fff',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChevronLeft size={24} />
          </button>

          <ImgPlaceholder
            src={images[index]}
            alt={`Photo ${index! + 1} de la propriété`}
            style={{
              maxWidth: 'min(1100px, 90%)', maxHeight: '78vh',
              width: 'auto', height: 'auto', objectFit: 'contain',
              borderRadius: 'var(--radius-card)',
              animation: 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />

          <button
            onClick={() => setIndex(i => (i! + 1) % images.length)}
            aria-label="Photo suivante"
            style={{
              position: 'absolute', right: '16px', zIndex: 2,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: 44, height: 44, borderRadius: '50%',
              background: 'rgba(255,255,255,0.12)', border: 'none', cursor: 'pointer', color: '#fff',
              transition: 'background 0.2s ease, transform 0.2s ease',
            }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.25)'; e.currentTarget.style.transform = 'scale(1.06)'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};
