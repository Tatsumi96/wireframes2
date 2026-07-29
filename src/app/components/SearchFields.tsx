import React, { useState, useRef, useEffect, useCallback } from 'react';
import { PROPERTY_IMAGES } from '../data/images';

const DESTINATIONS = Array.from(
  new Set(
    PROPERTY_IMAGES.map(p => {
      const loc = p.location.split(' · ')[0];
      return { label: loc, type: p.location.split(' · ')[1] || '' };
    })
  )
).map(d => d);

export const DestinationSelect: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}> = ({ value, onChange, placeholder = 'Ville, région…' }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState(value);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = DESTINATIONS.filter(d =>
    d.label.toLowerCase().includes(input.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => { setInput(value); }, [value]);

  return (
    <div className="field-group" ref={ref} style={{ position: 'relative' }}>
      <label className="field-label">Destination</label>
      <input
        className="field-input"
        placeholder={placeholder}
        value={input}
        onChange={e => { setInput(e.target.value); onChange(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && filtered.length > 0 && input.length > 0 && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          background: 'var(--color-surface)',
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)',
          marginTop: '4px', maxHeight: '200px', overflowY: 'auto',
        }}>
          {filtered.map(d => (
            <button
              key={d.label}
              type="button"
              onClick={() => { setInput(d.label); onChange(d.label); setOpen(false); }}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '10px 14px',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-dark)',
              }}
              onMouseOver={e => (e.currentTarget.style.background = 'var(--color-surface-2)')}
              onMouseOut={e => (e.currentTarget.style.background = 'none')}
            >
              {d.label}
              {d.type && <span style={{ color: 'var(--color-muted)', marginLeft: '8px', fontSize: '12px' }}>{d.type}</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const DatePicker: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
}> = ({ label, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();

  const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];

  const formatDate = (d: Date) => {
    return `${String(d.getDate()).padStart(2, '0')} / ${String(d.getMonth() + 1).padStart(2, '0')} / ${d.getFullYear()}`;
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selectDate = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(formatDate(d));
    setOpen(false);
  };

  const displayValue = value || '';

  return (
    <div className="field-group" ref={ref} style={{ position: 'relative' }}>
      <label className="field-label">{label}</label>
      <input
        ref={inputRef}
        className="field-input"
        placeholder="jj / mm / aaaa"
        value={displayValue}
        readOnly
        onFocus={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, zIndex: 200,
          background: 'var(--color-surface)',
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)', padding: '12px',
          marginTop: '4px', width: '280px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <button type="button" onClick={() => { if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', color: 'var(--color-primary)', fontSize: '16px' }}>‹</button>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)' }}>
              {months[viewMonth]} {viewYear}
            </span>
            <button type="button" onClick={() => { if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1); }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px', color: 'var(--color-primary)', fontSize: '16px' }}>›</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
            {['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'].map(d => (
              <span key={d} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-muted)', padding: '4px 0' }}>{d}</span>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const d = new Date(viewYear, viewMonth, day);
              const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
              const isSelected = value === formatDate(d);
              return (
                <button
                  key={day}
                  type="button"
                  disabled={isPast}
                  onClick={() => selectDate(day)}
                  style={{
                    background: isSelected ? 'var(--color-primary)' : 'none',
                    color: isSelected ? '#fff' : isPast ? 'var(--color-muted)' : 'var(--color-dark)',
                    border: 'none', borderRadius: 'var(--radius-sm)',
                    cursor: isPast ? 'default' : 'pointer',
                    padding: '6px 0', fontSize: '13px', fontFamily: 'var(--font-body)',
                  }}
                  onMouseOver={e => { if (!isSelected && !isPast) e.currentTarget.style.background = 'var(--color-surface-2)'; }}
                  onMouseOut={e => { if (!isSelected) e.currentTarget.style.background = 'none'; }}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const CounterRow: React.FC<{
  label: string;
  subtitle?: string;
  val: number;
  setter: (v: number) => void;
  min?: number;
  max?: number;
}> = ({ label, subtitle, val, setter, min = 0, max = 9 }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
    <div>
      <span style={{ fontSize: '14px', color: 'var(--color-dark)', fontFamily: 'var(--font-body)', display: 'block' }}>{label}</span>
      {subtitle && <span style={{ fontSize: '12px', color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}>{subtitle}</span>}
    </div>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button type="button" onClick={() => setter(Math.max(min, val - 1))}
        style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'var(--border-width) solid var(--color-border)', background: 'none', cursor: 'pointer', color: val === min ? 'var(--color-muted)' : 'var(--color-dark)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        disabled={val === min}>−</button>
      <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-dark)', minWidth: '20px', textAlign: 'center', fontFamily: 'var(--font-body)' }}>{val}</span>
      <button type="button" onClick={() => setter(Math.min(max, val + 1))}
        style={{ width: '32px', height: '32px', borderRadius: '50%', border: 'var(--border-width) solid var(--color-primary)', background: 'none', cursor: 'pointer', color: 'var(--color-primary)', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
    </div>
  </div>
);

export const GuestsInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [babies, setBabies] = useState(0);
  const [pets, setPets] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const parts: string[] = [];
  if (adults > 0) parts.push(`${adults} adulte${adults > 1 ? 's' : ''}`);
  if (children > 0) parts.push(`${children} enfant${children > 1 ? 's' : ''}`);
  if (babies > 0) parts.push(`${babies} bébé${babies > 1 ? 's' : ''}`);
  if (pets > 0) parts.push(`${pets} animal${pets > 1 ? 'x' : ''}`);
  const display = parts.length > 0 ? parts.join(', ') : '';

  useEffect(() => {
    onChange(display);
  }, [adults, children, babies, pets]);

  return (
    <div className="field-group" ref={ref} style={{ position: 'relative' }}>
      <label className="field-label">Voyageurs</label>
      <input
        className="field-input"
        placeholder="Ajouter des voyageurs"
        value={display}
        readOnly
        onFocus={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />
      {open && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 200,
          background: 'var(--color-surface)',
          border: 'var(--border-width) solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-md)', padding: '16px',
          marginTop: '4px',
          minWidth: '260px',
        }}>
          <CounterRow label="Adultes" val={adults} setter={setAdults} min={1} />
          <CounterRow label="Enfants" subtitle="De 2 à 17 ans" val={children} setter={setChildren} />
          <CounterRow label="Bébés" subtitle="Moins de 2 ans" val={babies} setter={setBabies} />
          <CounterRow label="Animaux" val={pets} setter={setPets} />
          <button type="button" onClick={() => setOpen(false)}
            style={{ width: '100%', padding: '8px', marginTop: '4px', background: 'var(--color-primary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-btn)', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600 }}>
            Appliquer
          </button>
        </div>
      )}
    </div>
  );
};
