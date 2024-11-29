import React from 'react';
import type { Campaign } from '../types';
import { format } from 'date-fns';

interface CampaignTableProps {
  campaigns: Campaign[];
}

export const CampaignTable: React.FC<CampaignTableProps> = ({ campaigns }) => {
  return (
    <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
      <table className="w-full text-sm text-left border-collapse text-gray-700 dark:text-gray-300">
        <thead className="text-xs font-semibold uppercase bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Campaign</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Progress</th>
            <th className="px-6 py-3">Timeline</th>
            <th className="px-6 py-3">Metrics</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => {
            const status = campaign.status || 'pending'; // Default to 'pending' if undefined.
            const statusClasses: Record<string, string> = {
              pending: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
              under_review: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
              in_progress: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
              completed: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
              declined: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
            };

            return (
              <tr
                key={campaign.id}
                className={`border-b transition ${
                  index % 2 === 0
                    ? 'bg-gray-50 dark:bg-gray-800/30'
                    : 'bg-white dark:bg-gray-900/50'
                } hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{campaign.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{campaign.description}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                      statusClasses[status]
                    }`}
                  >
                    {status.replace('_', ' ')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full dark:bg-gray-700 relative group">
                      <div
                        className="h-2 bg-blue-500 rounded-full"
                        style={{ width: `${campaign.progress}%` }}
                      />
                      <div className="absolute top-0 left-0 w-full h-full hidden group-hover:flex items-center justify-center text-xs text-white bg-black/60 rounded-full">
                        {campaign.progress}%
                      </div>
                    </div>
                    <span className="text-xs">{campaign.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs">
                    <div>{format(new Date(campaign.startDate), 'MMM d, yyyy')}</div>
                    <div className="text-gray-500 dark:text-gray-400">
                      {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Reach</span>
                      <span>{campaign.metrics?.reach.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">Engagement&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <span>{campaign.metrics?.engagement}%</span>
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

