import { Calendar, Target, Clock, DollarSign } from 'lucide-react';
import { Campaign } from '../../types';

interface CampaignCardProps {
  campaign: Campaign;
  onClick: (id: string) => void;
}

export default function CampaignCard({ campaign, onClick }: CampaignCardProps) {
  const statusColors = {
    pending: 'bg-yellow-500',
    under_review: 'bg-blue-500',
    in_progress: 'bg-green-500',
    completed: 'bg-purple-500',
    declined: 'bg-red-500',
  };

  return (
    <div 
      onClick={() => onClick(campaign.id)}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-200 dark:border-gray-700"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {campaign.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {campaign.brand}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${statusColors[campaign.status]}`}>
          {campaign.status.replace('_', ' ').toUpperCase()}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Target className="w-4 h-4 mr-2" />
          <span>{campaign.goals.length} Goals</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <Clock className="w-4 h-4 mr-2" />
          <span>{campaign.deliverables.length} Deliverables</span>
        </div>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
          <DollarSign className="w-4 h-4 mr-2" />
          <span>${campaign.budget.toLocaleString()}</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {campaign.platforms.map((platform) => (
          <span 
            key={platform}
            className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
          >
            {platform}
          </span>
        ))}
      </div>
    </div>
  );
}