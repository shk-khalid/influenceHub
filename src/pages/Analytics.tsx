import React, { useState } from 'react';
import { BarChart2, Calendar, Users } from 'lucide-react';
import clsx from 'clsx';
import TrendingTopics from '../components/analytics/TrendingTopic';
import SeasonalInsights from '../components/analytics/SeasonalInsights';
import CompetitorMonitoring from '../components/analytics/CompetitorMonitoring';
import { Tab } from '../components/types';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';


const tabs: Tab[] = [
  { id: 'trends', name: 'Trending Topics', icon: BarChart2, gradient: 'from-indigo-50 to-purple-50' },
  { id: 'seasonal', name: 'Seasonal Insights', icon: Calendar, gradient: 'from-rose-50 to-orange-50' },
  { id: 'competitors', name: 'Competitor Monitoring', icon: Users, gradient: 'from-blue-50 to-cyan-50' },
];

const Analytic: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');



  return (
    <Layout>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="relative mb-20 text-center">
          <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
          <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
            Trend Analysis
          </motion.h1>
          <motion.p className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            Uncover key insights and track emerging patterns for informed decision-making.
          </motion.p>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={clsx(
                  'flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 transform hover:scale-105',
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-lg hover:shadow-indigo-500/25 dark:hover:shadow-indigo-400/25 border border-indigo-100 dark:border-indigo-900'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50 hover:text-gray-800 dark:hover:text-gray-200'
                )}
              >
                <tab.icon
                  className={clsx(
                    'h-5 w-5 mr-2',
                    activeTab === tab.id ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-gray-500'
                  )}
                />
                {tab.name}
              </button>
            ))}
          </div>

          <div className="space-y-8 animate-fade-in">
            {activeTab === 'trends' && <TrendingTopics />}
            {activeTab === 'seasonal' && <SeasonalInsights />}
            {activeTab === 'competitors' && <CompetitorMonitoring />}
          </div>
        </main>
      </motion.div>
    </Layout>
  );
};

export default Analytic;
