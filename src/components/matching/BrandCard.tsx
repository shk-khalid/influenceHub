import { motion } from 'framer-motion';
import { MapPin, Star, Building, Zap } from 'lucide-react';
import { Brand } from '../types';
import { BrandMetrics } from './brandCard/BrandMetrics';
import { BrandDemographics } from './brandCard/BrandDemographics';
import { BrandTrends } from './brandCard/BrandTrends';
import { BrandValueChart } from './brandCard/BrandValueChart';
import { CompetitorsList } from './brandCard/CompetitorList';
import { Button } from '../common/Button';

interface BrandCardProps {
  brand: Brand;
  onAccept: (brand: Brand) => void;
  onDecline: (brand: Brand) => void;
}

export const BrandCard = ({ brand, onAccept, onDecline }: BrandCardProps) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 max-w-2xl w-full border border-gray-200 dark:border-gray-700 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Brand Header */}
      <div className="flex items-start gap-6 mb-8">
        <div className="relative">
          <motion.img
            src={brand.logo}
            alt={brand.name}
            className="w-24 h-24 rounded-xl object-cover ring-4 ring-blue-100 dark:ring-blue-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium px-2 py-1 rounded-full shadow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {brand.sector}
          </motion.div>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{brand.name}</h3>
            <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-800 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                {brand.rating}
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700 dark:text-gray-400 mb-4">
            <div className="flex items-center gap-1">
              <Building className="w-4 h-4" />
              <span>{brand.sector}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{brand.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Match Score: 92%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Details */}
      <div className="space-y-6 mb-8">
        <BrandMetrics metrics={brand.metrics} sentiment={brand.sentiment} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BrandDemographics demographics={brand.demographics} />
          <CompetitorsList competitors={brand.competitors} />
        </div>
        <BrandValueChart value={brand.value} />
        <BrandTrends trends={brand.sentiment.trends} keywords={brand.sentiment.keywords} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          variant="outline"
          className="flex-1 border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400"
          onClick={() => onDecline(brand)}
        >
          Skip
        </Button>
        <Button
          variant="primary"
          className="flex-1 bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 transition-transform duration-200"
          onClick={() => onAccept(brand)}
        >
          Connect
        </Button>
      </div>
    </motion.div>
  );
};
