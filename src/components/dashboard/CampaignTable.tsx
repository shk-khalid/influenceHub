import { useState, useEffect } from 'react';
import type { Campaign } from '../types/campaign';
import { format } from 'date-fns';
import {
  Download,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
  MessageSquare as DiscordIcon,
} from 'lucide-react';
import { campaignService } from '../../services/campaignService';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';

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

export function CampaignTable() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await campaignService.getAllCampaigns();
        setCampaigns(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch campaigns');
        console.error('Error fetching campaigns:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-4 bg-red-100 text-red-800 rounded-md">
        {error}
      </div>
    );
  }

  // Empty State
  if (!isLoading && campaigns.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-300">
          No Campaigns found.
        </p>
        <Button
          variant="primary"
          icon={<Download className="w-5 h-5" />}
          onClick={() => navigate('/campaigns')}
          className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
        >
          Create a Campaign
        </Button>
      </div>
    );
  }

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
                className={`transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`}
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
                      <div className="flex flex-wrap gap-2 mt-1">
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
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${priorityColors[campaign.priority.toLowerCase()]}`}
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
