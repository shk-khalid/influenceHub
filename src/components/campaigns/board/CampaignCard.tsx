import { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Calendar, Target, Clock, DollarSign, Edit2 } from 'lucide-react';
import { Campaign } from '../../types';
import EditCampaignModal from '../modal/EditCampaign';

interface CampaignCardProps {
  campaign: Campaign;
  index: number;
}

export default function CampaignCard({ campaign, index }: CampaignCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const statusColors = {
    pending: 'bg-yellow-500',
    under_review: 'bg-blue-500',
    in_progress: 'bg-green-500',
    completed: 'bg-purple-500',
    declined: 'bg-red-500',
  };

  const priorityColors = {
    high: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  return (
    <>
      <Draggable draggableId={campaign.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 ${
              snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-3 mr-2">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {campaign.title || 'Untitled Campaign'}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {campaign.brand || 'Unknown Brand'}
                </p>
              </div>
              <div className="flex flex-col space-y-2">
                {campaign.priority && (
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${priorityColors[campaign.priority]}`}>
                    {campaign.priority}
                  </span>
                )}
                {campaign.status && (
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium text-white ${statusColors[campaign.status]}`}>
                    {campaign.status.replace('_', ' ').toUpperCase()}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                <span>
                  {campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : 'No Start Date'}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Target className="w-4 h-4 mr-2" />
                <span>{campaign.goals?.length || 0} Goals</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>{campaign.deliverables?.length || 0} Deliverables</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>${campaign.budget?.toLocaleString() || '0'}</span>
              </div>
            </div>

            {campaign.progress !== undefined && (
              <div className="mt-3">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{campaign.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${campaign.progress}%` }}
                  />
                </div>
              </div>
            )}

            <div className="mt-3 flex flex-wrap gap-1">
              {campaign.platforms?.length
                ? campaign.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                    >
                      {platform}
                    </span>
                  ))
                : <span className="text-sm text-gray-600 dark:text-gray-400">No Platforms</span>}
            </div>

            <button
              onClick={() => setIsEditModalOpen(true)}
              className="mt-3 w-full flex items-center justify-center px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit Campaign
            </button>
          </div>
        )}
      </Draggable>

      <EditCampaignModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        campaign={campaign}
      />
    </>
  );
}
