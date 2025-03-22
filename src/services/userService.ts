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
  }
};
