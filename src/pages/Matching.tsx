import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Target, BarChart } from 'lucide-react';
import { Brand } from '../components/types';
import { BrandCard } from '../components/matching/BrandCard';
import { InsightCard } from '../components/matching/InsightCard';
import { Layout } from '../components/layout/Layout';
import { mockBrands } from '../data/mockData'; // Import mock data

export const BrandMatchingDashboard = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  const handleAccept = (brand: Brand) => {
    console.log('Accepted brand:', brand);
    setCurrentBrandIndex((prev) => prev + 1);
  };

  const handleDecline = (brand: Brand) => {
    console.log('Declined brand:', brand);
    setCurrentBrandIndex((prev) => prev + 1);
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        {/* Header Section */}
        <header className="relative mb-20 text-center">
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.h1
            className="text-5xl font-extrabold text-gray-800 dark:text-white gradient-text mb-4 relative"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
          >
            Brand Match Making
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Explore collaborations and insights with top brands, tailored just
            for you.
          </motion.p>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Brand Matches Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Brand Matches
            </h2>
            <div className="flex justify-center items-center min-h-[600px]">
              <AnimatePresence mode="wait">
                {currentBrandIndex < mockBrands.length ? (
                  <BrandCard
                    key={mockBrands[currentBrandIndex].id}
                    brand={mockBrands[currentBrandIndex]}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Sparkles className="w-16 h-16 text-indigo-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                      You're all caught up!
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Check back later for new brand matches.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Insights Section */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <InsightCard
                icon={<Users className="w-6 h-6 text-indigo-500" />}
                title="Total Matches"
                value="24"
                trend={{ direction: 'up', value: '+12% this week' }}
              />
              <InsightCard
                icon={<Target className="w-6 h-6 text-indigo-500" />}
                title="Avg. Match Rate"
                value="85%"
                trend={{ direction: 'up', value: '+5% this month' }}
              />
              <InsightCard
                icon={<BarChart className="w-6 h-6 text-indigo-500" />}
                title="Campaign Success"
                value="92%"
              />
            </div>

            {/* Recent Activity Section */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-indigo-500" />
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
                  Recent Activity
                </h2>
              </div>
              <div className="space-y-4">
                {['Electronics', 'Fashion', 'Cosmetics'].map((sector) => (
                  <div
                    key={sector}
                    className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {sector}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {Math.floor(Math.random() * 10) + 1} new matches
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};
