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
  requirements?: string[];
  priority?: PriorityLevel;
  /* progress?: number;
  name?: string; // For backward compatibility
  roi?: number; // For backward compatibility
  conversions?: number; // For backward compatibility */
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