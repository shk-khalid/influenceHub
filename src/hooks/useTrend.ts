import { create } from 'zustand';
import { Trend, TrendCategory, SortOption, TrendState } from '../components/types/trend';
import { trendService } from '../services/trendService';
import toast from 'react-hot-toast';

interface TrendStore extends TrendState {
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: TrendCategory) => void;
  setSortBy: (sort: SortOption) => void;
  setPage: (page: number) => void;
  refresh: () => Promise<void>;
  fetchTrends: () => Promise<void>;
  filteredTrends: () => Trend[];
}

export const useTrendStore = create<TrendStore>((set, get) => ({
  trends: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'latest',

  setSearchTerm: (term) => {
    set({ searchTerm: term, page: 1 });
    get().fetchTrends();
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category, page: 1 });
    get().fetchTrends();
  },

  setSortBy: (sort) => {
    set({ sortBy: sort, page: 1 });
    get().fetchTrends();
  },

  setPage: (page) => {
    set({ page });
    get().fetchTrends();
  },

  fetchTrends: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true });
    try {
      const response = await trendService.getTrends({
        search: state.searchTerm,
        category: state.selectedCategory,
        page: state.page
      });

      set({
        trends: response.results,
        totalPages: Math.ceil(response.count / 10),
        isLoading: false
      });
    } catch (error) {
      console.error('Error fetching trends:', error);
      set({ isLoading: false });
    }
  },

  refresh: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true });
    try {
      await trendService.refreshTrends();
      await get().fetchTrends();
      toast.success('Trends successfully refreshed!');
    } catch (error) {
      console.error('Error refreshing trends:', error);
      toast.error('Failed to refresh trends. Please try again later.');
    } finally {
      set({ isLoading: false });
    }
  },

  filteredTrends: () => {
    const { trends, sortBy } = get();
    
    return [...trends].sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.growth - a.growth;
        case 'volume':
          return b.volume - a.volume;
        default: // 'latest'
          return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      }
    });
  },
}));