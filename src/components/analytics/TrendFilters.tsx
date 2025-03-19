import { Search, Filter, RefreshCcw, X } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { cn } from '../../lib/Utils';
import { TrendCategory, SortOption } from '../../components/types/trend';

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

const categories: { value: TrendCategory; label: string }[] = [
  { value: 'all', label: 'All Categories' },
  { value: 'technology', label: 'Technology' },
  { value: 'food', label: 'Food' },
  { value: 'fashion', label: 'Fashion' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'travel', label: 'Travel' },
  { value: 'gaming', label: 'Gaming' }
];

const sortOptions = [
  { value: 'latest', label: 'Latest First' },
  { value: 'growth', label: 'Highest Growth' },
  { value: 'volume', label: 'Highest Volume' }
];

export function TrendFilters({
  searchTerm,
  selectedCategory,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onRefresh,
  isLoading
}: TrendFiltersProps) {
  return (
    <div
      className="
        mb-8 
        bg-white/80 dark:bg-gray-800/50 
        backdrop-blur-lg 
        rounded-xl 
        shadow-lg dark:shadow-gray-900/30 
        p-4 sm:p-6 
        space-y-4 
        border border-gray-200/50 dark:border-gray-700/50 
        transition-shadow 
        hover:shadow-xl
      "
    >
      {/* Search and Refresh Section */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search trends..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="h-5 w-5 text-gray-400" />}
            className="focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-colors duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onRefresh}
            disabled={isLoading}
            variant="secondary"
            className="flex items-center gap-2 px-4 py-2 text-sm"
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
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
              key={category.value}
              variant={selectedCategory === category.value ? 'primary' : 'outline'}
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                'transition-transform duration-200',
                selectedCategory === category.value
                  ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'border-teal-500 hover:bg-teal-400 dark:border-rose-400 dark:hover:bg-rose-500'
              )}
            >
              {category.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Sort Options */}
      <div>
        <div className="flex items-center gap-2 mb-2 px-1">
          <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Sort By</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <Button
              key={option.value}
              variant={sortBy === option.value ? 'primary' : 'outline'}
              onClick={() => onSortChange(option.value as SortOption)}
              className={cn(
                'transition-transform duration-200',
                sortBy === option.value
                  ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400'
                  : 'border-teal-500 hover:bg-teal-400 dark:border-rose-400 dark:hover:bg-rose-500'
              )}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
