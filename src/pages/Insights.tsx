import React, { useState } from 'react';
import { BrandList } from '../components/insights/BrandList';
import { BrandDetails } from '../components/insights/BrandDetails';
import { Brand } from '../components/types';
import { ArrowLeft } from 'lucide-react';
import { mockBrands } from '../data/mockBrand';
import { Layout } from '../components/layout/Layout';

export const Insights: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  return (
    <Layout>
        <div className="min-h-screen max-w-7xl mx-auto px-4 py-8">
          {selectedBrand ? (
            <div className="space-y-6 animate-fadeIn">
              <button
                onClick={() => setSelectedBrand(null)}
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
              brands={mockBrands}
              onSelectBrand={setSelectedBrand}
            />
          )}
        </div>
    </Layout>
  );
};