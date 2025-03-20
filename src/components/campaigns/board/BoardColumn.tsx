import { Droppable } from '@hello-pangea/dnd';
import CampaignCard from './CampaignCard';
import { Campaign } from '../../types/campaign';

interface BoardColumnProps {
  title: string;
  campaigns: Campaign[];
  droppableId: string;
  color: 'yellow' | 'blue' | 'green' | 'purple';
}

const colorVariants = {
  yellow: 'bg-yellow-50/50 dark:bg-yellow-900/10',
  blue: 'bg-blue-50/50 dark:bg-blue-900/10',
  green: 'bg-green-50/50 dark:bg-green-900/10',
  purple: 'bg-purple-50/50 dark:bg-purple-900/10',
};

export default function BoardColumn({ title, campaigns, droppableId, color }: BoardColumnProps) {
  return (
    <div className={`rounded-xl p-4 ${colorVariants[color]} backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50`}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-between">
        {title}
        <span className="
          bg-white/70 dark:bg-gray-800/70 
          text-gray-600 dark:text-gray-400 
          text-sm rounded-full px-3 py-1 
          shadow-sm backdrop-blur-sm
          border border-gray-200/50 dark:border-gray-700/50
        ">
          {campaigns.length}
        </span>
      </h3>
      
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`
              min-h-[calc(100vh-12rem)] rounded-xl transition-colors duration-200
              ${snapshot.isDraggingOver ? 'bg-gray-200/30 dark:bg-gray-700/30 ring-2 ring-blue-500/20' : ''}
            `}
          >
            <div className="space-y-4">
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