import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MessageSquare, BarChart2, X, SendHorizonal, Sparkles, ChevronRight } from 'lucide-react';
import { PROPERTY_IMAGES } from '../data/images';

interface Message {
  from: 'user' | 'bot';
  text: string;
  time: string;
  cards?: { title: string; price: string; location: string; specs: string; rating: string; id: string }[];
}

const now = () => new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

const greetings = [
  'Bonjour ! Je suis l\'assistant Destino. Je peux vous aider à trouver la location idéale, découvrir nos destinations ou répondre à vos questions. ☀️',
];
const fallbackReplies = [
  'Je n\'ai pas encore la réponse, mais je peux transférer votre demande à un conseiller Destino.',
  'Bonne question ! Je transmets cela à notre équipe qui vous répondra rapidement.',
  'Je ne peux pas répondre précisément pour le moment. Souhaitez-vous que je vous mette en relation avec un conseiller ?',
];
const fallback = () => fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];

const quickChips = ['📍 Où aller ?', '🏠 Les plus luxueux', '💰 Budget 300-500 €', '❓ Aide', '🏖️ Près de la mer', '🔥 Coup de cœur'];

const chipIcons: Record<string, string> = {
  '📍 Où aller ?': '📍',
  '🏠 Les plus luxueux': '🏠',
  '💰 Budget 300-500 €': '💰',
  '❓ Aide': '❓',
  '🏖️ Près de la mer': '🏖️',
  '🔥 Coup de cœur': '🔥',
};

function extractKeywords(text: string): string[] {
  const lower = text.toLowerCase();
  const words = lower.split(/[\s,;:!?]+/);
  return [...new Set(words.filter(w => w.length > 2))];
}

function matchProperties(text: string) {
  const lower = text.toLowerCase();
  const destinations = [...new Set(PROPERTY_IMAGES.map(p => p.location.split(' · ')[0].toLowerCase()))];
  const matchedDest = destinations.find(d => lower.includes(d));
  const results = PROPERTY_IMAGES.filter(p => {
    const loc = p.location.toLowerCase();
    const title = p.title.toLowerCase();
    const specs = p.specs.toLowerCase();
    const matchLoc = matchedDest ? loc.includes(matchedDest) : false;
    const matchWord = extractKeywords(text).some(kw => loc.includes(kw) || title.includes(kw) || specs.includes(kw));
    return matchLoc || matchWord;
  });
  return results.slice(0, 3);
}

function buildResponse(input: string): { text: string; cards?: Message['cards'] } {
  const lower = input.toLowerCase();

  // Greetings
  if (/^(bonjour|salut|coucou|hello|hi|hey)/i.test(input.trim())) {
    return { text: 'Bonjour à vous ! ☀️ Comment puis-je vous aider dans votre recherche de location ?' };
  }

  // Help
  if (/aide|comment|fonctionne|besoin/i.test(lower)) {
    return {
      text: 'Voici ce que je peux faire pour vous :\n\n🔍 **Rechercher** une location par destination ou mot-clé\n💡 **Suggérer** nos biens les plus populaires\n💰 **Filtrer** par budget\n🏖️ **Trouver** des locations près de la mer\n📞 **Transmettre** votre demande à un conseiller\n\nDites-moi ce dont vous avez besoin !',
    };
  }

  // Luxury
  if (/luxe|luxueux|premium|prestig|exclusif|haut de gamme/i.test(lower)) {
    const luxury = PROPERTY_IMAGES.filter(p => parseInt(p.price) >= 400).slice(0, 3);
    return {
      text: 'Voici nos plus belles demeures d\'exception :',
      cards: luxury.map(p => ({ title: p.title, price: p.price, location: p.location, specs: p.specs, rating: p.rating, id: p.id })),
    };
  }

  // Budget filter
  const budgetMatch = lower.match(/(\d+)\s*[-àà]\s*(\d+)/);
  if (budgetMatch || /budget|pas cher|prix|moins de|max/i.test(lower)) {
    const min = budgetMatch ? parseInt(budgetMatch[1]) : 0;
    const max = budgetMatch ? parseInt(budgetMatch[2]) : 1000;
    const filtered = PROPERTY_IMAGES.filter(p => {
      const price = parseInt(p.price.replace(/\s/g, ''));
      return price >= min && price <= max;
    }).slice(0, 3);
    if (filtered.length > 0) {
      return {
        text: `Voici les biens entre ${min}€ et ${max}€ :`,
        cards: filtered.map(p => ({ title: p.title, price: p.price, location: p.location, specs: p.specs, rating: p.rating, id: p.id })),
      };
    }
    return { text: `Je n'ai pas trouvé de biens dans cette fourchette de prix. Essayez d'élargir votre budget.` };
  }

  // Sea / beach
  if (/mer|plage|bord de mer|littoral|côte|océan/i.test(lower)) {
    const sea = PROPERTY_IMAGES.filter(p => /mer|plage|port|vue mer|côte/i.test(p.title + ' ' + p.location)).slice(0, 3);
    if (sea.length > 0) {
      return {
        text: 'Voici nos biens près de la mer :',
        cards: sea.map(p => ({ title: p.title, price: p.price, location: p.location, specs: p.specs, rating: p.rating, id: p.id })),
      };
    }
    return { text: 'Je n\'ai pas trouvé de bien spécifique près de la mer. Essayez une autre destination.' };
  }

  // Popular / best
  if (/populaire|meilleur|coup de cœur|top|favori|mieux noté/i.test(lower)) {
    const top = [...PROPERTY_IMAGES].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating)).slice(0, 3);
    return {
      text: 'Voici nos biens les mieux notés :',
      cards: top.map(p => ({ title: p.title, price: p.price, location: p.location, specs: p.specs, rating: p.rating, id: p.id })),
    };
  }

  // Contact / call
  if (/conseiller|appel|téléphone|contact|parler|humain/i.test(lower)) {
    return { text: 'Je vous mets en relation avec un conseiller Destino. Il vous répondra sous peu. Vous pouvez aussi nous joindre au **+33 4 90 00 00 00** (lun-ven 9h-19h).' };
  }

  // Property match
  const matched = matchProperties(input);
  if (matched.length > 0) {
    const dest = matched[0].location.split(' · ')[0];
    return {
      text: `J'ai trouvé ${matched.length} bien${matched.length > 1 ? 's' : ''} à ${dest || 'nos destinations'} qui pourrait vous intéresser :`,
      cards: matched.map(p => ({ title: p.title, price: p.price, location: p.location, specs: p.specs, rating: p.rating, id: p.id })),
    };
  }

  return { text: fallback() };
}

