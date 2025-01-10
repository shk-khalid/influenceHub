import React from 'react';
import { BrandDetail } from '../types/brand';
import { BrandOverview } from './BrandOverview';
import { MetricsCard } from './cards/MetricsCard';
import { CompetitorsCard } from './cards/CompetitorCard';
import { DemographicsCard } from './cards/DemographicsCard';
import { ValueHistoryCard } from './cards/ValueHistoryCard';

interface BrandDetailsProps {
  brand: BrandDetail;
  loading?: boolean;
}

export const BrandDetails: React.FC<BrandDetailsProps> = ({ brand, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-6 animate-fadeIn">
        <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                      border border-gray-200/50 dark:border-gray-700/50 animate-pulse">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-700" />
            <div className="flex-1">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <BrandOverview brand={brand} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MetricsCard brand={brand} />
        <CompetitorsCard brand={brand} />
        <DemographicsCard brand={brand} />
        <ValueHistoryCard brand={brand} />
      </div>
    </div>
  );
};