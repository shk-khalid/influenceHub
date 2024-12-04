import React from 'react';
import { Camera, Upload } from 'lucide-react';

interface ProfilePictureProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEditing?: boolean;
}

export default function ProfilePicture({ image, onImageUpload }: ProfilePictureProps) {
  return (
    <div className="relative group">
      <div className={`w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg
        transition-transform duration-300 group-hover:scale-105
        ${!image ? 'bg-gray-100' : ''}`}>
        {image ? (
          <img src={image} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
        )}
      </div>
      <label className="absolute bottom-0 right-0 bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 rounded-full p-2 cursor-pointer
        transition-colors shadow-lg transform hover:scale-110">
        <Upload className="w-4 h-4 text-white" />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onImageUpload}
        />
      </label>
      <div className="absolute inset-0 rounded-full bg-black opacity-0 group-hover:opacity-10 transition-opacity" />
    </div>
  );
}