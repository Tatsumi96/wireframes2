import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div style={{ minHeight: '70dvh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '520px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '120px', fontWeight: 700, lineHeight: 1, color: 'var(--color-terracotta)', marginBottom: '16px', letterSpacing: '-0.03em' }}>404</p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: 'var(--color-anthracite)', marginBottom: '12px' }}>Page introuvable</p>
        <p style={{ fontSize: '14px', color: 'var(--color-taupe)', lineHeight: 1.7, marginBottom: '32px' }}>
          La page que vous cherchez n'existe pas ou a été déplacée.
          <br />
          Retournez à l'accueil pour continuer votre exploration.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn-primary" style={{ padding: '12px 28px', textDecoration: 'none' }}>Retour à l'accueil</Link>
          <Link to="/search" className="btn-secondary" style={{ padding: '12px 28px', textDecoration: 'none' }}>Explorer les biens</Link>
        </div>
      </div>
    </div>
  );
}