const typingDuration = 800;

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const [isMobile, setIsMobile] = useState<boolean>(typeof window !== 'undefined' ? window.innerWidth <= 768 : true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent)?.detail || {};
      const initial = detail.initialUser;
      setOpen(true);
      if (messages.length === 0) {
        setMessages([{ from: 'bot', text: greetings[0], time: now() }]);
      }
      if (initial) {
        handleUserMessage(initial);
      }
    };
    window.addEventListener('open-chatbot', onOpen as EventListener);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('open-chatbot', onOpen as EventListener);
    };
  }, []);

  const handleUserMessage = (input: string) => {
    const userMsg: Message = { from: 'user', text: input, time: now() };
    setMessages(prev => [...prev, userMsg]);
    setShowChips(false);
    setTyping(true);
    scrollToBottom();

    setTimeout(() => {
      const response = buildResponse(input);
      setTyping(false);
      if (response.text) {
        setMessages(prev => [...prev, { from: 'bot', text: response.text, time: now(), cards: response.cards }]);
      }
      scrollToBottom();
    }, typingDuration + Math.random() * 400);
  };

  useEffect(() => {
    if (open && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ from: 'bot', text: greetings[0], time: now() }]);
        setShowChips(true);
      }, 400);
    }
  }, [open]);

  useEffect(scrollToBottom, [messages, typing]);

  const send = () => {
    if (!text.trim()) return;
    handleUserMessage(text.trim());
    setText('');
  };

  const handleChip = (chip: string) => {
    handleUserMessage(chip.replace(/^[^\s]+\s/, ''));
  };

  const isDesktop = !isMobile;

  const buttonStyle: React.CSSProperties = {
    width: 56,
    height: 56,
    borderRadius: 28,
    background: 'var(--color-primary)',
    border: 'none',
    boxShadow: '0 8px 20px rgba(30,40,80,0.18)',
    color: '#fff',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const containerPos = isDesktop
    ? { right: 24, bottom: 24, width: 420, height: 580 }
    : { right: 16, bottom: 156, width: 320, height: 460 };

  return (
    <div>
      {isDesktop && (
        <div style={{ position: 'fixed', right: isDesktop ? 24 : 16, bottom: isDesktop ? 24 : 84, zIndex: 1200 }}>
          <button onClick={() => setOpen(v => !v)} aria-label="Chatbot" style={buttonStyle}>
            {open ? <X size={20} /> : <MessageSquare size={20} />}
          </button>
        </div>
      )}

      {open && (
        <div style={{ position: 'fixed', right: containerPos.right, bottom: containerPos.bottom, width: containerPos.width, maxWidth: 'calc(100% - 32px)', zIndex: 1200, fontFamily: 'var(--font-body)' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: '0 12px 40px rgba(8,20,40,0.22)', background: '#fff', display: 'flex', flexDirection: 'column', height: containerPos.height, animation: 'fadeIn 0.2s ease' }}>
            {/* Header */}
            <div style={{ padding: '14px 16px', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={16} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>Assistant Destino</div>
                  <div style={{ fontSize: 11, opacity: 0.8, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', display: 'inline-block' }} />
                    En ligne
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Fermer" style={{ background: 'transparent', border: 'none', color: '#fff', padding: 6, cursor: 'pointer', borderRadius: 6, display: 'flex' }}>
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: '12px 12px 0', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8, background: '#f8f9fc' }}>
              {messages.map((m, idx) => (
                <div key={idx} style={{ alignSelf: m.from === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', animation: `fadeIn 0.2s ease` }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: m.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: m.from === 'user' ? 'var(--color-primary)' : '#fff',
                    color: m.from === 'user' ? '#fff' : 'var(--color-dark)',
                    fontSize: 14,
                    lineHeight: 1.5,
                    boxShadow: m.from === 'user' ? '0 2px 8px rgba(0,0,0,0.08)' : '0 1px 4px rgba(0,0,0,0.06)',
                    whiteSpace: 'pre-wrap',
                  }}>
                    {m.text}
                  </div>
                  {/* Cards */}
                  {m.cards && m.cards.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 6 }}>
                      {m.cards.map((card, ci) => (
                        <div key={ci} style={{ background: '#fff', borderRadius: 12, padding: '10px 12px', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid #eee' }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--color-dark)', marginBottom: 2 }}>{card.title}</div>
                          <div style={{ fontSize: 12, color: 'var(--color-muted)', marginBottom: 2 }}>{card.location} · {card.specs}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-primary)' }}>{card.price}<span style={{ fontWeight: 400, fontSize: 11, color: 'var(--color-muted)' }}> / nuit</span></span>
                            <span style={{ fontSize: 12, color: '#f59e0b' }}>★ {card.rating}</span>
                          </div>
                          <a href={`/property/${card.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: 'var(--color-primary)', marginTop: 6, textDecoration: 'none' }}>
                            Voir le bien <ChevronRight size={12} />
                          </a>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize: 10, color: 'var(--color-muted)', marginTop: 2, paddingLeft: m.from === 'user' ? 0 : 4, textAlign: m.from === 'user' ? 'right' : 'left' }}>{m.time}</div>
                </div>
              ))}

              {/* Typing indicator */}
              {typing && (
                <div style={{ alignSelf: 'flex-start', animation: 'fadeIn 0.2s ease' }}>
                  <div style={{ padding: '12px 18px', borderRadius: '16px 16px 16px 4px', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', display: 'flex', gap: 4, alignItems: 'center' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-muted)', animation: 'typingDot 1.2s ease-in-out infinite' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-muted)', animation: 'typingDot 1.2s ease-in-out 0.2s infinite' }} />
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-muted)', animation: 'typingDot 1.2s ease-in-out 0.4s infinite' }} />
                  </div>
                </div>
              )}

              {/* Quick chips */}
              {showChips && !typing && messages.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 4, marginBottom: 4, animation: 'fadeIn 0.3s ease' }}>
                  {quickChips.map(chip => (
                    <button key={chip} onClick={() => handleChip(chip)} style={{
                      padding: '6px 14px',
                      borderRadius: 20,
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      cursor: 'pointer',
                      fontSize: 12,
                      color: 'var(--color-dark)',
                      fontFamily: 'var(--font-body)',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.15s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    }}
                    onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.background = 'var(--color-surface-2)'; }}
                    onMouseOut={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.background = '#fff'; }}>
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div style={{ display: 'flex', gap: 8, padding: '10px 12px', borderTop: '1px solid #eee', background: '#fff' }}>
              <input
                ref={inputRef}
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Écrivez votre message…"
                style={{ flex: 1, padding: '10px 14px', borderRadius: 24, border: '1px solid #ddd', fontSize: 14, outline: 'none', fontFamily: 'var(--font-body)' }}
                onKeyDown={e => { if (e.key === 'Enter') send(); }}
                onFocus={() => setShowChips(false)}
              />
              <button onClick={send} disabled={!text.trim()} style={{
                padding: '10px 14px',
                borderRadius: '50%',
                background: text.trim() ? 'var(--color-primary)' : '#ccc',
                color: '#fff',
                border: 'none',
                cursor: text.trim() ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background 0.15s',
              }}>
                <SendHorizonal size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
