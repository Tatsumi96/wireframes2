import React, { useEffect, useState } from 'react';
import { MessageSquare, BarChart2, X } from 'lucide-react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ from: 'user' | 'bot'; text: string }[]>([]);
  const [text, setText] = useState('');
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : true);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);

    // Listen for global event to open chatbot with initial message
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent)?.detail || {};
      const initial = detail.initialUser;
      setOpen(true);
      if (initial) {
        setMessages(prev => [...prev, { from: 'user', text: initial }] );
        setTimeout(() => {
          setMessages(prev => [...prev, { from: 'bot', text: `Je peux aider à rechercher « ${initial} ». Voulez-vous lancer la recherche ?` }]);
        }, 700);
      }
    };
    window.addEventListener('open-chatbot', onOpen as EventListener);

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('open-chatbot', onOpen as EventListener);
    };
  }, []);

  const send = () => {
    if (!text.trim()) return;
    const msg = { from: 'user' as const, text: text.trim() };
    setMessages(prev => [...prev, msg]);
    setText('');
    // Simple canned reply for now
    setTimeout(() => {
      setMessages(prev => [...prev, { from: 'bot', text: `Je peux aider à rechercher « ${msg.text} ». Désirez-vous lancer la recherche ?` }]);
    }, 700);
  };
  const isDesktop = !isMobile;

  // Positions and sizes adjusted per viewport
  const buttonStyle = {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: 'var(--color-primary)',
    border: 'none',
    boxShadow: '0 8px 20px rgba(30,40,80,0.18)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
  } as React.CSSProperties;

  const containerPos = isDesktop
    ? { right: 24, bottom: 24, width: 420, height: 540 }
    : { right: 16, bottom: 156, width: 320, height: 420 };

  return (
    <div>
      {/* Floating button */}
      {isDesktop && (
        <div style={{ position: 'fixed', right: isDesktop ? 24 : 16, bottom: isDesktop ? 24 : 84, zIndex: 1200 }}>
          <button onClick={() => setOpen(v => !v)} aria-label="Chatbot" style={buttonStyle}>
            <MessageSquare size={20} />
          </button>
        </div>
      )}

      {open && (
        <div style={{ position: 'fixed', right: containerPos.right, bottom: containerPos.bottom, width: containerPos.width, maxWidth: 'calc(100% - 40px)', zIndex: 1200 }}>
          <div style={{ borderRadius: 12, overflow: 'hidden', boxShadow: '0 10px 30px rgba(8,20,40,0.2)', background: 'white', display: 'flex', flexDirection: 'column', height: containerPos.height }}>
            <div style={{ padding: '10px 12px', background: 'var(--color-primary)', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MessageSquare size={16} color="#fff" />
                <span>Assistant Lumière</span>
                <BarChart2 size={16} color="rgba(255,255,255,0.95)" style={{ transform: 'translateY(0)', animation: 'pulseChart 900ms ease-in-out infinite alternate' }} />
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ background: 'transparent', border: 'none', color: '#fff', padding: 6 }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ flex: 1, padding: 12, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {messages.length === 0 && <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>Demandez quelque chose ou lancez une recherche.</div>}
              {messages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{ padding: '8px 10px', borderRadius: 10, background: m.from === 'user' ? 'var(--color-primary)' : 'var(--color-surface-2)', color: m.from === 'user' ? '#fff' : 'var(--color-body)', fontSize: 14 }}>{m.text}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, padding: 10, borderTop: '1px solid var(--color-border-light)' }}>
              <input value={text} onChange={e => setText(e.target.value)} placeholder="Quelque chose..." style={{ flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid var(--color-border-light)' }} onKeyDown={(e) => { if (e.key === 'Enter') send(); }} />
              <button onClick={send} style={{ padding: '10px 12px', borderRadius: 8, background: 'var(--color-primary)', color: '#fff', border: 'none' }}>Envoyer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
