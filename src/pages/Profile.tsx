import React, { useState } from 'react';
import ProfileHeader from '../components/profile/ProfileHeader';
import InfluencerStats from '../components/profile/ProfileStats';
import ProfilePicture from '../components/profile/ProfilePicture';
import PersonalDetails from '../components/profile/PersonalDetails';
import SocialLinkInput from '../components/profile/SocialLinks';
import Card from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Edit2, Save, X } from 'lucide-react';
import { Layout } from '../components/layout/Layout';

interface SocialLink {
  platform: string;
  url: string;
}

interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

export default function ProfileSetup() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400');
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { platform: 'instagram', url: 'https://instagram.com/johndoe' },
    { platform: 'twitter', url: 'https://twitter.com/johndoe' },
    { platform: 'youtube', url: 'https://youtube.com/@johndoe' },
  ]);
  const [isAvailableForCollabs, setIsAvailableForCollabs] = useState(true);
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>(['Product Reviews', 'Brand Ambassadorship']);
  const [customUrl, setCustomUrl] = useState('johndoe');
  const [rating] = useState(4.8);
  const [isVerified] = useState(true);
  const [languages, setLanguages] = useState<Language[]>([
    { id: '1', name: 'English', level: 'Native' },
    { id: '2', name: 'Spanish', level: 'Fluent' },
  ]);
  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'John Doe',
    location: 'New York, USA',
    bio: 'Creative content creator passionate about storytelling and authentic brand partnerships.',
    niche: 'lifestyle',
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

  const updateSocialLink = (platform: string, url: string) => {
    setSocialLinks(prev =>
      prev.map(link =>
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
    setLanguages(prev => [...prev, language]);
  };

  const handleRemoveLanguage = (id: string) => {
    setLanguages(prev => prev.filter(lang => lang.id !== id));
  };

  const handleUpdatePersonalInfo = (field: keyof typeof personalInfo, value: string) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // Here you would typically save to backend
    setIsEditing(false);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-start">
          <ProfileHeader isVerified={isVerified} personalInfo={personalInfo} />
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  variant="secondary"
                  icon={X}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  icon={Save}
                  onClick={handleSave}
                >
                  Save Changes
                </Button>
              </>
            ) : (
              <Button
                variant="secondary"
                icon={Edit2}
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>
        </div>

        <InfluencerStats rating={rating} />

        <div className="flex flex-col items-center space-y-4">
          <ProfilePicture
            image={profileImage}
            onImageUpload={handleImageUpload}
            isEditing={isEditing}
          />
        </div>

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

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Social Links</h2>
          <div className="space-y-6">
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
