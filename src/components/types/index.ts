// Authorization
export interface User {
  email: string;
  fullName: string;
  location?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface TwoFactorAuthProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  email: string;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  updateUserDetails: (details: Partial<User>) => void;
}

// Campaign

export type CampaignStatus = 'pending' | 'under_review' | 'in_progress' | 'completed';
export type PriorityLevel = 'low' | 'medium' | 'high';

export interface Campaign {
  id: string;
  title: string;
  brand: string;
  description: string;
  goals: string[];
  deliverables: string[];
  startDate: string;
  endDate: string;
  budget?: number;
  status?: CampaignStatus;
  metrics?: {
    reach: number;
    engagement: number;
    conversion?: number;
    impressions?: number;
  };
  platforms?: string[];
  requirements?: string[];
  priority?: PriorityLevel;
  progress?: number;
  name?: string; // For backward compatibility
  roi?: number; // For backward compatibility
  conversions?: number; // For backward compatibility
}

export interface Task {
  id: string;
  campaignId: string;
  title: string;
  description: string;
  deadline: string;
  status: 'pending' | 'in_progress' | 'completed' | 'review';
  progress: number;
}

// Dashboard

export interface DemographicData {
  age: { label: string; value: number }[];
  gender: { label: string; value: number }[];
  location: { country: string; users: number }[];
}

export interface EngagementMetric {
  date: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
}

export interface CampaignMetrics {
  id: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  startDate: string;
  endDate: string;
}

export interface Trend {
  id: string;
  keyword: string;
  volume: number;
  growth: number;
  category: string;
  region: string;
}

// Trend Analysis

export interface CompetitorPost {
  id: string;
  content: string;
  likes: number;
  comments: number;
  date: string;
}

export interface Competitor {
  id?: string;
  name: string;
  handle: string;
  platform: string;
  followers: number;
  engagement: number;
  category: string;
  recentPosts: CompetitorPost[];
}

export type CompetitorFormData = Pick<Competitor, 'name' | 'handle' | 'category' | 'platform'>;

export interface CompetitorMetrics {
  totalCompetitors: number;
  averageEngagement: string;
  topPerformer: Competitor | undefined;
  platformDistribution: Record<string, number>;
}

export interface Tab {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

// brand insights

export interface Brand {
  id: string;
  name: string;
  logo: string;
  description?: string;
  location: string;
  sector: string;
  rating: number;
  value: {
    year: number;
    amount: number;
  }[];
  competitors: string[];
  demographics: {
    gender: {
      male: number;
      female: number;
      other: number;
    };
  };
  metrics?: {
    engagementRate: number;
    marketShare: number;
  };
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    keywords: string[];
    trends: string[];
  };
}