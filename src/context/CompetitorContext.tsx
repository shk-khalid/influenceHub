import React, { createContext, useContext } from 'react';
import { Competitor } from '../components/types';
import { useCompetitorStore } from '../store/useCompetitor';

interface CompetitorContextType {
  competitors: Competitor[];
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  addCompetitor: (competitor: Omit<Competitor, 'id'>) => void;
  removeCompetitor: (id: string) => void;
  updateCompetitor: (id: string, data: Partial<Competitor>) => void;
  filteredCompetitors: () => Competitor[];
}

const CompetitorContext = createContext<CompetitorContextType | undefined>(undefined);

export function CompetitorProvider({ children }: { children: React.ReactNode }) {
  const store = useCompetitorStore();

  return (
    <CompetitorContext.Provider value={store}>
      {children}
    </CompetitorContext.Provider>
  );
}

export function useCompetitor() {
  const context = useContext(CompetitorContext);
  if (context === undefined) {
    throw new Error('useCompetitor must be used within a CompetitorProvider');
  }
  return context;
}