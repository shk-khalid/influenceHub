import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from './firebase';

export const storageService = {
  /**
   * Upload a profile picture to Firebase Storage
   * @param userId - The user's ID to use as the filename
   * @param file - The file to upload
   * @returns Promise<string> - The download URL of the uploaded file
   */
  async uploadProfilePicture(userId: string, file: File): Promise<string> {
    try {
      // Create a storage reference with a unique filename
      const timestamp = Date.now();
      const storageRef = ref(storage, `profile-pictures/${userId}_${timestamp}`);
      
      // Upload the file
      const snapshot = await uploadBytes(storageRef, file);
      
      // Get the download URL
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      throw new Error('Failed to upload profile picture');
    }
  },

  /**
   * Delete a profile picture from Firebase Storage
   * @param imageUrl - The full URL of the image to delete
   */
  async deleteProfilePicture(imageUrl: string): Promise<void> {
    try {
      // Get the storage reference from the URL
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting profile picture:', error);
      throw new Error('Failed to delete profile picture');
    }
  },

  /**
   * Replace an existing profile picture with a new one
   * @param userId - The user's ID
   * @param file - The new file to upload
   * @param oldImageUrl - The URL of the old image to delete
   * @returns Promise<string> - The download URL of the new image
   */
  async replaceProfilePicture(userId: string, file: File, oldImageUrl?: string): Promise<string> {
    try {
      // If there's an old image, delete it first
      if (oldImageUrl) {
        await this.deleteProfilePicture(oldImageUrl);
      }
      
      // Upload the new image
      return await this.uploadProfilePicture(userId, file);
    } catch (error) {
      console.error('Error replacing profile picture:', error);
      throw new Error('Failed to replace profile picture');
    }
  }
};