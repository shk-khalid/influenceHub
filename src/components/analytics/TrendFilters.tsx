import React from 'react';
import { Search, Filter, RefreshCcw, ArrowUpDown, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { TrendCategory, SortOption } from '../types';

interface TrendFiltersProps {
  searchTerm: string;
  selectedCategory: TrendCategory;
  sortBy: SortOption;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: TrendCategory) => void;
  onSortChange: (sort: SortOption) => void;
  onRefresh: () => void;
  isLoading: boolean;
}

const categories = [
  'All Categories',
  'Technology',
  'Fashion',
  'Fitness',
  'Travel',
  'Food',
  'Gaming',
];

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'growth', label: 'Highest Growth' },
  { value: 'volume', label: 'Highest Volume' },
];

export const TrendFilters: React.FC<TrendFiltersProps> = ({
  searchTerm,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onRefresh,
  isLoading,
}) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-2xl 
                    shadow-lg dark:shadow-gray-900/30 p-4 sm:p-6 space-y-4
                    border border-gray-200/50 dark:border-gray-700/50">
      {/* Search Input */}
      <div className="relative">
        <Input
          type="text"
          placeholder="Search trends..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          icon={<Search className="h-5 w-5 text-gray-400" />}
          className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 
                       text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Category Filter */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Categories</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              onClick={() => onCategoryChange(category as TrendCategory)}
              className={`transition-transform duration-200 ${selectedCategory === category
                  ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400'
                }`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <ArrowUpDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort By</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map(({ value, label }) => (
            <Button
              key={value}
              variant={sortBy === value ? 'primary' : 'outline'}
              onClick={() => onSortChange(value as SortOption)}
              className={`transition-transform duration-200 ${sortBy === value
                  ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400'
                }`}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end">
        <Button
          onClick={onRefresh}
          disabled={isLoading}
          variant="secondary"
          className="flex items-center gap-2 px-4 py-2 text-sm"
        >
          <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>
    </div>
  );
};
