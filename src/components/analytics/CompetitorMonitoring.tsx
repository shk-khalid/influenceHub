import { useState } from 'react';
import { Users, ArrowUpRight, MessageCircle, UserPlus, Activity, Target, Search, Filter, User2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useCompetitorStore } from '../../store/useCompetitor';
import { CompetitorForm } from '../analytics/CompetitorForm';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { StatCard } from '../common/StatCard';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'Technology', label: 'Technology' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Food', label: 'Food' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Travel', label: 'Travel' },
];

export default function CompetitorMonitoring() {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSuccess = () => {
    // Logic for successful submission
    setModalOpen(false);
  };

  const {
    filteredCompetitors,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
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
    <Card gradient className="sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text flex items-center gap-2 mb-2">
            <User2 className="w-5 h-5 text-indigo-600 dark:text-yellow-400" />
            Competitor Monitoring
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Analyze and track your competitors' performance.
          </p>
        </div>
      </div>
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input
          icon={<Search className="w-5 h-5" />}
          placeholder="Search competitors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select
          icon={<Filter className="w-5 h-5" />}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          options={categories}
        />
      </div>

      {/* Insights Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={Activity}
          title="Average Engagement"
          value={`${averageEngagement}%`}
          description="Across all competitors"
          iconColor="text-blue-600 dark:text-blue-400"
          valueColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          icon={Target}
          title="Top Performer"
          value={topPerformer ? `${topPerformer.engagement}%` : '-'}
          description={topPerformer ? topPerformer.name : 'No data available'}
          iconColor="text-purple-600 dark:text-purple-400"
          valueColor="text-purple-600 dark:text-purple-400"
        />
        <StatCard
          icon={Users}
          title="Total Competitors"
          value={competitors.length}
          description="Being monitored"
          iconColor="text-green-600 dark:text-green-400"
          valueColor="text-green-600 dark:text-green-400"
          className="sm:col-span-2 lg:col-span-1"

        />
      </div>

      {/* Add Competitor Button */}
      {/* Add Competitor Button */}
      <div className="flex sm:justify-end justify-center mb-6">
        <Button
          onClick={() => setModalOpen(!isModalOpen)} // Updated from `setShowForm`
          variant="primary"
          fullWidth
          icon={<UserPlus className="w-5 h-5" />}
          className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
        >
          {isModalOpen ? 'Cancel' : 'Add Competitor'}
        </Button>
      </div>

      {/* Modal for Competitor Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setModalOpen(false)} // Updated to close the modal
            >
              ✕
            </button>
            <CompetitorForm
              isOpen={isModalOpen} // Passing required props
              onClose={() => setModalOpen(false)}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}


      {/* Competitor Cards */}
      <div className="grid grid-cols-1 gap-8">
        {competitors.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-12 h-12 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <h3 className="text-xl font-semibold mb-2">No Competitors Found</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {searchTerm || selectedCategory !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'Start monitoring your competitors by adding them to the list.'}
            </p>
            {!searchTerm && selectedCategory === 'all' && (
              <Button
                onClick={() => setModalOpen(!isModalOpen)} // Replace setShowForm with setModalOpen
                variant="primary"
                fullWidth
                icon={<UserPlus className="w-5 h-5" />}
                className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
              >
                {isModalOpen ? 'Cancel' : 'Add Competitor'}
              </Button>
            )}
          </Card>
        ) : (
          competitors.map((competitor) => (
            <Card key={competitor.id} gradient>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-1">
                    {competitor.name}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{competitor.handle}</p>
                    <span className="text-sm px-2 py-1 rounded-full bg-gray-700 dark:bg-gray-300 text-gray-200 dark:text-gray-800">
                      {competitor.category}
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 w-full sm:w-auto justify-between sm:justify-start">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Followers</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {competitor.followers.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Engagement</p>
                    <p className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {competitor.engagement}%
                    </p>
                  </div>
                </div>
              </div>

              {competitor.recentPosts.length > 0 && (
                <>
                  <Card className="h-48 sm:h-72 mb-6 sm:mb-8 p-2 sm:p-4">
                    <ResponsiveContainer
                      width="100%"
                      height="100%"
                      className="h-48 sm:h-40 md:h-60 lg:h-72"
                    >
                      <AreaChart
                        data={competitor.recentPosts}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="opacity-50" />
                        <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                        <YAxis tick={{ fontSize: 10 }} />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="likes"
                          stroke="#3B82F6"
                          fill="url(#colorLikes)"
                          strokeWidth={2}
                        />
                        <defs>
                          <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {competitor.recentPosts.map((post) => (
                      <Card key={post.id} className="transition-transform bg-slate-200 dark:bg-slate-600 rounded-xl">
                        <p className="text-sm text-gray-800 dark:text-gray-200 mb-4">{post.content}</p>
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4 text-green-500" />
                            {post.likes.toLocaleString()} likes
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageCircle className="w-4 h-4 text-blue-500" />
                            {post.comments.toLocaleString()} comments
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </Card>
          ))
        )}
      </div>
    </Card>
  );
}
