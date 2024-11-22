import React from 'react';
import {
  Users, ArrowUpRight, MessageCircle, TrendingUp, UserPlus,
  Activity, Target, Search, Filter
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useCompetitorStore } from '../../hooks/UseCompetitor';
import { CompetitorForm } from './CompetitorForm';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import Card from '../common/Card';

const categories = ['all', 'Technology', 'Fashion', 'Food', 'Lifestyle', 'Travel'];

export default function CompetitorMonitoring() {
  const [showForm, setShowForm] = React.useState(false);
  const {
    filteredCompetitors,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory
  } = useCompetitorStore();

  const competitors = filteredCompetitors();

  const calculateAverageEngagement = () => {
    if (competitors.length === 0) return 0;
    return (competitors.reduce((acc, curr) => acc + curr.engagement, 0) / competitors.length).toFixed(1);
  };

  const getTopPerformer = () => {
    if (competitors.length === 0) return null;
    return competitors.reduce((prev, current) =>
      current.engagement > prev.engagement ? current : prev
    );
  };

  const topPerformer = getTopPerformer();
  const averageEngagement = calculateAverageEngagement();

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          label="Search"
          placeholder="Search competitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          icon={<Search className="text-gray-400 w-5 h-5" />}
        />
        <Input
          label="Filter"
          isSelect
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          icon={<Filter className="text-gray-400 w-5 h-5" />}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category}
            </option>
          ))}
        </Input>
      </div>

      {/* Insights Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="flex flex-col items-center text-center group hover:scale-105 transition-transform">
          <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/50 mb-4">
            <Activity className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Average Engagement</h3>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{averageEngagement}%</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Across all competitors</p>
        </Card>

        <Card className="flex flex-col items-center text-center group hover:scale-105 transition-transform">
          <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/50 mb-4">
            <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Top Performer</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {topPerformer ? topPerformer.engagement + '%' : '-'}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {topPerformer ? topPerformer.name : 'No data available'}
          </p>
        </Card>

        <Card className="flex flex-col items-center text-center group hover:scale-105 transition-transform">
          <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/50 mb-4">
            <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h3 className="text-lg font-semibold mb-1">Total Competitors</h3>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">{competitors.length}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Being monitored</p>
        </Card>
      </div>

      {/* Add Competitor Button */}
      <div className="flex justify-end mb-6">
        <Button
          variant="primary"
          icon={UserPlus}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Competitor'}
        </Button>
      </div>

      {/* Competitor Form */}
      {showForm && <CompetitorForm onSuccess={() => setShowForm(false)} />}

      {/* Competitors List */}
      <div className="grid grid-cols-1 gap-8">
        {competitors.length === 0 ? (
          <Card className="text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Competitors Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start monitoring your competitors by adding them to the list.'}
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Button
                variant="primary"
                icon={UserPlus}
                onClick={() => setShowForm(true)}
              >
                Add Your First Competitor
              </Button>
            )}
          </Card>
        ) : (
          competitors.map((competitor) => (
            <Card
              key={competitor.id}
              className="group hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                <div>
                  <h3 className="text-xl font-semibold gradient-text mb-1">
                    {competitor.name}
                  </h3>
                  <div className="flex items-center gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{competitor.handle}</p>
                    <span className="text-sm px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400">
                      {competitor.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Followers</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {competitor.followers.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement</p>
                    <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {competitor.engagement}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Competitor Posts */}
              {competitor.recentPosts?.length > 0 && (
                <>
                  <div className="h-72 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={competitor.recentPosts}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="likes"
                          stroke="#5a189a"
                          fill="url(#colorLikes)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#5a189a" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#5a189a" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
