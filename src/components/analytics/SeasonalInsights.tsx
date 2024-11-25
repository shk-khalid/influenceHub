import { Calendar, Target, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { StatCard } from '../common/StatCard';
import { Campaign } from '../types';

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    title: 'Holiday Gift Guide',
    description: 'Product Showcase in Winter',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    metrics: {
      engagement: 85,
      reach: 150000,
      conversion: 4.2,
    },
    brand: 'WinterGoods Co.',
    goals: ['Increase holiday sales', 'Showcase gift items'],
    deliverables: ['Instagram posts', 'YouTube video'],
    budget: 5000,
  },
  {
    id: '2',
    title: 'Summer Collection Launch',
    description: 'Product Launch in Summer',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    metrics: {
      engagement: 92,
      reach: 200000,
      conversion: 5.8,
    },
    brand: 'FashionTrends Ltd.',
    goals: ['Boost summer product awareness', 'Drive e-commerce traffic'],
    deliverables: ['TikTok video', 'Instagram stories'],
    budget: 10000,
  },
];

export default function SeasonalInsights() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-6 sm:p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <Calendar className="text-rose-600 dark:text-yellow-400" />
            Seasonal Campaigns
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Plan and optimize your seasonal marketing strategy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {mockCampaigns.map((campaign) => (
          <Card key={campaign.id} className="hover:shadow-lg">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white group-hover:gradient-text mb-1">
                  {campaign.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
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

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="text-gray-600 dark:text-gray-400 text-sm">
                <p>
                  <strong>Brand:</strong> {campaign.brand}
                </p>
                <p>
                  <strong>Budget:</strong> ${campaign.budget?.toLocaleString()}
                </p>
              </div>
              <Button variant="primary" fullWidth className="sm:w-auto">
                Campaign Details
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
