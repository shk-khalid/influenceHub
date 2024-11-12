import { Users, Star, BarChart2, DollarSign } from 'lucide-react';

interface ProfileStatsProps {
  stats: {
    followers: number;
    rating: number;
    engagementRate: number;
    campaignsCompleted: number;
    totalEarnings?: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Followers</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.followers.toLocaleString()}
            </p>
          </div>
          <Users className="w-8 h-8 text-indigo-500" />
        </div>
      </div>

      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.rating.toFixed(1)}
              </p>
              <Star className="w-5 h-5 text-yellow-400 ml-1" />
            </div>
          </div>
          <Star className="w-8 h-8 text-yellow-400" />
        </div>
      </div>

      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Engagement Rate</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.engagementRate}%
            </p>
          </div>
          <BarChart2 className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="glass-effect p-4 rounded-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stats.totalEarnings ? 'Total Earnings' : 'Campaigns'}
            </p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalEarnings
                ? `$${stats.totalEarnings.toLocaleString()}`
                : stats.campaignsCompleted}
            </p>
          </div>
          {stats.totalEarnings ? (
            <DollarSign className="w-8 h-8 text-emerald-500" />
          ) : (
            <Star className="w-8 h-8 text-purple-500" />
          )}
        </div>
      </div>
    </div>
  );
}