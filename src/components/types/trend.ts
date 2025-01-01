export interface Trend {
    id: number;
    name: string;
    volume: number;
    category: string;
    region: string;
    growth: number;
    sentiment: number;
    last_updated: string;
  }
  
  export type TrendCategory = 'all' | 'tech' | 'fashion' | 'fitness' | 'travel' | 'food' | 'gaming';
  export type SortOption = 'latest' | 'growth' | 'volume';
  
  export interface TrendState {
    trends: Trend[];
    page: number;
    hasMore: boolean;
    isLoading: boolean;
    searchTerm: string;
    selectedCategory: TrendCategory;
    sortBy: SortOption;
  }