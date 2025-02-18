import api from './api';
import type { User } from '../components/types/auth';

interface ProfilePictureUpdate {
  profilePicture: string;
}

interface UserResponse {
  message: string;
  user: User;
}

export const userService = {
  // Update user profile
  async updateUserProfile(data: Partial<User>): Promise<User | null> {
    try {
      const response = await api.patch<UserResponse>('auth/update-profile/', data);

      const { user } = response.data;
      // Update the user in localStorage with the response data
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Profile update failed:", error);
      return null;
    }
  },

  // Upload profile picture
  async uploadProfilePicture(data: ProfilePictureUpdate): Promise<User | null> {
    try {
      const response = await api.patch<UserResponse>('auth/update-profile/', data);

      const { user } = response.data;
      // Update the user in localStorage with the response data
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      console.error("Profile picture update failed: ", error);
      return null;
    }
  }
}