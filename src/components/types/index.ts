export type CalendarViewType = 'day' | 'week' | 'month';

export interface ContentEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  assignee: string;
}

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  code?: string;
}

export interface AuthState {
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  requiresTwoFactor: boolean;
  user: null | {
    id: string;
    email: string;
    name: string;
  };
}

export type CampaignStatus = 'pending' | 'under_review' | 'in_progress' | 'completed' | 'declined';
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
  budget: number;
  status: CampaignStatus;
  metrics?: {
    impressions: number;
    reach: number;
    engagement: number;
  };
  platforms: string[];
  requirements: string[];
  priority?: PriorityLevel;
  progress?: number;
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