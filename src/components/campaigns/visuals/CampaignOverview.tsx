import { TrendingUp, Users, DollarSign, Calendar } from 'lucide-react';
import { useCampaignStore } from '../../../hooks/UseCampaign';

export default function DashboardOverview() {
  const campaigns = useCampaignStore((state) => state.campaigns);

  const stats = {
    total: campaigns.length,
    active: campaigns.filter((c) => c.status === 'in_progress').length,
    completed: campaigns.filter((c) => c.status === 'completed').length,
    totalBudget: campaigns.reduce((acc, curr) => acc + curr.budget, 0),
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-200" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Campaigns
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats.total}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
            <Users className="h-6 w-6 text-green-600 dark:text-green-200" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Active Campaigns
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats.active}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Calendar className="h-6 w-6 text-purple-600 dark:text-purple-200" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Completed
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              {stats.completed}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
            <DollarSign className="h-6 w-6 text-yellow-600 dark:text-yellow-200" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
              Total Budget
            </p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${stats.totalBudget.toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}