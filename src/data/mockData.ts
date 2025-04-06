import { DemographicData } from '../components/types';
import { BrandDetail as Brand } from '../components/types/brand';
import { Trend } from '../components/types';

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

export const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechVision',
    sector: 'electronics',
    location: 'San Francisco, USA',
    overall_rating: '4.80',
    market_share: '15.50',
    growth_percentage: '20.00',
    recent_valuation: '12500000000.00',
    performance_metrics: null,
    social_stats: {
      brand: '1',
      username: 'techvision_global',
      bio: 'Innovating the future with smart tech.',
      is_verified: true,
      followers: 150000,
      followings: 500,
      post_count: 120,
      follower_ratio: '300.00',
      engagement_score: '8.90',
      engagement_per_follower: '0.06',
      estimated_reach: '85.00',
      estimated_impression: '240.00',
      reach_ratio: '0.57',
      avg_likes_computed: '4500.00',
      avg_comments_computed: '380.00',
      avg_views: '52000.00',
      highest_post: {
        caption: 'Exploring the future of AI with TechVision Labs 🚀 #TechInnovation',
        likeCount: 9200,
        mediaType: 'Video',
        viewCount: 150000,
        contains_in: true,
        commentCount: 480
      }
    }
  },
  {
    id: '2',
    name: 'GlamGlow',
    sector: 'cosmetics',
    location: 'Paris, France',
    overall_rating: '4.60',
    market_share: '12.30',
    growth_percentage: '18.00',
    recent_valuation: '9000000000.00',
    performance_metrics: null,
    social_stats: {
      brand: '2',
      username: 'glamglow_beauty',
      bio: 'Glow naturally with GlamGlow 🌿',
      is_verified: true,
      followers: 98000,
      followings: 320,
      post_count: 75,
      follower_ratio: '306.25',
      engagement_score: '6.70',
      engagement_per_follower: '0.04',
      estimated_reach: '67.00',
      estimated_impression: '190.00',
      reach_ratio: '0.50',
      avg_likes_computed: '3900.00',
      avg_comments_computed: '260.00',
      avg_views: '41000.00',
      highest_post: {
        caption: 'Your skin deserves the best. 🌸 #CleanBeauty #GlowUp',
        likeCount: 7200,
        mediaType: 'Photo',
        viewCount: 89000,
        contains_in: true,
        commentCount: 320
      }
    }
  },
  {
    id: '3',
    name: 'AutoElite',
    sector: 'automobile',
    location: 'Munich, Germany',
    overall_rating: '4.90',
    market_share: '18.70',
    growth_percentage: '25.00',
    recent_valuation: '30100000000.00',
    performance_metrics: null,
    social_stats: {
      brand: '3',
      username: 'autoelite_official',
      bio: 'Luxury meets performance. 🏁',
      is_verified: true,
      followers: 210000,
      followings: 180,
      post_count: 210,
      follower_ratio: '1166.67',
      engagement_score: '5.40',
      engagement_per_follower: '0.03',
      estimated_reach: '90.00',
      estimated_impression: '300.00',
      reach_ratio: '0.43',
      avg_likes_computed: '6000.00',
      avg_comments_computed: '500.00',
      avg_views: '72000.00',
      highest_post: {
        caption: 'Feel the power of innovation. #LuxuryCars #DrivingExcellence',
        likeCount: 11300,
        mediaType: 'Video',
        viewCount: 175000,
        contains_in: true,
        commentCount: 510
      }
    }
  },
  {
    id: '4',
    name: 'StyleVogue',
    sector: 'fashion',
    location: 'Milan, Italy',
    overall_rating: '4.70',
    market_share: '14.20',
    growth_percentage: '21.00',
    recent_valuation: '13200000000.00',
    performance_metrics: null,
    social_stats: {
      brand: '4',
      username: 'stylevogue_official',
      bio: 'Where trend meets tradition 👗',
      is_verified: false,
      followers: 87000,
      followings: 410,
      post_count: 95,
      follower_ratio: '212.20',
      engagement_score: '7.80',
      engagement_per_follower: '0.05',
      estimated_reach: '72.00',
      estimated_impression: '210.00',
      reach_ratio: '0.48',
      avg_likes_computed: '4100.00',
      avg_comments_computed: '300.00',
      avg_views: '55000.00',
      highest_post: {
        caption: 'Spring ‘24 just dropped 🌸✨ #FashionForward #EthicalFashion',
        likeCount: 8500,
        mediaType: 'Photo',
        viewCount: 110000,
        contains_in: true,
        commentCount: 390
      }
    }
  }
];

export const mockTrends: Trend[] = [
  {
    "id": 10000050,
    "name": "Daily Simple Questions Thread - December 23, 2024",
    "volume": 9,
    "category": "fitness",
    "region": "Global",
    "growth": 12.5,
    "sentiment": 0.0,
    "last_updated": "2024-12-24T09:53:17.780329Z"
  },
  {
    "id": 10000015,
    "name": "December 20-22 Box Office Recap: 'Sonic the Hedgehog 3' tops 'Mufasa: The Lion King' in the domestic market. While 'Mufasa' leads overseas, its $122.2 million worldwide debut is very underwhelming. Meanwhile, 'Kraven' and 'War of the Rohirrim' collapsed 72% and 73%, respectively.",
    "volume": 15,
    "category": "entertainment",
    "region": "Global",
    "growth": 7.142857142857142,
    "sentiment": 0.06666666666666667,
    "last_updated": "2024-12-23T22:10:33.978751Z"
  },
  {
    "id": 10000033,
    "name": "LPT: Cold weather kills car batteries. Here are some tips for jump starting your vehicle this holiday season. ",
    "volume": 230,
    "category": "lifestyle",
    "region": "Global",
    "growth": -1.7699115044247788,
    "sentiment": -0.3,
    "last_updated": "2024-12-23T22:21:30.648175Z"
  },
  {
    "id": 10000013,
    "name": "outfit for a wedding with my boyfriend as his plus one. ",
    "volume": 495,
    "category": "fashion",
    "region": "Global",
    "growth": 1.642710472279261,
    "sentiment": 0.0,
    "last_updated": "2024-12-23T22:10:33.971774Z"
  },
  {
    "id": 10000003,
    "name": "PayPal Honey has been caught poaching affiliate revenue, and it often hides the best deals from users | Promoted by influencers, this popular browser extension has been a scam all along",
    "volume": 751,
    "category": "tech",
    "region": "Global",
    "growth": 0.9408602150537635,
    "sentiment": 0.8,
    "last_updated": "2024-12-23T22:10:33.939820Z"
  },
  {
    "id": 10000030,
    "name": "A Quick Reminder: We have a strictly NO POLITICS rule in this subreddit.",
    "volume": 1388,
    "category": "lifestyle",
    "region": "Global",
    "growth": 0.5797101449275363,
    "sentiment": 0.3333333333333333,
    "last_updated": "2024-12-24T08:49:48.818506Z"
  }
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
