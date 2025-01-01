import api from './api';
import { Trend, TrendCategory } from '../components/types/trend';

interface TrendResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Trend[];
}

interface TrendParams {
  search?: string;
  category?: TrendCategory;
  page?: number;
}

export const trendService = {
  async getTrends(params: TrendParams): Promise<TrendResponse> {
    const queryParams = new URLSearchParams();
    
    if (params.search) queryParams.append('search', params.search);
    if (params.category && params.category !== 'all') queryParams.append('category', params.category);
    if (params.page) queryParams.append('page', params.page.toString());
    
    const response = await api.get<TrendResponse>(`/trend/trending/?${queryParams}`);
    return response.data;
  },

  async refreshTrends(): Promise<void> {
    await api.get('/trend/trending/refresh/');
  }
};