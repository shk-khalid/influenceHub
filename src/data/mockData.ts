import { Campaign, DemographicData, Brand } from '../components/types';

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
]


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
  },
  {
    id: '3',
    title: 'Holiday Season Promotion',
    brand: 'Giftorama',
    description: 'Promoting holiday gift packages',
    goals: ['Boost sales', 'Increase engagement'],
    deliverables: ['Instagram ads', 'Facebook stories'],
    startDate: '2024-11-01',
    endDate: '2024-12-31',
    budget: 70000,
    status: 'in_progress',
    metrics: {
      reach: 250000,
      engagement: 5.0,
      conversion: 3.0,
      impressions: 300000
    },
    platforms: ['Instagram', 'Facebook'],
    requirements: ['Holiday-themed content', 'Creative visuals'],
    priority: 'high',
    progress: 60,
    roi: 400
  },
  {
    id: '4',
    title: 'Tech Gadget Launch',
    brand: 'GizmoWorld',
    description: 'Launching the latest smartphone model',
    goals: ['Increase brand awareness', 'Drive pre-orders'],
    deliverables: ['Unboxing videos', 'Tech influencer posts'],
    startDate: '2024-09-15',
    endDate: '2024-10-30',
    budget: 100000,
    status: 'in_progress',
    metrics: {
      reach: 400000,
      engagement: 6.2,
      conversion: 4.5,
      impressions: 500000
    },
    platforms: ['YouTube', 'Instagram'],
    requirements: ['Tech influencers', 'Engaging storytelling'],
    priority: 'high',
    progress: 80,
    roi: 500
  },
  {
    id: '5',
    title: 'Fitness Gear Promo',
    brand: 'ActiveLife',
    description: 'Promoting new fitness gear and accessories',
    goals: ['Increase brand visibility', 'Generate reviews'],
    deliverables: ['Instagram reels', 'TikTok challenges'],
    startDate: '2024-05-01',
    endDate: '2024-06-15',
    budget: 45000,
    status: 'completed',
    metrics: {
      reach: 180000,
      engagement: 4.0,
      conversion: 2.1,
      impressions: 220000
    },
    platforms: ['Instagram', 'TikTok'],
    requirements: ['Fitness influencers', 'Lifestyle content'],
    priority: 'medium',
    progress: 100,
    roi: 360
  },
];


export const performanceData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
  { name: 'Aug', value: 6500 },
  { name: 'Sep', value: 7200 },
  { name: 'Oct', value: 7500 },
  { name: 'Nov', value: 7800 },
  { name: 'Dec', value: 8000 },
];

export const demographicData: DemographicData = {
  age: [
    { label: '18-24', value: 30 },
    { label: '25-34', value: 40 },
    { label: '35-44', value: 20 },
    { label: '45+', value: 10 },
    { label: '15-17', value: 5 },
    { label: '55-64', value: 8 },
    { label: '65+', value: 3 },
  ],
  gender: [
    { label: 'Male', value: 45 },
    { label: 'Female', value: 55 },
    { label: 'Non-binary', value: 2 },
    { label: 'Other', value: 1 },
  ],
  location: [
    { country: 'USA', users: 50000 },
    { country: 'UK', users: 30000 },
    { country: 'Canada', users: 20000 },
    { country: 'Australia', users: 15000 },
    { country: 'Germany', users: 12000 },
    { country: 'India', users: 25000 },
    { country: 'France', users: 18000 },
    { country: 'Brazil', users: 14000 },
  ],
};


