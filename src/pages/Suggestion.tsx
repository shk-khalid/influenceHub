import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Brand } from '../components/types/brand';
import { BrandCard } from '../components/suggestion/BrandCard';
import { ActivityFeed } from '../components/suggestion/ActivityFeed';
import { mockBrands } from '../data/mockData';

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

      {/* Main Content */}
      <div className="space-y-8">
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-lg p-8 transition-colors duration-300">
          <div className="flex justify-center items-center">
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
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Sparkles className="w-16 h-16 text-blue-500 dark:text-blue-400 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
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

        {/* Activity Feed at Bottom */}
        <ActivityFeed />
      </div>
    </motion.div>
  );
};