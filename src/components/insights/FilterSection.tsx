import React from 'react';
import { Search, Building2, X } from 'lucide-react';

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedSector: string | null;
  setSelectedSector: (sector: string | null) => void;
  sectors: string[];
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  searchTerm,
  setSearchTerm,
  selectedSector,
  setSelectedSector,
  sectors
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl 
                    shadow-lg dark:shadow-gray-900/30 p-4 sm:p-6 space-y-4
                    border border-gray-200/50 dark:border-gray-700/50">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 
                         text-gray-400 dark:text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search brands by name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50
                   bg-white/50 dark:bg-gray-900/50 text-gray-900 dark:text-white
                   focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800/25
                   transition-all duration-300 text-sm sm:text-base backdrop-blur-sm
                   placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                     text-gray-400 hover:text-gray-600 dark:text-gray-500 
                     dark:hover:text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Sector Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Building2 className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sectors</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedSector(null)}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300
              ${!selectedSector 
                ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md dark:shadow-blue-500/20' 
                : 'bg-gray-100/80 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/70'}`}
          >
            All
          </button>
          {sectors.map(sector => (
            <button
              key={sector}
              onClick={() => setSelectedSector(sector)}
              className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300
                ${selectedSector === sector 
                  ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md dark:shadow-blue-500/20' 
                  : 'bg-gray-100/80 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600/70'}`}
            >
              {sector}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};