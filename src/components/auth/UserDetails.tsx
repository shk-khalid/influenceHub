import React, { useState } from 'react';
import { MapPin, Link as LinkIcon, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

export function UserDetailsForm() {
  const { user, updateUserDetails } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: user?.location || '',
    bio: user?.bio || '',
    instagram: user?.socialLinks?.instagram || '',
    twitter: user?.socialLinks?.twitter || '',
    youtube: user?.socialLinks?.youtube || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await updateUserDetails({
        location: formData.location,
        bio: formData.bio,
        socialLinks: {
          instagram: formData.instagram,
          twitter: formData.twitter,
          youtube: formData.youtube,
        },
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

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Help others know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Location"
              placeholder="e.g., San Francisco, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              icon={<MapPin className="h-5 w-5 text-gray-400" />}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Bio
              </label>
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

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Social Links</h3>
              <Input
                label="Instagram"
                placeholder="username"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="Twitter"
                placeholder="username"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              />
              <Input
                label="YouTube"
                placeholder="channel name"
                value={formData.youtube}
                onChange={(e) => setFormData({ ...formData, youtube: e.target.value })}
                icon={<LinkIcon className="h-5 w-5 text-gray-400" />}
              />
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