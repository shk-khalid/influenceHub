import React, { useState } from 'react';
import { MapPin, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { TextArea } from '../common/TextArea';
import ProfilePicture from '../dashboard/ProfilePicture';
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
    socialLinks: {
      instagram: user?.socialLinks?.instagram || '',
      twitter: user?.socialLinks?.twitter || '',
      youtube: user?.socialLinks?.youtube || '',
    },
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
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: url,
      },
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
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Complete Your Profile
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Help others know you better
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center space-y-4">
              <ProfilePicture
                image={profileImage || ""}
                onImageUpload={handleImageUpload}

              />
            </div>

            {/* Personal Details */}
            <Input
              label="Location"
              type='text'
              placeholder="City, Country"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            {/* Bio */}
            <TextArea
              rows={4}
              label="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us your story..."
              maxLength={150}
              helperText={`${formData.bio.length}/150 characters`}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />


            {/* Social Links */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Social Links
              </h3>
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

            <Button
              type="submit"
              isLoading={isLoading}
              icon={<Save className="h-5 w-5" />}
              className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 transition-transform duration-200"
            >
              Save Profile
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
