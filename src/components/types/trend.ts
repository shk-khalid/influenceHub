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

export type TrendCategory = 'all' | 'technology' | 'food' | 'fashion' | 'fitness' | 'travel' | 'gaming';
export type SortOption = 'latest' | 'growth' | 'volume';

export interface TrendState {
  trends: Trend[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  searchTerm: string;
  selectedCategory: TrendCategory;
  sortBy: SortOption;
}