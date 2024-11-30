import { Calendar, Target, Award, TrendingUp, ArrowRight } from 'lucide-react'; 
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StatCard } from '../common/StatCard';
import { mockCampaigns } from '../../data/mockData';

export default function SeasonalInsights() {
  return (
    <Card gradient className="sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <Calendar className="text-indigo-600 dark:text-indigo-400" />
            Seasonal Campaigns
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Plan and optimize your seasonal marketing strategy.
          </p>
        </div>
      </div>

      {/* Campaign Cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 sm:gap-6">
        {mockCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 rounded-lg overflow-hidden"
          >
            {/* Campaign Details */}
            <div className="p-4 flex flex-col gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white group-hover:gradient-text mb-1 truncate">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  {campaign.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={Target}
                  title="Engagement"
                  value={`${campaign.metrics?.engagement}%`}
                  iconColor="text-indigo-600 dark:text-indigo-400"
                />
                <StatCard
                  icon={Award}
                  title="Reach"
                  value={campaign.metrics?.reach.toLocaleString()}
                  iconColor="text-green-600 dark:text-green-400"
                />
                <StatCard
                  icon={TrendingUp}
                  title="Conversion"
                  value={`${campaign.metrics?.conversion}%`}
                  iconColor="text-purple-600 dark:text-purple-400"
                />
              </div>

              <div className="flex flex-col gap-2">
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  <strong>Brand:</strong> {campaign.brand}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                  <strong>Budget:</strong> ${campaign.budget?.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="p-4 border-t dark:border-gray-700 flex justify-end">
              <Button
                variant="primary"
                fullWidth
                className="w-full sm:w-auto flex items-center gap-2"
              >
                Campaign Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  );
}
