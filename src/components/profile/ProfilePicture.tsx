import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Camera } from 'lucide-react';
import { Card } from '../common/Card';
import { storageService } from '../../services/storageService';
import toast from 'react-hot-toast';
import { useAuth } from '../../hooks/useAuth';

interface ProfilePictureProps {
  imageUrl?: string;
  onImageUpload: (url: string) => Promise<void>;
  isEditing: boolean;
}

export default function ProfilePicture({ imageUrl, onImageUpload, isEditing }: ProfilePictureProps) {
  const { user } = useAuth();
  
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!user?.email) {
      toast.error('User not found');
      return;
    }

    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file');
        return;
      }

      try {
        const downloadURL = await storageService.uploadProfilePicture(user.email, file);
        await onImageUpload(downloadURL);
        toast.success('Profile picture updated successfully');
      } catch (error) {
        console.error('Failed to upload image:', error);
        toast.error('Failed to upload image. Please try again.');
      }
    }
  }, [user, onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1,
    disabled: !isEditing
  });

  return (
    <Card className="w-full max-w-sm mx-auto">
      <div
        {...getRootProps()}
        className={`relative group cursor-pointer ${!isEditing && 'cursor-default'}`}
      >
        <input {...getInputProps()} />
        <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <Camera className="w-12 h-12 text-gray-400 dark:text-gray-500" />
            </div>
          )}
          
          {isEditing && (
            <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-200
              ${isDragActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            >
              <div className="text-white text-center p-2">
                <Camera className="w-8 h-8 mx-auto mb-1" />
                <p className="text-sm">
                  {isDragActive ? 'Drop image here' : 'Click or drag to upload'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}