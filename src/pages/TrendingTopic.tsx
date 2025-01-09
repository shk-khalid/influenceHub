import { useEffect } from 'react';
import { useTrendStore } from '../hooks/useTrend';
import { motion } from 'framer-motion';
import { TrendFilters } from '../components/analytics/TrendFilters';
import { TrendCard } from '../components/analytics/TrendingCard';
import { Pagination } from '../components/common/Pagination';
import { Layout } from '../components/layout/Layout';

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
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <header className="relative mb-20 text-center">
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
          />
          <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
            Trend Analysis Dashboard
          </motion.h1>
          <motion.p
            className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            Track and analyze real-time trending topics across different categories
          </motion.p>
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
      </motion.div>
    </Layout>
  );
}