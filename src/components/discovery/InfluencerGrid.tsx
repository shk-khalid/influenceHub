import { MapPin, Users, BarChart2, MessageSquare, Bookmark, Shield } from 'lucide-react';
import { Button } from '../common/Button';

interface Influencer {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  niche: string;
  location: string;
  followers: number;
  engagementRate: number;
  recentPosts: string[];
  verified: boolean;
  metrics: {
    avgLikes: number;
    avgComments: number;
    responseRate: number;
  };
}

interface InfluencerGridProps {
  influencers: Influencer[];
}

export function InfluencerGrid({ influencers }: InfluencerGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {influencers.map((influencer) => (
        <div
          key={influencer.id}
          className="glass-effect rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          {/* Header */}
          <div className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  {influencer.verified && (
                    <Shield className="absolute -top-1 -right-1 w-5 h-5 text-blue-500" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {influencer.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {influencer.handle}
                  </p>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4 mr-1" />
                    {influencer.location}
                  </div>
                </div>
              </div>
              <Button
                variant="secondary"
                icon={Bookmark}
                className="!p-2"
              />
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-400 mb-1">
                  <Users className="w-4 h-4 mr-1" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {(influencer.followers / 1000).toFixed(0)}k
                </p>
                <p className="text-xs text-gray-500">Followers</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-400 mb-1">
                  <BarChart2 className="w-4 h-4 mr-1" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {influencer.engagementRate}%
                </p>
                <p className="text-xs text-gray-500">Engagement</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center text-gray-400 mb-1">
                  <MessageSquare className="w-4 h-4 mr-1" />
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                  {influencer.metrics.responseRate}%
                </p>
                <p className="text-xs text-gray-500">Response Rate</p>
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="grid grid-cols-3 gap-px">
              {influencer.recentPosts.map((post, index) => (
                <div key={index} className="aspect-square relative group">
                  <img
                    src={post}
                    alt={`Recent post ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-white text-sm text-center">
                      <p>{influencer.metrics.avgLikes.toLocaleString()} likes</p>
                      <p>{influencer.metrics.avgComments.toLocaleString()} comments</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}