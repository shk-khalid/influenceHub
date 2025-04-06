import api from './api';
import { Brand } from '../components/types/brand';

interface BrandSuggestionResponse {
  user_profile_metrics: {
    followers: number;
    engagement_score: number;
    engagement_per_follower: number;
    estimated_reach: number;
    estimated_impression: number;
    reach_ratio: number;
    avg_likes_computed: number;
    avg_comments_computed: number;
  };
  suggested_count: number;
  suggested_brands: Brand[];
}

export const suggestionService = {
  getSuggestedBrands: async (): Promise<BrandSuggestionResponse> => {
    const response = await api.get('/suggestions/');
    return response.data;
  },

  respondToBrand: async (brandId: string, action: 'accept' | 'decline'): Promise<void> => {
    await api.post(`/suggestions/${brandId}/respond/`, { action });
  },

  getSuggestionHistory: async (): Promise<any[]> => {
    const response = await api.get('/suggestions/history/');
    return response.data;
  },
};