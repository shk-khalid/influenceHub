import { Layout } from '../components/layout/Layout';
import { CampaignList } from '../components/campaigns/CampaignList';
import { CampaignStats } from '../components/campaigns/CampaignStats';
import { CampaignFilters } from '../components/campaigns/CampaignFilters';
import { Plus } from 'lucide-react';
import { Button } from '../components/common/Button';

const mockCampaigns = [
  {
    id: '1',
    title: 'Summer Fashion Collection Launch',
    status: 'active',
    budget: 25000,
    startDate: '2024-04-01',
    endDate: '2024-05-15',
    progress: 45,
    influencers: [
      {
        id: '1',
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
        status: 'confirmed',
      },
      {
        id: '2',
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
        status: 'pending',
      },
    ],
    metrics: {
      reach: 1200000,
      engagement: 4.8,
      clicks: 15800,
      conversions: 420,
    },
    nextMilestone: {
      title: 'Content Submission',
      dueDate: '2024-04-10',
    },
  },
  {
    id: '2',
    title: 'Tech Product Launch',
    status: 'draft',
    budget: 50000,
    startDate: '2024-05-01',
    endDate: '2024-06-30',
    progress: 0,
    influencers: [],
    metrics: {
      reach: 0,
      engagement: 0,
      clicks: 0,
      conversions: 0,
    },
    nextMilestone: {
      title: 'Campaign Brief',
      dueDate: '2024-04-20',
    },
  },
];

const mockStats = {
  activeCampaigns: 3,
  totalBudget: 75000,
  avgEngagement: 4.2,
  totalReach: 2500000,
};

export default function Campaigns() {
  return (
    <Layout>
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Campaign Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create and manage your influencer marketing campaigns
            </p>
          </div>
          <Button
            variant="primary"
            icon={Plus}
          >
            Create Campaign
          </Button>
        </div>

        <CampaignStats stats={mockStats} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
          <div className="lg:col-span-1">
            <CampaignFilters />
          </div>
          <div className="lg:col-span-3">
            <CampaignList campaigns={mockCampaigns} />
          </div>
        </div>
      </div>
    </Layout>
  );
}