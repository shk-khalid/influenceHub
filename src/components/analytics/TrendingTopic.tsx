import { Search, TrendingUp, Filter, ExternalLink } from 'lucide-react';
import { useTrendStore } from '../../hooks/useTrend';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import Card from '../common/Card';

const categories = ['all', 'Tech', 'Fashion', 'Lifestyle', 'Food'];

export default function TrendingTopics() {
  const {
    filteredTrends,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  } = useTrendStore();

  const trends = filteredTrends();

  return (
    <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-8 rounded-2xl shadow-lg">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <TrendingUp className="text-indigo-600 dark:text-indigo-400" />
            Trending Topics
          </h2>
          <p className="text-gray-600 dark:text-gray-400">Track real-time social media trends and insights</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Input
            label=""
            placeholder="Search trends..."
            icon={<Search className="text-gray-400 w-5 h-5" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Input
            label=""
            isSelect
            icon={<Filter className="text-gray-400 w-5 h-5" />}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </Input>
        </div>
      </div>

      {trends.length === 0 ? (
        <Card className="text-center p-8">
          <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
          <h3 className="text-xl font-semibold mb-2">No Trends Found</h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trends.map((trend) => (
            <Card
              key={trend.id}
              className="group hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 dark:hover:from-indigo-900/20 dark:hover:to-purple-900/20"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 group-hover:gradient-text">
                  {trend.keyword}
                </h3>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1 ${trend.growth > 0
                      ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-400'
                      : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-400'
                    }`}
                >
                  {trend.growth > 0 ? '+' : ''}{trend.growth}%
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Volume</span>
                  <span className="font-semibold">{trend.volume.toLocaleString()}</span>
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
                className="w-full mt-4"
                icon={ExternalLink}
              >
                View Details
              </Button>
            </Card>
          ))}
        </div>
      )}
    </Card>
  );
}
