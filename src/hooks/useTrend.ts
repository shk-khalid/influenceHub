import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import { Trend, TrendCategory, SortOption, TrendState } from '../components/types/trend';
import { trendService } from '../services/trendService';

interface TrendStore extends TrendState {
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: TrendCategory) => void;
  setSortBy: (sort: SortOption) => void;
  setPage: (page: number) => void;
  refresh: () => Promise<void>;
  fetchTrends: () => Promise<void>;
  silentRefresh: () => Promise<void>;   // <--- NEW
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

  // Regular fetch with toasts on error
  fetchTrends: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true });
    try {
      const response = await trendService.getTrends({
        search: state.searchTerm,
        category: state.selectedCategory,
        page: state.page,
      });

      set({
        trends: response.results,
        totalPages: Math.ceil(response.count / 10),
        isLoading: false,
      });
    } catch (error) {
      console.error('Error fetching trends:', error);
      toast.error('Failed to fetch trends');
      set({ isLoading: false });
    }
  },

  // Manual refresh with toasts
  refresh: async () => {
    const state = get();
    if (state.isLoading) return;

    try {
      toast.loading('Refreshing trends...');

      // First, trigger the refresh endpoint
      const refreshResponse = await trendService.refreshTrends();

      // Then fetch updated data
      const trendsResponse = await trendService.getTrends({
        search: state.searchTerm,
        category: state.selectedCategory,
        page: state.page,
      });

      set({
        trends: trendsResponse.results,
        totalPages: Math.ceil(trendsResponse.count / 10),
        isLoading: false,
      });

      toast.dismiss();
      toast.success(refreshResponse.message || 'Trends refreshed successfully');
    } catch (error) {
      console.error('Error refreshing trends:', error);
      toast.dismiss();
      toast.error('Failed to refresh trends');
      set({ isLoading: false });
    }
  },

  // NEW: Silent refresh, no toasts
  silentRefresh: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true });
    try {
      // 1) Call refresh endpoint
      await trendService.refreshTrends();

      // 2) Then fetch updated data
      const trendsResponse = await trendService.getTrends({
        search: state.searchTerm,
        category: state.selectedCategory,
        page: state.page,
      });

      set({
        trends: trendsResponse.results,
        totalPages: Math.ceil(trendsResponse.count / 10),
        isLoading: false,
      });
      console.log("sucess refreshing silently");
    } catch (error) {
      console.error('Silent refresh error:', error);
      set({ isLoading: false });
      // No toast calls here
    }
  },

  // Sort the in-memory data
  filteredTrends: () => {
    const { trends, sortBy } = get();

    return [...trends].sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.growth - a.growth;
        case 'volume':
          return b.volume - a.volume;
        default: // 'latest'
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  },
}));
