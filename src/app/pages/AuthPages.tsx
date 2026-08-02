import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { ImgPlaceholder } from '../components/Layout';
import { AUTH_HERO_IMAGE } from '../data/images';

// ─── Shared pieces ─────────────────────────────────────────────────────────────

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const AppleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const AuthVisual: React.FC = () => (
  <div className="auth-visual">
    <ImgPlaceholder src={AUTH_HERO_IMAGE} alt="Villa d'exception au crépuscule" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10, 16, 32, 0.78) 0%, rgba(10, 16, 32, 0.25) 45%, rgba(10, 16, 32, 0.35) 100%)' }} />
    <div style={{ position: 'relative', zIndex: 1, padding: '48px', color: '#fff', width: '100%' }}>
      <span style={{
        display: 'inline-flex', alignItems: 'center', gap: '8px',
        fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: 700, letterSpacing: '0.14em',
        textTransform: 'uppercase', color: 'rgba(255,255,255,0.85)',
        background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 'var(--radius-badge)', padding: '8px 16px', backdropFilter: 'blur(8px)',
        marginBottom: '20px',
      }}>
        <Sparkles size={14} /> Sélection exclusive
      </span>
      <h1 style={{ color: '#fff', fontSize: 'clamp(30px, 3.6vw, 46px)', lineHeight: 1.12, letterSpacing: '-0.02em', marginBottom: '16px' }}>
        Des séjours d'exception commencent ici.
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.7, maxWidth: '420px' }}>
        Plus de 1 200 propriétés vérifiées dans les plus belles régions de France, et une équipe dédiée à chaque réservation.
      </p>
    </div>
  </div>
);

const AuthLogo: React.FC = () => (
  <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', marginBottom: '36px' }}>
    <img
      src="/assets/logo.png"
      alt="Destino Logo"
      style={{
        height: '46px', width: 'auto', objectFit: 'contain',
        filter: 'drop-shadow(0 4px 12px rgba(26, 54, 93, 0.18))',
      }}
    />
  </Link>
);

const SocialButtons: React.FC = () => (
  <>
    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '24px 0' }}>
      <div style={{ flex: 1, height: 1, background: 'var(--color-border-light)' }} />
      <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontWeight: 500, whiteSpace: 'nowrap' }}>ou continuer avec</span>
      <div style={{ flex: 1, height: 1, background: 'var(--color-border-light)' }} />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      <button type="button" className="btn-secondary" style={{ padding: '11px 16px', fontSize: '14px', gap: '10px' }}>
        <GoogleIcon /> Google
      </button>
      <button type="button" className="btn-secondary" style={{ padding: '11px 16px', fontSize: '14px', gap: '10px' }}>
        <AppleIcon /> Apple
      </button>
    </div>
  </>
);

const TrustLine: React.FC = () => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '18px', marginTop: '32px', flexWrap: 'wrap' }}>
    {['Paiement sécurisé', 'Support 7j/7', 'Annulation flexible'].map(t => (
      <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--color-muted)', fontWeight: 500 }}>
        <CheckCircle size={14} style={{ color: 'var(--color-primary)', flexShrink: 0 }} /> {t}
      </span>
    ))}
  </div>
);

// ─── Login ─────────────────────────────────────────────────────────────────────

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Veuillez renseigner votre email et votre mot de passe.');
      return;
    }
    setError('');
    navigate('/client');
  };

  return (
    <div className="auth-shell fade-in">
      <AuthVisual />

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <AuthLogo />
          <h2 style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', marginBottom: '8px' }}>Bon retour parmi nous</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '32px' }}>
            Connectez-vous pour retrouver vos réservations et vos favoris.
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div className="field-group">
              <label className="field-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  placeholder="jean.dupont@exemple.fr"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', height: '48px' }}
                />
              </div>
            </div>

            <div className="field-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label className="field-label" style={{ marginBottom: 0 }}>Mot de passe</label>
                <a href="#" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary)' }}>Mot de passe oublié ?</a>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', paddingRight: '44px', height: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  style={{
                    position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)',
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '14px', color: 'var(--color-body)' }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer' }}
              />
              Se souvenir de moi
            </label>

            {error && (
              <p style={{
                fontSize: '13px', color: '#B91C1C', background: 'rgba(185, 28, 28, 0.06)',
                border: '1px solid rgba(185, 28, 28, 0.2)', borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
              }}>{error}</p>
            )}

            <button type="submit" className="btn-primary" style={{ padding: '14px', minHeight: '48px', fontSize: '15px', width: '100%' }}>
              Se connecter
            </button>
          </form>

          <SocialButtons />

          <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-body)', marginTop: '28px' }}>
            Nouveau chez Destino ?{' '}
            <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Créer un compte</Link>
          </p>

          <TrustLine />
        </div>
      </div>
    </div>
  );
}

// ─── Register ──────────────────────────────────────────────────────────────────

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }
    if (!accepted) {
      setError('Veuillez accepter les conditions générales.');
      return;
    }
    setError('');
    navigate('/client');
  };

  return (
    <div className="auth-shell fade-in">
      <AuthVisual />

      <div className="auth-form-wrap">
        <div className="auth-form-card">
          <AuthLogo />
          <h2 style={{ fontSize: 'clamp(24px, 2.6vw, 32px)', marginBottom: '8px' }}>Rejoignez Destino</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-muted)', marginBottom: '32px' }}>
            Créez votre compte en moins d'une minute.
          </p>

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="field-group">
              <label className="field-label">Nom complet</label>
              <div style={{ position: 'relative' }}>
                <User size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type="text"
                  placeholder="Jean Dupont"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', height: '48px' }}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type="email"
                  placeholder="jean.dupont@exemple.fr"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', height: '48px' }}
                />
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Mot de passe</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="8 caractères minimum"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', paddingRight: '44px', height: '48px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                  style={{
                    position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)',
                    width: 36, height: 36, borderRadius: 'var(--radius-md)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Confirmer le mot de passe</label>
              <div style={{ position: 'relative' }}>
                <ShieldCheck size={17} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-muted)', pointerEvents: 'none' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  className="field-input"
                  style={{ paddingLeft: '42px', height: '48px' }}
                />
              </div>
            </div>

            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', fontSize: '13px', color: 'var(--color-body)', lineHeight: 1.5 }}>
              <input
                type="checkbox"
                checked={accepted}
                onChange={e => setAccepted(e.target.checked)}
                style={{ width: 16, height: 16, accentColor: 'var(--color-primary)', cursor: 'pointer', marginTop: 2, flexShrink: 0 }}
              />
              <span>J'accepte les <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>conditions générales</a> et la <a href="#" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>politique de confidentialité</a>.</span>
            </label>

            {error && (
              <p style={{
                fontSize: '13px', color: '#B91C1C', background: 'rgba(185, 28, 28, 0.06)',
                border: '1px solid rgba(185, 28, 28, 0.2)', borderRadius: 'var(--radius-md)',
                padding: '10px 14px',
              }}>{error}</p>
            )}

            <button type="submit" className="btn-primary" style={{ padding: '14px', minHeight: '48px', fontSize: '15px', width: '100%' }}>
              Créer mon compte
            </button>
          </form>

          <SocialButtons />

          <p style={{ textAlign: 'center', fontSize: '14px', color: 'var(--color-body)', marginTop: '28px' }}>
            Déjà membre ?{' '}
            <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Se connecter</Link>
          </p>

          <TrustLine />
        </div>
      </div>
    </div>
  );
}
