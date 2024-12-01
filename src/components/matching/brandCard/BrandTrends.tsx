import { TrendingUp, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

interface BrandTrendsProps {
  trends: string[];
  keywords: string[];
}

export const BrandTrends = ({ trends, keywords }: BrandTrendsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Trending Topics</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {trends.map((trend, index) => (
            <motion.span
              key={trend}
              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {trend}
            </motion.span>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-3">
          <Hash className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Popular Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((keyword, index) => (
            <motion.span
              key={keyword}
              className="px-2 py-1 bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 rounded-full text-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {keyword}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
};