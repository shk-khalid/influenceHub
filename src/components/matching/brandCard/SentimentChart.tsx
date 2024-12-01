import { motion } from 'framer-motion';

interface SentimentChartProps {
  positive: number;
  neutral: number;
  negative: number;
}

export const SentimentChart = ({ positive, neutral, negative }: SentimentChartProps) => {
  const total = positive + neutral + negative;

  return (
    <div className="space-y-3">
      <div className="h-4 bg-gray-100 dark:bg-dark-900/50 rounded-full overflow-hidden flex">
        <motion.div
          className="bg-green-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(positive / total) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        <motion.div
          className="bg-yellow-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(neutral / total) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        />
        <motion.div
          className="bg-red-500 h-full"
          initial={{ width: 0 }}
          animate={{ width: `${(negative / total) * 100}%` }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-gray-600 dark:text-gray-400">Positive ({positive}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-gray-600 dark:text-gray-400">Neutral ({neutral}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-gray-600 dark:text-gray-400">Negative ({negative}%)</span>
        </div>
      </div>
    </div>
  );
};