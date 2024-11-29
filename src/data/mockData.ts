import {Campaign, DemographicData, Brand } from '../components/types';


export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechVision',
    logo: 'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?w=100&h=100&fit=crop',
    location: 'San Francisco, USA',
    sector: 'Electronics',
    rating: 4.8,
    value: [
      { year: 2020, amount: 5.2 },
      { year: 2021, amount: 6.8 },
      { year: 2022, amount: 8.4 },
      { year: 2023, amount: 10.1 },
      { year: 2024, amount: 12.5 }
    ],
    competitors: ['ApexTech', 'InnovatePro', 'TechGiant'],
    demographics: {
      gender: {
        male: 65,
        female: 32,
        other: 3
      }
    },
    metrics: {
      engagementRate: 8.9,
      marketShare: 15.5
    },
    sentiment: {
      positive: 75,
      neutral: 18,
      negative: 7,
      keywords: ['Innovation', 'Quality', 'Premium'],
      trends: ['#TechInnovation', '#FutureTech', '#SmartLiving']
    }
  },
  {
    id: '2',
    name: 'GlamGlow',
    logo: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=100&h=100&fit=crop',
    location: 'Paris, France',
    sector: 'Cosmetics',
    rating: 4.6,
    value: [
      { year: 2020, amount: 3.1 },
      { year: 2021, amount: 4.2 },
      { year: 2022, amount: 5.8 },
      { year: 2023, amount: 7.3 },
      { year: 2024, amount: 9.0 }
    ],
    competitors: ['BeautyPro', 'LuxGlow', 'PureEssence'],
    demographics: {
      gender: {
        male: 25,
        female: 72,
        other: 3
      }
    },
    metrics: {
      engagementRate: 6.7,
      marketShare: 12.3
    },
    sentiment: {
      positive: 82,
      neutral: 15,
      negative: 3,
      keywords: ['Natural', 'Organic', 'Effective'],
      trends: ['#CleanBeauty', '#GlowUp', '#SkincareCommunity']
    }
  },
  {
    id: '3',
    name: 'AutoElite',
    logo: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=100&h=100&fit=crop',
    location: 'Munich, Germany',
    sector: 'Automobile',
    rating: 4.9,
    value: [
      { year: 2020, amount: 15.5 },
      { year: 2021, amount: 18.2 },
      { year: 2022, amount: 22.7 },
      { year: 2023, amount: 25.9 },
      { year: 2024, amount: 30.1 }
    ],
    competitors: ['SpeedKing', 'AutoPrime', 'DriveMax'],
    demographics: {
      gender: {
        male: 70,
        female: 28,
        other: 2
      }
    },
    metrics: {
      engagementRate: 5.4,
      marketShare: 18.7
    },
    sentiment: {
      positive: 88,
      neutral: 10,
      negative: 2,
      keywords: ['Luxury', 'Performance', 'Engineering'],
      trends: ['#DrivingExcellence', '#LuxuryCars', '#AutoInnovation']
    }
  },
  {
    id: '4',
    name: 'StyleVogue',
    logo: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=100&h=100&fit=crop',
    location: 'Milan, Italy',
    sector: 'Fashion',
    rating: 4.7,
    value: [
      { year: 2020, amount: 4.8 },
      { year: 2021, amount: 6.3 },
      { year: 2022, amount: 8.1 },
      { year: 2023, amount: 10.5 },
      { year: 2024, amount: 13.2 }
    ],
    competitors: ['TrendPro', 'FashionElite', 'StyleIcon'],
    demographics: {
      gender: {
        male: 35,
        female: 62,
        other: 3
      }
    },
    metrics: {
      engagementRate: 7.8,
      marketShare: 14.2
    },
    sentiment: {
      positive: 79,
      neutral: 16,
      negative: 5,
      keywords: ['Trendy', 'Sustainable', 'Chic'],
      trends: ['#FashionForward', '#StyleInspo', '#EthicalFashion']
    }
  }
];

export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    brand: 'Fashion Co',
    description: 'Launch of the new summer collection',
    goals: ['Increase brand awareness', 'Drive sales'],
    deliverables: ['Instagram posts', 'TikTok videos'],
    startDate: '2024-06-01',
    endDate: '2024-07-31',
    budget: 50000,
    status: 'in_progress',
    metrics: {
      reach: 150000,
      engagement: 4.5,
      conversion: 2.3,
      impressions: 200000
    },
    platforms: ['Instagram', 'TikTok'],
    requirements: ['Minimum 100k followers', 'Fashion niche'],
    priority: 'high',
    progress: 45,
    roi: 320
  },
  {
    id: '2',
    title: 'Back to School Campaign',
    brand: 'EduTech Inc',
    description: 'Promoting educational technology products',
    goals: ['Lead generation', 'Product demos'],
    deliverables: ['YouTube reviews', 'Blog posts'],
    startDate: '2024-08-01',
    endDate: '2024-09-15',
    budget: 35000,
    status: 'pending',
    metrics: {
      reach: 120000,
      engagement: 3.8,
      conversion: 1.8,
      impressions: 180000
    },
    platforms: ['YouTube', 'Blog'],
    requirements: ['Tech focus', 'Educational content'],
    priority: 'medium',
    progress: 0,
    roi: 280
  }
];

export const performanceData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
];

export const demographicData: DemographicData = {
  age: [
    { label: '18-24', value: 30 },
    { label: '25-34', value: 40 },
    { label: '35-44', value: 20 },
    { label: '45+', value: 10 },
  ],
  gender: [
    { label: 'Male', value: 45 },
    { label: 'Female', value: 55 },
  ],
  location: [
    { country: 'USA', users: 50000 },
    { country: 'UK', users: 30000 },
    { country: 'Canada', users: 20000 },
  ],
};