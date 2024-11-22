import { create } from 'zustand';
import { Trend } from '../components/types';

const mockTrends: Trend[] = [
  {
    id: '1',
    keyword: '#SustainableFashion',
    volume: 45000,
    growth: 23,
    category: 'Fashion',
    region: 'Global'
  },
  {
    id: '2',
    keyword: '#TechInnovation',
    volume: 82000,
    growth: 15,
    category: 'Tech',
    region: 'Global'
  },
  {
    id: '3',
    keyword: '#HealthyLiving',
    volume: 63000,
    growth: -5,
    category: 'Lifestyle',
    region: 'Global'
  },
  {
    id: '4',
    keyword: '#WorkFromHome',
    volume: 55000,
    growth: 18,
    category: 'Tech',
    region: 'Global'
  },
  {
    id: '5',
    keyword: '#PlantBased',
    volume: 38000,
    growth: 12,
    category: 'Food',
    region: 'Global'
  }
];

interface TrendStore {
  trends: Trend[];
  searchTerm: string;
  selectedCategory: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  filteredTrends: () => Trend[];
}

export const useTrendStore = create<TrendStore>((set, get) => ({
  trends: mockTrends,
  searchTerm: '',
  selectedCategory: 'all',
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  filteredTrends: () => {
    const state = get();
    return state.trends.filter((trend) => {
      const matchesSearch = trend.keyword.toLowerCase().includes(state.searchTerm.toLowerCase());
      const matchesCategory = state.selectedCategory === 'all' || trend.category === state.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  },
}));