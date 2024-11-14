import { Check, ChevronDown } from 'lucide-react';

interface InfluencerFiltersProps {
  filters: {
    niche: string[];
    location: string[];
    followerRange: string[];
    engagementRate: string[];
    verified: boolean;
  };
  onChange: (filters: InfluencerFiltersProps['filters']) => void;
}

const FILTER_OPTIONS = {
  niche: [
    'Fashion & Style',
    'Beauty',
    'Technology',
    'Gaming',
    'Fitness & Health',
    'Food & Cooking',
    'Travel',
    'Business',
    'Entertainment',
    'Education',
  ],
  location: [
    'Global',
    'North America',
    'Europe',
    'Asia',
    'Australia',
    'South America',
    'Africa',
  ],
  followerRange: [
    '1k-10k',
    '10k-50k',
    '50k-100k',
    '100k-500k',
    '500k-1M',
    '1M+',
  ],
  engagementRate: [
    '> 1%',
    '> 2%',
    '> 3%',
    '> 4%',
    '> 5%',
  ],
};

export function InfluencerFilters({ filters, onChange }: InfluencerFiltersProps) {
  const handleFilterChange = (category: keyof typeof filters, value: string) => {
    const newFilters = { ...filters };
    if (Array.isArray(newFilters[category])) {
      const array = newFilters[category] as string[];
      const index = array.indexOf(value);
      if (index === -1) {
        array.push(value);
      } else {
        array.splice(index, 1);
      }
    } else if (category === 'verified') {
      newFilters.verified = !newFilters.verified;
    }
    onChange(newFilters);
  };

  return (
    <div className="glass-effect rounded-xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
        <button
          onClick={() => onChange({ niche: [], location: [], followerRange: [], engagementRate: [], verified: false })}
          className="text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          Clear all
        </button>
      </div>

      {Object.entries(FILTER_OPTIONS).map(([category, options]) => (
        <div key={category} className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white capitalize">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h3>
            <ChevronDown className="w-4 h-4 text-gray-500" />
          </div>
          <div className="space-y-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group"
              >
                <div
                  className={`
                    w-5 h-5 rounded border transition-colors
                    ${(filters[category as keyof typeof filters] as string[]).includes(option)
                      ? 'bg-indigo-600 border-indigo-600'
                      : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-500'
                    }
                  `}
                >
                  {(filters[category as keyof typeof filters] as string[]).includes(option) && (
                    <Check className="w-4 h-4 text-white mx-auto" />
                  )}
                </div>
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div>
        <label className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-300 cursor-pointer group">
          <div
            className={`
              w-5 h-5 rounded border transition-colors
              ${filters.verified
                ? 'bg-indigo-600 border-indigo-600'
                : 'border-gray-300 dark:border-gray-600 group-hover:border-indigo-500'
              }
            `}
          >
            {filters.verified && <Check className="w-4 h-4 text-white mx-auto" />}
          </div>
          <span>Verified Influencers Only</span>
        </label>
      </div>
    </div>
  );
}