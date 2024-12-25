import { create } from 'zustand';
import { Trend, TrendCategory, SortOption, TrendState } from '../components/types';

const ITEMS_PER_PAGE = 5;

const mockTrends: Trend[] = [
  {
            "id": 10000050,
            "name": "Daily Simple Questions Thread - December 23, 2024",
            "volume": 9,
            "category": "fitness",
            "region": "Global",
            "growth": 12.5,
            "sentiment": 0.0,
            "last_updated": "2024-12-24T09:53:17.780329Z"
        },
        {
            "id": 10000015,
            "name": "December 20-22 Box Office Recap: 'Sonic the Hedgehog 3' tops 'Mufasa: The Lion King' in the domestic market. While 'Mufasa' leads overseas, its $122.2 million worldwide debut is very underwhelming. Meanwhile, 'Kraven' and 'War of the Rohirrim' collapsed 72% and 73%, respectively.",
            "volume": 15,
            "category": "entertainment",
            "region": "Global",
            "growth": 7.142857142857142,
            "sentiment": 0.06666666666666667,
            "last_updated": "2024-12-23T22:10:33.978751Z"
        },
        {
            "id": 10000033,
            "name": "LPT: Cold weather kills car batteries. Here are some tips for jump starting your vehicle this holiday season. ",
            "volume": 230,
            "category": "lifestyle",
            "region": "Global",
            "growth": -1.7699115044247788,
            "sentiment": -0.3,
            "last_updated": "2024-12-23T22:21:30.648175Z"
        },
        {
            "id": 10000013,
            "name": "outfit for a wedding with my boyfriend as his plus one. ",
            "volume": 495,
            "category": "fashion",
            "region": "Global",
            "growth": 1.642710472279261,
            "sentiment": 0.0,
            "last_updated": "2024-12-23T22:10:33.971774Z"
        },
        {
            "id": 10000003,
            "name": "PayPal Honey has been caught poaching affiliate revenue, and it often hides the best deals from users | Promoted by influencers, this popular browser extension has been a scam all along",
            "volume": 751,
            "category": "tech",
            "region": "Global",
            "growth": 0.9408602150537635,
            "sentiment": 0.8,
            "last_updated": "2024-12-23T22:10:33.939820Z"
        },
        {
            "id": 10000030,
            "name": "A Quick Reminder: We have a strictly NO POLITICS rule in this subreddit.",
            "volume": 1388,
            "category": "lifestyle",
            "region": "Global",
            "growth": 0.5797101449275363,
            "sentiment": 0.3333333333333333,
            "last_updated": "2024-12-24T08:49:48.818506Z"
        }
];

interface TrendStore extends TrendState {
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: TrendCategory) => void;
  setSortBy: (sort: SortOption) => void;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  filteredTrends: () => Trend[];
  sortBy: SortOption;
}

export const useTrendStore = create<TrendStore>((set, get) => ({
  trends: mockTrends,
  page: 1,
  hasMore: true,
  isLoading: false,
  searchTerm: '',
  selectedCategory: 'all',
  sortBy: 'latest',

  setSearchTerm: (term) => set({ searchTerm: term, page: 1 }),
  setSelectedCategory: (category) => set({ selectedCategory: category, page: 1 }),
  setSortBy: (sort) => set({ sortBy: sort, page: 1 }),

  refresh: async () => {
    const state = get();
    if (state.isLoading) return;

    set({ isLoading: true });
    try {
      // Simulate API refresh - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate new data - replace with actual API response
      const newTrends = mockTrends.map(trend => ({
        ...trend,
        growth: trend.growth + (Math.random() * 2 - 1), // Random growth change
        volume: trend.volume + Math.floor(Math.random() * 10), // Random volume change
        last_updated: new Date().toISOString()
      }));

      set({ 
        trends: newTrends,
        isLoading: false,
        page: 1,
        hasMore: true
      });
    } catch (error) {
      console.error('Error refreshing trends:', error);
      set({ isLoading: false });
    }
  },

  loadMore: async () => {
    const { page, isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const hasMore = page < 3;
      set(state => ({
        page: state.page + 1,
        hasMore,
        isLoading: false
      }));
    } catch (error) {
      console.error('Error loading more trends:', error);
      set({ isLoading: false });
    }
  },

  filteredTrends: () => {
    const { trends, searchTerm, selectedCategory, sortBy, page } = get();
    let filtered = trends.filter((trend) => {
      const matchesSearch = trend.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || trend.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort trends
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'growth':
          return b.growth - a.growth;
        case 'volume':
          return b.volume - a.volume;
        default: // 'latest'
          return new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime();
      }
    });

    return filtered.slice(0, page * ITEMS_PER_PAGE);
  },
}));