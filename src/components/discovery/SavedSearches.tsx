import { Bell, Trash2, Clock, Users } from 'lucide-react';

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    niche: string;
    location: string;
    followerRange: string;
    engagementRate: string;
  };
  lastUpdated: string;
  matchCount: number;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onSave: () => void;
}

export function SavedSearches({ searches, onSave }: SavedSearchesProps) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Saved Searches
      </h2>

      <div className="space-y-4">
        {searches.map((search) => (
          <div
            key={search.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <h3 className="font-medium text-gray-900 dark:text-white">
                {search.name}
              </h3>
              <div className="flex items-center space-x-2">
                <button className="p-1 text-gray-400 hover:text-indigo-500 transition-colors">
                  <Bell className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-2 space-y-2">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                Updated {new Date(search.lastUpdated).toLocaleDateString()}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Users className="w-4 h-4 mr-1" />
                {search.matchCount} matches
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(search.criteria).map(([key, value]) => (
                <span
                  key={key}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}