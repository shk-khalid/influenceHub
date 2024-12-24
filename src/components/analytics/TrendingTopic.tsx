import { useTrendStore } from '../../hooks/useTrend';
import { TrendFilters } from './TrendFilters';
import { TrendList } from './TrendList';

export default function TrendingTopics() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredTrends,
    loadMore,
    hasMore,
    isLoading
  } = useTrendStore();

  const trends = filteredTrends();

  return (
    <div className="space-y-6">
      <TrendFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

      <TrendList
        trends={trends}
        hasMore={hasMore}
        isLoading={isLoading}
        onLoadMore={loadMore}
      />
    </div>
  );
}