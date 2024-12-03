import React, { useState } from 'react';
import { BarChart2, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '../components/layout/Layout';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import TrendingTopics from '../components/analytics/TrendingTopic';
import CompetitorMonitoring from '../components/analytics/CompetitorMonitoring';
import SeasonalInsights from '../components/analytics/SeasonalInsights';

const tabs = [
  { id: 'trends', name: 'Trending Topics', icon: BarChart2 },
  { id: 'seasonal', name: 'Seasonal Insights', icon: Calendar},
  { id: 'competitors', name: 'Competitor Monitoring', icon: Users },
];

const Analytic: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trends');

  return (
    <Layout>
      <div className="max-w-[90rem] mx-auto sm:px-6 py-12">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card className="relative mb-16 text-center">
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
            />
            <motion.h1
              className="text-4xl sm:text-6xl font-bold gradient-text mb-4 relative"
              initial={{ y: 20 }}
              animate={{ y: 0 }}
            >
              Trend Analysis
            </motion.h1>
            <motion.p
              className="text-gray-600 dark:text-gray-400 text-base sm:text-lg relative max-w-2xl mx-auto"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Uncover key insights and track emerging patterns for informed decision-making.
            </motion.p>
          </Card>
        </motion.div>

        <main className="max-w-7xl mx-auto sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'primary' : 'outline'}
                onClick={() => setActiveTab(tab.id)}
                icon={<tab.icon className='w-5 h-5'/>}
              >
                {tab.name}
              </Button>
            ))}
          </div>

          <div className="space-y-8" >
            {activeTab === 'trends' && <TrendingTopics />}
            {activeTab === 'seasonal' && <SeasonalInsights />}
            {activeTab === 'competitors' && <CompetitorMonitoring />}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Analytic;
