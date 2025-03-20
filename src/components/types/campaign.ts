export type CampaignStatus = 'pending' | 'under_review' | 'in_progress' | 'completed';
export type PriorityLevel = 'low' | 'medium' | 'high';
export type PlatformChoice = 'instagram' | 'facebook' | 'youtube' | 'discord' | 'twitter'

export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  priority: PriorityLevel;
  status?: CampaignStatus;
  budget?: number;
  platform?: PlatformChoice;
  progress?: number;
}