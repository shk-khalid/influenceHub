import React, { useState, useMemo } from 'react';
import { Star, MapPin, Users, TrendingUp } from 'lucide-react';
import { Brand } from '../types/brand';
import { FilterSection } from './FilterSection';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';

interface BrandListProps {
  brands: Brand[];
  onSelectBrand: (brand: Brand) => void;
  loading?: boolean;
}

export const BrandList: React.FC<BrandListProps> = ({
  brands,
  onSelectBrand,
  loading = false
}) => {
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

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl 
                     shadow-lg dark:shadow-gray-900/30 overflow-hidden 
                     border border-gray-200/50 dark:border-gray-700/50
                     animate-pulse"
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gray-200 dark:bg-gray-700" />
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12" >
      {/* Header Section */}
      <header className="relative mb-20 text-center">
        <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
        <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
          Brand Insights
        </motion.h1>
        <motion.p className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          Explore detailed insights about various brands and discover their market performance.
        </motion.p>
      </header>

      <div className="space-y-6">
        <FilterSection
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSector={selectedSector}
          setSelectedSector={setSelectedSector}
          sectors={sectors}
        />

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
                    src={`https://cdn.brandfetch.io/${brand.name.toLowerCase()}.com?c=1idce-XmvJbQiBHXyMA`}
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
                    <span className="text-xs sm:text-sm">{parseFloat(brand.overall_rating).toFixed(1)} Rating</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <Users className="w-4 h-4 text-blue-500 dark:text-blue-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Market Share</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {parseFloat(brand.market_share).toFixed(1)}%
                    </p>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-900/30">
                    <TrendingUp className="w-4 h-4 text-green-500 dark:text-green-400 mx-auto mb-1" />
                    <p className="text-xs text-gray-600 dark:text-gray-400">Growth</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      {parseFloat(brand.growth_percentage).toFixed(1)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredBrands.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg 
                  rounded-xl shadow-lg dark:shadow-gray-900/30
                  border border-gray-200/50 dark:border-gray-700/50 flex flex-col items-center">
              <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4">
                No brands found matching your criteria
              </p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedSector(null);
                }}
                className='bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200'
              >
                Clear filters
              </Button>
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};