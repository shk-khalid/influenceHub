import React, { useEffect } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import BoardColumn from '../components/campaigns/board/BoardColumn';
import { useCampaignStore } from '../components/campaigns/CampaignStore';
import SearchBar from '../components/campaigns/visuals/SearchBar';
import DashboardOverview from '../components/campaigns/visuals/CampaignOverview';
import { Layout } from '../components/layout/Layout';

// Define allowed values for 'status' to ensure type safety.
type CampaignStatus = 'pending' | 'under_review' | 'in_progress' | 'completed';

// Interface for a campaign.
interface Campaign {
  id: string;
  title: string;
  brand: string;
  description: string;
  goals: string[];
  deliverables: string[];
  startDate: string;
  endDate: string;
  budget: number;
  status: CampaignStatus;
  platforms: string[];
  requirements: string[];
  priority: 'high' | 'medium' | 'low';
  progress: number;
}

const Campaign: React.FC = () => {
  const { campaigns, setCampaigns, updateCampaignStatus, getFilteredCampaigns } = useCampaignStore();

  // Mock campaigns with type safety.
  const mockCampaigns: Campaign[] = [
    {
      id: '1',
      title: 'Summer Fashion Collection',
      brand: 'StyleCo',
      description: 'Promote our new summer collection',
      goals: ['Increase brand awareness', 'Drive sales'],
      deliverables: ['Instagram post', 'TikTok video', 'Story series'],
      startDate: '2024-03-15',
      endDate: '2024-04-15',
      budget: 2500,
      status: 'in_progress',
      platforms: ['Instagram', 'TikTok'],
      requirements: ['Min 10k followers', 'Fashion niche'],
      priority: 'high',
      progress: 65,
    },
    {
      id: '2',
      title: 'Fitness App Launch',
      brand: 'FitTech',
      description: 'Launch campaign for new fitness app',
      goals: ['App downloads', 'User engagement'],
      deliverables: ['YouTube review', 'Instagram stories'],
      startDate: '2024-03-20',
      endDate: '2024-04-20',
      budget: 3000,
      status: 'pending',
      platforms: ['YouTube', 'Instagram'],
      requirements: ['Fitness focus', 'Min 20k followers'],
      priority: 'medium',
      progress: 0,
    },
  ];

  // Load mock campaigns on component mount.
  useEffect(() => {
    setCampaigns(mockCampaigns);
  }, [setCampaigns]);

  // Handle drag and drop actions.
  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateCampaignStatus(draggableId, destination.droppableId as CampaignStatus);
  };

  // Filter campaigns into columns.
  const filteredCampaigns = getFilteredCampaigns();
  const columns = {
    pending: filteredCampaigns.filter((c) => c.status === 'pending'),
    under_review: filteredCampaigns.filter((c) => c.status === 'under_review'),
    in_progress: filteredCampaigns.filter((c) => c.status === 'in_progress'),
    completed: filteredCampaigns.filter((c) => c.status === 'completed'),
  };

  return (
    <Layout>
      <div>
        <div className="mb-8 space-y-6">
          <SearchBar />
          <DashboardOverview />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <BoardColumn
              title="Pending"
              campaigns={columns.pending}
              droppableId="pending"
              color="yellow"
            />
            <BoardColumn
              title="Under Review"
              campaigns={columns.under_review}
              droppableId="under_review"
              color="blue"
            />
            <BoardColumn
              title="In Progress"
              campaigns={columns.in_progress}
              droppableId="in_progress"
              color="green"
            />
            <BoardColumn
              title="Completed"
              campaigns={columns.completed}
              droppableId="completed"
              color="purple"
            />
          </div>
        </DragDropContext>
      </div>
    </Layout>
  );
};

export default Campaign;