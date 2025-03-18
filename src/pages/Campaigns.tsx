import React, { useEffect, useMemo } from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import BoardColumn from '../components/campaigns/board/BoardColumn';
import { useCampaignStore } from '../hooks/useCampaign';
import SearchBar from '../components/campaigns/visuals/SearchBar';
import CampaignOverview from '../components/campaigns/visuals/CampaignOverview';
import { Layout } from '../components/layout/Layout';
import { motion } from 'framer-motion';
import type { CampaignStatus } from '../components/types';

const Campaign: React.FC = () => {
  const {
    fetchCampaigns,
    updateCampaignStatus,
    getFilteredCampaigns,
  } = useCampaignStore();

  // Load dynamic data on mount
  useEffect(() => {
    fetchCampaigns();
  }, [fetchCampaigns]);

  const campaigns = getFilteredCampaigns();

  const columns = useMemo(() => ({
    pending: campaigns.filter((c) => c.status === 'pending'),
    under_review: campaigns.filter((c) => c.status === 'under_review'),
    in_progress: campaigns.filter((c) => c.status === 'in_progress'),
    completed: campaigns.filter((c) => c.status === 'completed'),
  }), [campaigns]);

  const columnConfig: Record<CampaignStatus, { title: string; color: 'yellow' | 'blue' | 'green' | 'purple' }> = {
    pending: { title: 'Pending', color: 'yellow' },
    under_review: { title: 'Under Review', color: 'blue' },
    in_progress: { title: 'In Progress', color: 'green' },
    completed: { title: 'Completed', color: 'purple' },
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;
    if (destination) {
      updateCampaignStatus(draggableId, destination.droppableId as CampaignStatus);
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <header className="relative mb-20 text-center">
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
            Campaign Overview
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Analyze and manage your ongoing campaigns effectively.
          </motion.p>
        </header>
        <div className="mb-8 space-y-6">
          <SearchBar />
          <CampaignOverview />
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {Object.entries(columns).map(([status, campaigns]) => (
              <BoardColumn
                key={status}
                title={columnConfig[status as keyof typeof columnConfig].title}
                campaigns={campaigns}
                droppableId={status}
                color={columnConfig[status as keyof typeof columnConfig].color}
              />
            ))}
          </div>
        </DragDropContext>
      </motion.div>
    </Layout>
  );
};

export default Campaign;
