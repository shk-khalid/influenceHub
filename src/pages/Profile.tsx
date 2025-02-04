import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../services/userService';
import ProfileHeader from '../components/profile/ProfileHeader';
import InfluencerStats from '../components/profile/ProfileStats';
import PersonalDetails from '../components/profile/PersonalDetails';
import SocialLinkInput from '../components/common/SocialLinks';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Edit2, Save, X } from 'lucide-react';
import { Layout } from '../components/layout/Layout';
import toast from 'react-hot-toast';

interface SocialLink {
  platform: string;
  url: string;
}

interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

interface UserStats {
  followers: number;
  rating: number;
  campaignsCount: number;
  countriesCount: number;
}

export default function Profile() {
  const { user, updateUserDetails } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'instagram', url: user?.socialLinks?.instagram || '' },
    { platform: 'twitter', url: user?.socialLinks?.twitter || '' },
    { platform: 'youtube', url: user?.socialLinks?.youtube || '' },
  ]);
  const [isAvailableForCollabs, setIsAvailableForCollabs] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [customUrl, setCustomUrl] = useState('');
  const [isVerified] = useState(user?.isEmailVerified || false);
  const [languages, setLanguages] = useState<Language[]>([]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: user?.fullName || '',
    location: user?.location || '',
    bio: user?.bio || '',
    niche: 'lifestyle',
  });

  // Fetch user stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const userStats = await userService.getUserStats();
        setStats(userStats);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
        toast.error('Failed to load profile statistics');
      }
    };

    fetchStats();
  }, []);

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      setPersonalInfo({
        fullName: user.fullName,
        location: user.location || '',
        bio: user.bio || '',
        niche: 'lifestyle',
      });

      setSocialLinks([
        { platform: 'instagram', url: user.socialLinks?.instagram || '' },
        { platform: 'twitter', url: user.socialLinks?.twitter || '' },
        { platform: 'youtube', url: user.socialLinks?.youtube || '' },
      ]);
    }
  }, [user]);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const updatedUserData = {
        fullName: personalInfo.fullName,
        location: personalInfo.location,
        bio: personalInfo.bio,
        socialLinks: {
          instagram: socialLinks.find(link => link.platform === 'instagram')?.url,
          twitter: socialLinks.find(link => link.platform === 'twitter')?.url,
          youtube: socialLinks.find(link => link.platform === 'youtube')?.url,
        }
      };

      await updateUserDetails(updatedUserData);
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original user data
    if (user) {
      setPersonalInfo({
        fullName: user.fullName,
        location: user.location || '',
        bio: user.bio || '',
        niche: 'lifestyle',
      });

      setSocialLinks([
        { platform: 'instagram', url: user.socialLinks?.instagram || '' },
        { platform: 'twitter', url: user.socialLinks?.twitter || '' },
        { platform: 'youtube', url: user.socialLinks?.youtube || '' },
      ]);
    }
    setIsEditing(false);
  };

  const updateSocialLink = (platform: string, url: string) => {
    setSocialLinks((prev) =>
      prev.map((link) =>
        link.platform === platform ? { ...link, url } : link
      )
    );
  };

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleAddLanguage = (language: Language) => {
    setLanguages((prev) => [...prev, language]);
  };

  const handleRemoveLanguage = (id: string) => {
    setLanguages((prev) => prev.filter((lang) => lang.id !== id));
  };

  const handleUpdatePersonalInfo = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-lg text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6">
          <ProfileHeader isVerified={isVerified} personalInfo={personalInfo} />
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  icon={<X className='w-5 h-5'/>}
                  className="border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400 transition-transform duration-200"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"                
                  icon={<Save className='w-5 h-5'/>}
                  className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
                  onClick={handleSave}
                  isLoading={isLoading}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                icon={<Edit2 className='w-5 h-5'/>}
                className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Influencer Stats */}
        <InfluencerStats 
          rating={stats?.rating || 0}
          followers={stats?.followers || 0}
          campaignsCount={stats?.campaignsCount || 0}
          countriesCount={stats?.countriesCount || 0}
        />

        {/* Personal Details */}
        <PersonalDetails
          isVerified={isVerified}
          isAvailableForCollabs={isAvailableForCollabs}
          setIsAvailableForCollabs={setIsAvailableForCollabs}
          customUrl={customUrl}
          setCustomUrl={setCustomUrl}
          selectedCampaigns={selectedCampaigns}
          setSelectedCampaigns={setSelectedCampaigns}
          languages={languages}
          onAddLanguage={handleAddLanguage}
          onRemoveLanguage={handleRemoveLanguage}
          isEditing={isEditing}
          personalInfo={personalInfo}
          onUpdatePersonalInfo={handleUpdatePersonalInfo}
        />

        {/* Social Links */}
        <Card>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 sm:mb-6">Social Links</h2>
          <div className="space-y-4 sm:space-y-6 p-2">
            {socialLinks.map(({ platform, url }) => (
              <SocialLinkInput
                key={platform}
                platform={platform}
                url={url}
                onChange={(newUrl) => updateSocialLink(platform, newUrl)}
                isValid={!url || validateUrl(url)}
                isEditing={isEditing}
              />
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}