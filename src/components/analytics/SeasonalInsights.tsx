import React from 'react';
import { Calendar, Target, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import Card from '../common/Card';
import { Campaigns } from '../types';

const mockCampaigns: Campaigns[] = [
  {
    id: '1',
    name: 'Holiday Gift Guide',
    type: 'Product Showcase',
    season: 'Winter',
    startDate: '2024-12-01',
    endDate: '2024-12-25',
    metrics: {
      engagement: 85,
      reach: 150000,
      conversion: 4.2,
    },
  },
  {
    id: '2',
    name: 'Summer Collection Launch',
    type: 'Product Launch',
    season: 'Summer',
    startDate: '2024-06-01',
    endDate: '2024-06-30',
    metrics: {
      engagement: 92,
      reach: 200000,
      conversion: 5.8,
    },
  },
];

export default function SeasonalInsights() {
  return (
    <div className="bg-gradient-to-br from-rose-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <Calendar className="text-rose-600 dark:text-rose-400" />
            Seasonal Campaigns
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Plan and optimize your seasonal marketing strategy
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="group hover:bg-gradient-to-br hover:from-rose-50 hover:to-orange-50 dark:hover:from-gray-700 dark:hover:to-gray-800"
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:gradient-text mb-1">
                  {campaign.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{campaign.type}</p>
              </div>
              <span className="px-4 py-1.5 bg-rose-100 text-rose-800 dark:bg-rose-800 dark:text-rose-100 rounded-full text-sm font-medium">
                {campaign.season}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <CardMetric
                icon={<Target className="w-6 h-6 mx-auto mb-2 text-indigo-600 dark:text-blue-400" />}
                label="Engagement"
                value={`${campaign.metrics.engagement}%`}
              />
              <CardMetric
                icon={<Award className="w-6 h-6 mx-auto mb-2 text-green-600 dark:text-green-400" />}
                label="Reach"
                value={campaign.metrics.reach.toLocaleString()}
              />
              <CardMetric
                icon={<TrendingUp className="w-6 h-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />}
                label="Conversion"
                value={`${campaign.metrics.conversion}%`}
              />
            </div>

            <Button
              variant="secondary"
              className="w-full group-hover:variant-primary dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              icon={ArrowRight}
            >
              Campaign Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CardMetric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="text-center p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm group-hover:shadow-md transition-all">
      {icon}
      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{label}</p>
      <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">{value}</p>
    </div>
  );
}
