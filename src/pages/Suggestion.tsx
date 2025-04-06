import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { Brand } from '../components/types/brand';
import { BrandCard } from '../components/suggestion/BrandCard';
import { ActivityFeed } from '../components/suggestion/ActivityFeed';
import { suggestionService } from '../services/sugesstionService';
import { LoadingPulse } from '../components/common/LoadingPulse';


export const BrandMatchingDashboard = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);
  const [suggestedBrands, setSuggestedBrands] = useState<Brand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<String | null>(null);

  useEffect(() => {
    fetchSuggestedBrands();
  }, []);

  const fetchSuggestedBrands = async () => {
    try {
      setIsLoading(true);
      const response = await suggestionService.getSuggestedBrands()
      setSuggestedBrands(response.suggested_brands);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch brand suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = async (brand: Brand) => {
    try {
      await suggestionService.respondToBrand(brand.id, 'accept');
      setCurrentBrandIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to accept brand:', err);
    }
  };

  const handleDecline = async (brand: Brand) => {
    try {
      await suggestionService.respondToBrand(brand.id, 'decline');
      setCurrentBrandIndex((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to decline brand:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {/* Custom Loader */}
        <LoadingPulse count={3} sizeClass="w-4 h-4" gapClass="space-x-3" duration={1500} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button
            onClick={fetchSuggestedBrands}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
            {currentBrandIndex < suggestedBrands.length ? (
                <BrandCard
                  key={suggestedBrands[currentBrandIndex].id}
                  brand={suggestedBrands[currentBrandIndex]}
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