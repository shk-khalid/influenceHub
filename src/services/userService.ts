import api from './api';
import type { User } from '../components/types/auth';
import { storageService } from './storageService';

export const userService = {
  // Update user profile
  async updateUserProfile(data: Partial<User>): Promise<User | null> {
    try {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) throw new Error("No authentication token found!");

      const response = await api.patch('auth/update-profile/', data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${authToken}`,
        },
      });

      const updatedUser = response.data;
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Profile update failed:", error);
      return null;
    }
  },

  // Upload profile picture
  async uploadProfilePicture(userId: string, file: File): Promise<User | null> {
    try {
      const imageUrl = await storageService.uploadProfilePicture(userId, file)

      const response = await api.patch('auth/update-profile/', { profilePicture: imageUrl}, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${localStorage.getItem('token')}`,
        },
      });

      const updatedUser = response.data;
      return updatedUser;
    } catch (error) {
      console.error("Profile picture updated failed: ", error);
      return null
    }
  }
 
}