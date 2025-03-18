import React from 'react';
import { Users, Heart, MessageCircle, Eye, BarChart3, Share2 } from 'lucide-react';
import { BrandDetail } from '../../types/brand';

interface SocialStatsCardProps {
  stats: BrandDetail['social_stats'];
}

export const SocialStatsCard: React.FC<SocialStatsCardProps> = ({ stats }) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300
                    hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Social Stats</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">@{stats.username}</p>
        </div>
        {stats.is_verified && (
          <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                         rounded-full text-xs font-medium">
            Verified
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg
                     transform hover:scale-102 transition-all duration-300
                     hover:bg-purple-100 dark:hover:bg-purple-800/40 cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Followers</span>
          </div>
          <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
            {formatNumber(stats.followers)}
          </p>
        </div>

        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg
                     transform hover:scale-102 transition-all duration-300
                     hover:bg-blue-100 dark:hover:bg-blue-800/40 cursor-pointer">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-gray-600 dark:text-gray-400">Engagement</span>
          </div>
          <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {parseFloat(stats.engagement_score).toFixed(1)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {[
          {
            icon: <Heart className="w-4 h-4 text-red-500" />,
            label: "Avg. Likes",
            value: formatNumber(parseFloat(stats.avg_likes_computed)),
            hoverColor: "hover:bg-red-50 dark:hover:bg-red-900/30"
          },
          {
            icon: <MessageCircle className="w-4 h-4 text-green-500" />,
            label: "Avg. Comments",
            value: formatNumber(parseFloat(stats.avg_comments_computed)),
            hoverColor: "hover:bg-green-50 dark:hover:bg-green-900/30"
          },
          {
            icon: <Eye className="w-4 h-4 text-blue-500" />,
            label: "Avg. Views",
            value: formatNumber(parseFloat(stats.avg_views)),
            hoverColor: "hover:bg-blue-50 dark:hover:bg-blue-900/30"
          },
          {
            icon: <Share2 className="w-4 h-4 text-purple-500" />,
            label: "Posts",
            value: formatNumber(stats.post_count),
            hoverColor: "hover:bg-purple-50 dark:hover:bg-purple-900/30"
          }
        ].map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg
                     transition-all duration-300 cursor-pointer
                     ${item.hoverColor}`}
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm text-gray-600 dark:text-gray-400">{item.label}</span>
            </div>
            <span className="font-medium text-gray-900 dark:text-white">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};