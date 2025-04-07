import type { Campaign } from '../types/campaign';
import { format } from 'date-fns';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
  MessageSquare as DiscordIcon,
} from 'lucide-react'; // Adjust your import paths if needed

interface CampaignTableProps {
  campaigns: Campaign[];
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

const platformColors: Record<string, string> = {
  facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
  twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
  discord: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
  youtube: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
};

const platformIcons: Record<string, React.ElementType> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: TwitterIcon,
  discord: DiscordIcon,
  youtube: YoutubeIcon,
};

export function CampaignTable({ campaigns }: CampaignTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Campaign
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Priority
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Budget
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Timeline
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-100 dark:divide-gray-800">
          {campaigns.map((campaign, index) => {
            const status = campaign.status || 'pending';
            const statusClasses: Record<string, string> = {
              pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-300/20 dark:text-yellow-300',
              under_review: 'bg-orange-100 text-orange-800 dark:bg-orange-300/20 dark:text-orange-300',
              in_progress: 'bg-blue-100 text-blue-800 dark:bg-blue-300/20 dark:text-blue-300',
              completed: 'bg-green-100 text-green-800 dark:bg-green-300/20 dark:text-green-300',
              declined: 'bg-red-100 text-red-800 dark:bg-red-300/20 dark:text-red-300',
            };

            // Convert platform to an array (in case of multiple platforms in the future)
            const platformsArray = campaign.platform ? [campaign.platform.toLowerCase()] : [];

            return (
              <tr
                key={campaign.id}
                className={`transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'
                }`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {campaign.title}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {campaign.description}
                    </span>
                    {platformsArray.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {platformsArray.map((platform) => {
                          const Icon = platformIcons[platform];
                          const colorClasses =
                            platformColors[platform] ||
                            'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200';
                          return (
                            <span
                              key={platform}
                              className={`flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full ${colorClasses}`}
                            >
                              {Icon && <Icon className="w-3 h-3" />}
                              {platform}
                            </span>
                          );
                        })}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        No Platform
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold capitalize ${statusClasses[status]}`}
                  >
                    {status.replace('_', ' ')}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {campaign.priority && (
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${
                        priorityColors[campaign.priority.toLowerCase()]
                      }`}
                    >
                      {campaign.priority.toUpperCase()}
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    ₹{campaign.budget ? campaign.budget.toLocaleString() : '0'}
                  </span>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-xs">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {format(new Date(campaign.startDate), 'MMM d, yyyy')}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">
                    {format(new Date(campaign.endDate), 'MMM d, yyyy')}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
