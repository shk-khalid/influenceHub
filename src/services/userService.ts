import api from './api';
import type { User } from '../components/types/auth';

export const userService = {
  // Get user profile
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/view-profile/');
    return response.data;
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<User> {
    const response = await api.patch('/auth/update-profile/', data);
    return response.data;
  },

  // Get user stats
  async getUserStats(): Promise<{
    followers: number;
    rating: number;
    campaignsCount: number;
    countriesCount: number;
  }> {
    const response = await api.get('/auth/stats/');
    return response.data;
  },

  // Upload profile picture
  async uploadProfilePicture(file: File): Promise<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post('/auth/profile/picture/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  }
};