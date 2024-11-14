import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { InfluencerSearch } from '../components/discovery/InfluencerSearch';
import { InfluencerGrid } from '../components/discovery/InfluencerGrid';
import { InfluencerFilters } from '../components/discovery/InfluencerFilters';
import { SavedSearches } from '../components/discovery/SavedSearches';

// Mock data for initial development
const mockSavedSearches = [
  {
    id: '1',
    name: 'Fashion Micro-Influencers NYC',
    criteria: {
      niche: 'Fashion',
      location: 'New York',
      followerRange: '10k-50k',
      engagementRate: '> 3%',
    },
    lastUpdated: '2024-03-10',
    matchCount: 128,
  },
  {
    id: '2',
    name: 'Tech Reviewers',
    criteria: {
      niche: 'Technology',
      location: 'Global',
      followerRange: '100k+',
      engagementRate: '> 2%',
    },
    lastUpdated: '2024-03-09',
    matchCount: 85,
  },
];

const mockInfluencers = [
  {
    id: '1',
    name: 'Emma Thompson',
    handle: '@emmastyle',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    niche: 'Fashion & Lifestyle',
    location: 'New York, USA',
    followers: 156000,
    engagementRate: 4.2,
    recentPosts: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f',
      'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b',
    ],
    verified: true,
    metrics: {
      avgLikes: 8500,
      avgComments: 342,
      responseRate: 98,
    },
  },
  {
    id: '2',
    name: 'Alex Rivera',
    handle: '@techwithalex',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    niche: 'Technology',
    location: 'San Francisco, USA',
    followers: 89000,
    engagementRate: 3.8,
    recentPosts: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    ],
    verified: true,
    metrics: {
      avgLikes: 4200,
      avgComments: 256,
      responseRate: 95,
    },
  },
];

export default function Discovery() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({
    niche: [],
    location: [],
    followerRange: [],
    engagementRate: [],
    verified: false,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    // Implement filter logic here
  };

  const handleSaveSearch = () => {
    // Implement save search logic here
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Discover Influencers
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find the perfect influencers for your brand using our AI-powered discovery platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Filters & Saved Searches */}
          <div className="lg:col-span-1 space-y-6">
            <InfluencerFilters
              filters={activeFilters}
              onChange={handleFilterChange}
            />
            <SavedSearches
              searches={mockSavedSearches}
              onSave={handleSaveSearch}
            />
          </div>

          {/* Main Content - Search & Results */}
          <div className="lg:col-span-3 space-y-6">
            <InfluencerSearch
              value={searchQuery}
              onSearch={handleSearch}
              activeFilters={activeFilters}
            />
            <InfluencerGrid influencers={mockInfluencers} />
          </div>
        </div>
      </div>
    </Layout>
  );
}