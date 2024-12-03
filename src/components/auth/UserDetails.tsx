import React, { useState } from 'react';
import { MapPin, Save, User, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import SocialLinkInput from '../common/SocialLinks';
import { isValidSocialUrl } from '../../lib/SocialValidation';

export function UserDetailsForm() {
  const { user, updateUserDetails } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    location: user?.location || '',
    bio: user?.bio || '',
    primaryNiche: 'Lifestyle',
    languages: ['English (Native)', 'Spanish (Fluent)'],
    customUrl: '',
    availableForCollabs: true,
    campaignTypes: [
      'Product Reviews',
      'Brand Ambassadorship',
      'Sponsored Content',
      'Event Coverage',
      'Social Media Takeover',
      'Tutorial/How-to Content'
    ],
    socialLinks: {
      instagram: user?.socialLinks?.instagram || '',
      twitter: user?.socialLinks?.twitter || '',
      youtube: user?.socialLinks?.youtube || '',
    }
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (platform: string) => (url: string) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserDetails({
        location: formData.location,
        bio: formData.bio,
        socialLinks: formData.socialLinks,
      });
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="fixed top-8 left-8">
        
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Help others know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Picture Upload */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <label className="absolute bottom-0 right-0 bg-indigo-600 dark:bg-yellow-400 p-2 rounded-full cursor-pointer hover:bg-indigo-500 dark:hover:bg-yellow-300 transition-colors">
                  <Plus className="w-4 h-4 text-white dark:text-gray-900" />
                  <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                </label>
              </div>
            </div>

            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Personal Details</h3>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Input
                  label="Full Name"
                  value={user?.fullName || ''}
                  disabled
                  icon={<User className="h-5 w-5 text-gray-400" />}
                />
                <Input
                  label="Location"
                  placeholder="e.g., San Francisco, CA"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  icon={<MapPin className="h-5 w-5 text-gray-400" />}
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Bio</label>
              <div className="mt-1">
                <textarea
                  rows={3}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  maxLength={150}
                />
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {formData.bio.length}/150 characters
                </p>
              </div>
            </div>

            {/* Primary Niche */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Primary Niche</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                value={formData.primaryNiche}
                onChange={(e) => setFormData({ ...formData, primaryNiche: e.target.value })}
              >
                <option>Lifestyle</option>
                <option>Technology</option>
                <option>Fashion</option>
                <option>Food</option>
                <option>Travel</option>
                <option>Fitness</option>
              </select>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Social Links</h3>
              <div className="space-y-6">
                {Object.entries(formData.socialLinks).map(([platform, url]) => (
                  <SocialLinkInput
                    key={platform}
                    platform={platform}
                    url={url}
                    onChange={handleSocialLinkChange(platform)}
                    isValid={isValidSocialUrl(platform, url)}
                  />
                ))}
              </div>
            </div>

            {/* Campaign Types */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Preferred Campaign Types</h3>
              <div className="flex flex-wrap gap-2">
                {formData.campaignTypes.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 dark:bg-yellow-100 dark:text-yellow-800"
                  >
                    {type}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                isLoading={isLoading}
                icon={<Save className="h-5 w-5" />}
              >
                Save Profile
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/dashboard')}
              >
                Skip for now
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}