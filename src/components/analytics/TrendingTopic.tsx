import { useEffect } from 'react';
import { useTrendStore } from '../../hooks/useTrend';
import { TrendFilters } from '../analytics/TrendFilters';
import { TrendCard } from '../analytics/TrendingCard';
import { Pagination } from '../common/pagination';

export default function TrendingTopics() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    page,
    setPage,
    totalPages,
    refresh,
    isLoading,
    fetchTrends,
    filteredTrends
  } = useTrendStore();

  useEffect(() => {
    fetchTrends();
  }, [fetchTrends]);

  const trends = filteredTrends();

  return (
    <div className="space-y-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold gradient-text mb-2">Trend Analysis Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Track and analyze real-time trending topics across different categories
        </p>
      </header>

      <TrendFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
        onSortChange={setSortBy}
        onRefresh={refresh}
        isLoading={isLoading}
      />

      <div className="space-y-4">
        {trends.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 dark:text-gray-400">
              {isLoading ? 'Loading trends...' : 'No trends found'}
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-4">
              {trends.map((trend) => (
                <TrendCard key={trend.id} trend={trend} />
              ))}
            </div>
            
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}