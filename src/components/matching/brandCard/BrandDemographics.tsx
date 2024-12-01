import { Users } from 'lucide-react';
import { Brand } from '../../types';
import { motion } from 'framer-motion';

interface BrandDemographicsProps {
  demographics: Brand['demographics'];
}

export const BrandDemographics = ({ demographics }: BrandDemographicsProps) => {
  const total = Object.values(demographics.gender).reduce((acc, val) => acc + val, 0);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Audience Demographics
        </h3>
      </div>

      {/* Demographics Data */}
      <div className="space-y-4">
        {Object.entries(demographics.gender).map(([gender, percentage], index) => (
          <motion.div
            key={gender}
            className="space-y-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, ease: 'easeOut' }}
            role="region"
            aria-label={`${gender} demographic percentage`}
          >
            {/* Gender and Percentage */}
            <div className="flex justify-between text-sm font-medium">
              <span className="capitalize text-gray-700 dark:text-gray-300">{gender}</span>
              <span className="text-gray-900 dark:text-gray-100">
                {((percentage / total) * 100).toFixed(1)}%
              </span>
            </div>

            {/* Progress Bar */}
            <div className="relative h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(percentage / total) * 100}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
