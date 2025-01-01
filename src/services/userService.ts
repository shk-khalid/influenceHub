import api from './api';
import type { User } from '../components/types/auth';

export const userService = {
  // Get user profile
  async getProfile(): Promise<User> {
    const response = await api.get('/auth/profile/');
    return response.data;
  },

  // Update user profile
  async updateProfile(data: Partial<User>) {
    const response = await api.patch('/auth/profile/', data);
    return response.data;
  },
};