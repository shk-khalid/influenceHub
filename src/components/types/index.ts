// Dashboard

export interface DemographicData {
  age: { label: string; value: number }[];
  gender: { label: string; value: number }[];
  location: { country: string; users: number }[];
}

export interface EngagementMetric {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}

export interface CampaignMetrics {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

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
}
