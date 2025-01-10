import React, { useEffect } from 'react';
import { BrandList } from '../components/insights/BrandList';
import { BrandDetails } from '../components/insights/BrandDetails';
import { Brand } from '../components/types/brand';
import { ArrowLeft } from 'lucide-react';
import { useBrandService } from '../hooks/useBrand';
import { Layout } from '../components/layout/Layout';

export const Insights: React.FC = () => {
  const {
    brands,
    selectedBrand,
    loading,
    error,
    fetchBrands,
    fetchBrandById,
  } = useBrandService();

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleSelectBrand = async (brand: Brand) => {
    await fetchBrandById(brand.id);
  };

  if (error) {
    return (
      <Layout>
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
      </Layout>
    );
  }

  return (
    <Layout>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {selectedBrand ? (
          <div className="space-y-6 animate-fadeIn">
            <button
              onClick={() => fetchBrands()}
              className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 dark:text-blue-400 
                       hover:text-blue-700 dark:hover:text-blue-300 transition-colors
                       bg-white/80 dark:bg-gray-800/50 rounded-xl shadow-md
                       backdrop-blur-lg border border-gray-200/50 dark:border-gray-700/50
                       hover:shadow-lg group"
            >
              <ArrowLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Back to Brands</span>
            </button>
            <BrandDetails brand={selectedBrand} loading={loading} />
          </div>
        ) : (
          <BrandList
            brands={brands}
            onSelectBrand={handleSelectBrand}
            loading={loading}
          />
        )}
      </div>
    </div>
    </Layout>
  );
};