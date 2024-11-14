import { Search, SlidersHorizontal, BookmarkPlus } from 'lucide-react';
import { Button } from '../common/Button';

interface InfluencerSearchProps {
  value: string;
  onSearch: (query: string) => void;
  activeFilters: {
    niche: string[];
    location: string[];
    followerRange: string[];
    engagementRate: string[];
    verified: boolean;
  };
}

export function InfluencerSearch({ value, onSearch, activeFilters }: InfluencerSearchProps) {
  const activeFilterCount = Object.values(activeFilters).flat().filter(Boolean).length;

  return (
    <div className="glass-effect rounded-xl p-4">
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name, niche, location..."
            value={value}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <Button
          variant="secondary"
          icon={SlidersHorizontal}
          className="lg:hidden"
        >
          Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
        </Button>
        <Button
          variant="primary"
          icon={BookmarkPlus}
        >
          Save Search
        </Button>
      </div>

      {/* Active Filters */}
      {activeFilterCount > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            if (!value || (Array.isArray(value) && value.length === 0)) return null;
            return Array.isArray(value) ? value.map((v) => (
              <span
                key={`${key}-${v}`}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
              >
                {v}
                <button
                  onClick={() => {
                    // Implement remove filter logic
                  }}
                  className="ml-2 hover:text-indigo-600"
                >
                  ×
                </button>
              </span>
            )) : (
              <span
                key={key}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300"
              >
                {key}: {String(value)}
                <button
                  onClick={() => {
                    // Implement remove filter logic
                  }}
                  className="ml-2 hover:text-indigo-600"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}