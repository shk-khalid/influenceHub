import { Layout } from '../components/layout/Layout';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { SocialLinks } from '../components/profile/SocialLinks';
import { Portfolio } from '../components/profile/Portfolio';

// Mock data - replace with real data from your backend
const mockUser = {
  name: "Sarah Johnson",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  coverImage: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
  location: "Los Angeles, CA",
  bio: "Fashion & Lifestyle Content Creator 📸 Sharing my journey and inspiring others through authentic content. Collaborating with brands to create meaningful stories.",
  isVerified: true,
  followers: 158000,
  type: 'influencer' as const,
};

const mockStats = {
  followers: 158000,
  rating: 4.8,
  engagementRate: 3.2,
  campaignsCompleted: 45,
  totalEarnings: 125000,
};

const mockSocialLinks = [
  {
    platform: 'instagram',
    url: 'https://instagram.com/sarahjohnson',
    followers: 158000,
    verified: true,
  },
  {
    platform: 'youtube',
    url: 'https://youtube.com/sarahjohnson',
    followers: 89000,
    verified: true,
  },
  {
    platform: 'twitter',
    url: 'https://twitter.com/sarahjohnson',
    followers: 45000,
    verified: true,
  },
  {
    platform: 'website',
    url: 'https://sarahjohnson.com',
    verified: false,
  },
];

const mockPortfolio = [
  {
    id: '1',
    type: 'image' as const,
    thumbnail: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
    title: 'Summer Fashion Collection',
    description: 'Collaboration with Fashion Brand X',
    stats: {
      likes: 15800,
      views: 89000,
      engagement: 4.2,
    },
  },
  {
    id: '2',
    type: 'video' as const,
    thumbnail: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
    title: 'Spring Lookbook 2024',
    description: 'Seasonal fashion inspiration',
    stats: {
      likes: 12300,
      views: 67000,
      engagement: 3.8,
    },
  },
  {
    id: '3',
    type: 'image' as const,
    thumbnail: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    title: 'Lifestyle Product Review',
    description: 'Honest review of trending products',
    stats: {
      likes: 9500,
      views: 45000,
      engagement: 3.5,
    },
  },
];

export default function Profile() {
  const handleAddSocialLink = () => {
    // Implement social link addition logic
    console.log('Add social link');
  };

  const handleAddPortfolio = () => {
    // Implement portfolio addition logic
    console.log('Add portfolio item');
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <ProfileHeader user={mockUser} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProfileStats stats={mockStats} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <SocialLinks
                links={mockSocialLinks}
                onAdd={handleAddSocialLink}
              />
            </div>
            <div className="lg:col-span-2">
              <Portfolio
                items={mockPortfolio}
                onAdd={handleAddPortfolio}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}