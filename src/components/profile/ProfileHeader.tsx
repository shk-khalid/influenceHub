import { MapPin, Link as LinkIcon, Shield, Camera, Edit2 } from 'lucide-react';
import { Button } from '../common/Button';

interface ProfileHeaderProps {
  user: {
    name: string;
    avatar: string;
    coverImage: string;
    location: string;
    bio: string;
    isVerified: boolean;
    followers: number;
    type: 'influencer' | 'brand';
  };
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="relative mb-6">
      {/* Cover Image */}
      <div className="h-48 md:h-64 rounded-xl overflow-hidden">
        <img
          src={user.coverImage || "https://images.unsplash.com/photo-1579546929518-9e396f3cc809"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <Button
          className="absolute top-4 right-4"
          variant="secondary"
          icon={Camera}
        >
          Change Cover
        </Button>
      </div>

      {/* Profile Info */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="sm:flex sm:items-end sm:space-x-5">
          <div className="relative group">
            <div className="w-24 h-24 rounded-xl ring-4 ring-white dark:ring-gray-900 overflow-hidden">
              <img
                src={user.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white truncate">
                  {user.name}
                </h1>
                {user.isVerified && (
                  <Shield className="ml-2 w-5 h-5 text-blue-500" />
                )}
              </div>
              <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="w-4 h-4 mr-1" />
                {user.location}
                <span className="mx-2">•</span>
                <span>{user.type === 'influencer' ? '🎯 Influencer' : '🏢 Brand'}</span>
                <span className="mx-2">•</span>
                <span>{user.followers.toLocaleString()} followers</span>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <Button
                variant="primary"
                icon={Edit2}
              >
                Edit Profile
              </Button>
              <Button
                variant="secondary"
                icon={LinkIcon}
              >
                Share Profile
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-6 max-w-3xl">
          <p className="text-gray-700 dark:text-gray-300">{user.bio}</p>
        </div>
      </div>
    </div>
  );
}