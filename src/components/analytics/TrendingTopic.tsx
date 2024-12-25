import { useTrendStore } from '../../hooks/useTrend';
import { motion } from 'framer-motion';
import { TrendFilters } from './TrendFilters';
import { TrendList } from './TrendList';
import { Layout } from '../layout/Layout';

export default function TrendingTopics() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    filteredTrends,
    loadMore,
    refresh,
    hasMore,
    isLoading
  } = useTrendStore();

  const trends = filteredTrends();

  return (
    <Layout>
      <div className="space-y-6 animate-fadeIn">
        <div className="space-y-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12" >
            {/* Header Section */}
            <header className="relative mb-20 text-center">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
              <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
                Trend Analysis
              </motion.h1>
              <motion.p className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                Uncover key insights and track emerging patterns for informed decision-making.
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

            <TrendList
              trends={trends}
              hasMore={hasMore}
              isLoading={isLoading}
              onLoadMore={loadMore}
            />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
