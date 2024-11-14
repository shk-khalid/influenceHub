import { Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

interface Campaign {
  id: string;
  title: string;
  status: 'draft' | 'active' | 'completed' | 'paused';
  budget: number;
  startDate: string;
  endDate: string;
  progress: number;
  influencers: Array<{
    id: string;
    name: string;
    avatar: string;
    status: 'confirmed' | 'pending' | 'declined';
  }>;
  metrics: {
    reach: number;
    engagement: number;
    clicks: number;
    conversions: number;
  };
  nextMilestone: {
    title: string;
    dueDate: string;
  };
}

interface CampaignListProps {
  campaigns: Campaign[];
}

export function CampaignList({ campaigns }: CampaignListProps) {
  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'draft':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      case 'completed':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="glass-effect rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {campaign.title}
                  </h3>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(campaign.status)}`}>
                    {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ${campaign.budget.toLocaleString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {campaign.influencers.length} influencers
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                icon={ArrowRight}
                className="!p-2"
              />
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-gray-600 dark:text-gray-300">Campaign Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">{campaign.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500 rounded-full transition-all duration-300"
                  style={{ width: `${campaign.progress}%` }}
                />
              </div>
            </div>

            {/* Metrics */}
            {campaign.status !== 'draft' && (
              <div className="mt-6 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Reach</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {(campaign.metrics.reach / 1000).toFixed(0)}k
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Engagement</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {campaign.metrics.engagement}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Clicks</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {campaign.metrics.clicks.toLocaleString()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Conversions</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900 dark:text-white">
                    {campaign.metrics.conversions}
                  </p>
                </div>
              </div>
            )}

            {/* Next Milestone */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Next Milestone: {campaign.nextMilestone.title}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Due {new Date(campaign.nextMilestone.dueDate).toLocaleDateString()}
                  </p>
                </div>
                {campaign.influencers.length > 0 && (
                  <div className="flex -space-x-2">
                    {campaign.influencers.map((influencer) => (
                      <img
                        key={influencer.id}
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-900"
                        title={`${influencer.name} (${influencer.status})`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}