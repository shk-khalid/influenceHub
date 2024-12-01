import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { Brand } from '../../types';

interface CompetitorsListProps {
  competitors: Brand['competitors'];
}

export const CompetitorsList = ({ competitors }: CompetitorsListProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center gap-2 mb-4">
        <Users2 className="w-4 h-4 text-blue-500" />
        <h3 className="font-medium text-gray-900 dark:text-gray-100">Key Competitors</h3>
      </div>
      <div className="space-y-2">
        {competitors.map((competitor, index) => (
          <motion.div
            key={competitor}
            className="p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <span className="text-sm text-gray-700 dark:text-gray-300">{competitor}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                Direct
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};