// Insights.tsx
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrandList } from '../components/insights/BrandList';
import { useBrandService } from '../hooks/useBrand';
import BrandDetailsPage from '../components/insights/BrandDetails';

export const Insights: React.FC = () => {
  const { brands, fetchBrands, loading, error } = useBrandService();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 
                      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                      transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 
                         rounded-xl p-6 text-center">
            <p className="text-red-600 dark:text-red-400 mb-4">{error.message}</p>
            <button
              onClick={fetchBrands}
              className="px-4 py-2 bg-red-600 dark:bg-red-700 text-white rounded-lg
                       hover:bg-red-700 dark:hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          {/* Brand list view */}
          <Route
            path="/"
            element={<BrandList brands={brands} loading={loading} />}
          />
          {/* Brand details view */}
          <Route path=":id" element={<BrandDetailsPage />} />
        </Routes>
      </div>
    </div>
  );
};
