import { motion } from 'framer-motion';

interface MatchStrengthIndicatorProps {
  strength: number;
  size?: 'sm' | 'md' | 'lg';
}

export const MatchStrengthIndicator = ({ strength, size = 'md' }: MatchStrengthIndicatorProps) => {
  const sizes = {
    sm: 'w-20 h-1',
    md: 'w-32 h-2',
    lg: 'w-40 h-3',
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`bg-gray-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${strength}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      <span className="text-sm font-medium text-gray-700">{strength}%</span>
    </div>
  );
};