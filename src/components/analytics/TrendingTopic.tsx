
import { Search, TrendingUp, Filter, ExternalLink } from 'lucide-react';
import { useTrendStore } from '../../hooks/useTrend';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { StatCard } from '../common/StatCard';

const categories = ['all', 'Tech', 'Fashion', 'Lifestyle', 'Food'];

export default function TrendingTopics() {
  const {
    filteredTrends,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useTrendStore();

  const trends = filteredTrends();

  return (
    <Card gradient className="p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <TrendingUp className="text-indigo-600 dark:text-indigo-400" />
            Trending Topics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Track real-time social media trends and insights
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Input
            placeholder="Search trends..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={<Search className="text-gray-400" />}
          />
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            options={categories.map((category) => ({
              value: category,
              label: category === 'all' ? 'All Categories' : category,
            }))}
            icon={<Filter />}
          />
        </div>
      </div>

      {trends.length === 0 ? (
        <Card className="text-center">
          <StatCard
            icon={TrendingUp}
            title="No Trends Found"
            description="Try adjusting your search or filter criteria."
            iconColor="text-gray-400"
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <Card
              key={trend.id}
              gradient
              className="hover:scale-105 transition-transform"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:gradient-text">
                  {trend.keyword}
                </h3>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 ${
                    trend.growth > 0
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400'
                  }`}
                >
                  {trend.growth > 0 ? '+' : ''}
                  {trend.growth}%
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Volume</span>
                  <span className="font-semibold">
                    {trend.volume.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Category</span>
                  <span className="font-semibold">{trend.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Region</span>
                  <span className="font-semibold">{trend.region}</span>
                </div>
              </div>
              <Button
                variant="secondary"
                fullWidth
                className="mt-4"
                onClick={() => console.log(`Viewing details for ${trend.keyword}`)}
              >
                View Details
                <ExternalLink className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
