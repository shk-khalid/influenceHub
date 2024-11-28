import React, { useState, useMemo } from 'react';
import { Star, MapPin, Users, TrendingUp } from 'lucide-react';
import { Brand } from '../types';
import { FilterSection } from './FilterSection';

interface BrandListProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
}

export const BrandList: React.FC<BrandListProps> = ({ brands, onSelectBrand }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = useMemo(() =>
    Array.from(new Set(brands.map(brand => brand.sector))),
    [brands]
  );

  const filteredBrands = useMemo(() =>
    brands.filter(brand => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = !selectedSector || brand.sector === selectedSector;
      return matchesSearch && matchesSector;
    }),
    [brands, searchTerm, selectedSector]
  );

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                       bg-gradient-to-r from-gray-900 to-gray-700
                       dark:from-white dark:to-gray-300">
          Brand Insights
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
          Explore detailed insights about various brands and discover their market performance
        </p>
      </div>

      {/* Filter Section */}
      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
        sectors={sectors}
      />

      {/* Brand Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredBrands.map((brand) => (
          <div
            key={brand.id}
            onClick={() => onSelectBrand(brand)}
            className="group bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl 
                       shadow-lg dark:shadow-gray-900/30 overflow-hidden 
                       hover:shadow-xl dark:hover:shadow-gray-900/50 
                       transform hover:-translate-y-1 transition-all duration-300 
                       cursor-pointer animate-fadeIn
                       border border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={brand.logo}
                  alt={`${brand.name} logo`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white 
                                 group-hover:text-blue-600 dark:group-hover:text-blue-400 
                                 transition-colors duration-300">
                    {brand.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{brand.sector}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs sm:text-sm">{brand.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs sm:text-sm">{brand.rating} Rating</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                  <Users className="w-4 h-4 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Market Share</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{brand.metrics.marketShare}%</p>
                </div>
                <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                  <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto mb-1" />
                  <p className="text-xs text-gray-600 dark:text-gray-400">Growth</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {((brand.value[brand.value.length - 1].amount / brand.value[0].amount - 1) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="text-center py-12 bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg 
                         rounded-xl shadow-lg dark:shadow-gray-900/30
                         border border-gray-200/50 dark:border-gray-700/50">
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
            No brands found matching your criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedSector(null);
            }}
            className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white text-sm rounded-lg
                       hover:bg-blue-600 dark:hover:bg-blue-700 transition-all duration-300
                       shadow-md hover:shadow-lg dark:shadow-blue-500/20"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};