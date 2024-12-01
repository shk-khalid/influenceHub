import { TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrendingBrands = () => {
  const trendingBrands = [
    { name: 'TechCorp', sector: 'Electronics', growth: '+28%' },
    { name: 'Fashionista', sector: 'Fashion', growth: '+15%' },
    { name: 'AutoDrive', sector: 'Automobile', growth: '+22%' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-blue-500 dark:text-blue-300" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Trending Brands
          </h2>
        </div>
        <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1">
          View All
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        {trendingBrands.map((brand, index) => (
          <motion.div
            key={brand.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
          >
            <div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                {brand.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {brand.sector}
              </p>
            </div>
            <span className="text-green-600 dark:text-green-400 font-medium">
              {brand.growth}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
