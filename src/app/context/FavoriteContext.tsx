import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface FavoriteContextType {
  favorites: string[];
  toggle: (id: string) => void;
  isFavorite: (id: string) => boolean;
  count: number;
}

const FavoriteContext = createContext<FavoriteContextType | null>(null);

export const FavoriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('destino-favorites');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('destino-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggle = useCallback((id: string) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return (
    <FavoriteContext.Provider value={{ favorites, toggle, isFavorite, count: favorites.length }}>
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = (): FavoriteContextType => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoriteProvider');
  return ctx;
};
