import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBrandService } from '../../hooks/useBrand';
import { ArrowLeft } from 'lucide-react';
import { LoadingPulse } from '../common/LoadingPulse';
import { BrandOverview } from './BrandOverview';
import { MetricsCard } from './cards/MetricsCard';
import { CompetitorsCard } from './cards/CompetitorCard';
import { DemographicsCard } from './cards/DemographicsCard';
import { ValueHistoryCard } from './cards/ValueHistoryCard';
import { SocialStatsCard } from './cards/SocialStatsCard';
import { SocialPostsCard } from './cards/SocialPostsCard';

const BrandDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { selectedBrand, fetchBrandById, loading, error } = useBrandService();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchBrandById(id);
    }
  }, [id, fetchBrandById]);

  if (error) {
    return (
      <div className="text-center">
        <p>Error loading brand details: {error.message}</p>
        <button
          onClick={() => navigate('/insights')}
          className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-white/80 dark:bg-gray-800/50 rounded-xl shadow-md backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Brands
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <button
        onClick={() => navigate('/insights')}
        className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors bg-white/80 dark:bg-gray-800/50 rounded-xl shadow-md backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Brands</span>
      </button>
      {loading || !selectedBrand ? (
        <LoadingPulse count={3} sizeClass="w-4 h-4" gapClass="space-x-3" duration={1500} />

      ) : (
        <div className="space-y-6">
          {/* Brand Overview */}
          <BrandOverview brand={selectedBrand} />

          {/* Detailed Metrics, Competitors, Demographics, etc. */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedBrand.performance_metrics && (
              <MetricsCard brand={selectedBrand} />
            )}
            <CompetitorsCard brand={selectedBrand} />
            <ValueHistoryCard brand={selectedBrand} />
            <DemographicsCard brand={selectedBrand} />
            {selectedBrand.social_stats && (
              <>
                <SocialStatsCard stats={selectedBrand.social_stats} />
                <div className="col-span-1 md:col-span-2">
                  <SocialPostsCard posts={selectedBrand.social_stats.brand_posts} />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandDetailsPage;
