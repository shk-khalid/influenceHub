import { motion } from 'framer-motion';
import { Building2, Target, DollarSign, MapPin, Star } from 'lucide-react';
import { Brand } from '../types';
import { MatchStrengthIndicator } from './MatchStrengthIndicator';

interface BrandCardProps {
  brand: Brand;
  onAccept: (brand: Brand) => void;
  onDecline: (brand: Brand) => void;
}

export const BrandCard = ({ brand, onAccept, onDecline }: BrandCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header: Brand Logo and Info */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={brand.logo}
          alt={brand.name}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{brand.name}</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 size={16} />
            <span className="text-sm">{brand.sector}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span className="text-sm">{brand.location}</span>
          </div>
        </div>
      </div>

      {/* Brand Rating */}
      <div className="mb-4 flex items-center gap-2">
        <Star size={16} className="text-yellow-500" />
        <span className="text-gray-700 text-sm">Rating: {brand.rating.toFixed(1)}/5</span>
      </div>

      {/* Value Over Time */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Brand Value Over Time:</p>
        <ul className="text-gray-600 text-sm">
          {brand.value.map((entry) => (
            <li key={entry.year}>
              {entry.year}: ${entry.amount.toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      {/* Demographics */}
      <div className="mb-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Target Demographics:</p>
        <div className="text-gray-600 text-sm">
          <p>Male: {brand.demographics.gender.male}%</p>
          <p>Female: {brand.demographics.gender.female}%</p>
          <p>Other: {brand.demographics.gender.other}%</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-700">
          <Target size={16} />
          <span>Engagement Rate: {brand.metrics.engagementRate.toFixed(2)}%</span>
        </div>
        <div className="flex items-center gap-2 text-gray-700">
          <DollarSign size={16} />
          <span>Market Share: {brand.metrics.marketShare.toFixed(2)}%</span>
        </div>
      </div>

      {/* Sentiment Analysis */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Sentiment Analysis:</p>
        <ul className="text-gray-600 text-sm">
          <li>Positive: {brand.sentiment.positive}%</li>
          <li>Neutral: {brand.sentiment.neutral}%</li>
          <li>Negative: {brand.sentiment.negative}%</li>
        </ul>
        <p className="text-gray-600 text-sm mt-2">
          Keywords: {brand.sentiment.keywords.join(', ')}
        </p>
        <p className="text-gray-600 text-sm mt-1">
          Trends: {brand.sentiment.trends.join(', ')}
        </p>
      </div>

      {/* Match Strength Indicator */}
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Match Strength</p>
        <MatchStrengthIndicator strength={brand.metrics.engagementRate} size="lg" />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={() => onDecline(brand)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Skip
        </button>
        <button
          onClick={() => onAccept(brand)}
          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Connect
        </button>
      </div>
    </motion.div>
  );
};
