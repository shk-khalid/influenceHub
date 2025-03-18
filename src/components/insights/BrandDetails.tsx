import React from 'react';
import { BrandDetail } from '../types/brand';
import { BrandOverview } from './BrandOverview';
import { MetricsCard } from './cards/MetricsCard';
import { CompetitorsCard } from './cards/CompetitorCard';
import { DemographicsCard } from './cards/DemographicsCard';
import { ValueHistoryCard } from './cards/ValueHistoryCard';
import { SocialStatsCard } from './cards/SocialStatsCard';
import { SocialPostsCard } from './cards/SocialPostsCard';

interface BrandDetailsProps {
  brand: BrandDetail;
  loading?: boolean;
}

export function BrandDetails ({ brand, loading = false }: BrandDetailsProps) {
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
        {brand.performance_metrics && <MetricsCard brand={brand} />}
        <CompetitorsCard brand={brand} />
        <ValueHistoryCard brand={brand} />
        <DemographicsCard brand={brand} />

        {brand.social_stats && (
          <>
            <SocialStatsCard stats={brand.social_stats} />

            {/* This div now spans two columns at md (≥768px) and above */}
            <div className="col-span-1 md:col-span-2">
              <SocialPostsCard posts={brand.social_stats.brand_posts} />
            </div>
          </>
        )}
      </div>
    </div>

  );
};