import React from 'react';
import { MetricsGrid } from '../components/dashboard/MetricsGrid';
import { CampaignTable } from '../components/dashboard/CampaignTable';
import { Download } from 'lucide-react';
import { campaignsMock } from '../data/mockData';
import { generateCSVReport, downloadReport } from '../lib/ReportGenerator';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';
import { EngagementChart } from '../components/dashboard/EngagementChart';
import { BrandInteractions } from '../components/dashboard/BrandInteraction';

export const Dashboard: React.FC = () => {
  const handleDownloadReport = () => {
    const csvData = generateCSVReport(campaignsMock);
    downloadReport(csvData, `campaign-report-${new Date().toISOString().split('T')[0]}.csv`);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12"
    >
      {/* Header Section */}
      <header className="relative text-center">
        <motion.div
          initial={{ scale: 0.9, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
        />
        <motion.h1
          className="text-6xl font-bold gradient-text mb-4 relative"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          Dashboard Overview
        </motion.h1>
        <motion.p
          className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Monitor key metrics, campaign performance, and audience demographics.
        </motion.p>
      </header>

      {/* Metrics Grid */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <MetricsGrid />
      </motion.div>

      {/* Performance Chart */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <h2 className="text-lg md:text-xl font-semibold mb-4">Performance Overview</h2>
          <div className="h-[300px] md:h-[400px]">
            <EngagementChart />
          </div>
        </Card>
      </motion.div>

      {/* Campaigns Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg md:text-xl font-semibold">Active Campaigns</h2>
            <Button
              variant="primary"
              icon={<Download className='w-5 h-5' />}
              onClick={handleDownloadReport}
              className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
            >
              Download Report
            </Button>
          </div>
          <div className="overflow-x-auto -mx-4 md:-mx-6">
            <div className="min-w-[800px] px-4 md:px-6">
              <CampaignTable />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Brand Interaction Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-lg md:text-xl font-semibold">Brand Interactions</h2>
        <BrandInteractions />
      </motion.div>
    </motion.div>
  );
};
