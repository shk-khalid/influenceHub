import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import {
  Edit2,
  Calendar,
  FileText,
  IndianRupeeIcon,
  // Some brand icons may show deprecation warnings, but still work
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  Youtube as YoutubeIcon,
  MessageSquare as DiscordIcon,
} from 'lucide-react';
import { Campaign } from '../../types/campaign';
import EditCampaignModal from '../modal/EditCampaign';

interface CampaignCardProps {
  campaign: Campaign;
  index: number;
}

export default function CampaignCard({ campaign, index }: CampaignCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusColors: Record<string, string> = {
    pending: 'bg-yellow-500',
    under_review: 'bg-blue-500',
    in_progress: 'bg-green-500',
    completed: 'bg-purple-500',
    declined: 'bg-red-500',
  };

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  // Map each platform to a Lucide icon component
  const platformIcons: Record<string, React.ElementType> = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    discord: DiscordIcon,
    youtube: YoutubeIcon,
  };

  // Assign color classes for each platform
  const platformColors: Record<string, string> = {
    facebook: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    instagram: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
    twitter: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
    discord: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
    youtube: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  // Convert the single "platform" string to an array for the UI
  const platformsArray = campaign.platform ? [campaign.platform.toLowerCase()] : [];

  return (
    <>
      <Draggable draggableId={String(campaign.id)} index={index}>

        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm transition-all border border-gray-200 dark:border-gray-700
              ${snapshot.isDragging ? 'shadow-xl ring-2 ring-blue-500' : 'hover:shadow-md'}`}
          >
            <div className="p-5 space-y-4">
              {/* Row 1: Title & Priority */}
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                    {campaign.title || 'Untitled Campaign'}
                  </h2>
                </div>
                {campaign.priority && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap ${priorityColors[campaign.priority]}`}
                  >
                    {campaign.priority.toUpperCase()}
                  </span>

                )}
              </div>

              {/* Row 2: Start-End Date & Status */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm text-gray-700 dark:text-gray-300 pr-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {campaign.startDate && campaign.endDate
                      ? `${new Date(campaign.startDate).toLocaleDateString()} - ${new Date(
                        campaign.endDate
                      ).toLocaleDateString()}`
                      : 'No Date Specified'}
                  </span>
                </div>
                {campaign.status && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-medium text-white whitespace-nowrap ${statusColors[campaign.status] ?? 'bg-gray-500'
                      }`}
                  >
                    {campaign.status.replace('_', ' ').toUpperCase()}
                  </span>

                )}
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-1 mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                  <FileText className="w-4 h-4" />
                  <span>Description</span>
                </div>
                <div className="text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-3 rounded-md min-h-[80px]">
                  {campaign.description || 'No description provided.'}
                </div>
              </div>

              {/* Row 3: Budget & Platform */}
              <div className="flex justify-between items-start gap-4">
                {/* Budget */}
                <div className="flex-1">
                  <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <IndianRupeeIcon className="w-4 h-4" />
                    <span>Budget</span>
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-200">
                    ₹{campaign.budget ? campaign.budget.toLocaleString() : '0'}
                  </span>
                </div>

                {/* Platform(s) */}
                <div className="flex-1">
                  <span className="block mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    Platform
                  </span>
                  {platformsArray.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {platformsArray.map((platform) => {
                        const Icon = platformIcons[platform];
                        const colorClasses = platformColors[platform] || 'bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-200';

                        return (
                          <span
                            key={platform}
                            className={`flex items-center px-2 py-1 text-xs rounded-full ${colorClasses}`}
                          >
                            {Icon && <Icon className="w-3 h-3 mr-1" />}
                            {platform}
                          </span>
                        );
                      })}
                    </div>
                  ) : (
                    <span className="text-sm text-gray-700 dark:text-gray-200">No Platform</span>
                  )}
                </div>
              </div>
            </div>

            {/* Edit Button (Bottom) */}
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center justify-center w-full gap-2 p-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors rounded-b-xl"
            >
              <Edit2 className="w-4 h-4" />
              Edit Campaign
            </button>
          </div>
        )}
      </Draggable>

      {/* Edit Modal */}
      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        campaign={campaign}
      />
    </>
  );
}
