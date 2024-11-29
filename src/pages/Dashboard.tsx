import React from 'react';
import { MetricCard } from '../components/dashboard/MetricsCard';
import { LineChart } from '../components/dashboard/LineChart';
import { CampaignTable } from '../components/dashboard/CampaignTable';
import { DemographicsPanel } from '../components/dashboard/DemographicPanel';
import { Users, DollarSign, BarChart2, Share2, Download } from 'lucide-react';
import { mockCampaigns, performanceData, demographicData } from '../data/mockData';
import { generateCSVReport, downloadReport } from '../lib/ReportGenerator';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { motion } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const handleDownloadReport = () => {
    const csvData = generateCSVReport(mockCampaigns);
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
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <MetricCard
          title="Total Reach"
          value="470K"
          change={12.5}
          icon={<Users className="w-6 h-6 text-blue-500" />}
        />
        <MetricCard
          title="Engagement Rate"
          value="4.5%"
          change={-2.3}
          icon={<Share2 className="w-6 h-6 text-green-500" />}
        />
        <MetricCard
          title="Conversions"
          value="3,650"
          change={8.1}
          icon={<BarChart2 className="w-6 h-6 text-purple-500" />}
        />
        <MetricCard
          title="Total Revenue"
          value="$52,000"
          change={15.2}
          icon={<DollarSign className="w-6 h-6 text-yellow-500" />}
        />
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
            <LineChart data={performanceData} dataKey="value" />
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
              icon={Download}
              onClick={handleDownloadReport}
            >
              Download Report
            </Button>
          </div>
          <div className="overflow-x-auto -mx-4 md:-mx-6">
            <div className="min-w-[800px] px-4 md:px-6">
              <CampaignTable campaigns={mockCampaigns} />
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Demographics Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        <h2 className="text-lg md:text-xl font-semibold">Audience Demographics</h2>
        <DemographicsPanel data={demographicData} />
      </motion.div>
    </motion.div>
  );
};