{/**extra campaign mockdata
   {
    id: '6',
    title: 'Eco-Friendly Products Awareness',
    brand: 'GreenEarth',
    description: 'Promoting sustainable and eco-friendly products',
    goals: ['Educate audience', 'Encourage purchases'],
    deliverables: ['Informative videos', 'Blog series'],
    startDate: '2024-04-01',
    endDate: '2024-05-30',
    budget: 30000,
    status: 'completed',
    metrics: {
      reach: 130000,
      engagement: 3.5,
      conversion: 1.7,
      impressions: 150000
    },
    platforms: ['YouTube', 'Blog'],
    requirements: ['Sustainability advocates', 'Eco-conscious messaging'],
    priority: 'medium',
    progress: 100,
    roi: 250
  },
  {
    id: '7',
    title: 'Gaming Console Launch',
    brand: 'PixelPlay',
    description: 'Introducing the new PixelPlay gaming console',
    goals: ['Pre-orders', 'Community engagement'],
    deliverables: ['Gameplay reviews', 'Live streams'],
    startDate: '2024-10-01',
    endDate: '2024-11-15',
    budget: 150000,
    status: 'in_progress',
    metrics: {
      reach: 600000,
      engagement: 8.0,
      conversion: 5.5,
      impressions: 800000
    },
    platforms: ['YouTube', 'Twitch'],
    requirements: ['Gaming influencers', 'Exciting content'],
    priority: 'high',
    progress: 75,
    roi: 550
  },
  {
    id: '8',
    title: 'Health & Wellness Campaign',
    brand: 'PureHealth',
    description: 'Promoting health supplements and organic products',
    goals: ['Build trust', 'Increase sales'],
    deliverables: ['Testimonials', 'Influencer partnerships'],
    startDate: '2024-02-01',
    endDate: '2024-03-15',
    budget: 40000,
    status: 'completed',
    metrics: {
      reach: 160000,
      engagement: 3.7,
      conversion: 2.0,
      impressions: 180000
    },
    platforms: ['Instagram', 'YouTube'],
    requirements: ['Health advocates', 'Informative posts'],
    priority: 'medium',
    progress: 100,
    roi: 300
  },
  {
    id: '9',
    title: 'Luxury Car Reveal',
    brand: 'AutoLux',
    description: 'Showcasing the latest luxury car model',
    goals: ['Generate buzz', 'Drive test drives'],
    deliverables: ['Event coverage', 'High-quality videos'],
    startDate: '2024-09-01',
    endDate: '2024-09-30',
    budget: 120000,
    status: 'pending',
    metrics: {
      reach: 450000,
      engagement: 5.5,
      conversion: 3.0,
      impressions: 500000
    },
    platforms: ['Instagram', 'YouTube'],
    requirements: ['Auto enthusiasts', 'Luxury focus'],
    priority: 'high',
    progress: 0,
    roi: 420
  },
  {
    id: '10',
    title: 'Music Festival Promotion',
    brand: 'SoundWave',
    description: 'Promoting the annual SoundWave music festival',
    goals: ['Sell tickets', 'Engage music fans'],
    deliverables: ['Event teasers', 'Behind-the-scenes content'],
    startDate: '2024-03-01',
    endDate: '2024-04-30',
    budget: 50000,
    status: 'completed',
    metrics: {
      reach: 250000,
      engagement: 6.0,
      conversion: 3.5,
      impressions: 300000
    },
    platforms: ['Instagram', 'TikTok'],
    requirements: ['Music fans', 'Exciting visuals'],
    priority: 'medium',
    progress: 100,
    roi: 360
  },
  {
    id: '11',
    title: 'Virtual Reality Experience Launch',
    brand: 'NextGenVR',
    description: 'Introducing an immersive virtual reality experience',
    goals: ['Increase awareness', 'Boost sign-ups'],
    deliverables: ['Product demo videos', 'User testimonials'],
    startDate: '2024-07-15',
    endDate: '2024-08-30',
    budget: 80000,
    status: 'in_progress',
    metrics: {
      reach: 500000,
      engagement: 7.2,
      conversion: 4.1,
      impressions: 600000
    },
    platforms: ['YouTube', 'Instagram'],
    requirements: ['Tech influencers', 'VR content creators'],
    priority: 'high',
    progress: 55,
    roi: 430
  },
  {
    id: '12',
    title: 'Food Delivery Service Launch',
    brand: 'QuickBites',
    description: 'Promoting the launch of a new food delivery app',
    goals: ['Drive app downloads', 'Increase user engagement'],
    deliverables: ['Influencer partnerships', 'Instagram ads'],
    startDate: '2024-05-01',
    endDate: '2024-06-15',
    budget: 35000,
    status: 'completed',
    metrics: {
      reach: 200000,
      engagement: 4.2,
      conversion: 2.8,
      impressions: 250000
    },
    platforms: ['Instagram', 'Facebook'],
    requirements: ['Food bloggers', 'Lifestyle influencers'],
    priority: 'medium',
    progress: 100,
    roi: 320
  },
  {
    id: '13',
    title: 'Smart Home Devices Campaign',
    brand: 'HomeTech',
    description: 'Promoting smart home technology products',
    goals: ['Increase sales', 'Raise brand awareness'],
    deliverables: ['YouTube reviews', 'Facebook ads'],
    startDate: '2024-06-01',
    endDate: '2024-07-15',
    budget: 60000,
    status: 'in_progress',
    metrics: {
      reach: 350000,
      engagement: 5.0,
      conversion: 3.2,
      impressions: 400000
    },
    platforms: ['YouTube', 'Facebook'],
    requirements: ['Tech reviewers', 'Smart home enthusiasts'],
    priority: 'high',
    progress: 70,
    roi: 420
  },
  {
    id: '14',
    title: 'Online Course Promotion',
    brand: 'LearnTech',
    description: 'Promoting a new online course platform',
    goals: ['Increase course sign-ups', 'Generate leads'],
    deliverables: ['Webinars', 'LinkedIn posts'],
    startDate: '2024-01-15',
    endDate: '2024-02-28',
    budget: 25000,
    status: 'completed',
    metrics: {
      reach: 100000,
      engagement: 3.0,
      conversion: 1.5,
      impressions: 120000
    },
    platforms: ['LinkedIn', 'YouTube'],
    requirements: ['Education influencers', 'Professional development content'],
    priority: 'low',
    progress: 100,
    roi: 220
  },
  {
    id: '15',
    title: 'Luxury Watches Campaign',
    brand: 'Timepiece Co',
    description: 'Promoting high-end luxury watches',
    goals: ['Increase brand prestige', 'Drive website traffic'],
    deliverables: ['Instagram lifestyle posts', 'YouTube reviews'],
    startDate: '2024-03-01',
    endDate: '2024-04-15',
    budget: 90000,
    status: 'in_progress',
    metrics: {
      reach: 450000,
      engagement: 5.7,
      conversion: 3.9,
      impressions: 500000
    },
    platforms: ['Instagram', 'YouTube'],
    requirements: ['Luxury lifestyle influencers', 'High-quality imagery'],
    priority: 'high',
    progress: 80,
    roi: 480
  },
  {
    id: '16',
    title: 'Online Fashion Show',
    brand: 'FashionNow',
    description: 'Host an online fashion show to showcase new designs',
    goals: ['Generate buzz', 'Increase website visits'],
    deliverables: ['Live stream event', 'Behind-the-scenes footage'],
    startDate: '2024-10-01',
    endDate: '2024-10-15',
    budget: 70000,
    status: 'pending',
    metrics: {
      reach: 400000,
      engagement: 6.5,
      conversion: 4.2,
      impressions: 450000
    },
    platforms: ['Instagram', 'TikTok'],
    requirements: ['Fashion influencers', 'High-production videos'],
    priority: 'high',
    progress: 0,
    roi: 500
  },
  {
    id: '17',
    title: 'Sustainable Fashion Campaign',
    brand: 'EcoWear',
    description: 'Promoting eco-friendly clothing and sustainable fashion',
    goals: ['Increase brand awareness', 'Drive online sales'],
    deliverables: ['Instagram ads', 'Collaborations with eco-influencers'],
    startDate: '2024-04-01',
    endDate: '2024-05-15',
    budget: 50000,
    status: 'completed',
    metrics: {
      reach: 220000,
      engagement: 4.8,
      conversion: 2.7,
      impressions: 270000
    },
    platforms: ['Instagram', 'Pinterest'],
    requirements: ['Sustainability advocates', 'Eco-conscious influencers'],
    priority: 'medium',
    progress: 100,
    roi: 380
  },
  {
    id: '18',
    title: 'New Fitness App Launch',
    brand: 'FitTrack',
    description: 'Launching a new fitness tracking app',
    goals: ['Increase downloads', 'Build community'],
    deliverables: ['App walkthroughs', 'User-generated content'],
    startDate: '2024-08-01',
    endDate: '2024-09-30',
    budget: 60000,
    status: 'pending',
    metrics: {
      reach: 300000,
      engagement: 5.0,
      conversion: 3.1,
      impressions: 350000
    },
    platforms: ['Instagram', 'YouTube'],
    requirements: ['Fitness influencers', 'App users with healthy lifestyle content'],
    priority: 'medium',
    progress: 0,
    roi: 450
  },
  {
    id: '19',
    title: 'Event Ticketing Platform Promotion',
    brand: 'TicketEasy',
    description: 'Promoting a platform for buying and selling event tickets',
    goals: ['Drive traffic', 'Increase app downloads'],
    deliverables: ['Influencer endorsements', 'Facebook ads'],
    startDate: '2024-11-01',
    endDate: '2024-12-15',
    budget: 55000,
    status: 'in_progress',
    metrics: {
      reach: 250000,
      engagement: 4.3,
      conversion: 2.2,
      impressions: 280000
    },
    platforms: ['Facebook', 'Instagram'],
    requirements: ['Event planners', 'Social media influencers'],
    priority: 'medium',
    progress: 40,
    roi: 350
  },
  {
    id: '20',
    title: 'Pet Supplies Sale',
    brand: 'Pawsitive',
    description: 'Promoting discounts on pet food and accessories',
    goals: ['Increase sales', 'Grow customer base'],
    deliverables: ['Instagram stories', 'Pet influencer partnerships'],
    startDate: '2024-07-01',
    endDate: '2024-08-15',
    budget: 45000,
    status: 'completed',
    metrics: {
      reach: 180000,
      engagement: 3.9,
      conversion: 2.0,
      impressions: 220000
    },
    platforms: ['Instagram', 'TikTok'],
    requirements: ['Pet influencers', 'User-generated content'],
    priority: 'medium',
    progress: 100,
    roi: 290
  }
*/}