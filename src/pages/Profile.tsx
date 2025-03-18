import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import ProfileHeader from '../components/profile/ProfileHeader';
import InfluencerStats from '../components/profile/ProfileStats';
import PersonalDetails from '../components/profile/PersonalDetails';
import ProfilePicture from '../components/profile/ProfilePicture';
import SocialLinkInput from '../components/common/SocialLinks';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Edit2, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { isValidSocialUrl } from '../lib/SocialValidation';
import { authService } from '../services/authService';
import { User, Language } from '../components/types/auth';



export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(user?.profilePicture);
  const [socialLinks, setSocialLinks] = useState({
    instagram: user?.socialLinks?.instagram || '',
    twitter: user?.socialLinks?.twitter || '',
    youtube: user?.socialLinks?.youtube || '',
  });
  const [languages, setLanguages] = useState<Language[]>(user?.languages || []);
  const [personalInfo, setPersonalInfo] = useState({
    userName: user?.userName || "Default User",
    fullName: user?.fullName || '',
    location: user?.location || '',
    bio: user?.bio || '',
    niche: user?.niche || '',
  });

  // Load user data from localStorage
  const loadUserData = () => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setPersonalInfo({
        userName: currentUser?.userName,
        fullName: currentUser.fullName,
        location: currentUser.location || '',
        bio: currentUser.bio || '',
        niche: currentUser.niche || 'Lifestyle',
      });
      setSocialLinks({
        instagram: currentUser.socialLinks?.instagram || '',
        twitter: currentUser.socialLinks?.twitter || '',
        youtube: currentUser.socialLinks?.youtube || '',
      });
      setProfileImage(currentUser.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.userName)}`);
      setLanguages(currentUser.languages || []);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Validate social links
      const socialLinksValid = Object.entries(socialLinks).every(([platform, url]) =>
        !url || isValidSocialUrl(platform, url)
      );

      if (!socialLinksValid) {
        toast.error('Please check your social media URLs');
        return;
      }

      const updatedUserData = {
        userName: personalInfo.userName,
        fullName: personalInfo.fullName,
        location: personalInfo.location,
        bio: personalInfo.bio,
        niche: personalInfo.niche,
        socialLinks,
        languages,
      };

      const updatedUser = await userService.updateUserProfile(updatedUserData);
      if (updatedUser) {
        loadUserData(); // Reload user data from localStorage
        setIsEditing(false);
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    loadUserData(); // Reset to data from localStorage
    setIsEditing(false);
  };

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const updatedUser = await userService.updateUserProfile(formData)
      if (updatedUser) {
        loadUserData(); // Reload user data from localStorage
        toast.success('Profile picture updated successfully');
      } else {
        toast.error('Failed to update profile picture');
      }
    } catch (error) {
      console.error('Failed to update profile picture:', error);
      toast.error('Failed to update profile picture');
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

  const updateSocialLink = (platform: keyof typeof socialLinks, url: string) => {
    setSocialLinks((prev) => ({
      ...prev,
      [platform]: url,
    }));
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
          <ProfileHeader isVerified={user.isVerified || false} personalInfo={personalInfo} />
          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {isEditing ? (
              <>
                <Button
                  variant="outline"
                  icon={<X className="w-5 h-5" />}
                  onClick={handleCancel}
                  disabled={isLoading}
                  className="border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={<Save className="w-5 h-5" />}
                  onClick={handleSave}
                  isLoading={isLoading}
                  className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400"
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="primary"
                icon={<Edit2 className="w-5 h-5" />}
                onClick={() => setIsEditing(true)}
                className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400"
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        {/* Profile Picture */}
        <ProfilePicture
          imageUrl={profileImage}
          onImageUpload={handleImageUpload}
          isEditing={isEditing}
        />

        {/* Influencer Stats */}
        <InfluencerStats rating={4.8} />

        {/* Personal Details */}
        <PersonalDetails
          isVerified={user.isVerified || false}
          languages={languages}
          onAddLanguage={handleAddLanguage}
          onRemoveLanguage={handleRemoveLanguage}
          isEditing={isEditing}
          personalInfo={personalInfo}
          onUpdatePersonalInfo={handleUpdatePersonalInfo}
        />

        {/* Social Links */}
        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
            Social Links
          </h2>
          <div className="space-y-4 sm:space-y-6 p-2">
            {Object.entries(socialLinks).map(([platform, url]) => (
              <SocialLinkInput
                key={platform}
                platform={platform}
                url={url}
                onChange={(newUrl) => updateSocialLink(platform as keyof typeof socialLinks, newUrl)}
                isValid={!url || isValidSocialUrl(platform, url)}
                isEditing={isEditing}
              />
            ))}
          </div>
        </Card>
      </div>
    </Layout>
  );
}