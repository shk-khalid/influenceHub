import React, { useEffect } from 'react';
import { BrandList } from '../components/insights/BrandList';
import { BrandDetails } from '../components/insights/BrandDetails';
import { Brand } from '../components/types';
import { ArrowLeft } from 'lucide-react';
import { useBrandService } from '../hooks/useBrand';

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
            <BrandDetails brand={selectedBrand} />
          </div>
        ) : (
          <BrandList 
            brands={brands} 
            onSelectBrand={handleSelectBrand}
          />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm
                         flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 dark:border-blue-400 
                            border-t-transparent rounded-full" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};