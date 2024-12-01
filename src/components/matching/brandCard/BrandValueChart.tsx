import { motion } from 'framer-motion';
import { DollarSign, TrendingUp } from 'lucide-react';
import { Brand } from '../../types';

interface BrandValueChartProps {
  value: Brand['value'];
}

export const BrandValueChart = ({ value }: BrandValueChartProps) => {
  const maxValue = Math.max(...value.map(v => v.amount));
  const growth = ((value[1].amount - value[0].amount) / value[0].amount) * 100;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-blue-500" />
          <h3 className="font-medium text-gray-900 dark:text-gray-100">Brand Value Growth</h3>
        </div>
        <div className="flex items-center gap-1 text-sm font-medium text-green-600 dark:text-green-400">
          <TrendingUp className="w-4 h-4" />
          {growth.toFixed(1)}%
        </div>
      </div>
      <div className="space-y-4">
        {value.map((yearData, index) => (
          <motion.div
            key={yearData.year}
            className="space-y-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{yearData.year}</span>
              <span className="text-gray-900 dark:text-gray-100">
                ${(yearData.amount / 1000000).toFixed(1)}M
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-dark-900/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${(yearData.amount / maxValue) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};