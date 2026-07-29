import React, { createContext, useContext, useState, useCallback } from 'react';

interface SearchState {
  destination: string;
  arrivee: string;
  depart: string;
  guests: string;
  setDestination: (v: string) => void;
  setArrivee: (v: string) => void;
  setDepart: (v: string) => void;
  setGuests: (v: string) => void;
  reset: () => void;
}

const SearchContext = createContext<SearchState | null>(null);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [destination, setDestination] = useState('');
  const [arrivee, setArrivee] = useState('');
  const [depart, setDepart] = useState('');
  const [guests, setGuests] = useState('');

  const reset = useCallback(() => {
    setDestination('');
    setArrivee('');
    setDepart('');
    setGuests('');
  }, []);

  return (
    <SearchContext.Provider value={{ destination, arrivee, depart, guests, setDestination, setArrivee, setDepart, setGuests, reset }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchState => {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error('useSearch must be used within SearchProvider');
  return ctx;
};
