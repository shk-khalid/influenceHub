export interface Brand {
  id: string;
  name: string;
  sector: string;
  location: string;
  overall_rating: string;
  market_share: string;
  growth_percentage: string;
}

interface PostDetail {
  caption: string;
  likeCount: number;
  mediaType: number;
  viewCount: number;
  commentCount: number;
  isCollaborated: boolean;
}

interface BrandPost {
  post_number: number;
  post_detail: PostDetail;
}

interface HighestPost {
  caption: string;
  likeCount: number;
  mediaType: string;
  viewCount: number;
  contains_in: boolean;
  commentCount: number;
}

interface SocialStats {
  brand: string;
  username: string;
  bio: string;
  is_verified: boolean;
  followers: number;
  followings: number;
  post_count: number;
  follower_ratio: string;
  engagement_score: string;
  engagement_per_follower: string;
  estimated_reach: string;
  estimated_impression: string;
  reach_ratio: string;
  avg_likes_computed: string;
  avg_comments_computed: string;
  avg_views: string;
  brand_posts?: BrandPost[];
  highest_post: HighestPost;
}

interface Competitor {
  id: string;
  competitor_name: string;
}

export interface BrandDetail extends Brand {
  recent_valuation: string;
  performance_metrics: {
    market_share: string;
    growth_rate: string;
  } | null;
  competitors?: Competitor[];
  gender_demographics?: {
    male_percentage: string;
    female_percentage: string;
  };
  valuation_history?: {
    year: number;
    valuation: string;
  }[];
  social_stats: SocialStats;
}