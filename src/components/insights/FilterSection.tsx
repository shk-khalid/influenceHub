import React from 'react';
import { Search, Building2, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

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
        <Input
          type='text'
          placeholder='Search Brand by name or location...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="h-5 w-5 text-gray-400" />}
          className='focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200'
        >
        </Input>

        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                     text-gray-400 hover:text-gray-600 transition-colors"
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
          <Button
            variant={!selectedSector ? 'primary' : 'outline'}
            onClick={() => setSelectedSector(null)}
            className={`transition-transform duration-200 ${!selectedSector
                ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400'
                : 'border-teal-500 hover:bg-teal-400  dark:border-rose-400 dark:hover:bg-rose-500 focus:ring-teal-500 dark:focus:ring-rose-400'
              }`}
          >
            All
          </Button>

          {sectors.map((sector) => (
            <Button
              key={sector}
              variant={selectedSector === sector ? 'primary' : 'outline'}
              onClick={() => setSelectedSector(sector)}
              className={`transition-transform duration-200 ${selectedSector === sector
                  ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400'
                }`}
            >
              {sector}
            </Button>
          ))}
        </div>

      </div>
    </div>
  );
};