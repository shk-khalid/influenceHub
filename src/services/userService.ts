import api from './api';
import type { User } from '../components/types/auth';
import { store } from '../hooks/useReduxStore';
import { updateUserDetails } from '../context/slices/userSlice';

interface UserResponse {
  message: string;
  user: User;
}

interface InstagramStatsResponse {
  message: string;
  result: {
    insta_id: string | null;
    media_count: number;
  };
}

interface UserOverview {
  estimated_reach: number;
  estimated_impression: number;
  reach_ratio: number;
  engagement_score: number; 
}

interface PostData {
  post_number: number;
  like_count: number;
  comment_count: number;
}

interface UserOverviewResponse {
  overview: UserOverview;
  posts: PostData[];
}

export const userService = {
  // Update user profile (supports FormData)
  async updateUserProfile(data: Partial<User> | FormData): Promise<User | null> {
    try {
      let response;
      if (data instanceof FormData) {
        response = await api.patch<UserResponse>('auth/update-profile/', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else {
        response = await api.patch<UserResponse>('auth/update-profile/', data);
      }
      const { user } = response.data;
      // Update the user in sessionStorage with the response data
      sessionStorage.setItem("user", JSON.stringify(user));
      store.dispatch(updateUserDetails(user));
      return user;
    } catch (error) {
      console.error("Profile update failed:", error);
      return null;
    }
  },

  async fetchInstagramStats(socialLinks: { instagram: string }): Promise<InstagramStatsResponse> {
    try {
      const response = await api.post<InstagramStatsResponse>('auth/get-stats/', { socialLinks });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to fetch Instagram stats');
    }
  },

  async fetchInstaOverview(socialLinks: { instagram: string }): Promise<UserOverviewResponse> {
    try {
      const response = await api.get<UserOverviewResponse>('auth/user-overview/', {
        params: socialLinks
      });
      return response.data;
    } catch (error: any) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw new Error('Failed to fetch Instagram overview');
    }
  },

  // Helper function to format large numbers
  formatMetric: (value: number): string => {
    if (value >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    }
    return value.toFixed(1);
  },

  // Helper function to format percentages
  formatPercentage: (value: number): string => {
    return `${(value * 100).toFixed(1)}%`;
  }
};

