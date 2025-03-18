import api from './api';
import type { User } from '../components/types/auth';

interface UserResponse {
  message: string;
  user: User;
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
      // Update the user in localStorage with the response data
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Profile update failed:", error);
      return null;
    }
  },
};