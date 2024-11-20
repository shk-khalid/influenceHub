import { useState } from 'react';
import { Search, Filter, Plus, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import CreateCampaignModal from '../modal/CreateCampaign';
import { useCampaignStore } from '../CampaignStore';

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { filters, setFilters } = useCampaignStore();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  const handleSort = (sortBy: 'date' | 'budget' | 'priority') => {
    setFilters({
      sortBy,
      sortDirection: filters.sortBy === sortBy && filters.sortDirection === 'desc' ? 'asc' : 'desc',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search campaigns..."
              value={filters.search}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 text-gray-400 hover:text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                showFilters ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>
            
            <button 
              onClick={() => setShowSort(!showSort)}
              className={`p-2 text-gray-400 hover:text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                showSort ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <select
            value={filters.platform}
            onChange={(e) => handleFilterChange('platform', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Platforms</option>
            <option value="instagram">Instagram</option>
            <option value="tiktok">TikTok</option>
            <option value="youtube">YouTube</option>
          </select>

          <select
            value={filters.priority}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <select
            value={filters.budgetRange}
            onChange={(e) => handleFilterChange('budgetRange', e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="">All Budgets</option>
            <option value="0-1000">$0 - $1,000</option>
            <option value="1000-5000">$1,000 - $5,000</option>
            <option value="5000+">$5,000+</option>
          </select>
        </div>
      )}

      {showSort && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleSort('date')}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                filters.sortBy === 'date'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Date
              {filters.sortBy === 'date' && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleSort('budget')}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                filters.sortBy === 'budget'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Budget
              {filters.sortBy === 'budget' && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleSort('priority')}
              className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                filters.sortBy === 'priority'
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
                  : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
              }`}
            >
              Priority
              {filters.sortBy === 'priority' && (
                <ArrowUpDown className="ml-1 h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}

      <CreateCampaignModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}