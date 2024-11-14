import { Megaphone, DollarSign, BarChart2, Users } from 'lucide-react';

interface CampaignStatsProps {
  stats: {
    activeCampaigns: number;
    totalBudget: number;
    avgEngagement: number;
    totalReach: number;
  };
}

export function CampaignStats({ stats }: CampaignStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Campaigns</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.activeCampaigns}
            </p>
          </div>
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <Megaphone className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              ${stats.totalBudget.toLocaleString()}
            </p>
          </div>
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Engagement</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {stats.avgEngagement}%
            </p>
          </div>
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <BarChart2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>

      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Reach</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
              {(stats.totalReach / 1000000).toFixed(1)}M
            </p>
          </div>
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
      </div>
    </div>
  );
}