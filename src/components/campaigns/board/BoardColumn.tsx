import { Droppable } from '@hello-pangea/dnd';
import CampaignCard from './CampaignCard';
import { Campaign } from '../../types';

interface BoardColumnProps {
  title: string;
  campaigns: Campaign[];
  droppableId: string;
  color: 'yellow' | 'blue' | 'green' | 'purple';
}

const colorVariants = {
  yellow: 'bg-yellow-50 dark:bg-yellow-900/10',
  blue: 'bg-blue-50 dark:bg-blue-900/10',
  green: 'bg-green-50 dark:bg-green-900/10',
  purple: 'bg-purple-50 dark:bg-purple-900/10',
};

export default function BoardColumn({ title, campaigns, droppableId, color }: BoardColumnProps) {
  return (
    <div className={`rounded-lg p-4 ${colorVariants[color]}`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
        {title}
        <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-sm rounded-full px-2.5 py-1 shadow-sm">
          {campaigns.length}
        </span>
      </h3>
      
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`min-h-[calc(100vh-12rem)] rounded-lg transition-colors ${
              snapshot.isDraggingOver ? 'bg-gray-200/50 dark:bg-gray-700/50' : ''
            }`}
          >
            <div className="space-y-3">
              {campaigns.map((campaign, index) => (
                <CampaignCard
                  key={campaign.id}
                  campaign={campaign}
                  index={index}
                />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}