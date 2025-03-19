export type TrendCategory = 'all' | 'technology' | 'food' | 'fashion' | 'fitness' | 'travel' | 'gaming';

export interface Trend {
  id: number;
  name: string;
  volume: number;
  category: string;
  region: string;
  growth: number;
  sentiment: number;
  created_at: string;
  popularity: number;
  num_comments: number;
  image_url: string | null;
  subreddit: string;
}

export interface TrendState {
  trends: Trend[];
  page: number;
  totalPages: number;
  isLoading: boolean;
  searchTerm: string;
  selectedCategory: TrendCategory;
  sortBy: SortOption;
}

export type SortOption = 'latest' | 'growth' | 'volume';